# 快速測試指南

## 完整設置檢查清單

### ✅ 前端本地開發

```bash
# 1. 啟動 Vite 開發伺服器
npm run dev

# 在瀏覽器中打開：http://localhost:5173/telecom-prompt-main/
```

**測試項目：**
- [ ] 頁面成功加載
- [ ] 能夠選擇不同的領域（移動、固網、數據中心等）
- [ ] 點擊快速範例能代入提示詞
- [ ] 可以編輯自定義提示詞
- [ ] 「產生提示詞」按鈕可點擊

### ✅ 後端伺服器設置（PPT 生成）

```bash
# 1. 在新的終端視窗中啟動 Express 伺服器
npm run start:server

# 應該看到：🚀 Server listening on http://localhost:3001
```

**前置條件：**
- 設定至少一個 API 金鑰的環境變數：
  ```bash
  # 在 .env.local 中設定（Windows PowerShell）或直接設定環境變數
  $env:OPENAI_API_KEY = "sk-..."
  $env:GEMINI_API_KEY = "..."
  $env:CLAUDE_API_KEY = "..."
  $env:PERPLEXITY_API_KEY = "..."
  ```

### ✅ 完整互動流程

1. **生成提示詞**
   - 選擇一個領域（如「移動網路」）
   - 查看預生成的提示詞內容
   - 或手動編輯提示詞
   - 點擊「產生提示詞」按鈕
   - 應該看到生成的內容和「聚合多個 AI 協作生成 PPT」按鈕

2. **生成 PPT（需要後端伺服器）**
   - 確認提示詞已生成
   - 點擊「聚合多個 AI 協作生成 PPT」按鈕
   - **預期結果：**
     - 按鈕變為「生成PPT中...」
     - 伺服器後台並行調用所有已配置的 AI API
     - 自動生成並下載 PPTX 檔案（名稱：`ai-aggregation-{timestamp}.pptx`）
   
   - **調試信息：**
     - 檢查瀏覽器控制台（F12 -> Console）是否有錯誤
     - 檢查伺服器終端是否顯示請求和回應
     - 確認至少有一個 API 金鑰已設定

3. **驗證 PPTX 內容**
   - 打開下載的 PPTX 檔案
   - 應包含：
     - 標題投影片（含原始提示詞）
     - 各個 AI 模型的回應投影片
     - 專業的頁面版配和格式

## 常見問題排查

### 問題：「聚合多個 AI 協作生成 PPT」按鈕沒有出現

**可能原因：**
- 提示詞未生成
- Vite dev 伺服器未啟動或 JavaScript 編譯有誤

**解決方案：**
```bash
# 1. 確認已啟動 dev 伺服器
npm run dev

# 2. 檢查瀏覽器控制台（F12）是否有 JavaScript 錯誤

# 3. 清除緩存並重新加載
# Ctrl+Shift+Delete -> 清除所有快取 -> 重新加載頁面
```

### 問題：點擊 PPT 按鈕後沒有讀應（轉圈後取消）

**可能原因：**
- 後端伺服器未啟動
- 伺服器啟動但沒有返回回應
- API 金鑰未設定

**解決方案：**
```bash
# 1. 確認後端伺服器正在運行
npm run start:server
# 應該看到：🚀 Server listening on http://localhost:3001

# 2. 確認至少設定了一個 API 金鑰
# Windows PowerShell：
$env:OPENAI_API_KEY = "your-key-here"

# 或建立 .env.local 檔案：
OPENAI_API_KEY=your-key-here
GEMINI_API_KEY=your-key-here
```

### 問題：後端伺服器啟動失敗（ERR! npm WARN）

**可能原因：**
- 依賴未正確安裝
- Node.js 版本過舊

**解決方案：**
```bash
# 1. 重新安裝依賴
rm -r node_modules
npm install --legacy-peer-deps

# 2. 檢查 Node.js 版本（需 18+）
node --version

# 3. 啟動伺服器
npm run start:server
```

### 問題：PPTX 下載失敗或無法打開

**可能原因：**
- 伺服器未正確編碼 base64
- API 回應為空或錯誤
- 瀏覽器安全設定阻擋下載

**調試步驟：**
```bash
# 1. 檢查伺服器日誌是否有錯誤
# 伺服器終端應顯示詳細的 API 調用結果

# 2. 檢查瀏覽器控制台（F12 -> Network）
# 查看 /api/aggregate 請求的回應

# 3. 確認至少有一個 AI API 有成功回應
```

## 環境變數設定參考

### Windows PowerShell（臨時設定，會話有效）

```powershell
# 設定單個金鑰
$env:OPENAI_API_KEY = "sk-your-key-here"

# 啟動伺服器
npm run start:server
```

### .env.local（永久設定，推薦）

在專案根目錄建立 `.env.local` 檔案：

```env
# 前端 Gemini（可選）
VITE_API_KEY=goog-your-key-here

# 後端多模型（至少設定一個）
OPENAI_API_KEY=sk-your-key-here
GEMINI_API_KEY=goog-your-key-here
CLAUDE_API_KEY=sk-ant-your-key-here
PERPLEXITY_API_KEY=pplx-your-key-here
```

**重要：** `.env.local` 已被 `.gitignore` 忽略，不會被上傳到 GitHub

## 生產部署測試

### GitHub Pages 自動部署

推送到 master 分支後，檢查 GitHub Actions：

```
倉庫 -> Actions -> 最新工作流
```

**預期結果：**
- ✅ 代碼檢查通過
- ✅ npm install 成功
- ✅ npm run build 成功（生成 dist/ 資料夾）
- ✅ 部署到 GitHub Pages

部署完成後，訪問：https://DeanUFO.github.io/telecom-prompt-main/

### 後端伺服器生產部署（可選）

如果想在生產網站上使用 PPT 生成功能，需要部署後端伺服器。

推薦平台：Render.com、Railway.app、Vercel

更詳細的說明見 README.md 的「生產部署」部分。

## 性能監控

### 前端性能

在瀏覽器開發者工具中檢查：

```
DevTools -> Lighthouse -> 運行審核
```

**目標指標：**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90

### 後端性能

檢查伺服器日誌中的 API 調用時間：

```
伺服器終端輸出應顯示：
✓ ChatGPT: 1.2s
✓ Gemini: 0.8s
✓ Claude: 1.5s
✓ Perplexity: 0.9s
↓ PPTX Generated: 0.3s
```

## 技術支援

如遇到問題，請：

1. 檢查本指南的「常見問題排查」部分
2. 查看 README.md 的「故障排除」部分
3. 查看瀏覽器控制台和伺服器日誌的詳細錯誤信息
4. 在 GitHub 倉庫提交 Issue，附上：
   - 系統環境（Windows/Mac/Linux）
   - Node.js 版本（`node --version`）
   - 錯誤信息的完整截圖
   - 嘗試過的解決步驟

---

**最後更新：** 2024
**相關文檔：** [README.md](README.md)
