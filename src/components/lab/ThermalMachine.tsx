import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export function ThermalMachine() {
  const [heat, setHeat] = useState(0); // 0 to 100

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Máquina Térmica (Gás Ideal)</h2>
      <p className="text-slate-400 mb-12 font-medium">Aumente o calor para ver a expansão do gás e o trabalho realizado.</p>

      <div className="relative w-48 h-80 border-4 border-slate-500 rounded-b-xl bg-slate-800 flex flex-col justify-end items-center pb-2">
        {/* Piston */}
        <motion.div 
          className="absolute w-full h-8 bg-slate-400 border-y-4 border-slate-300 z-20"
          animate={{ bottom: `${20 + heat * 0.6}%` }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          <div className="w-2 h-32 bg-slate-400 mx-auto -mt-32" />
        </motion.div>

        {/* Gas Particles */}
        <div className="absolute bottom-0 w-full overflow-hidden z-10" style={{ height: `${20 + heat * 0.6}%` }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-red-400 rounded-full opacity-70"
              animate={{
                x: [Math.random() * 100, Math.random() * 150, Math.random() * 50],
                y: [Math.random() * 100, Math.random() * 150, Math.random() * 50],
              }}
              transition={{
                duration: 2 - (heat / 100) * 1.8, // Faster when hotter
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          ))}
        </div>

        {/* Fire */}
        <motion.div 
          className="absolute -bottom-16 text-orange-500"
          animate={{ scale: 1 + heat / 50, opacity: heat / 100 }}
        >
          <Flame size={64} fill="currentColor" />
        </motion.div>
      </div>

      <div className="w-full max-w-md mt-24 space-y-4">
        <div className="flex justify-between font-bold text-sm">
          <span>Temperatura: {20 + heat * 3}°C</span>
          <span>Volume: {10 + Math.floor(heat * 0.5)} L</span>
        </div>
        <input 
          type="range" 
          min="0" max="100" 
          value={heat} 
          onChange={(e) => setHeat(Number(e.target.value))}
          className="w-full h-4 bg-slate-700 rounded-full appearance-none outline-none cursor-pointer"
        />
      </div>
    </div>
  );
}
