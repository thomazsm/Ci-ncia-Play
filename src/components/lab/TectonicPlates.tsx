import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, ArrowLeftRight, ArrowUpDown, Mountain, Flame, Waves } from 'lucide-react';

type BoundaryType = 'convergent' | 'divergent' | 'transform';

export function TectonicPlates() {
  const [boundary, setBoundary] = useState<BoundaryType>('convergent');
  const [isAnimating, setIsAnimating] = useState(false);
  const [eventTriggered, setEventTriggered] = useState(false);

  const simulate = () => {
    setIsAnimating(true);
    setEventTriggered(false);
    
    setTimeout(() => {
      setEventTriggered(true);
    }, 1500);

    setTimeout(() => {
      setIsAnimating(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Simulador de Placas Tectônicas</h2>
      <p className="mb-8 opacity-80 text-center max-w-2xl">
        Escolha o tipo de limite entre as placas e veja os fenômenos geológicos que ocorrem.
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-center justify-center">
        
        {/* Simulation Area */}
        <div className="relative w-full max-w-2xl h-80 bg-sky-900/30 rounded-3xl border-4 border-slate-700 overflow-hidden flex items-end justify-center perspective-1000">
          
          {/* Mantle / Magma */}
          <div className="absolute bottom-0 w-full h-32 bg-orange-600/40 blur-xl" />

          {/* Plates */}
          <div className="relative w-full h-48 flex justify-center items-end z-10">
            
            {/* Left Plate */}
            <motion.div 
              className="w-1/2 h-24 bg-amber-800 border-t-8 border-emerald-800 rounded-tr-lg relative"
              animate={{ 
                x: isAnimating ? (boundary === 'convergent' ? 20 : boundary === 'divergent' ? -40 : 0) : 0,
                y: isAnimating && boundary === 'transform' ? 20 : 0
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              {/* Mountain formation (Convergent) */}
              <AnimatePresence>
                {eventTriggered && boundary === 'convergent' && (
                  <motion.div 
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    className="absolute right-0 bottom-full w-32 h-32 bg-amber-700 origin-bottom"
                    style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                  >
                    <div className="absolute top-0 w-full h-8 bg-white" style={{ clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)' }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Plate */}
            <motion.div 
              className="w-1/2 h-24 bg-amber-900 border-t-8 border-emerald-900 rounded-tl-lg relative"
              animate={{ 
                x: isAnimating ? (boundary === 'convergent' ? -20 : boundary === 'divergent' ? 40 : 0) : 0,
                y: isAnimating && boundary === 'transform' ? -20 : 0
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              {/* Volcano formation (Convergent Subduction) */}
              <AnimatePresence>
                {eventTriggered && boundary === 'convergent' && (
                  <motion.div 
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    className="absolute left-10 bottom-full w-24 h-24 bg-slate-700 origin-bottom"
                    style={{ clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)' }}
                  >
                    {/* Lava */}
                    <motion.div 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-16 bg-orange-500 rounded-full blur-sm"
                      animate={{ y: [-10, -30, -10], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Magma rising (Divergent) */}
            <AnimatePresence>
              {eventTriggered && boundary === 'divergent' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 60, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="absolute bottom-0 w-20 bg-orange-500 rounded-t-full blur-md z-0"
                />
              )}
            </AnimatePresence>

            {/* Earthquake lines (Transform) */}
            <AnimatePresence>
              {isAnimating && boundary === 'transform' && (
                <motion.div 
                  className="absolute bottom-12 flex flex-col gap-2 z-20"
                  animate={{ x: [-5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.2, repeat: 10 }}
                >
                  <div className="w-16 h-1 bg-yellow-400/80 rotate-45" />
                  <div className="w-16 h-1 bg-yellow-400/80 -rotate-45" />
                  <div className="w-16 h-1 bg-yellow-400/80 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Controls */}
        <div className="w-full md:w-80 space-y-6">
          
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-slate-300 mb-2 uppercase tracking-wider text-sm">Tipo de Limite</h3>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { setBoundary('convergent'); setEventTriggered(false); }}
                className={`p-4 rounded-xl font-bold flex items-center gap-3 transition-colors ${boundary === 'convergent' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <ArrowRightLeft size={20} /> Convergente (Choque)
              </button>
              <button 
                onClick={() => { setBoundary('divergent'); setEventTriggered(false); }}
                className={`p-4 rounded-xl font-bold flex items-center gap-3 transition-colors ${boundary === 'divergent' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <ArrowLeftRight size={20} /> Divergente (Afastamento)
              </button>
              <button 
                onClick={() => { setBoundary('transform'); setEventTriggered(false); }}
                className={`p-4 rounded-xl font-bold flex items-center gap-3 transition-colors ${boundary === 'transform' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <ArrowUpDown size={20} /> Transformante (Deslizamento)
              </button>
            </div>
          </div>

          <button 
            onClick={simulate}
            disabled={isAnimating}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            {isAnimating ? 'Simulando...' : 'Simular Movimento'}
          </button>

          {/* Info Panel */}
          {eventTriggered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 p-4 rounded-xl border border-slate-600 text-sm"
            >
              {boundary === 'convergent' && <p><Mountain className="inline mr-2 text-emerald-400"/><strong>Convergente:</strong> Placas colidem. Pode formar cordilheiras (como os Andes ou Himalaia) ou causar subducção, gerando vulcões e fossas oceânicas.</p>}
              {boundary === 'divergent' && <p><Flame className="inline mr-2 text-orange-400"/><strong>Divergente:</strong> Placas se afastam. O magma sobe, esfria e forma nova crosta terrestre (dorsais meso-oceânicas).</p>}
              {boundary === 'transform' && <p><Waves className="inline mr-2 text-blue-400"/><strong>Transformante:</strong> Placas deslizam lateralmente. O atrito acumula tensão que, ao ser liberada, causa fortes terremotos (ex: Falha de San Andreas).</p>}
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
