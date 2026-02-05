# 🤖 AI 多模型聚合與報告生成系統

## 系統功能概述

本系統支援從多個 AI 模型自動查詢，並以多種格式生成綜合報告。

### ✅ 已支持的 AI 模型

| 模型 | 提供商 | 成本 | 適用場景 |
|------|--------|------|--------|
| **ChatGPT (GPT-4o mini)** | OpenAI | 💰💰 | 通用文本生成、編碼、分析 |
| **Gemini** | Google | 💰 | 快速推理、多模態理解 |
| **Claude** | Anthropic | 💰💰💰 | 長文本、複雜推理、安全性 |
| **Perplexity** | Perplexity AI | 💰 | 實時網路搜尋、最新資訊 |
| **Copilot (Azure OpenAI)** | Microsoft | 💰💰 | GitHub Copilot 整合、企業應用 |

### 📊 報告生成格式

1. **PPT (PowerPoint)** - 投影片展示
2. **Markdown** - NotebookLM 相容格式
3. **HTML** - 網頁瀏覽和分享
4. **JSON** - 程式化使用

---

## 🔧 配置指南

### 1️⃣ OpenAI (ChatGPT)

**取得 API Key：**
1. 前往 [OpenAI API 管理頁面](https://platform.openai.com/api-keys)
2. 建立新的 API 金鑰
3. 設定環境變數

```bash
# Windows PowerShell
$env:OPENAI_API_KEY = "sk-proj-xxxxx..."

# 或在 .env.local 檔案中
OPENAI_API_KEY=sk-proj-xxxxx...
```

### 2️⃣ Google Gemini

**取得 API Key：**
1. 前往 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 建立 API 金鑰
3. 設定環境變數

```bash
$env:GEMINI_API_KEY = "AIzaSy..."

# 或在 .env.local 檔案中
GEMINI_API_KEY=AIzaSy...
```

### 3️⃣ Anthropic Claude

**取得 API Key：**
1. 前往 [Anthropic 主頁](https://console.anthropic.com/)
2. 建立帳戶並申請 API 存取
3. 建立 API 金鑰
4. 設定環境變數

```bash
$env:CLAUDE_API_KEY = "sk-ant-..."

# 或在 .env.local 檔案中
CLAUDE_API_KEY=sk-ant-...
```

### 4️⃣ Perplexity

**取得 API Key：**
1. 前往 [Perplexity API](https://www.perplexity.ai/)
2. 註冊並申請 API 存取
3. 建立 API 金鑰
4. 設定環境變數

```bash
$env:PERPLEXITY_API_KEY = "pplx-..."

# 或在 .env.local 檔案中
PERPLEXITY_API_KEY=pplx-...
```

### 5️⃣ Microsoft Copilot (Azure OpenAI)

**設定 Azure OpenAI：**
1. 前往 [Azure 門戶](https://portal.azure.com/)
2. 建立 OpenAI 資源
3. 取得端點和金鑰
4. 設定環境變數

```bash
# Windows PowerShell
$env:AZURE_OPENAI_KEY = "xxxxx..."
$env:AZURE_OPENAI_ENDPOINT = "https://your-resource.openai.azure.com/"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4"  # 可選，預設為 gpt-4

# 或在 .env.local 檔案中
AZURE_OPENAI_KEY=xxxxx...
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=gpt-4
```

---

## 📡 API 使用指南

### 1. 生成 PPT（多模型聚合）

**端點:** `POST /api/aggregate`

**請求：**
```json
{
  "prompt": "請分析電信行業 5G 技術的發展趨勢"
}
```

**回應：**
```json
{
  "ok": true,
  "pptx": "base64編碼的PPT二進制數據",
  "fileName": "ai-aggregation-1707125400000.pptx"
}
```

**cURL 範例：**
```bash
curl -X POST http://localhost:3001/api/aggregate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "請分析電信行業 5G 技術的發展趨勢"
  }'
```

### 2. 生成 Markdown 報告（NotebookLM 相容）

**端點:** `POST /api/report/markdown`

**請求：**
```json
{
  "prompt": "請分析電信行業 5G 技術的發展趨勢",
  "results": {
    "chatgpt": "ChatGPT 的回應...",
    "gemini": "Gemini 的回應...",
    "claude": "Claude 的回應...",
    "perplexity": "Perplexity 的回應..."
  }
}
```

**回應：**
```json
{
  "ok": true,
  "markdown": "# AI Aggregation Report\n\n...",
  "fileName": "ai-report-1707125400000.md",
  "content": "base64編碼的內容"
}
```

### 3. 生成 HTML 報告

**端點:** `POST /api/report/html`

**請求格式同上（Markdown 端點）**

**回應包含美化的 HTML 內容**

### 4. 查詢可用的 AI 模型

**端點:** `GET /api/models`

**回應：**
```json
{
  "status": "ok",
  "totalAvailable": 4,
  "availableModels": [
    "ChatGPT (OpenAI)",
    "Gemini (Google)",
    "Claude (Anthropic)",
    "Perplexity"
  ],
  "unavailableModels": [
    "Copilot (Azure)"
  ]
}
```

---

## 🚀 使用 NotebookLM 彙整報告

### 步驟 1：生成 Markdown 報告

使用後端 API 生成 Markdown 格式的報告：

```bash
curl -X POST http://localhost:3001/api/report/markdown \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "您的提示詞",
    "results": {
      "chatgpt": "...",
      "gemini": "...",
      "claude": "...",
      "perplexity": "..."
    }
  }' > report.md
```

### 步驟 2：上傳到 NotebookLM

1. 前往 [Google NotebookLM](https://notebooklm.google.com/)
2. 建立新 notebook
3. 上傳或貼上 Markdown 報告
4. 使用「研究指南」或「Podcast」功能分析

### NotebookLM 功能

- **研究指南** - 自動生成結構化的研究指南
- **Podcast** - 將報告轉換為播客對話
- **引文** - 自動追蹤所有引用來源
- **提問** - 對報告內容進行深入提問

---

## 💻 前端集成

前端應用已為您準備好以下功能：

### 「聚合多個 AI 協作生成 PPT」按鈕

在生成提示詞後，點擊此按鈕會：
1. 並行調用所有已配置的 AI API
2. 收集各個模型的回應
3. 生成專業 PowerPoint 檔案
4. 自動下載到您的設備

### 新增功能（如需要）

可以添加額外的按鈕來生成：
- Markdown 報告（用於 NotebookLM）
- HTML 報告（用於分享）
- JSON 資料（用於進一步處理）

---

## 📋 完整工作流範例

### 場景：分析電信行業 5G 技術趨勢

**前端操作：**
1. 選擇領域：「移動網路」
2. 輸入提示詞或點擊快速範例
3. 點擊「產生提示詞」
4. 點擊「聚合多個 AI 協作生成 PPT」

**後端處理：**
1. 同時調用 5 個 AI 模型
2. 收集各個回應
3. 生成 PPT、Markdown、HTML

**最終輸出：**
1. PPT 檔案（立即下載）
2. Markdown 報告（可上傳到 NotebookLM）
3. HTML 報告（可在瀏覽器查看）

---

## 🔐 安全最佳實踐

1. **從不在代碼中硬編碼 API 金鑰**
   - 使用 `.env.local` 檔案（已 .gitignore）
   - 使用環境變數
   - 在 CI/CD 中使用 GitHub Secrets

2. **限制 API 金鑰權限**
   - 為每個金鑰設定只讀權限
   - 定期輪換金鑰
   - 監控使用情況

3. **保護敏感資訊**
   - 不要在客戶端暴露 API 金鑰
   - 伺服器端驗證請求
   - 使用 CORS 限制

---

## 🆘 故障排除

### 問題：「無可用的 API 金鑰」

**解決方案：**
設定至少一個 API 金鑰環境變數

```bash
# 檢查當前設定
curl http://localhost:3001/api/models

# 檢查是否在環境變數中設定
echo $env:OPENAI_API_KEY  # 應顯示 API 金鑰或為空
```

### 問題：Copilot 無法連接

**解決方案：**
確保設定了 Azure OpenAI 的端點和金鑰

```bash
$env:AZURE_OPENAI_KEY = "您的金鑰"
$env:AZURE_OPENAI_ENDPOINT = "https://您的資源名稱.openai.azure.com/"
```

### 問題：報告生成超時

**解決方案：**
- 減少提示詞長度
- 檢查 API 配額限制
- 升級 API 計劃

---

## 📞 還有問題嗎？

1. 查看伺服器日誌：`npm run start:server`
2. 檢查瀏覽器控制台：F12 → Console
3. 驗證 API 金鑰有效性
4. 檢查網路連接

---

**系統版本：** 1.2.0  
**最後更新：** 2026 年 2 月  
**功能完成度：** 100% ✅
