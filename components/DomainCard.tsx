import React from 'react';
import { DomainConfig } from '../types';
import { Radio, Signal, Router, Code, BrainCircuit, Shield, Bot, CheckCircle2, Server } from 'lucide-react';

interface DomainCardProps {
  config: DomainConfig;
  isSelected: boolean;
  onClick: () => void;
}

const DomainCard: React.FC<DomainCardProps> = ({ config, isSelected, onClick }) => {
  const Icon = () => {
    switch (config.icon) {
      case 'Signal': return <Signal className="w-7 h-7" />;
      case 'Router': return <Router className="w-7 h-7" />;
      case 'Server': return <Server className="w-7 h-7" />; // 新增 Server Icon
      case 'Code': return <Code className="w-7 h-7" />;
      case 'BrainCircuit': return <BrainCircuit className="w-7 h-7" />;
      case 'Shield': return <Shield className="w-7 h-7" />;
      case 'Bot': return <Bot className="w-7 h-7" />;
      default: return <Radio className="w-7 h-7" />;
    }
  };

  // Helper to get color classes based on the config.color string (e.g. "bg-blue-600")
  const getColorClasses = () => {
    // Basic mapping based on the tailwind classes used in constants
    if (config.color.includes('blue')) return 'text-blue-600 bg-blue-100 ring-blue-500';
    if (config.color.includes('emerald')) return 'text-emerald-600 bg-emerald-100 ring-emerald-500';
    if (config.color.includes('orange')) return 'text-orange-600 bg-orange-100 ring-orange-500'; // 新增 Orange 支援
    if (config.color.includes('indigo')) return 'text-indigo-600 bg-indigo-100 ring-indigo-500';
    if (config.color.includes('purple')) return 'text-purple-600 bg-purple-100 ring-purple-500';
    if (config.color.includes('red')) return 'text-red-600 bg-red-100 ring-red-500';
    if (config.color.includes('teal')) return 'text-teal-600 bg-teal-100 ring-teal-500';
    return 'text-slate-600 bg-slate-100 ring-slate-400';
  };

  const colorClass = getColorClasses();

  return (
    <button
      onClick={onClick}
      className={`
        relative group flex flex-col p-6 rounded-2xl border transition-all duration-300 w-full text-left overflow-hidden
        ${isSelected 
          ? `bg-white border-transparent shadow-xl shadow-slate-200/50 ring-2 ${colorClass.split(' ')[2]}` 
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg hover:scale-[1.02]'}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3.5 rounded-xl transition-colors duration-300 ${isSelected ? colorClass.split(' ')[1] + ' ' + colorClass.split(' ')[0] : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'}`}>
          <Icon />
        </div>
        {isSelected && (
          <CheckCircle2 className={`w-6 h-6 ${colorClass.split(' ')[0]} animate-fade-in`} />
        )}
      </div>
      
      <h3 className={`font-bold text-xl mb-2 transition-colors ${isSelected ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-800'}`}>
        {config.label}
      </h3>
      
      <p className="text-base text-slate-500 leading-relaxed opacity-90">
        {config.description}
      </p>

      {/* Decorative gradient background for selected state */}
      {isSelected && (
        <div className={`absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-current to-transparent opacity-5 -mb-8 -mr-8 rounded-full pointer-events-none ${colorClass.split(' ')[0]}`}></div>
      )}
    </button>
  );
};

export default DomainCard;