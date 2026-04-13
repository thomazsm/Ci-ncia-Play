import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface SimulationInfoCardProps {
  title: string;
  children: React.ReactNode;
}

export function SimulationInfoCard({ title, children }: SimulationInfoCardProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="bg-slate-900/80 rounded-lg backdrop-blur-md border border-slate-700 shadow-2xl overflow-hidden transition-all duration-300 w-full max-w-sm">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-800/80 transition-colors"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          <h3 className="font-bold text-white text-sm">{title}</h3>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors">
          {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
      
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isMinimized ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
        }`}
      >
        <div className="px-4 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
}
