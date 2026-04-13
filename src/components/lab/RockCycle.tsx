import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Wind, Layers } from 'lucide-react';

export function RockCycle() {
  const [activeRock, setActiveRock] = useState('magma');

  const rocks = {
    magma: { name: 'Magma', desc: 'Rocha derretida no interior da Terra.', color: 'bg-red-600' },
    ignea: { name: 'Rocha Ígnea', desc: 'Formada pelo resfriamento do magma.', color: 'bg-slate-800' },
    sedimentar: { name: 'Rocha Sedimentar', desc: 'Formada pela compactação de sedimentos (areia, restos).', color: 'bg-amber-600' },
    metamorfica: { name: 'Rocha Metamórfica', desc: 'Formada por alta pressão e temperatura.', color: 'bg-purple-800' }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-100 dark:bg-slate-900 rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Ciclo das Rochas</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.entries(rocks).map(([key, rock]) => (
          <button 
            key={key}
            onClick={() => setActiveRock(key)}
            className={`px-6 py-4 rounded-xl text-white font-bold transition-transform hover:scale-105 ${rock.color} ${activeRock === key ? 'ring-4 ring-primary ring-offset-2 dark:ring-offset-slate-900' : 'opacity-70'}`}
          >
            {rock.name}
          </button>
        ))}
      </div>
      <motion.div 
        key={activeRock}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg text-center p-8 glass rounded-2xl border border-border"
      >
        <h3 className="text-3xl font-bold mb-4 text-foreground">{rocks[activeRock as keyof typeof rocks].name}</h3>
        <p className="text-lg text-muted-foreground">{rocks[activeRock as keyof typeof rocks].desc}</p>
        
        <div className="mt-8 pt-8 border-t border-border flex justify-center gap-8 font-medium text-foreground">
          {activeRock === 'magma' && <div className="flex flex-col items-center"><Flame className="text-red-500 mb-2 w-8 h-8"/> Resfria e vira Ígnea</div>}
          {activeRock === 'ignea' && <div className="flex flex-col items-center"><Wind className="text-blue-500 mb-2 w-8 h-8"/> Sofre erosão e vira Sedimento</div>}
          {activeRock === 'sedimentar' && <div className="flex flex-col items-center"><Layers className="text-amber-500 mb-2 w-8 h-8"/> Afunda, sofre pressão e vira Metamórfica</div>}
          {activeRock === 'metamorfica' && <div className="flex flex-col items-center"><Flame className="text-red-500 mb-2 w-8 h-8"/> Derrete e vira Magma</div>}
        </div>
      </motion.div>
    </div>
  );
}
