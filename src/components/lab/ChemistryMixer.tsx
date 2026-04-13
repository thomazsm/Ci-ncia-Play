import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Sparkles, Droplets, Wind, AlertTriangle, X } from 'lucide-react';

const ELEMENTS = [
  { symbol: 'H', name: 'Hidrogênio', color: 'bg-blue-400', border: 'border-blue-500' },
  { symbol: 'O', name: 'Oxigênio', color: 'bg-red-400', border: 'border-red-500' },
  { symbol: 'Na', name: 'Sódio', color: 'bg-purple-400', border: 'border-purple-500' },
  { symbol: 'Cl', name: 'Cloro', color: 'bg-green-400', border: 'border-green-500' },
  { symbol: 'C', name: 'Carbono', color: 'bg-slate-600', border: 'border-slate-700' },
];

const REACTIONS: Record<string, any> = {
  'H,O': { result: 'H₂O (Água)', desc: 'Uma reação explosiva que gera água! Essencial para a vida.', effect: 'water', icon: <Droplets className="w-12 h-12 text-blue-400" /> },
  'Cl,Na': { result: 'NaCl (Cloreto de Sódio)', desc: 'Um metal explosivo (Na) e um gás tóxico (Cl) formam o sal de cozinha!', effect: 'spark', icon: <Sparkles className="w-12 h-12 text-yellow-400" /> },
  'C,O': { result: 'CO₂ (Dióxido de Carbono)', desc: 'Gás carbônico. Usado pelas plantas na fotossíntese e liberado na nossa respiração.', effect: 'gas', icon: <Wind className="w-12 h-12 text-slate-400" /> },
  'Cl,H': { result: 'HCl (Ácido Clorídrico)', desc: 'Um ácido forte! Presente no nosso estômago para ajudar na digestão.', effect: 'acid', icon: <AlertTriangle className="w-12 h-12 text-lime-500" /> },
};

export function ChemistryMixer() {
  const [selected, setSelected] = useState<typeof ELEMENTS[0][]>([]);
  const [reactionResult, setReactionResult] = useState<any | null>(null);
  const [isMixing, setIsMixing] = useState(false);

  const handleSelect = (el: typeof ELEMENTS[0]) => {
    if (selected.length < 2 && !reactionResult) {
      setSelected([...selected, el]);
    }
  };

  const handleRemove = (index: number) => {
    setSelected(selected.filter((_, i) => i !== index));
  };

  const mixElements = () => {
    if (selected.length !== 2) return;
    setIsMixing(true);
    
    setTimeout(() => {
      // Sort symbols alphabetically to match dictionary keys (e.g., 'H,O' not 'O,H')
      const symbols = selected.map(s => s.symbol).sort().join(',');
      const result = REACTIONS[symbols] || { 
        result: 'Mistura Instável', 
        desc: 'Esses elementos não reagem facilmente ou formam compostos complexos não mapeados aqui.', 
        effect: 'none',
        icon: <X className="w-12 h-12 text-slate-500" />
      };
      
      setReactionResult(result);
      setIsMixing(false);
    }, 1500);
  };

  const reset = () => {
    setSelected([]);
    setReactionResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Laboratório de Misturas</h2>
      <p className="mb-8 opacity-80 font-medium text-center max-w-2xl">
        Selecione dois elementos da tabela periódica para ver o que acontece quando eles reagem!
      </p>

      {/* Elements Palette */}
      <div className="flex gap-4 mb-12 flex-wrap justify-center">
        {ELEMENTS.map(el => (
          <button
            key={el.symbol}
            onClick={() => handleSelect(el)}
            disabled={selected.length >= 2 || reactionResult !== null}
            className={`w-16 h-16 rounded-xl border-b-4 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 ${el.color} ${el.border}`}
          >
            <span className="font-black text-xl">{el.symbol}</span>
            <span className="text-[10px] uppercase font-bold opacity-80">{el.name}</span>
          </button>
        ))}
      </div>

      {/* Mixing Area */}
      <div className="relative w-full max-w-2xl bg-slate-800 rounded-3xl border-4 border-slate-700 p-8 flex flex-col items-center min-h-[350px] overflow-hidden">
        
        {/* Background Reaction Effects */}
        <AnimatePresence>
          {isMixing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 flex items-end justify-center overflow-hidden"
            >
              {/* Bubbles */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`bubble-${i}`}
                  initial={{ y: 300, x: Math.random() * 400 - 200, scale: Math.random() * 0.5 + 0.5, opacity: 0.8 }}
                  animate={{ y: -100, x: Math.random() * 400 - 200, opacity: 0 }}
                  transition={{ duration: Math.random() * 1.5 + 0.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute bottom-0 w-4 h-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                />
              ))}
              {/* Liquid Fill */}
              <motion.div 
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-500/30 to-blue-500/10"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-8 mb-8 w-full z-10">
          {/* Slot 1 */}
          <div className="w-24 h-24 rounded-2xl border-4 border-dashed border-slate-600 flex items-center justify-center relative bg-slate-900/50 backdrop-blur-sm">
            {selected[0] && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`absolute inset-0 rounded-xl flex items-center justify-center text-3xl font-black ${selected[0].color} shadow-lg shadow-${selected[0].color.replace('bg-', '')}/50`}>
                {selected[0].symbol}
                {!reactionResult && !isMixing && (
                  <button onClick={() => handleRemove(0)} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"><X size={12}/></button>
                )}
              </motion.div>
            )}
          </div>

          <span className="text-4xl font-black text-slate-600">+</span>

          {/* Slot 2 */}
          <div className="w-24 h-24 rounded-2xl border-4 border-dashed border-slate-600 flex items-center justify-center relative bg-slate-900/50 backdrop-blur-sm">
            {selected[1] && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`absolute inset-0 rounded-xl flex items-center justify-center text-3xl font-black ${selected[1].color} shadow-lg shadow-${selected[1].color.replace('bg-', '')}/50`}>
                {selected[1].symbol}
                {!reactionResult && !isMixing && (
                  <button onClick={() => handleRemove(1)} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"><X size={12}/></button>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Action / Result */}
        <div className="h-32 flex items-center justify-center w-full z-10">
          {!reactionResult && !isMixing && (
            <button 
              onClick={mixElements}
              disabled={selected.length !== 2}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white rounded-full font-bold text-xl flex items-center gap-3 transition-colors shadow-lg shadow-emerald-900/50"
            >
              <FlaskConical size={24} />
              Misturar Elementos
            </button>
          )}

          {isMixing && (
            <motion.div 
              animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-emerald-400 flex flex-col items-center drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]"
            >
              <FlaskConical size={64} />
              <span className="font-bold mt-2 animate-pulse text-lg">Reagindo...</span>
            </motion.div>
          )}

          {reactionResult && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex flex-col items-center text-center bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-600 w-full shadow-2xl"
            >
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                {reactionResult.icon}
              </motion.div>
              <h3 className="text-2xl font-black text-emerald-400 mb-2">{reactionResult.result}</h3>
              <p className="text-slate-300 font-medium">{reactionResult.desc}</p>
              
              <button onClick={reset} className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-full text-sm font-bold text-white transition-colors">
                Fazer nova mistura
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
