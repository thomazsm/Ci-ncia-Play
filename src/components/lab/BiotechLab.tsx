import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Bug, Sparkles } from 'lucide-react';

export function BiotechLab() {
  const [injected, setInjected] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Biotecnologia e OGMs</h2>
      <p className="mb-8 opacity-80 font-medium">Insira o gene da bioluminescência (de uma água-viva) na bactéria.</p>

      <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-4xl justify-center">
        
        {/* Gene Source */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 bg-blue-900/50 rounded-full border-2 border-blue-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            <Dna className="w-16 h-16 text-blue-400" />
            {!injected && (
              <motion.div 
                className="absolute w-8 h-8 bg-cyan-400 rounded-full blur-sm"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
          <span className="font-bold text-blue-400">Gene Bioluminescente</span>
        </div>

        {/* Action Button / Arrow */}
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => setInjected(true)}
            disabled={injected}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white rounded-full font-bold transition-colors flex items-center gap-2"
          >
            {injected ? 'Gene Inserido' : 'Inserir Plasmídeo'}
          </button>
          
          <div className="relative w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
            {injected && (
              <motion.div 
                className="absolute top-0 left-0 h-full bg-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1 }}
              />
            )}
          </div>
        </div>

        {/* Target Bacteria */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-48 h-32 bg-emerald-900/30 rounded-full border-4 border-emerald-700 flex items-center justify-center overflow-hidden">
            <Bug className="w-16 h-16 text-emerald-600 opacity-50" />
            
            {/* Bacteria DNA */}
            <svg className="absolute w-full h-full opacity-30" viewBox="0 0 100 100">
              <path d="M 20 50 Q 50 20 80 50 T 20 50" fill="none" stroke="#10b981" strokeWidth="2" />
            </svg>

            {/* Injected Gene Glow */}
            <AnimatePresence>
              {injected && (
                <motion.div 
                  className="absolute inset-0 bg-cyan-400/40 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <Sparkles className="w-12 h-12 text-cyan-300 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="font-bold text-emerald-500">
            {injected ? 'Bactéria Transgênica (OGM)' : 'Bactéria Comum'}
          </span>
        </div>

      </div>

      <div className="mt-12 max-w-2xl text-center bg-black/30 p-6 rounded-2xl border border-white/10">
        <p className="text-slate-300">
          A engenharia genética permite transferir genes de uma espécie para outra. 
          Organismos Geneticamente Modificados (OGMs) são usados para produzir medicamentos (como insulina), 
          melhorar plantações e em pesquisas científicas.
        </p>
      </div>
    </div>
  );
}
