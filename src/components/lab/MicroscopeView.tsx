import { useState } from 'react';
import { motion } from 'framer-motion';

export function MicroscopeView() {
  const [specimen, setSpecimen] = useState('bacteria');

  const specimens = {
    bacteria: { name: 'Bactérias (Bacilos)', color: 'bg-emerald-500', shape: 'rounded-full w-12 h-4' },
    virus: { name: 'Vírus (Bacteriófago)', color: 'bg-purple-500', shape: 'clip-path-polygon w-8 h-8' },
    fungi: { name: 'Fungos (Leveduras)', color: 'bg-amber-500', shape: 'rounded-full w-10 h-10' }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-8">Microscópio Virtual</h2>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.entries(specimens).map(([key, data]) => (
          <button 
            key={key}
            onClick={() => setSpecimen(key)}
            className={`px-6 py-2 rounded-full font-bold transition-colors ${specimen === key ? 'bg-primary text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            {data.name}
          </button>
        ))}
      </div>

      <div className="relative w-80 h-80 rounded-full border-8 border-slate-700 bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
        {/* Lens glare */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-10 pointer-events-none" />
        
        {/* Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`${specimen}-${i}`}
            className={`absolute ${specimens[specimen as keyof typeof specimens].color} ${specimens[specimen as keyof typeof specimens].shape} opacity-80`}
            initial={{ 
              x: Math.random() * 300 - 150, 
              y: Math.random() * 300 - 150,
              rotate: Math.random() * 360
            }}
            animate={{ 
              x: Math.random() * 300 - 150, 
              y: Math.random() * 300 - 150,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              repeatType: 'reverse',
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </div>
  );
}
