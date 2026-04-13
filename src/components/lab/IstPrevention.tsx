import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Bug } from 'lucide-react';

export function IstPrevention() {
  const [protectedMode, setProtectedMode] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Prevenção de ISTs</h2>
      <p className="mb-8 opacity-80 font-medium">Ative a proteção para ver como os métodos de barreira funcionam.</p>

      <div className="relative w-full max-w-2xl h-80 bg-slate-800 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center">
        
        {/* Human Body Area */}
        <div className="absolute right-0 w-1/3 h-full bg-emerald-900/30 border-l-4 border-emerald-500/50 flex items-center justify-center">
          <span className="font-bold text-emerald-400 rotate-90 tracking-widest uppercase">Organismo</span>
        </div>

        {/* Protection Barrier */}
        <motion.div 
          className="absolute right-1/3 w-4 h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-20"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: protectedMode ? 1 : 0, scaleY: protectedMode ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Viruses/Bacteria attacking */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 z-10"
            initial={{ x: -50, y: Math.random() * 300 }}
            animate={{ 
              x: protectedMode ? [ -50, 350, 300 ] : [ -50, 500 ],
              y: Math.random() * 300
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Bug className={`${i % 2 === 0 ? 'text-red-500' : 'text-purple-500'} w-8 h-8`} />
          </motion.div>
        ))}

      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button 
          onClick={() => setProtectedMode(!protectedMode)}
          className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-colors ${protectedMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-slate-700 hover:bg-slate-600'}`}
        >
          {protectedMode ? <Shield size={24} /> : <ShieldAlert size={24} />}
          {protectedMode ? 'Proteção Ativada (Preservativo)' : 'Sem Proteção'}
        </button>
        
        <p className="text-slate-400 max-w-lg text-center mt-4">
          {protectedMode 
            ? "O preservativo atua como uma barreira física, impedindo que vírus (como HIV e HPV) e bactérias (como Sífilis) entrem no organismo." 
            : "Sem proteção, o organismo fica vulnerável à entrada de patógenos durante a relação sexual, podendo causar Infecções Sexualmente Transmissíveis."}
        </p>
      </div>
    </div>
  );
}
