import { useState } from 'react';
import { motion } from 'framer-motion';
import { Split, Users } from 'lucide-react';

export function ReproductionSim() {
  const [type, setType] = useState<'asexual' | 'sexual'>('asexual');
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-100 dark:bg-slate-900 rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Tipos de Reprodução</h2>
      
      <div className="flex gap-4 mb-12">
        <button 
          onClick={() => setType('asexual')}
          className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 ${type === 'asexual' ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
        >
          <Split size={20} /> Assexuada
        </button>
        <button 
          onClick={() => setType('sexual')}
          className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 ${type === 'sexual' ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
        >
          <Users size={20} /> Sexuada
        </button>
      </div>

      <div className="relative w-full max-w-2xl h-64 bg-white dark:bg-slate-800 rounded-3xl shadow-xl flex items-center justify-center border border-border overflow-hidden">
        {type === 'asexual' ? (
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Parent */}
            <motion.div 
              className="absolute w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold"
              animate={playing ? { scaleX: [1, 1.5, 1], x: [0, -60, -60], opacity: [1, 1, 1] } : { x: 0 }}
              transition={{ duration: 2 }}
            >
              DNA A
            </motion.div>
            {/* Clone */}
            {playing && (
              <motion.div 
                className="absolute w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold"
                initial={{ x: 0, opacity: 0, scale: 0.8 }}
                animate={{ x: 60, opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 1 }}
              >
                DNA A
              </motion.div>
            )}
          </div>
        ) : (
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Parent 1 */}
            <motion.div 
              className="absolute w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
              animate={playing ? { x: [-80, -20, -80], opacity: [1, 0.5, 1] } : { x: -80 }}
              transition={{ duration: 2 }}
            >
              DNA A
            </motion.div>
            {/* Parent 2 */}
            <motion.div 
              className="absolute w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold"
              animate={playing ? { x: [80, 20, 80], opacity: [1, 0.5, 1] } : { x: 80 }}
              transition={{ duration: 2 }}
            >
              DNA B
            </motion.div>
            {/* Offspring */}
            {playing && (
              <motion.div 
                className="absolute w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold"
                initial={{ y: 0, opacity: 0, scale: 0.5 }}
                animate={{ y: 60, opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                DNA AB
              </motion.div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 text-center max-w-lg">
        <button 
          onClick={play} 
          disabled={playing}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg disabled:opacity-50 mb-6"
        >
          Simular Reprodução
        </button>
        <p className="text-muted-foreground font-medium">
          {type === 'asexual' 
            ? "Na reprodução assexuada, um único organismo se divide, criando um clone geneticamente idêntico (ex: bactérias)." 
            : "Na reprodução sexuada, dois organismos combinam seu material genético, gerando descendentes com variabilidade genética (ex: humanos, plantas com flores)."}
        </p>
      </div>
    </div>
  );
}
