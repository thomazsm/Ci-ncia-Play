import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bird, Bug, TreePine } from 'lucide-react';

export function NaturalSelection() {
  const [environment, setEnvironment] = useState<'green' | 'brown'>('green');
  const [generation, setGeneration] = useState(1);
  
  // Bug population based on environment
  const greenBugs = environment === 'green' ? 8 : 2;
  const brownBugs = environment === 'green' ? 2 : 8;

  const nextGeneration = () => {
    setEnvironment(environment === 'green' ? 'brown' : 'green');
    setGeneration(g => g + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-100 dark:bg-slate-900 rounded-2xl">
      <h2 className="text-3xl font-bold mb-2 text-foreground">Seleção Natural (Darwin)</h2>
      <p className="text-muted-foreground mb-8 font-medium">Mude o ambiente e observe qual característica se torna mais vantajosa.</p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        
        {/* Environment Area */}
        <div className={`relative flex-1 h-80 rounded-3xl overflow-hidden border-4 transition-colors duration-1000 ${environment === 'green' ? 'bg-emerald-500 border-emerald-600' : 'bg-amber-700 border-amber-800'}`}>
          
          {/* Predator */}
          <motion.div 
            className="absolute top-4 right-4 z-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bird className="w-16 h-16 text-slate-800 dark:text-slate-200" />
          </motion.div>

          {/* Bugs */}
          <div className="absolute inset-0 p-8">
            <AnimatePresence mode="popLayout">
              {Array.from({ length: greenBugs }).map((_, i) => (
                <motion.div
                  key={`green-${generation}-${i}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, x: Math.random() * 200, y: Math.random() * 200 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute"
                >
                  <Bug className="w-8 h-8 text-emerald-900 drop-shadow-md" />
                </motion.div>
              ))}
              {Array.from({ length: brownBugs }).map((_, i) => (
                <motion.div
                  key={`brown-${generation}-${i}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, x: Math.random() * 200, y: Math.random() * 200 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute"
                >
                  <Bug className="w-8 h-8 text-amber-900 drop-shadow-md" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls and Stats */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-border">
            <h3 className="font-bold text-lg mb-4">Geração {generation}</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-emerald-600 font-bold"><Bug size={16}/> Verdes:</span>
                <span className="font-bold">{greenBugs}0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-amber-700 font-bold"><Bug size={16}/> Marrons:</span>
                <span className="font-bold">{brownBugs}0%</span>
              </div>
            </div>
          </div>

          <button 
            onClick={nextGeneration}
            className="w-full px-6 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <TreePine size={20} />
            Mudar Ambiente (Seca/Chuva)
          </button>
          
          <p className="text-sm text-muted-foreground">
            O predador (pássaro) enxerga mais facilmente os insetos que não estão camuflados. 
            Os sobreviventes se reproduzem, passando seus genes adiante.
          </p>
        </div>
      </div>
    </div>
  );
}
