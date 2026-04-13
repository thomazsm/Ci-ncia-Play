import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Wind } from 'lucide-react';

export function MixtureSeparation() {
  const [step, setStep] = useState(0); // 0: Mistura, 1: Filtração, 2: Evaporação

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-2xl font-bold mb-8">Laboratório de Separação de Misturas</h2>
      
      <div className="relative w-64 h-64 border-4 border-white/20 rounded-b-3xl rounded-t-sm bg-white/5 overflow-hidden flex flex-col justify-end">
        {/* Sal dissolvido */}
        <motion.div 
          className="absolute bottom-0 w-full bg-blue-500/50"
          initial={{ height: '80%' }}
          animate={{ height: step === 2 ? '0%' : '80%' }}
          transition={{ duration: 2 }}
        />
        {/* Areia */}
        <motion.div 
          className="absolute bottom-0 w-full bg-amber-700/80"
          initial={{ height: '20%' }}
          animate={{ height: step >= 1 ? '0%' : '20%' }}
          transition={{ duration: 1 }}
        />
        {/* Sal cristalizado */}
        <motion.div 
          className="absolute bottom-0 w-full bg-white/80"
          initial={{ height: '0%' }}
          animate={{ height: step === 2 ? '10%' : '0%' }}
          transition={{ duration: 2, delay: 1 }}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-12">
        <button onClick={() => setStep(0)} className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 font-bold">Mistura Inicial</button>
        <button onClick={() => setStep(1)} className="px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-500 flex items-center gap-2 font-bold"><Filter size={18}/> Filtração (Tira Areia)</button>
        <button onClick={() => setStep(2)} className="px-4 py-2 bg-orange-600 rounded-lg hover:bg-orange-500 flex items-center gap-2 font-bold"><Wind size={18}/> Evaporação (Tira Água)</button>
      </div>
      
      <div className="mt-8 text-center max-w-md text-slate-300 font-medium h-20">
        {step === 0 && "Temos uma mistura heterogênea de Água, Sal dissolvido e Areia no fundo."}
        {step === 1 && "A filtração reteve a areia (sólido) no filtro. Agora temos uma mistura homogênea de Água e Sal."}
        {step === 2 && "A evaporação removeu a água (líquido) para a atmosfera, deixando apenas o sal (sólido) cristalizado no fundo."}
      </div>
    </div>
  );
}
