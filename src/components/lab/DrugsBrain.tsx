import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Coffee, Wine } from 'lucide-react';

export function DrugsBrain() {
  const [drugType, setDrugType] = useState<'normal' | 'depressora' | 'estimulante' | 'alucinogena'>('normal');

  const config = {
    normal: { speed: 2, color: 'bg-blue-400', text: 'Cérebro funcionando em ritmo natural. Sinapses equilibradas.', icon: <Brain size={24}/> },
    depressora: { speed: 5, color: 'bg-slate-500', text: 'Drogas depressoras (ex: Álcool) diminuem a atividade cerebral, causando lentidão, sono e perda de reflexos.', icon: <Wine size={24}/> },
    estimulante: { speed: 0.5, color: 'bg-red-500', text: 'Drogas estimulantes (ex: Cocaína, Cafeína) aceleram o cérebro, causando euforia, insônia e taquicardia.', icon: <Coffee size={24}/> },
    alucinogena: { speed: 1.5, color: 'bg-purple-500', text: 'Drogas perturbadoras/alucinógenas (ex: LSD, Maconha) alteram a percepção da realidade, causando alucinações.', icon: <Zap size={24}/> }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Efeitos das Drogas no Cérebro</h2>
      <p className="mb-8 opacity-80 font-medium">Selecione uma substância para ver como ela altera os neurotransmissores.</p>

      <div className="flex gap-4 mb-8">
        {Object.keys(config).map((key) => (
          <button 
            key={key}
            onClick={() => setDrugType(key as any)}
            className={`px-4 py-2 rounded-lg font-bold capitalize flex items-center gap-2 transition-colors ${drugType === key ? 'bg-primary text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            {config[key as keyof typeof config].icon} {key}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-md h-64 bg-slate-800 rounded-3xl overflow-hidden border-4 border-slate-700 flex items-center justify-center">
        {/* Brain Outline */}
        <Brain className="w-48 h-48 text-slate-600 opacity-50" />

        {/* Synapses / Neurotransmitters */}
        {Array.from({ length: drugType === 'alucinogena' ? 40 : 20 }).map((_, i) => (
          <motion.div
            key={`${drugType}-${i}`}
            className={`absolute w-3 h-3 rounded-full ${drugType === 'alucinogena' ? ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'][i % 4] : config[drugType].color}`}
            initial={{ 
              x: Math.random() * 200 - 100, 
              y: Math.random() * 200 - 100,
              opacity: 0
            }}
            animate={{ 
              x: Math.random() * 300 - 150, 
              y: Math.random() * 300 - 150,
              opacity: [0, 1, 0],
              scale: drugType === 'alucinogena' ? [1, 2, 1] : 1
            }}
            transition={{ 
              duration: config[drugType].speed, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="mt-8 bg-black/40 p-6 rounded-2xl max-w-lg text-center border border-white/10">
        <p className="text-lg font-medium">{config[drugType].text}</p>
      </div>
    </div>
  );
}
