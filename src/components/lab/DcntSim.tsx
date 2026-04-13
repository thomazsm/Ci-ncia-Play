import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle } from 'lucide-react';

export function DcntSim() {
  const [plaque, setPlaque] = useState(0); // 0 to 100 (Atherosclerosis)

  const bloodPressure = 120 + (plaque * 0.6); // Systolic
  const isDanger = plaque > 70;

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Doenças Crônicas Não Transmissíveis (DCNT)</h2>
      <p className="mb-8 opacity-80 font-medium">Aumente o sedentarismo e má alimentação para ver o acúmulo de placas de gordura (Aterosclerose).</p>

      <div className="relative w-full max-w-2xl h-48 bg-red-900/40 rounded-3xl overflow-hidden border-4 border-red-800 flex items-center justify-center">
        
        {/* Blood Vessel Wall (Top) */}
        <div className="absolute top-0 w-full h-4 bg-red-700" />
        {/* Blood Vessel Wall (Bottom) */}
        <div className="absolute bottom-0 w-full h-4 bg-red-700" />

        {/* Fat Plaques (Atherosclerosis) */}
        <motion.div 
          className="absolute top-4 w-64 bg-yellow-400 rounded-b-full"
          style={{ height: `${plaque * 0.8}px` }}
          transition={{ type: 'tween' }}
        />
        <motion.div 
          className="absolute bottom-4 w-64 bg-yellow-400 rounded-t-full"
          style={{ height: `${plaque * 0.8}px` }}
          transition={{ type: 'tween' }}
        />

        {/* Blood Cells Flowing */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-red-500 rounded-full border border-red-400 shadow-sm"
            initial={{ left: '-10%', top: `${20 + Math.random() * 60}%` }}
            animate={{ left: '110%' }}
            transition={{ 
              duration: 2 + (plaque / 100) * 3, // Slower flow when blocked
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear'
            }}
          />
        ))}

        {isDanger && (
          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center backdrop-blur-sm z-20">
            <div className="bg-black/80 p-4 rounded-xl flex items-center gap-4 text-red-500 font-bold text-xl border border-red-500">
              <AlertTriangle size={32} />
              Risco de Infarto / AVC!
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-xl mt-12 space-y-6 bg-black/30 p-6 rounded-2xl">
        <div className="flex justify-between items-center">
          <span className="font-bold flex items-center gap-2"><Activity size={20}/> Pressão Arterial:</span>
          <span className={`text-2xl font-black ${isDanger ? 'text-red-500' : 'text-emerald-500'}`}>
            {bloodPressure.toFixed(0)} / {Math.floor(bloodPressure * 0.6)} mmHg
          </span>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Sedentarismo e Má Alimentação (Gorduras/Sódio)</label>
          <input 
            type="range" 
            min="0" max="100" 
            value={plaque} 
            onChange={(e) => setPlaque(Number(e.target.value))}
            className="w-full h-4 bg-slate-700 rounded-full appearance-none outline-none cursor-pointer accent-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}
