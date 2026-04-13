import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function WaterCycle() {
  const [stage, setStage] = useState<'evaporation' | 'condensation' | 'precipitation' | 'collection'>('collection');

  useEffect(() => {
    const timer = setInterval(() => {
      setStage(current => {
        if (current === 'collection') return 'evaporation';
        if (current === 'evaporation') return 'condensation';
        if (current === 'condensation') return 'precipitation';
        return 'collection';
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-sky-100 dark:bg-slate-950 rounded-xl overflow-hidden relative p-6 shadow-2xl">
      <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-slate-900/90 p-4 rounded-xl backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-3">Ciclo da Água</h3>
        <div className="flex flex-col gap-2">
          <button onClick={() => setStage('evaporation')} className={`text-left px-4 py-2 rounded-lg font-medium transition-all ${stage === 'evaporation' ? 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'hover:bg-amber-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>1. Evaporação</button>
          <button onClick={() => setStage('condensation')} className={`text-left px-4 py-2 rounded-lg font-medium transition-all ${stage === 'condensation' ? 'bg-slate-500 text-white shadow-[0_0_15px_rgba(100,116,139,0.5)]' : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>2. Condensação</button>
          <button onClick={() => setStage('precipitation')} className={`text-left px-4 py-2 rounded-lg font-medium transition-all ${stage === 'precipitation' ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'hover:bg-indigo-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>3. Precipitação</button>
          <button onClick={() => setStage('collection')} className={`text-left px-4 py-2 rounded-lg font-medium transition-all ${stage === 'collection' ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'hover:bg-cyan-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>4. Coleta</button>
        </div>
      </div>

      <div className="flex-1 relative mt-16 border-4 border-white/50 dark:border-slate-800 rounded-3xl overflow-hidden bg-gradient-to-b from-sky-400 to-sky-100 dark:from-slate-800 dark:to-slate-900 shadow-inner">
        
        {/* Sun */}
        <motion.div 
          animate={{ 
            scale: stage === 'evaporation' ? 1.3 : 1, 
            opacity: stage === 'condensation' || stage === 'precipitation' ? 0.3 : 1,
            rotate: 360
          }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 1 } }}
          className="absolute top-10 right-10 w-28 h-28 bg-yellow-400 rounded-full shadow-[0_0_60px_rgba(250,204,21,0.8)] flex items-center justify-center"
        >
          <div className="w-full h-full rounded-full bg-yellow-300 blur-[2px]" />
        </motion.div>

        {/* Clouds */}
        <motion.div 
          animate={{ 
            x: stage === 'precipitation' ? -100 : stage === 'condensation' ? -50 : 0,
            backgroundColor: stage === 'precipitation' ? '#475569' : stage === 'condensation' ? '#94a3b8' : '#ffffff',
            scale: stage === 'condensation' || stage === 'precipitation' ? 1.2 : 1
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-20 rounded-full blur-[4px] shadow-2xl z-10"
        >
          <div className="absolute -top-10 left-8 w-28 h-28 bg-inherit rounded-full" />
          <div className="absolute -top-16 right-12 w-32 h-32 bg-inherit rounded-full" />
          <div className="absolute -top-6 right-4 w-20 h-20 bg-inherit rounded-full" />
        </motion.div>

        {/* Rain */}
        <AnimatePresence>
          {stage === 'precipitation' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-40 left-1/2 -translate-x-1/2 w-64 h-80 flex justify-around overflow-hidden z-0"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, opacity: 0, x: 0 }}
                  animate={{ y: 400, opacity: [0, 1, 1, 0], x: -50 }}
                  transition={{ duration: 0.8 + Math.random() * 0.5, repeat: Infinity, delay: Math.random() * 2, ease: "linear" }}
                  className="w-1 h-8 bg-blue-400/80 rounded-full shadow-[0_0_5px_rgba(96,165,250,0.8)]"
                  style={{ rotate: '15deg' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Evaporation lines (Fog/Steam) */}
        <AnimatePresence>
          {stage === 'evaporation' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-32 right-20 w-64 h-64 flex justify-around z-10"
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 40, x: 0, opacity: 0, scale: 1 }}
                  animate={{ y: -150, x: Math.random() * 40 - 20, opacity: [0, 0.6, 0], scale: 2 }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                  className="w-8 h-8 bg-white/40 blur-xl rounded-full"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mountain */}
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[0px] border-l-transparent border-r-[500px] border-r-transparent border-b-[350px] border-b-emerald-700 dark:border-b-emerald-900 drop-shadow-2xl z-0" />
        <div className="absolute bottom-0 left-20 w-0 h-0 border-l-[200px] border-l-transparent border-r-[400px] border-r-transparent border-b-[250px] border-b-emerald-600 dark:border-b-emerald-800 drop-shadow-xl z-0" />

        {/* Water Body */}
        <motion.div 
          animate={{ 
            height: stage === 'collection' ? '160px' : stage === 'evaporation' ? '120px' : '140px',
            backgroundColor: stage === 'collection' ? 'rgba(14, 165, 233, 0.9)' : 'rgba(56, 189, 248, 0.8)'
          }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-[65%] backdrop-blur-md rounded-tl-[100px] shadow-[inset_0_20px_30px_rgba(255,255,255,0.2)] z-10 overflow-hidden"
        >
          {/* Surface waves */}
          <motion.div 
            animate={{ x: [-100, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-[200%] h-4 bg-white/20 blur-[2px] rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
