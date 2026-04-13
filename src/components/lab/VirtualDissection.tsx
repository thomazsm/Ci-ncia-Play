import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Eye, Bone, Heart, Activity } from 'lucide-react';

const LAYERS = [
  { id: 'skin', name: 'Pele (Tegumento)', icon: <Eye size={20} />, color: 'bg-emerald-500' },
  { id: 'muscle', name: 'Sistema Muscular', icon: <Activity size={20} />, color: 'bg-red-500' },
  { id: 'organs', name: 'Órgãos Internos', icon: <Heart size={20} />, color: 'bg-pink-500' },
  { id: 'skeleton', name: 'Esqueleto', icon: <Bone size={20} />, color: 'bg-slate-200' },
];

export function VirtualDissection() {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Dissecação Virtual (Anfíbio)</h2>
      <p className="mb-8 opacity-80 font-medium text-center max-w-2xl">
        Use o bisturi virtual para remover as camadas e explorar a anatomia interna.
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center justify-center">
        
        {/* Dissection Area */}
        <div className="relative w-64 h-96 bg-slate-800 rounded-3xl border-4 border-slate-700 flex items-center justify-center overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            {activeLayer === 0 && (
              <motion.div key="skin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-8 bg-emerald-600 rounded-[40%] flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Skin Texture */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.4) 1px, transparent 0)', backgroundSize: '8px 8px' }} />
                <div className="w-12 h-12 bg-emerald-800 rounded-full absolute top-8 left-8 shadow-inner" />
                <div className="w-12 h-12 bg-emerald-800 rounded-full absolute top-8 right-8 shadow-inner" />
              </motion.div>
            )}
            {activeLayer === 1 && (
              <motion.div key="muscle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-10 bg-red-700 rounded-[35%] flex flex-col gap-1 p-4 justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] overflow-hidden">
                {/* Muscle Fibers */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-full h-3 bg-red-900/60 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.2) 50%)', backgroundSize: '4px 100%' }} />
                  </div>
                ))}
              </motion.div>
            )}
            {activeLayer === 2 && (
              <motion.div key="organs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-12 flex flex-col items-center justify-center gap-3">
                <div className="flex gap-2 relative z-10">
                  {/* Lungs */}
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} className="w-12 h-20 bg-pink-600 rounded-[40%] shadow-inner border border-pink-800" />
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.2 }} className="w-12 h-20 bg-pink-600 rounded-[40%] shadow-inner border border-pink-800" />
                </div>
                {/* Heart */}
                <motion.div animate={{ scale: [1, 1.2, 1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-14 h-14 bg-red-600 rounded-full absolute top-16 z-20 shadow-[0_0_15px_rgba(220,38,38,0.6)] border-2 border-red-800" />
                {/* Liver */}
                <div className="w-20 h-14 bg-amber-700 rounded-[40%_60%_70%_30%] relative z-10 shadow-inner border border-amber-900" />
                {/* Intestines */}
                <div className="w-16 h-24 bg-purple-600 rounded-[30%] opacity-90 relative z-0 shadow-inner border border-purple-800 overflow-hidden flex flex-wrap gap-1 p-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-full h-3 bg-purple-800/50 rounded-full" />
                  ))}
                </div>
              </motion.div>
            )}
            {activeLayer === 3 && (
              <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-12 flex flex-col items-center justify-center gap-2">
                <div className="w-14 h-12 bg-slate-200 rounded-[40%_40%_50%_50%] shadow-inner border border-slate-400 relative">
                  {/* Eye sockets */}
                  <div className="absolute top-4 left-2 w-3 h-3 bg-slate-800 rounded-full" />
                  <div className="absolute top-4 right-2 w-3 h-3 bg-slate-800 rounded-full" />
                </div>
                <div className="w-4 h-36 bg-slate-200 rounded-full relative shadow-inner border border-slate-400">
                  {/* Ribs */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="absolute w-20 h-2 bg-slate-200 rounded-full left-1/2 -translate-x-1/2 shadow-sm border border-slate-400" style={{ top: 10 + i * 12 }} />
                  ))}
                </div>
                <div className="flex gap-10">
                  <div className="w-3 h-28 bg-slate-200 rounded-full rotate-[15deg] shadow-inner border border-slate-400" />
                  <div className="w-3 h-28 bg-slate-200 rounded-full -rotate-[15deg] shadow-inner border border-slate-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          {LAYERS.map((layer, idx) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(idx)}
              className={`p-4 rounded-xl font-bold flex items-center gap-4 transition-all ${
                activeLayer === idx 
                  ? `${layer.color} text-slate-900 scale-105 shadow-lg` 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {activeLayer === idx ? <Scissors size={24} /> : layer.icon}
              {layer.name}
            </button>
          ))}
          
          <div className="mt-4 bg-black/40 p-4 rounded-xl border border-white/10 text-sm text-slate-300">
            <strong>Dica:</strong> A dissecação virtual permite estudar a anatomia sem a necessidade de sacrificar animais reais, sendo uma alternativa ética e sustentável.
          </div>
        </div>

      </div>
    </div>
  );
}
