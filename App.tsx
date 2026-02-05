
import React, { useState, useEffect } from 'react';
import { DOMAINS, AI_TOOLS } from './constants';
import { Domain } from './types';
import DomainCard from './components/DomainCard';
import OutputDisplay from './components/OutputDisplay';
import ThinkingDisplay from './components/ThinkingDisplay';
import { generateTelecomPrompt } from './services/geminiService';
import { Sparkles, Terminal, Cpu, Hammer, Users, AlertTriangle, ExternalLink, CheckCircle2, ArrowRight, Keyboard, X, Info, Settings, Key, Save, Presentation, FileText, Copy, BookOpen, BrainCircuit } from 'lucide-react';

// New Modal Component for NotebookLM specific workflow
const NotebookInstructionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  const [copied, setCopied] = useState(false);

  // 這是給 NotebookLM 用的專屬 Prompt，用來將貼上的資料轉為簡報
  const notebookPrompt = `請根據我提供的來源資料，進行完整的技術彙整分析，並產出一份專業的「簡報大綱 (Presentation Slides)」。

請依照以下格式輸出每一張投影片 (Slide) 的內容：
1. 【Slide 標題】：簡潔有力的標題
2. 【內容重點】：3-5 點關鍵技術摘要 (Bullet Points)
3. 【演講者備忘稿 (Speaker Notes)】：詳細的解說內容與數據佐證
4. 【結論與建議】：針對該議題的專業建議

請確保內容涵蓋技術深度、問題分析與解決方案。`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(notebookPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 border border-slate-100 transform transition-all scale-100 ring-1 ring-slate-900/5">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Presentation className="w-7 h-7 text-lime-600" />
            NotebookLM 簡報分析助手
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-lime-50 rounded-xl p-5 border border-lime-100 text-slate-700 space-y-3 text-sm leading-relaxed">
            <p className="font-semibold text-lime-800 flex items-center gap-2">
              <Info className="w-4 h-4" />
              如何製作自動化簡報報告？
            </p>
            <p>由於瀏覽器限制，無法直接跨網頁操作。請依照以下最佳實踐流程：</p>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center border border-slate-200">1</div>
              <div>
                <h4 className="font-bold text-slate-800">取得 AI 回答</h4>
                <p className="text-sm text-slate-500 mt-1">先使用 Gemini 或 ChatGPT (透過本工具產生的提示詞) 取得詳盡的技術回答，並複製其內容。</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center border border-slate-200">2</div>
              <div>
                <h4 className="font-bold text-slate-800">貼上至 NotebookLM</h4>
                <p className="text-sm text-slate-500 mt-1">開啟 NotebookLM，建立新筆記本，將剛剛複製的回答貼上為「來源 (Source)」。</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center border border-slate-200">3</div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">執行簡報分析</h4>
                <p className="text-sm text-slate-500 mt-1 mb-2">複製下方指令，貼入 NotebookLM 對話框，即可生成簡報格式報告。</p>

                <div className="bg-slate-800 rounded-lg p-3 relative group">
                  <div className="text-xs text-slate-300 font-mono line-clamp-2 pr-8">
                    {notebookPrompt}
                  </div>
                  <button
                    onClick={handleCopyPrompt}
                    className="absolute top-2 right-2 p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="複製簡報指令"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-medium text-base transition-colors"
          >
            稍後再試
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-5 py-3 bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white rounded-xl font-bold text-base shadow-lg shadow-lime-500/30 transition-all transform active:scale-95 flex justify-center items-center gap-2"
          >
            前往 NotebookLM <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// New Modal Component for manual paste instructions
const RedirectModal: React.FC<{
  tool: typeof AI_TOOLS[0];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ tool, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-slate-100 transform transition-all scale-100 ring-1 ring-slate-900/5">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            🚀 準備前往 {tool.name}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <p className="text-slate-600 text-base leading-relaxed">
            由於瀏覽器安全限制，我們無法直接將內容貼入 {tool.name}。請依照以下簡單步驟：
          </p>

          <div className="bg-slate-50 rounded-xl p-6 space-y-5 border border-slate-200/60 shadow-inner">
            <div className="flex items-center gap-4 text-slate-700">
              <div className="bg-green-100 text-green-700 p-2.5 rounded-full shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="font-semibold text-lg">1. 提示詞已自動複製 ✅</span>
            </div>

            <div className="flex items-center gap-4 text-slate-700 opacity-60">
              <div className="bg-white border border-slate-200 p-2.5 rounded-full shadow-sm">
                <ArrowRight className="w-6 h-6" />
              </div>
              <span className="text-lg">2. 點擊按鈕開啟網站</span>
            </div>

            <div className="flex items-center gap-4 text-slate-800 font-bold">
              <div className="bg-blue-100 text-blue-700 p-2.5 rounded-full shadow-sm">
                <Keyboard className="w-6 h-6" />
              </div>
              <span className="text-lg">3. 在對話框按下 <kbd className="bg-white border-b-2 border-slate-200 px-2 py-0.5 rounded text-sm mx-1 font-mono text-slate-600">Ctrl</kbd> + <kbd className="bg-white border-b-2 border-slate-200 px-2 py-0.5 rounded text-sm mx-1 font-mono text-slate-600">V</kbd> 貼上</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-medium text-base transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 flex justify-center items-center gap-2"
          >
            前往 {tool.name} <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// API Key Settings Modal
const SettingsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  onSave: () => void;
}> = ({ isOpen, onClose, apiKey, setApiKey, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-500" />
            設定 API Key
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-700 border border-blue-100 flex items-start gap-3">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              請輸入您的 Google Gemini API Key。金鑰將僅儲存在您的瀏覽器中 (LocalStorage)，不會上傳至伺服器。
              <br />
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline font-semibold hover:text-blue-800 mt-1 inline-block">
                取得免費 API Key &rarr;
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">API Key</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-mono text-sm"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            儲存設定
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain>(Domain.MOBILE);
  const [userInput, setUserInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [thinkingProcess, setThinkingProcess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Thinking Mode State
  const [thinkingMode, setThinkingMode] = useState(false);

  // Load API Key from LocalStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    setIsSettingsOpen(false);
    setToastMessage("設定已儲存");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State for Redirect Modal
  const [modalTool, setModalTool] = useState<typeof AI_TOOLS[0] | null>(null);
  // State for NotebookLM Modal
  const [isNotebookModalOpen, setIsNotebookModalOpen] = useState(false);

  const currentDomainConfig = DOMAINS.find(d => d.id === selectedDomain);

  const handleGenerate = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedContent(''); // Clear previous content while loading
    setThinkingProcess(null); // Clear previous thinking process

    try {
      const result = await generateTelecomPrompt(selectedDomain, userInput, apiKey, thinkingMode);
      setGeneratedContent(result.prompt);
      if (result.thinking) {
        setThinkingProcess(result.thinking);
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "發生未知錯誤，請稍後再試。");
      // If error is about API Key, open settings
      if (e.message?.includes("API Key")) {
        setIsSettingsOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 聚合多個 AI 模型的回應並生成 PPT
  const handleAggregateAndPPT = async () => {
    if (!generatedContent.trim()) {
      setToastMessage("請先生成提示詞");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const serverUrl = process.env.NODE_ENV === 'production' 
        ? 'https://telecom-agent.herokuapp.com' // 實際部署 URL
        : 'http://localhost:3001';

      const response = await fetch(`${serverUrl}/api/aggregate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: generatedContent }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to aggregate');
      }

      const data = await response.json();
      if (!data.pptx) {
        throw new Error('No PPTX data returned');
      }

      // 轉換 base64 並下載
      const binaryString = atob(data.pptx);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.fileName || `ai-aggregation-${new Date().getTime()}.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setToastMessage("PPT 已生成並下載");
    } catch (e: any) {
      console.error('Aggregate error:', e);
      setError(e.message || "聚合失敗，請確保伺服器正在運行且 API Keys 已設定");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setUserInput(example);
  };

  const handleToolClick = (tool: typeof AI_TOOLS[0]) => {
    navigator.clipboard.writeText(generatedContent);

    if (tool.name === 'NotebookLM') {
      setIsNotebookModalOpen(true);
    } else if (tool.autoFill && (tool as any).queryParam) {
      setToastMessage(`已複製！正在前往 ${tool.name}...`);
      setTimeout(() => setToastMessage(null), 3000);

      const paramName = (tool as any).queryParam;
      const finalUrl = `${tool.url}?${paramName}=${encodeURIComponent(generatedContent)}`;
      window.open(finalUrl, '_blank');
    } else {
      setModalTool(tool);
    }
  };

  const confirmToolRedirect = () => {
    if (modalTool) {
      window.open(modalTool.url, '_blank');
      setModalTool(null);
      setToastMessage("已開啟視窗，請按下 Ctrl+V 貼上");
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const confirmNotebookRedirect = () => {
    const notebookTool = AI_TOOLS.find(t => t.name === 'NotebookLM');
    if (notebookTool) {
      window.open(notebookTool.url, '_blank');
      setIsNotebookModalOpen(false);
    }
  };

  useEffect(() => {
    // Optional: Reset generated content when domain changes
  }, [selectedDomain]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative selection:bg-blue-200">

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl opacity-40"></div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] bg-slate-800/90 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in-down border border-slate-700/50">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          <span className="font-medium text-base tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <RedirectModal
        tool={modalTool!}
        isOpen={!!modalTool}
        onClose={() => setModalTool(null)}
        onConfirm={confirmToolRedirect}
      />

      <NotebookInstructionModal
        isOpen={isNotebookModalOpen}
        onClose={() => setIsNotebookModalOpen(false)}
        onConfirm={confirmNotebookRedirect}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onSave={handleSaveSettings}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl text-white shadow-lg shadow-blue-600/20">
              <Cpu className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
                AI 驅動的電信技術提示生成系統
              </h1>
              <p className="text-sm text-slate-500 font-semibold tracking-wide uppercase opacity-80">
                Telecom Technical Prompt Generator
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors border border-transparent hover:border-slate-200"
              title="設定 API Key"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">

        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
            將需求轉化為 <span className="text-blue-600">專業 Prompt</span>
          </h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-xl leading-relaxed">
            專為電信技術單位設計，結合行動網、固定網與資安開發領域的專家級提示詞生成工具。
          </p>
        </div>

        {/* Domain Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {DOMAINS.map((config) => (
            <DomainCard
              key={config.id}
              config={config}
              isSelected={selectedDomain === config.id}
              onClick={() => setSelectedDomain(config.id)}
            />
          ))}
        </div>

        {/* Main Interface */}
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left Column: Input & Examples */}
          <div className="lg:col-span-7 space-y-8">
            {/* Thinking Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-5 h-5 text-purple-600" />
                <div>
                  <h4 className="font-bold text-slate-800">自主思考模式</h4>
                  <p className="text-xs text-slate-500">顯示 AI 的推理過程與品質驗證 (Token 使用量 +30-50%)</p>
                </div>
              </div>
              <button
                onClick={() => setThinkingMode(!thinkingMode)}
                className={`relative w-14 h-7 rounded-full transition-colors ${thinkingMode ? 'bg-purple-600' : 'bg-slate-300'}`}
                title={thinkingMode ? '關閉思考模式' : '開啟思考模式'}
              >
                <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${thinkingMode ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 ring-1 ring-slate-100 overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-100 flex items-center px-6 py-4">
                <Terminal className="w-5 h-5 text-slate-400 mr-2" />
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Input Request</span>
              </div>

              <div className="p-6">
                <label className="block text-base font-semibold text-slate-700 mb-4 ml-1">
                  請描述您的任務或問題
                </label>
                <div className="relative group">
                  <textarea
                    className="w-full h-48 px-6 py-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none text-slate-700 placeholder-slate-400 text-lg leading-relaxed"
                    placeholder={`例如：${currentDomainConfig?.examples.design[0]}...`}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <div className="absolute bottom-5 right-5">
                    <button
                      onClick={handleGenerate}
                      disabled={isLoading || !userInput.trim()}
                      className={`
                        flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all shadow-lg text-lg
                        ${isLoading || !userInput.trim()
                          ? 'bg-slate-300 cursor-not-allowed shadow-none'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 active:scale-95'}
                      `}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>生成中...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>產生提示詞</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Categorized Examples */}
            <div className="bg-white/60 rounded-2xl p-8 border border-slate-200/60 backdrop-blur-sm">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Info className="w-5 h-5" />
                快速範例 (點擊代入)
              </h4>

              <div className="space-y-8">

                {/* 設計與建置 */}
                <div className="group">
                  <div className="flex items-center gap-2 mb-4 text-base font-bold text-emerald-800">
                    <span className="p-2 bg-emerald-100 rounded-md"><Hammer className="w-4 h-4 text-emerald-600" /></span>
                    設計與建置
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {currentDomainConfig?.examples.design.map((ex, idx) => (
                      <button
                        key={`design-${idx}`}
                        onClick={() => handleExampleClick(ex)}
                        className="px-4 py-2 text-sm font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100 hover:border-emerald-200 rounded-full transition-colors truncate max-w-full"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-200"></div>

                {/* 客訴處理 */}
                <div className="group">
                  <div className="flex items-center gap-2 mb-4 text-base font-bold text-orange-800">
                    <span className="p-2 bg-orange-100 rounded-md"><Users className="w-4 h-4 text-orange-600" /></span>
                    客訴處理
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {currentDomainConfig?.examples.complaint.map((ex, idx) => (
                      <button
                        key={`complaint-${idx}`}
                        onClick={() => handleExampleClick(ex)}
                        className="px-4 py-2 text-sm font-medium bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-100 hover:border-orange-200 rounded-full transition-colors truncate max-w-full"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-200"></div>

                {/* 障礙查修 */}
                <div className="group">
                  <div className="flex items-center gap-2 mb-4 text-base font-bold text-rose-800">
                    <span className="p-2 bg-rose-100 rounded-md"><AlertTriangle className="w-4 h-4 text-rose-600" /></span>
                    障礙查修
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {currentDomainConfig?.examples.troubleshoot.map((ex, idx) => (
                      <button
                        key={`troubleshoot-${idx}`}
                        onClick={() => handleExampleClick(ex)}
                        className="px-4 py-2 text-sm font-medium bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-100 hover:border-rose-200 rounded-full transition-colors truncate max-w-full"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {/* Error Message */}
            {error && (
              <div className="p-5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-sm text-base flex flex-col gap-3 animate-fade-in">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{error}</span>
                </div>
              </div>
            )}

            {/* Thinking Process Display */}
            {thinkingProcess && <ThinkingDisplay content={thinkingProcess} />}

            <OutputDisplay
              content={generatedContent}
              onRegenerate={handleGenerate}
              isGenerating={isLoading}
            />

            {/* PPT Generation Button */}
            {generatedContent && (
              <button
                onClick={handleAggregateAndPPT}
                disabled={isLoading}
                className="w-full py-3 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 animate-fade-in shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>生成PPT中...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    <span>聚合多個AI協作生成PPT</span>
                  </>
                )}
              </button>
            )}

            {/* AI Tools Links - Compact Version */}
            {generatedContent && (
              <div className="animate-fade-in bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                {/* Section Header & Usage Hint */}
                <div className="mb-4">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-1.5 bg-indigo-50 rounded-md text-indigo-600">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                      立即傳送至 AI 工具
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 pl-8 leading-relaxed">
                    點擊按鈕即自動複製。標示 <span className="text-amber-600 font-medium"><Sparkles className="w-3 h-3 inline" /> 自動</span> 者可直接帶入，其餘請在開啟視窗後按 <kbd className="font-mono bg-slate-100 px-1.5 border border-slate-200 rounded text-[10px]">Ctrl+V</kbd> 貼上。
                  </p>
                </div>

                {/* Compact 3-Column Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {AI_TOOLS.map((tool) => (
                    <button
                      key={tool.name}
                      onClick={() => handleToolClick(tool)}
                      className={`
                          relative flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl border border-slate-100
                          transition-all duration-200 group hover:shadow-md
                          ${tool.color} hover:border-transparent
                        `}
                    >
                      <span className="font-bold text-sm text-slate-700 group-hover:text-current">{tool.name}</span>
                      {tool.autoFill ? (
                        <div className="flex items-center gap-1 text-[11px] font-medium text-amber-600 bg-amber-50/50 px-2 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" /> 自動
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 group-hover:text-current opacity-70">
                          {tool.name === 'NotebookLM' ? '分析報告' : '需貼上'}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
};

export default App;
