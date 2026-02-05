import React, { useState } from 'react';
import { BrainCircuit, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ThinkingDisplayProps {
    content: string;
}

const ThinkingDisplay: React.FC<ThinkingDisplayProps> = ({ content }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 overflow-hidden mb-6 animate-fade-in">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-100/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-purple-600 p-2 rounded-lg">
                        <BrainCircuit className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-purple-900">AI 推理過程</h3>
                        <p className="text-xs text-purple-600">查看 AI 如何分析您的需求</p>
                    </div>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-purple-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-purple-600" />
                )}
            </button>

            {/* Content */}
            {isExpanded && (
                <div className="px-6 py-4 border-t border-purple-200 bg-white/50">
                    <div className="prose prose-sm max-w-none text-slate-700 prose-headings:text-purple-900 prose-strong:text-purple-800 prose-li:text-slate-700">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThinkingDisplay;
