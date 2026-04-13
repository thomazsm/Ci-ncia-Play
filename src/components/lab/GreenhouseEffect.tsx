import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, Factory, Car } from 'lucide-react';
import { SimulationInfoCard } from '@/src/components/ui/SimulationInfoCard';

export function GreenhouseEffect() {
  const [gases, setGases] = useState(50); // 0 to 100

  const temperature = 15 + (gases - 50) * 0.1; // Base 15C

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white relative">
      <div className="absolute top-4 left-4 z-10 w-full max-w-sm pr-8">
        <SimulationInfoCard title="Efeito Estufa">
          <p className="mb-4 opacity-80 font-medium text-sm">Aumente os gases de efeito estufa para ver o impacto na temperatura.</p>
          <div className="w-full space-y-4 bg-black/30 p-4 rounded-2xl">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold">Gases Estufa (CO2, CH4): {gases}%</span>
              <span className={`text-xl font-black ${temperature > 17 ? 'text-red-500' : 'text-emerald-500'}`}>
                {temperature.toFixed(1)} °C
              </span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={gases} 
              onChange={(e) => setGases(Number(e.target.value))}
              className="w-full h-4 bg-slate-700 rounded-full appearance-none outline-none cursor-pointer"
            />
          </div>
        </SimulationInfoCard>
      </div>

      <div className="relative w-full max-w-2xl h-80 bg-slate-800 rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-end mt-16">
        {/* Sun */}
        <Sun className="absolute top-4 left-4 w-16 h-16 text-yellow-400 animate-spin-slow" />

        {/* Sun Rays (Incoming) */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div 
            key={`ray-in-${i}`}
            className="absolute top-10 left-10 w-1 h-32 bg-yellow-400/50 origin-top"
            style={{ rotate: `${30 + i * 15}deg` }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* Heat Rays (Outgoing/Trapped) */}
        {Array.from({ length: Math.floor(gases / 10) }).map((_, i) => (
          <motion.div 
            key={`ray-out-${i}`}
            className="absolute bottom-20 w-2 h-16 bg-red-500/60 rounded-full"
            style={{ left: `${10 + i * 8}%` }}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Greenhouse Gas Layer */}
        <div 
          className="absolute top-20 w-full bg-slate-500/30 backdrop-blur-[2px] transition-all duration-500"
          style={{ height: `${gases}px`, opacity: gases / 100 }}
        >
          <div className="w-full h-full flex items-center justify-center gap-8 opacity-50">
            <Cloud className="text-slate-300 w-8 h-8" />
            <Cloud className="text-slate-300 w-12 h-12" />
            <Cloud className="text-slate-300 w-8 h-8" />
          </div>
        </div>

        {/* Earth Surface */}
        <div className="w-full h-20 bg-emerald-800 relative flex items-end justify-around pb-2">
          <Factory className={`w-12 h-12 ${gases > 70 ? 'text-slate-400' : 'text-slate-600'}`} />
          <Car className={`w-8 h-8 ${gases > 50 ? 'text-red-400' : 'text-slate-600'}`} />
        </div>
      </div>
    </div>
  );
}
