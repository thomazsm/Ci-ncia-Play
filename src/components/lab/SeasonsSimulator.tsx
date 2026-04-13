import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Globe2 } from 'lucide-react';

export function SeasonsSimulator() {
  const [month, setMonth] = useState(0); // 0 to 11
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  // Calculate earth position in orbit (circle)
  const angle = (month / 12) * Math.PI * 2;
  const radius = 120;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.4; // Elliptical perspective

  // Determine season for Southern Hemisphere
  let season = '';
  let seasonColor = '';
  if (month >= 2 && month <= 4) { season = 'Outono'; seasonColor = 'text-orange-500'; }
  else if (month >= 5 && month <= 7) { season = 'Inverno'; seasonColor = 'text-blue-400'; }
  else if (month >= 8 && month <= 10) { season = 'Primavera'; seasonColor = 'text-pink-400'; }
  else { season = 'Verão'; seasonColor = 'text-yellow-500'; }

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white overflow-hidden">
      <h2 className="text-3xl font-bold mb-2">Estações do Ano</h2>
      <p className="text-slate-400 mb-16 font-medium">Mova o controle para ver a translação da Terra e a mudança das estações.</p>

      <div className="relative w-full max-w-2xl h-64 flex items-center justify-center">
        {/* Orbit Path */}
        <div className="absolute w-[240px] h-[96px] border border-white/20 rounded-[100%] scale-150" />

        {/* Sun */}
        <div className="absolute z-10 flex flex-col items-center">
          <Sun className="w-24 h-24 text-yellow-500 animate-spin-slow" fill="currentColor" />
        </div>

        {/* Earth */}
        <motion.div 
          className="absolute z-20 flex flex-col items-center"
          animate={{ x, y }}
          transition={{ type: 'tween', duration: 0.5 }}
        >
          <div className="relative">
            <Globe2 className="w-12 h-12 text-blue-400" />
            {/* Axis tilt line */}
            <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-red-500/50 -translate-x-1/2 -translate-y-1/2 rotate-[23.5deg]" />
          </div>
        </motion.div>
      </div>

      <div className="mt-16 w-full max-w-xl text-center">
        <div className="text-2xl font-bold mb-4">
          Mês: <span className="text-primary">{months[month]}</span> | 
          Estação (Sul): <span className={seasonColor}>{season}</span>
        </div>
        <input 
          type="range" 
          min="0" max="11" 
          value={month} 
          onChange={(e) => setMonth(Number(e.target.value))}
          className="w-full h-4 bg-slate-700 rounded-full appearance-none outline-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2 px-2 font-bold">
          {months.map(m => <span key={m}>{m}</span>)}
        </div>
      </div>
    </div>
  );
}
