import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Activity } from 'lucide-react';

export function CardiovascularSystem() {
  const [bpm, setBpm] = useState(70); // 40 to 180

  const duration = 60 / bpm; // seconds per beat

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-100 dark:bg-slate-900 rounded-2xl">
      <h2 className="text-3xl font-bold mb-2 text-foreground">Sistema Cardiovascular</h2>
      <p className="text-muted-foreground mb-8 font-medium">Ajuste os batimentos cardíacos (BPM) para ver o fluxo sanguíneo.</p>

      <div className="relative w-full max-w-2xl h-80 bg-white dark:bg-slate-800 rounded-3xl shadow-xl flex items-center justify-center border border-border overflow-hidden">
        
        {/* Lungs (Top) */}
        <div className="absolute top-4 w-32 h-16 bg-pink-200 dark:bg-pink-900/30 rounded-full border-2 border-pink-300 dark:border-pink-800 flex items-center justify-center font-bold text-pink-700 dark:text-pink-300">
          Pulmões
        </div>

        {/* Body (Bottom) */}
        <div className="absolute bottom-4 w-48 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full border-2 border-amber-200 dark:border-amber-800 flex items-center justify-center font-bold text-amber-700 dark:text-amber-300">
          Corpo (Células)
        </div>

        {/* Heart */}
        <motion.div 
          className="z-20 text-red-500 flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-full p-4"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <HeartPulse size={64} fill="currentColor" />
          <span className="font-bold text-foreground mt-2">{bpm} BPM</span>
        </motion.div>

        {/* Veins / Arteries Paths */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {/* Heart to Lungs (Deoxygenated - Blue) */}
          <path d="M 300 160 Q 200 160 200 80" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="10,10" className="opacity-50" />
          {/* Lungs to Heart (Oxygenated - Red) */}
          <path d="M 350 80 Q 350 160 350 160" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray="10,10" className="opacity-50" />
          
          {/* Heart to Body (Oxygenated - Red) */}
          <path d="M 350 160 Q 450 160 450 240" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray="10,10" className="opacity-50" />
          {/* Body to Heart (Deoxygenated - Blue) */}
          <path d="M 200 240 Q 200 160 300 160" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="10,10" className="opacity-50" />
        </svg>

        {/* Blood Cells Animating */}
        {/* Red (Oxygenated) */}
        <motion.div className="absolute w-4 h-4 bg-red-500 rounded-full z-30" animate={{ top: ['20%', '50%', '80%'], left: ['50%', '50%', '70%'] }} transition={{ duration: duration * 2, repeat: Infinity, ease: "linear" }} />
        {/* Blue (Deoxygenated) */}
        <motion.div className="absolute w-4 h-4 bg-blue-500 rounded-full z-30" animate={{ top: ['80%', '50%', '20%'], left: ['30%', '50%', '50%'] }} transition={{ duration: duration * 2, repeat: Infinity, ease: "linear" }} />

      </div>

      <div className="w-full max-w-xl mt-8 space-y-4">
        <div className="flex justify-between items-center font-bold">
          <span className="text-foreground flex items-center gap-2"><Activity size={20}/> Frequência Cardíaca</span>
          <span className={bpm > 100 ? 'text-red-500' : 'text-emerald-500'}>{bpm > 100 ? 'Taquicardia (Exercício)' : 'Repouso'}</span>
        </div>
        <input 
          type="range" 
          min="40" max="180" 
          value={bpm} 
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-full h-4 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none outline-none accent-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
