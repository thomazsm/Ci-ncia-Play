import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet, Box } from 'lucide-react';

const LIQUIDS = {
  water: { name: 'Água', density: 1.0, color: 'bg-blue-500/50' },
  oil: { name: 'Óleo', density: 0.9, color: 'bg-yellow-500/50' },
  honey: { name: 'Mel', density: 1.4, color: 'bg-amber-700/80' }
};

const BLOCKS = {
  wood: { name: 'Madeira', density: 0.6, color: 'bg-amber-800' },
  iron: { name: 'Ferro', density: 7.8, color: 'bg-slate-400' },
  styrofoam: { name: 'Isopor', density: 0.05, color: 'bg-white' },
  gold: { name: 'Ouro', density: 19.3, color: 'bg-yellow-400' }
};

export function DensityTank() {
  const [liquid, setLiquid] = useState<keyof typeof LIQUIDS>('water');
  const [block, setBlock] = useState<keyof typeof BLOCKS>('wood');
  const [isDropped, setIsDropped] = useState(false);

  const currentLiquid = LIQUIDS[liquid];
  const currentBlock = BLOCKS[block];

  // Calculate final position based on density
  // If block density < liquid density, it floats (y = 0 or slightly submerged)
  // If block density > liquid density, it sinks (y = 200)
  const isFloating = currentBlock.density < currentLiquid.density;
  const submergedRatio = isFloating ? currentBlock.density / currentLiquid.density : 1;
  const finalY = isFloating ? (submergedRatio * 40) - 20 : 180;

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Tanque de Densidade e Empuxo</h2>
      <p className="mb-8 opacity-80">Descubra o que afunda e o que boia baseado na densidade dos materiais.</p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center justify-center">
        
        {/* Tank Area */}
        <div className="relative w-64 h-80 bg-slate-800/50 rounded-b-3xl border-4 border-t-0 border-slate-600 flex flex-col justify-end overflow-hidden">
          
          {/* Liquid */}
          <motion.div 
            className={`w-full h-64 ${currentLiquid.color} relative transition-colors duration-1000 backdrop-blur-sm`}
          >
            {/* Surface waves */}
            <svg className="absolute -top-4 left-0 w-full h-8 opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
              <motion.path 
                d="M 0 10 Q 25 20 50 10 T 100 10 L 100 20 L 0 20 Z" 
                fill="currentColor" 
                className="text-white"
                animate={{ x: [-100, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.path 
                d="M 0 10 Q 25 0 50 10 T 100 10 L 100 20 L 0 20 Z" 
                fill="currentColor" 
                className="text-white"
                animate={{ x: [0, -100] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            
            {/* Bubbles if dropped */}
            {isDropped && !isFloating && Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 180, x: 100 + (Math.random() * 40 - 20), scale: 0, opacity: 0.8 }}
                animate={{ y: 0, scale: Math.random() * 0.5 + 0.5, opacity: 0 }}
                transition={{ duration: 1 + Math.random(), delay: i * 0.2, repeat: Infinity }}
                className="absolute w-3 h-3 rounded-full bg-white/40 border border-white/60"
              />
            ))}
          </motion.div>

          {/* Block */}
          <motion.div
            className={`absolute left-1/2 -ml-8 w-16 h-16 ${currentBlock.color} rounded-lg shadow-2xl border-2 border-black/20 flex items-center justify-center font-bold text-black/50 z-10`}
            initial={{ y: -150, rotate: 0 }}
            animate={{ 
              y: isDropped ? finalY : -150,
              rotate: isDropped && isFloating ? [0, -5, 5, -2, 2, 0] : 0
            }}
            transition={{ 
              y: { type: 'spring', bounce: isFloating ? 0.6 : 0.2, duration: 2 },
              rotate: { delay: 0.5, duration: 4, repeat: isFloating ? Infinity : 0, repeatType: "mirror" }
            }}
            style={{ bottom: 64 }} // Base of the liquid
          >
            {currentBlock.density}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="w-full md:w-72 space-y-6">
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-slate-300 flex items-center gap-2"><Droplet size={20}/> Líquido do Tanque</h3>
            <div className="flex flex-col gap-2">
              {(Object.keys(LIQUIDS) as Array<keyof typeof LIQUIDS>).map(l => (
                <button 
                  key={l}
                  onClick={() => { setLiquid(l); setIsDropped(false); }}
                  className={`p-2 rounded-lg font-bold transition-colors ${liquid === l ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {LIQUIDS[l].name} ({LIQUIDS[l].density} g/cm³)
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-slate-300 flex items-center gap-2"><Box size={20}/> Bloco</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(BLOCKS) as Array<keyof typeof BLOCKS>).map(b => (
                <button 
                  key={b}
                  onClick={() => { setBlock(b); setIsDropped(false); }}
                  className={`p-2 rounded-lg font-bold text-sm transition-colors ${block === b ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {BLOCKS[b].name}
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-slate-400 mt-2">
              Densidade: {currentBlock.density} g/cm³
            </div>
          </div>

          <button 
            onClick={() => setIsDropped(!isDropped)}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            {isDropped ? 'Retirar Bloco' : 'Soltar Bloco'}
          </button>
        </div>

      </div>
    </div>
  );
}
