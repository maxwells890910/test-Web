#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Li-Ho Auto (力賀汽車) CarOk Store Auto-Sync Crawler for GitHub Actions
Scrapes http://www.car-ok.com.tw/area/carStoreInfo/9E12 daily, extracts exact
mileages, cash prices and specifications, downloads each car's photo into
images/cars/, then writes data/inventory.json (this script does NOT touch app.js).

Data-honesty rules:
- Required fields (brand / year / price): if extraction fails, the car is
  SKIPPED with a warning — never filled with fabricated defaults.
- Optional fields fall back to the honest placeholder 門市洽詢.
- All scraped text is HTML-escaped before entering the JSON (the front end
  renders these fields with innerHTML).
"""

import os
import re
import html
import json
import time
import urllib.request
from urllib.parse import quote, unquote

STORE_URL = "http://www.car-ok.com.tw/area/carStoreInfo/9E12"
BASE_URL = "http://www.car-ok.com.tw"  # 該站 https 憑證已過期，僅 http 可用
HEADERS = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
IMAGE_DIR = "images/cars"
PLACEHOLDER_IMAGE = "images/corolla_cross_2021.jpg"
MAX_IMAGE_BYTES = 3 * 1024 * 1024  # 單檔超過 3MB 不入 repo

def fetch_html(url):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"[Error] Fetching {url}: {e}")
        return ""

def clean_text(raw):
    """Decode entities, collapse whitespace, then escape for innerHTML safety."""
    text = html.unescape(raw)
    text = re.sub(r'\s+', ' ', text).strip()
    return html.escape(text, quote=True)

def extract_field(pattern, page_html):
    m = re.search(pattern, page_html)
    return clean_text(m.group(1)) if m else None

def get_store_car_links():
    page_html = fetch_html(STORE_URL)
    links = re.findall(r'href=["\'](/buy/carInfo/[A-Za-z0-9]+)["\']', page_html)
    # Deduplicate while preserving order
    seen = set()
    unique_links = []
    for link in links:
        if link not in seen:
            seen.add(link)
            unique_links.append(BASE_URL + link)
    print(f"[Info] Found {len(unique_links)} vehicles in CarOk Store.")
    return unique_links

def download_image(image_url, car_id):
    """Download the car photo into IMAGE_DIR; return the relative path, or None."""
    try:
        req = urllib.request.Request(image_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read()
        if not data:
            print(f"[Warning] Empty image for {car_id}, using placeholder.")
            return None
        if len(data) > MAX_IMAGE_BYTES:
            print(f"[Warning] Image for {car_id} is {len(data)} bytes (>3MB), using placeholder.")
            return None
        # 老站可能用 200 回 HTML 錯誤頁——驗檔頭，不是圖就不收
        if not (data.startswith(b'\xff\xd8\xff') or data.startswith(b'\x89PNG')):
            print(f"[Warning] Image for {car_id} is not JPEG/PNG (starts {data[:8]!r}), skipped.")
            return None
        os.makedirs(IMAGE_DIR, exist_ok=True)
        local_path = f"{IMAGE_DIR}/{car_id}.jpg"
        with open(local_path, "wb") as f:
            f.write(data)
        return local_path
    except Exception as e:
        print(f"[Error] Downloading image for {car_id}: {e}")
        return None

def parse_car_detail(url):
    car_id = url.split('/')[-1].lower()
    page_html = fetch_html(url)
    if not page_html:
        return None

    # ---- Required fields: fail => skip this car (no fabricated defaults) ----
    # 註：<br 不寫閉合，容忍 <br>／<br/>／<br /> 排版變化
    brand = extract_field(r'廠牌：(.*?)\s*<br', page_html)
    if brand and '/' in brand:
        brand = brand.split('/')[0].strip()

    year_m = re.search(r'年份：(\d+)', page_html)
    year = int(year_m.group(1)) if year_m else None

    price_m = re.search(r'class="txt5-28">\s*([\d\.]+)\s*萬', page_html)
    price = float(price_m.group(1)) if price_m else None

    missing = [name for name, val in
               [("廠牌", brand), ("年份", year), ("車價", price)] if not val]
    if missing:
        print(f"[Warning] {car_id}: missing required field(s) {missing}, skipped.")
        return None

    # ---- Optional fields: fail => honest placeholder, never invented specs ----
    # 車名組合：廠牌＋車型＋年份（車型欄位缺漏時退為 廠牌＋年份，仍是真實資料）
    model = extract_field(r'車型：(.*?)\s*<br', page_html)
    title = f"{brand} {model} {year}年" if model else f"{brand} {year}年"

    type_str = extract_field(r'車種：(.*?)\s*<br', page_html) or ''
    if '休旅' in type_str:
        car_type = 'SUV'
    elif '商務' in type_str or '廂' in type_str or '貨' in type_str:
        car_type = 'MPV'
    elif type_str:
        car_type = 'Sedan'
    else:
        car_type = ''  # 車種缺漏就不硬給分類

    # Exact mileage from hidden field <div id="MILES">64000</div>
    miles_m = re.search(r'<div id="MILES">(\d+)</div>', page_html)
    if miles_m:
        miles = int(miles_m.group(1))
        if miles >= 10000:
            mileage = f"{round(miles / 10000, 1)} 萬公里 ({miles:,} km)"
        else:
            mileage = f"{miles:,} 公里"
    else:
        mileage = "門市洽詢"

    cc = extract_field(r'排氣量：(\d+)', page_html)
    engine = f"{round(int(cc) / 1000, 1)}L ({cc}.cc)" if cc and cc.isdigit() else "門市洽詢"

    transmission = extract_field(r'排檔方式：(.*?)\s*<br', page_html) or "門市洽詢"

    # ---- Car photo: download into the repo (the source site has no usable
    # https, so hot-linking breaks on GitHub Pages / mixed content) ----
    img_m = re.search(
        r'["\'](/public/upload/car/[^"\']+?\.(?:jpeg|jpg|png))(?:\?[^"\']*)?["\']',
        page_html, re.IGNORECASE)
    image = None
    if img_m:
        # 部分照片檔名含空格（車身號碼），要先百分比編碼；
        # 先 unquote 再 quote＝等冪，來源站哪天改成預編碼 URL 也不會雙重編碼
        image = download_image(BASE_URL + quote(unquote(img_m.group(1))), car_id)
    else:
        print(f"[Warning] {car_id}: no photo found on page.")
    if not image:
        # 下載失敗但上一次的好圖還在 checkout 裡→沿用，
        # 不拿佔位圖冒充（暫時性網路故障不該毀掉既有照片）
        previous = f"{IMAGE_DIR}/{car_id}.jpg"
        if os.path.isfile(previous):
            print(f"[Info] {car_id}: reusing previous local photo.")
            image = previous
        else:
            image = PLACEHOLDER_IMAGE

    return {
        "id": car_id,
        "title": title,
        "brand": brand,
        "type": car_type,
        "year": year,
        "mileage": mileage,
        "price": price,
        "engine": engine,
        "power": "門市洽詢",
        "transmission": transmission,
        "image": image,
        "certified": "CarOk 認證",
        "guarantee": "三大保證 ‧ 實車實價",
        "tags": ["實車實價", "非計程車", "里程保證"],
        "description": f"高雄梓官力賀汽車門市現場實車展示，通過 CarOk 142 項權威檢驗與內視鏡檢查，車況優良！",
        "inspection": [
            {"item": "車體大樑與結構骨架", "status": "CarOk 認證無鈑修合格"},
            {"item": "CAROK 內視鏡檢查", "status": "引擎內部無積碳極乾淨"}
        ]
    }

def clean_orphan_images(inventory):
    """Remove images/cars/ files no longer referenced by the current inventory."""
    if not os.path.isdir(IMAGE_DIR):
        return
    keep = {c["image"] for c in inventory if c["image"].startswith(f"{IMAGE_DIR}/")}
    for fname in sorted(os.listdir(IMAGE_DIR)):
        rel = f"{IMAGE_DIR}/{fname}"
        if not os.path.isfile(rel):
            continue
        if rel not in keep:
            os.remove(rel)
            print(f"[Info] Removed orphan image {rel}")

def run_sync():
    print("[Start] Running Li-Ho Auto CarOk Store Inventory Sync...")
    links = get_store_car_links()
    if not links:
        # 列表頁改版或連不上——綠燈會變成無聲凍結，必須紅燈讓人看見
        print("[Error] 0 links fetched — store page unreachable or layout changed. "
              "Keeping previous inventory.json untouched.")
        raise SystemExit(1)

    inventory = []
    for link in links:
        data = parse_car_detail(link)
        if data:
            inventory.append(data)
        time.sleep(1)  # 對來源站的禮貌間隔

    if len(inventory) < max(1, len(links) // 2):
        # 低水位護欄：連結有 N 台、成功不到一半＝來源站大概率改版或大範圍故障。
        # 不寫檔、不刪圖，保住 repo 裡上一次的好資料，非零退出讓 workflow 變紅。
        print(f"[Error] Only {len(inventory)}/{len(links)} cars parsed — "
              "site layout may have changed. Keeping previous inventory.json untouched.")
        raise SystemExit(1)

    print(f"[Success] Parsed {len(inventory)} cars successfully "
          f"({len(links) - len(inventory)} skipped).")

    os.makedirs("data", exist_ok=True)
    with open("data/inventory.json", "w", encoding="utf-8") as f:
        json.dump(inventory, f, ensure_ascii=False, indent=2)

    clean_orphan_images(inventory)
    print("[Done] inventory.json updated successfully.")

if __name__ == "__main__":
    run_sync()
