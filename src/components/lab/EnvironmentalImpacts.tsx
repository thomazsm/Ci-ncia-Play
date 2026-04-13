import { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, Trash2, Droplets, AlertTriangle } from 'lucide-react';

export function EnvironmentalImpacts() {
  const [pollution, setPollution] = useState(0); // 0 to 100

  const isCritical = pollution > 70;

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-100 dark:bg-slate-900 rounded-2xl">
      <h2 className="text-3xl font-bold mb-2 text-foreground">Impactos Socioambientais</h2>
      <p className="text-muted-foreground mb-8 font-medium">Aumente a atividade industrial sem regulamentação para ver os impactos.</p>

      <div className="relative w-full max-w-3xl h-80 bg-blue-100 dark:bg-blue-900/20 rounded-3xl overflow-hidden border-4 border-border flex flex-col justify-end">
        
        {/* Sky / Air Pollution */}
        <div 
          className="absolute inset-0 transition-colors duration-1000"
          style={{ backgroundColor: `rgba(100, 116, 139, ${pollution / 100})` }}
        />

        {/* Factory */}
        <div className="absolute bottom-12 left-12 z-20">
          <Factory className="w-24 h-24 text-slate-700 dark:text-slate-400" />
          {/* Smoke */}
          <motion.div 
            className="absolute -top-12 left-8 w-8 h-8 bg-slate-500 rounded-full blur-md"
            animate={{ y: [-10, -50], opacity: [0.8, 0], scale: [1, 3] }}
            transition={{ duration: 2 - (pollution/100), repeat: Infinity }}
          />
        </div>

        {/* River / Water Pollution */}
        <div className="w-full h-12 relative z-10 transition-colors duration-1000" style={{ backgroundColor: pollution > 50 ? '#475569' : '#3b82f6' }}>
          {pollution > 50 && (
             <div className="absolute inset-0 flex items-center justify-around opacity-50">
               <Trash2 className="text-slate-300 w-6 h-6" />
               <Trash2 className="text-slate-300 w-6 h-6" />
             </div>
          )}
        </div>

        {/* Warning Overlay */}
        {isCritical && (
          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center backdrop-blur-[1px] z-30">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-2xl text-red-500 font-bold text-xl border border-red-500">
              <AlertTriangle size={32} />
              Desastre Ambiental Iminente!
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-xl mt-12 space-y-6">
        <div className="flex justify-between items-center font-bold">
          <span className="text-foreground">Nível de Poluição e Degradação</span>
          <span className={isCritical ? 'text-red-500' : 'text-emerald-500'}>{pollution}%</span>
        </div>
        <input 
          type="range" 
          min="0" max="100" 
          value={pollution} 
          onChange={(e) => setPollution(Number(e.target.value))}
          className="w-full h-4 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none outline-none accent-red-500 cursor-pointer"
        />
        <div className="grid grid-cols-3 gap-4 text-center text-sm font-medium text-muted-foreground">
          <div className={`p-2 rounded-lg ${pollution > 30 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : ''}`}>Poluição do Ar</div>
          <div className={`p-2 rounded-lg ${pollution > 50 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : ''}`}>Contaminação da Água</div>
          <div className={`p-2 rounded-lg ${pollution > 70 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : ''}`}>Perda de Biodiversidade</div>
        </div>
      </div>
    </div>
  );
}
