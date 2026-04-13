import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Rabbit, Dog, Play, Pause, RotateCcw } from 'lucide-react';
import { SimulationInfoCard } from '@/src/components/ui/SimulationInfoCard';

export function EcosystemBuilder() {
  const [plants, setPlants] = useState(20);
  const [rabbits, setRabbits] = useState(5);
  const [wolves, setWolves] = useState(1);
  const [day, setDay] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setDay(d => d + 1);
        
        setPlants(p => {
          let newP = p + 5; // Growth
          newP -= rabbits * 2; // Eaten by rabbits
          return Math.max(0, Math.min(50, newP));
        });

        setRabbits(r => {
          let newR = r;
          if (plants > r * 2) newR += Math.floor(r * 0.5); // Reproduce if enough food
          else newR -= Math.floor(r * 0.2); // Starve
          newR -= wolves * 1; // Eaten by wolves
          return Math.max(0, Math.min(30, newR));
        });

        setWolves(w => {
          let newW = w;
          if (rabbits > w * 3) newW += 1; // Reproduce if enough food
          else if (rabbits < w) newW -= 1; // Starve
          return Math.max(0, Math.min(10, newW));
        });

      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, plants, rabbits, wolves]);

  const reset = () => {
    setIsRunning(false);
    setPlants(20);
    setRabbits(5);
    setWolves(1);
    setDay(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white relative">
      <div className="absolute top-4 left-4 z-10 w-full max-w-md pr-8">
        <SimulationInfoCard title="Construtor de Ecossistemas">
          <p className="mb-4 opacity-80 font-medium text-sm">
            Equilibre a cadeia alimentar. Se houver muitos predadores, as presas somem. Se não houver predadores, as presas destroem a vegetação!
          </p>
          <div className="flex flex-col gap-4">
            <div className="bg-black/40 p-4 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center text-emerald-400 font-bold text-sm">
                <span className="flex items-center gap-2"><Leaf size={16}/> Plantas</span>
                <span>{plants}</span>
              </div>
              <div className="flex justify-between items-center text-blue-400 font-bold text-sm">
                <span className="flex items-center gap-2"><Rabbit size={16}/> Coelhos (Presas)</span>
                <span>{rabbits}</span>
              </div>
              <div className="flex justify-between items-center text-red-400 font-bold text-sm">
                <span className="flex items-center gap-2"><Dog size={16}/> Lobos (Predadores)</span>
                <span>{wolves}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
              >
                {isRunning ? <><Pause size={18}/> Pausar</> : <><Play size={18}/> Iniciar</>}
              </button>
              <button 
                onClick={reset}
                className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors"
                title="Reiniciar"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
        </SimulationInfoCard>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mt-16">
        
        {/* Simulation Area */}
        <div className="relative flex-1 h-96 bg-emerald-900/30 rounded-3xl border-4 border-emerald-800 overflow-hidden p-4">
          <div className="absolute top-4 left-4 font-bold text-xl bg-black/50 px-4 py-2 rounded-lg z-20">
            Dia: {day}
          </div>
          
          <AnimatePresence>
            {/* Render entities randomly within the box */}
            {Array.from({ length: plants }).map((_, i) => (
              <motion.div key={`p-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute text-emerald-500" style={{ left: `${10 + (i * 17) % 80}%`, top: `${10 + (i * 23) % 80}%` }}>
                <Leaf size={24} />
              </motion.div>
            ))}
            {Array.from({ length: rabbits }).map((_, i) => (
              <motion.div key={`r-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute text-blue-400 z-10" style={{ left: `${15 + (i * 31) % 70}%`, top: `${15 + (i * 19) % 70}%` }}>
                <Rabbit size={32} />
              </motion.div>
            ))}
            {Array.from({ length: wolves }).map((_, i) => (
              <motion.div key={`w-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute text-red-500 z-10" style={{ left: `${20 + (i * 47) % 60}%`, top: `${20 + (i * 37) % 60}%` }}>
                <Dog size={40} />
              </motion.div>
            ))}
          </AnimatePresence>

          {plants === 0 && rabbits === 0 && wolves === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-30">
              <span className="text-3xl font-black text-red-500">Colapso do Ecossistema</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="w-full md:w-72 space-y-6">
          {!isRunning && day === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400 font-bold uppercase">Adicionar manualmente:</p>
              <div className="flex gap-2">
                <button onClick={() => setPlants(p => p + 5)} className="flex-1 bg-emerald-900/50 hover:bg-emerald-800 p-2 rounded-lg text-emerald-400 flex justify-center"><Leaf size={20}/></button>
                <button onClick={() => setRabbits(r => r + 2)} className="flex-1 bg-blue-900/50 hover:bg-blue-800 p-2 rounded-lg text-blue-400 flex justify-center"><Rabbit size={20}/></button>
                <button onClick={() => setWolves(w => w + 1)} className="flex-1 bg-red-900/50 hover:bg-red-800 p-2 rounded-lg text-red-500 flex justify-center"><Dog size={20}/></button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
