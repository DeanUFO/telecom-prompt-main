import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Sparkles, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface OutputDisplayProps {
  content: string;
  onRegenerate: () => void;
  isGenerating: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ content, onRegenerate, isGenerating }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) {
    // Empty state placeholder
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400">
        <div className="bg-slate-50 p-5 rounded-full mb-5">
          <Sparkles className="w-10 h-10 text-slate-300" />
        </div>
        <p className="font-medium text-lg text-slate-500">尚未產生內容</p>
        <p className="text-base mt-2">請在左側輸入需求並點擊「產生提示詞」</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-fade-in flex flex-col h-full">
      {/* Header */}
      <div className="bg-slate-50/80 backdrop-blur-sm px-6 py-5 border-b border-slate-200 flex justify-between items-center sticky top-0 z-10">
        <h3 className="font-bold text-lg text-slate-700 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-md">
            <Terminal className="w-5 h-5 text-green-600" />
          </div>
          <span>生成的提示詞 (Prompt)</span>
        </h3>
        <div className="flex gap-3">
          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            重試
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-lg transition-all shadow-sm
              ${copied 
                ? 'bg-green-500 text-white shadow-green-200' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? '已複製' : '複製'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-0 overflow-hidden bg-[#fafafa]">
        <div className="h-full overflow-auto p-8 custom-scrollbar">
          <div className="prose prose-xl max-w-none text-slate-800 prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-800 prose-pre:text-slate-50 prose-li:text-slate-700">
             <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
      
      {/* Footer hint */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-xs text-slate-400 text-right font-mono">
        Markdown Format • UTF-8
      </div>
    </div>
  );
};

export default OutputDisplay;