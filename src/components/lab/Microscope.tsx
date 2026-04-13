import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Droplet, Leaf, CircleDot, Focus } from 'lucide-react';

const SLIDES = [
  { id: 'blood', name: 'Sangue Humano', icon: <Droplet size={16} className="text-red-500"/> },
  { id: 'onion', name: 'Casca de Cebola', icon: <CircleDot size={16} className="text-amber-500"/> },
  { id: 'leaf', name: 'Folha de Planta', icon: <Leaf size={16} className="text-emerald-500"/> },
  { id: 'water', name: 'Água de Poça', icon: <Search size={16} className="text-blue-500"/> }
];

export function Microscope() {
  const [slide, setSlide] = useState(SLIDES[0].id);
  const [zoom, setZoom] = useState(10); // 10, 40, 100
  const [focus, setFocus] = useState(50); // 0 to 100, perfect focus at 50

  const blurAmount = Math.abs(focus - 50) / 10; // 0 to 5px blur

  const renderView = () => {
    const scale = zoom / 10;
    
    if (slide === 'blood') {
      return (
        <div className="relative w-full h-full bg-red-950/40" style={{ transform: `scale(${scale})` }}>
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute bg-red-600/90 rounded-full border border-red-800 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.5),_inset_2px_2px_6px_rgba(255,255,255,0.4)]"
              style={{
                width: 24, height: 24,
                left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%`,
              }}
              animate={{ x: [0, Math.random() * 15 - 7.5, 0], y: [0, Math.random() * 15 - 7.5, 0] }}
              transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-1 bg-red-500/50 rounded-full blur-[1px]" />
            </motion.div>
          ))}
          {/* White blood cells */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div 
              key={`w-${i}`}
              className="absolute bg-purple-100/90 rounded-full border border-purple-300 shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.3),_0_0_10px_rgba(255,255,255,0.5)] backdrop-blur-sm"
              style={{
                width: 35, height: 35,
                left: `${20 + (i * 25)}%`, top: `${30 + (i * 15)}%`,
              }}
              animate={{ scale: [1, 1.05, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-2 bg-purple-600/60 rounded-full blur-[2px]" />
              <div className="absolute top-1 left-2 w-3 h-3 bg-purple-500/40 rounded-full blur-[1px]" />
            </motion.div>
          ))}
        </div>
      );
    }

    if (slide === 'onion') {
      return (
        <div className="relative w-full h-full bg-amber-100/30 flex flex-wrap" style={{ transform: `scale(${scale})` }}>
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="w-16 h-8 border border-amber-800/40 bg-amber-500/10 relative shadow-[inset_0_0_5px_rgba(0,0,0,0.1)]">
              <div className="absolute w-2 h-2 bg-amber-900/70 rounded-full top-2 left-2 blur-[0.5px]" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            </div>
          ))}
        </div>
      );
    }

    if (slide === 'leaf') {
      return (
        <div className="relative w-full h-full bg-emerald-950/60 flex flex-wrap" style={{ transform: `scale(${scale})` }}>
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="w-12 h-12 border border-emerald-800/60 bg-emerald-600/40 relative flex items-center justify-center shadow-[inset_0_0_8px_rgba(0,0,0,0.3)]">
              {/* Chloroplasts */}
              <div className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full top-1 left-1 shadow-[0_0_3px_rgba(52,211,153,0.8)]" />
              <div className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full bottom-2 right-2 shadow-[0_0_3px_rgba(52,211,153,0.8)]" />
              <div className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full top-2 right-1 shadow-[0_0_3px_rgba(52,211,153,0.8)]" />
              <div className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full bottom-1 left-2 shadow-[0_0_3px_rgba(52,211,153,0.8)]" />
              
              {/* Stomata (only some cells) */}
              {i % 7 === 0 && (
                <div className="w-5 h-7 border-2 border-emerald-300/80 rounded-full flex items-center justify-center shadow-inner bg-emerald-800/30">
                  <div className="w-1.5 h-5 bg-emerald-950 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (slide === 'water') {
      return (
        <div className="relative w-full h-full bg-blue-950/40" style={{ transform: `scale(${scale})` }}>
          {/* Paramecium */}
          <motion.div 
            className="absolute w-28 h-12 bg-emerald-400/30 border border-emerald-300/60 rounded-[40%_60%_70%_30%] flex items-center justify-center backdrop-blur-sm shadow-[inset_0_0_10px_rgba(52,211,153,0.5)]"
            animate={{ x: [0, 120, 60, 0], y: [0, 60, -30, 0], rotate: [0, 45, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ left: '20%', top: '30%' }}
          >
            <div className="w-5 h-5 bg-emerald-800/70 rounded-full blur-[1px]" />
            <div className="absolute w-2 h-2 bg-emerald-600/80 rounded-full top-2 left-4 blur-[0.5px]" />
            <div className="absolute w-3 h-3 bg-emerald-600/80 rounded-full bottom-2 right-6 blur-[0.5px]" />
            {/* Cilia */}
            <div className="absolute inset-[-4px] border border-emerald-200/30 rounded-[40%_60%_70%_30%] border-dashed" />
          </motion.div>
          
          {/* Amoeba */}
          <motion.div 
            className="absolute w-24 h-24 bg-blue-400/30 border border-blue-300/50 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] backdrop-blur-sm shadow-[inset_0_0_15px_rgba(59,130,246,0.4)]"
            animate={{ 
              borderRadius: ['40% 60% 70% 30% / 40% 50% 60% 50%', '60% 40% 30% 70% / 60% 30% 70% 40%', '40% 60% 70% 30% / 40% 50% 60% 50%'],
              x: [0, -50, 0], y: [0, 30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ right: '20%', bottom: '30%' }}
          >
            <div className="absolute w-6 h-6 bg-blue-800/60 rounded-full top-6 left-6 blur-[1px]" />
            <div className="absolute w-3 h-3 bg-blue-600/50 rounded-full bottom-6 right-8 blur-[0.5px]" />
          </motion.div>

          {/* Small algae */}
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-4 h-4 bg-green-500/60 rounded-full blur-[0.5px] shadow-[0_0_5px_rgba(34,197,94,0.5)]"
              style={{ left: `${(i * 29) % 100}%`, top: `${(i * 13) % 100}%` }}
              animate={{ y: [0, Math.random() * 30 - 15, 0], x: [0, Math.random() * 20 - 10, 0] }}
              transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Microscópio Virtual</h2>
      <p className="mb-8 opacity-80 text-center max-w-2xl">
        Coloque uma lâmina, ajuste o foco e aumente a lente objetiva para explorar o micromundo.
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-center justify-center">
        
        {/* Microscope Viewport */}
        <div className="relative w-80 h-80 bg-black rounded-full border-8 border-slate-800 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Crosshair */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center opacity-20">
            <div className="w-full h-[1px] bg-white" />
            <div className="absolute h-full w-[1px] bg-white" />
          </div>
          
          {/* Lens Shadow */}
          <div className="absolute inset-0 z-10 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,1)] pointer-events-none" />

          {/* Content */}
          <div 
            className="w-full h-full transition-all duration-300"
            style={{ filter: `blur(${blurAmount}px)` }}
          >
            {renderView()}
          </div>
        </div>

        {/* Controls */}
        <div className="w-full md:w-80 space-y-6">
          
          {/* Slides */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-slate-300 mb-2 uppercase tracking-wider text-sm">Lâminas</h3>
            <div className="grid grid-cols-2 gap-2">
              {SLIDES.map(s => (
                <button 
                  key={s.id}
                  onClick={() => { setSlide(s.id); setFocus(10); /* reset focus on new slide */ }}
                  className={`p-3 rounded-xl font-bold text-xs flex flex-col items-center gap-2 transition-colors ${slide === s.id ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {s.icon}
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Lenses */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-slate-300 mb-2 uppercase tracking-wider text-sm">Lente Objetiva (Zoom)</h3>
            <div className="flex gap-2">
              {[10, 40, 100].map(z => (
                <button 
                  key={z}
                  onClick={() => setZoom(z)}
                  className={`flex-1 py-3 rounded-xl font-black text-lg transition-colors ${zoom === z ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {z}x
                </button>
              ))}
            </div>
          </div>

          {/* Focus */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-slate-300 mb-2 uppercase tracking-wider text-sm flex items-center gap-2">
              <Focus size={16} /> Ajuste de Foco (Macrométrico)
            </h3>
            <input 
              type="range" min="0" max="100" 
              value={focus} 
              onChange={e => setFocus(Number(e.target.value))} 
              className="w-full accent-emerald-500" 
            />
            <div className="text-center text-xs text-slate-500">
              {blurAmount === 0 ? <span className="text-emerald-400 font-bold">Foco Perfeito!</span> : 'Imagem desfocada...'}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
