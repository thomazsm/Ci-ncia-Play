import { useState } from 'react';
import { motion } from 'framer-motion';
import { TreePine, Bird, Bug, AlertTriangle } from 'lucide-react';

export function BiodiversityImpact() {
  const [deforestation, setDeforestation] = useState(0); // 0 to 100

  const trees = 10 - Math.floor(deforestation / 10);
  const animals = 15 - Math.floor(deforestation / 6);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-100 dark:bg-slate-900 rounded-2xl">
      <h2 className="text-3xl font-bold mb-2 text-foreground">Impacto na Biodiversidade</h2>
      <p className="text-muted-foreground mb-8 font-medium">Aumente o desmatamento para ver o efeito na fauna e flora.</p>

      <div className="relative w-full max-w-3xl h-80 bg-emerald-900/20 rounded-3xl overflow-hidden border-4 border-emerald-900/30 flex flex-wrap content-end p-4 gap-2">
        {/* Trees */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div key={`tree-${i}`} initial={false} animate={{ opacity: i < trees ? 1 : 0.2, scale: i < trees ? 1 : 0.5 }}>
            <TreePine className={`w-16 h-16 ${i < trees ? 'text-emerald-600' : 'text-amber-800'}`} />
          </motion.div>
        ))}
        
        {/* Animals */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div 
              key={`animal-${i}`} 
              className="absolute"
              initial={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 90}%` }}
              animate={{ opacity: i < animals ? 1 : 0, scale: i < animals ? 1 : 0 }}
            >
              {i % 2 === 0 ? <Bird className="w-6 h-6 text-blue-500" /> : <Bug className="w-5 h-5 text-orange-500" />}
            </motion.div>
          ))}
        </div>

        {deforestation > 70 && (
          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-2xl text-red-500 font-bold text-xl">
              <AlertTriangle size={32} />
              Colapso do Ecossistema!
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-xl mt-12 space-y-2">
        <div className="flex justify-between font-bold">
          <span className="text-foreground">Desmatamento: {deforestation}%</span>
          <span className="text-emerald-600">Espécies Vivas: {animals + trees}</span>
        </div>
        <input 
          type="range" 
          min="0" max="100" 
          value={deforestation} 
          onChange={(e) => setDeforestation(Number(e.target.value))}
          className="w-full h-4 bg-slate-300 rounded-full appearance-none outline-none accent-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
