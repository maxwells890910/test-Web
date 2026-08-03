# 🚀 高雄力賀汽車 (LI-HO AUTO) 雲端全自動更新與發布指南

本專案已完全配置 **GitHub Pages + GitHub Actions 雲端全自動爬蟲系統**。

---

## 🌟 運作原理解析
1. **GitHub Pages (免費主機)**：負責託管與展示您的全新網站。
2. **GitHub Actions (雲端機器人)**：每天凌晨 3:00 自動在雲端執行 `sync_carok.py` 爬蟲，自動連線至 CarOk 官網，抓取最新車況、車價與隱藏的精確里程數。如果有車輛上架或下架，會自動更新網站！

---

## 🛠️ 簡單 3 步驟把網站上線（完全免費）

### 步驟 1：在 GitHub 建立一個新儲存庫 (Repository)
1. 前往 [GitHub.com](https://github.com) 登入或免費註冊帳號。
2. 點擊右上角 **`+`** ➔ 選擇 **`New repository`**。
3. 儲存庫名稱輸入 `liho-auto` (或任意名稱)，選擇 **Public (公開)**，點擊 **Create repository**。

### 步驟 2：將網頁專案上傳至 GitHub
在上傳視窗中，選擇 **Upload an existing file** 或使用電腦 Terminal 上傳：

```bash
cd /Users/terry/.gemini/antigravity/scratch/lihe_auto_website
git init
git add .
git commit -m "Initial commit for Li-Ho Auto website"
git branch -M main
git remote add origin https://github.com/您的GitHub帳號/liho-auto.git
git push -u origin main
```

### 步驟 3：開啟 GitHub Pages 免費網站服務
1. 開啟您的 GitHub 儲存庫頁面，點選頂部 **`Settings` (設定)**。
2. 在左側選單點選 **`Pages`**。
3. 在 `Build and deployment` 的 Source 選擇 **`Deploy from a branch`**。
4. Branch 選擇 **`main`** / **`/(root)`** ➔ 點擊 **`Save` (儲存)**。

---

🎉 **大功告成！**
幾秒鐘後，您的網站將會在 `https://您的帳號.github.io/liho-auto/` 正式上線！
並且每天凌晨 3 點，雲端都會自動幫您抓取 CarOk 官網最新車況，您不需要開電腦也不需要做任何維護！
