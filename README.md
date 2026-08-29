# 高雄力賀汽車（LI-HO AUTO）車輛展示網站

靜態網站 ＋ 每日自動爬蟲。**已上線並在自動同步中**（最近一次自動同步 commit：2026-08-28）。

## 這個 repo 是什麼

| 檔案 | 作用 |
|---|---|
| `index.html`／`style.css`／`app.js` | 前台展示頁 |
| `admin.html` | 後台頁 |
| `sync_carok.py` | **爬蟲**：抓 CarOk 官網的車況／車價／精確里程，下載車輛照片到 `images/cars/`，寫入 `data/inventory.json` |
| `.github/workflows/carok_sync.yml` | GitHub Actions 排程，**每天凌晨自動跑上面那支** |
| `DEPLOYMENT_GUIDE.md` | 初次部署到 GitHub Pages 的步驟 |

## 🔴 這支爬蟲的資料誠實規則（寫在 `sync_carok.py` 檔頭，不要改掉）

- **必填欄位（品牌／年份／價格）抓不到時，那台車直接跳過並印警告——絕不用捏造的預設值填。**
- 選填欄位抓不到時退回誠實的佔位字串「門市洽詢」。

⇒ **看到車輛數變少，先確認是不是來源網站改版導致必填欄位抓不到**，
而不是假設車真的下架了。

## ⚠️ `DEPLOYMENT_GUIDE.md` 已部分過期

該檔寫的是**還沒部署時**的初次設定步驟，且範例路徑是別台機器的
（`/Users/terry/.gemini/...`）。**網站已經上線、Actions 已經在跑**，
那份指南現在只有「運作原理」那一節仍然有效。

---

<!-- 本檔由 2026-08-29 全 repo 文件治理掃描（workspace-governance
     scripts/repo_docs_audit.py，D4「無入口」）補上。
     內容取自 sync_carok.py 檔頭、workflows 設定與 git log，未新增未經查證的宣稱。 -->
