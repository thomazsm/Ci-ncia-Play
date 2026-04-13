import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Triangle, Square, Circle } from 'lucide-react';

export function OpticsLab() {
  const [object, setObject] = useState<'mirror' | 'prism' | 'lens'>('prism');
  const [angle, setAngle] = useState(0); // -45 to 45

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Óptica e Lasers</h2>
      <p className="mb-8 opacity-80 font-medium text-center max-w-2xl">
        Experimente como a luz se comporta ao atingir diferentes objetos (Reflexão e Refração).
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center justify-center">
        
        {/* Lab Area */}
        <div className="relative w-full max-w-2xl h-80 bg-black rounded-3xl border-4 border-slate-800 overflow-hidden flex items-center shadow-[inset_0_0_50px_rgba(0,0,0,1)]">
          
          {/* Laser Source */}
          <div className="absolute left-4 z-20 flex flex-col items-center">
            <div className="w-8 h-12 bg-slate-700 rounded-md border-2 border-slate-500 flex items-center justify-end pr-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Incoming Laser Beam */}
          <motion.div 
            className="absolute left-12 h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] origin-left z-10"
            style={{ width: '50%', top: '50%', rotate: `${angle}deg` }}
          />

          {/* Target Object */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {object === 'mirror' && <div className="w-4 h-32 bg-cyan-200 border-l-4 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]" />}
            {object === 'prism' && <Triangle size={80} className="text-white/80 fill-white/20" strokeWidth={1} />}
            {object === 'lens' && <div className="w-8 h-32 bg-blue-400/30 rounded-[100%] border border-blue-400/50 backdrop-blur-sm" />}
          </div>

          {/* Outgoing Beams */}
          <div className="absolute left-1/2 top-1/2 z-10">
            {object === 'mirror' && (
              <motion.div 
                className="absolute left-0 h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] origin-left"
                style={{ width: '300px', rotate: `${180 - angle}deg` }}
              />
            )}
            
            {object === 'prism' && (
              <div className="absolute left-0 origin-left" style={{ rotate: `${angle * 0.5}deg` }}>
                <div className="absolute h-2 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] w-[300px] origin-left rotate-[-10deg]" />
                <div className="absolute h-2 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)] w-[300px] origin-left rotate-[-5deg]" />
                <div className="absolute h-2 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] w-[300px] origin-left rotate-[0deg]" />
                <div className="absolute h-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] w-[300px] origin-left rotate-[5deg]" />
                <div className="absolute h-2 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] w-[300px] origin-left rotate-[10deg]" />
              </div>
            )}

            {object === 'lens' && (
              <div className="absolute left-0 origin-left" style={{ rotate: `${angle}deg` }}>
                <div className="absolute h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] w-[150px] origin-left rotate-[20deg]" />
                <div className="absolute h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] w-[150px] origin-left rotate-[-20deg]" />
                <div className="absolute h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] w-[300px] origin-left rotate-[0deg]" />
              </div>
            )}
          </div>

        </div>

        {/* Controls */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-slate-300 mb-2">Objeto Alvo</h3>
            <div className="flex flex-col gap-2">
              <button onClick={() => setObject('mirror')} className={`p-3 rounded-xl font-bold flex items-center gap-3 ${object === 'mirror' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Square size={20} /> Espelho (Reflexão)
              </button>
              <button onClick={() => setObject('prism')} className={`p-3 rounded-xl font-bold flex items-center gap-3 ${object === 'prism' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Triangle size={20} /> Prisma (Dispersão)
              </button>
              <button onClick={() => setObject('lens')} className={`p-3 rounded-xl font-bold flex items-center gap-3 ${object === 'lens' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Circle size={20} /> Lente (Refração)
              </button>
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
            <h3 className="font-bold text-slate-300 mb-4">Ângulo do Laser</h3>
            <input 
              type="range" 
              min="-45" max="45" 
              value={angle} 
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full h-4 bg-slate-700 rounded-full appearance-none outline-none cursor-pointer accent-red-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
