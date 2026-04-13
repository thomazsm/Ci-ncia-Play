import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, FlaskConical } from 'lucide-react';

export function ChemicalReactions() {
  const [reaction, setReaction] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-100 dark:bg-slate-900 rounded-2xl">
      <h2 className="text-3xl font-bold mb-2 text-foreground">Reações Químicas e Leis Ponderais</h2>
      <p className="text-muted-foreground mb-8 font-medium">Lei de Lavoisier: "Na natureza nada se cria, nada se perde, tudo se transforma."</p>

      <div className="flex flex-col items-center justify-center w-full max-w-3xl">
        
        {/* Scale */}
        <div className="relative w-full h-64 flex items-end justify-center mb-8">
          {/* Base */}
          <div className="w-4 h-48 bg-slate-400 dark:bg-slate-600 rounded-t-full z-10" />
          <div className="absolute bottom-0 w-32 h-4 bg-slate-500 dark:bg-slate-700 rounded-full z-10" />
          
          {/* Beam */}
          <motion.div 
            className="absolute bottom-44 w-96 h-2 bg-slate-500 dark:bg-slate-500 rounded-full origin-center"
            animate={{ rotate: reaction ? [0, 5, -5, 0] : 0 }}
            transition={{ duration: 1 }}
          >
            {/* Left Pan (Reactants) */}
            <div className="absolute -left-10 top-0 w-20 h-20 border-b-4 border-slate-400 rounded-b-full flex items-end justify-center pb-2">
              <AnimatePresence>
                {!reaction && (
                  <motion.div className="flex gap-1" exit={{ opacity: 0, y: -20 }}>
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">H2</div>
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">H2</div>
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">O2</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Right Pan (Products) */}
            <div className="absolute -right-10 top-0 w-20 h-20 border-b-4 border-slate-400 rounded-b-full flex items-end justify-center pb-2">
              <AnimatePresence>
                {reaction && (
                  <motion.div className="flex gap-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="relative flex items-center justify-center">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10">O</div>
                      <div className="absolute -left-2 -top-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold z-0">H</div>
                      <div className="absolute -right-2 -top-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold z-0">H</div>
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10">O</div>
                      <div className="absolute -left-2 -top-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold z-0">H</div>
                      <div className="absolute -right-2 -top-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold z-0">H</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-8 text-xl font-bold text-foreground bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-border w-full justify-center">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2 uppercase">Reagentes</div>
            <div className={`${reaction ? 'opacity-50' : 'text-primary'}`}>2 H₂ + O₂</div>
            <div className="text-sm mt-1">Massa: 36g</div>
          </div>
          <div className="text-3xl text-slate-400">→</div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2 uppercase">Produtos</div>
            <div className={`${!reaction ? 'opacity-50' : 'text-emerald-500'}`}>2 H₂O</div>
            <div className="text-sm mt-1">Massa: 36g</div>
          </div>
        </div>

        <button 
          onClick={() => setReaction(!reaction)}
          className="mt-8 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg flex items-center gap-3 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
        >
          <FlaskConical size={24} />
          {reaction ? 'Desfazer Reação' : 'Realizar Reação Química'}
        </button>
      </div>
    </div>
  );
}
