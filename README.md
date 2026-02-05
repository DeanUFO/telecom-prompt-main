# AI 驅動的電信技術提示生成系統

這是一個使用 React + Vite 構建的多 AI 聚合平台，支援將電信技術提示語發送到多個 AI 模型（ChatGPT、Gemini、Claude、Perplexity），並將結果匯整成 PowerPoint 演示文稿。

## 功能特性

✨ **領域特定提示生成**
- 支援 7 個電信領域：移動網路、固網、數據中心、開發、AI、安全、MCP
- 快速範例提示詞可點擊代入
- 即時內容複製至各大 AI 工具

🤖 **多 AI 協作聚合**
- 同時調用 ChatGPT (GPT-4o-mini)、Google Gemini、Anthropic Claude、Perplexity
- 自動整合各模型回應
- 生成 PowerPoint 演示文稿

📊 **智能 UI**
- 實時思考過程顯示
- 響應式設計支援桌面和移動設備
- Toast 通知和用戶友好的錯誤處理

## 本地開發設置

### 必要條件
- Node.js 18+
- npm 或 yarn

### 安裝步驟

1. **克隆或下載本倉庫**
   ```bash
   git clone https://github.com/DeanUFO/telecom-prompt-main.git
   cd telecom-prompt-main
   ```

2. **安裝依賴**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **配置 API 金鑰（可選）**
   - 在應用程式的「設定」modal 中手動輸入 API 金鑰，或
   - 設定環境變數（參考下方配置章節）

4. **啟動開發伺服器**
   ```bash
   npm run dev
   ```
   應用程式將在 http://localhost:5173/telecom-prompt-main/ 開啟

## 生成 PPT 功能設置

若要使用「聚合多個 AI 協作生成 PPT」功能，需要同時啟動前端和後端伺服器：

### 啟動後端伺服器（新終端視窗）
```bash
npm run start:server
```
- 伺服器將在 http://localhost:3001 運行
- 確保設定了相應的 API 金鑰（見下方環境變數配置）

### 生成 PPT 流程
1. 在前端應用選擇領域並生成電信提示詞
2. 點擊「聚合多個 AI 協作生成 PPT」按鈕
3. 伺服器將並行調用所有已配置的 AI API
4. 自動生成 PPTX 檔案並下載

## 環境變數配置

### 開發環境（本地 .env.local）
創建 `.env.local` 檔案並設定以下變數：

```env
VITE_API_KEY=your-gemini-api-key-here
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
CLAUDE_API_KEY=your-anthropic-api-key
PERPLEXITY_API_KEY=your-perplexity-api-key
```

**注意：** `.env.local` 檔案應該被 `.gitignore` 忽略（不要上傳到 GitHub）

### GitHub Actions 自動部署

若要在 GitHub Pages 自動部署時注入 API 金鑰，請按以下步驟操作：

1. **進入 GitHub 倉庫設定**
   - 點擊倉庫的「Settings」→「Secrets and variables」→「Actions」

2. **新增 Repository Secrets**
   - `API_KEY`：用於前端 Gemini 調用的 API 金鑰
   - `OPENAI_API_KEY`：OpenAI API 金鑰
   - `GEMINI_API_KEY`：Google Gemini API 金鑰
   - `CLAUDE_API_KEY`：Anthropic Claude API 金鑰
   - `PERPLEXITY_API_KEY`：Perplexity API 金鑰

3. **GitHub Actions 將自動**
   - 讀取這些 secrets
   - 在構建時注入到環境變數
   - Vite 將在編譯時將 `process.env.API_KEY` 替換為實際值

## 生產部署

### GitHub Pages 自動部署

推送到 `master` 分支時，GitHub Actions 工作流會自動：
1. 安裝依賴
2. 構建前端應用
3. 部署到 GitHub Pages：https://DeanUFO.github.io/telecom-prompt-main/

### 部署後端伺服器

PPT 生成功能需要後端伺服器。建議的部署選項：

**Option 1: Render.com（推薦）**
```bash
# 1. 建立新的 Web Service
# 2. 連接 GitHub 倉庫
# 3. 構建命令: npm install --legacy-peer-deps
# 4. 啟動命令: npm run start:server
# 5. 設定環境變數（Environment Variables）中的 API 金鑰
```

**Option 2: Railway.app**
```bash
# 類似 Render 的部署流程
# 支援直接從 GitHub 連接並自動部署
```

**Option 3: Vercel Serverless Functions**
- 建議用於 API 端點的無伺服器部署

部署後，更新 `App.tsx` 中的 `serverUrl` 以指向實際的生產端點：

```typescript
const serverUrl = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-server-url.com' 
  : 'http://localhost:3001';
```

## 項目結構

```
telecom-prompt-main/
├── App.tsx                 # 主應用元件
├── components/
│   ├── DomainCard.tsx      # 領域選擇卡片
│   ├── OutputDisplay.tsx   # 結果顯示元件
│   └── ThinkingDisplay.tsx # 思考過程顯示
├── services/
│   └── geminiService.ts    # Gemini API 服務
├── server/
│   └── index.js            # Express 後端伺服器（PPT 生成）
├── constants.ts            # 應用常數和提示詞範例
├── types.ts                # TypeScript 型別定義
├── vite.config.ts          # Vite 配置（含 API_KEY 注入）
└── package.json            # 專案依賴和腳本

```

## 使用的技術棧

- **前端框架：** React 18.2 + TypeScript
- **構建工具：** Vite 5.1
- **UI 框架：** Tailwind CSS
- **圖標庫：** Lucide React
- **後端：** Express.js
- **PPT 生成：** pptxgenjs
- **AI API 集成：**
  - OpenAI (ChatGPT)
  - Google Gemini
  - Anthropic Claude
  - Perplexity

## API 文檔

### POST /api/aggregate

聚合多個 AI 模型的回應並生成 PPTX 檔案。

**請求：**
```json
{
  "prompt": "您的電信技術提示詞"
}
```

**回應：**
```json
{
  "pptx": "base64-encoded-pptx-file"
}
```

**PPTX 包含：**
- 標題投影片：包含提示詞資訊
- 各 AI 模型回應投影片（ChatGPT、Gemini、Claude、Perplexity）
- 每個回應獨立呈現在專業的 PowerPoint 版配中

## 故障排除

### 應用無法顯示內容
- 清除瀏覽器緩存
- 確認 Vite dev 伺服器正在運行：`npm run dev`
- 檢查瀏覽器控制台是否有錯誤

### PPT 生成失敗
- 確認後端伺服器正在運行：`npm run start:server`
- 檢查伺服器日誌以獲取詳細錯誤信息
- 確認所有必需的 API 金鑰已設定
- 檢查網路連接

### API 金鑰無法正常注入
- 本地開發：確認 `.env.local` 檔案存在且格式正確
- GitHub Pages：驗證 GitHub Secrets 已正確設定
- 運行 `npm run build` 測試構建時的環境變數注入

## 許可證

MIT

## 支援和反饋

若有問題或建議，請在 GitHub 倉庫提交 Issue。

---

**更新日期：** 2024
**版本：** 1.1.0（含 PPT 聚合功能）
