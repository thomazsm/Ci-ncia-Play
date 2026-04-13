import { useState } from 'react';
import { motion } from 'framer-motion';

export function SimpleMachines() {
  const [fulcrumPos, setFulcrumPos] = useState(50); // 20 to 80
  
  // Calculate mechanical advantage
  const effortArm = fulcrumPos;
  const loadArm = 100 - fulcrumPos;
  const forceNeeded = Math.round((loadArm / effortArm) * 100);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-100 dark:bg-slate-900 rounded-2xl">
      <h2 className="text-3xl font-bold mb-2 text-foreground">Alavanca (Máquina Simples)</h2>
      <p className="text-muted-foreground mb-12 font-medium">Mova o ponto de apoio (fulcro) para ver como a força necessária muda.</p>
      
      <div className="relative w-full max-w-2xl h-64 flex flex-col items-center justify-center">
        {/* Load (Box) */}
        <motion.div 
          className="absolute top-10 right-0 w-20 h-20 bg-amber-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg z-20"
          animate={{ y: forceNeeded > 100 ? 20 : -20 }}
        >
          100kg
        </motion.div>
        
        {/* Effort (Arrow) */}
        <motion.div 
          className="absolute top-0 left-0 flex flex-col items-center text-primary font-bold text-xl z-20"
          animate={{ y: forceNeeded > 100 ? -20 : 20 }}
        >
          ↓ Força: {forceNeeded}kg
        </motion.div>

        {/* Lever (Board) */}
        <motion.div 
          className="w-full h-4 bg-slate-400 dark:bg-slate-600 rounded-full absolute top-32 origin-center z-10"
          animate={{ rotate: forceNeeded > 100 ? 10 : -10 }}
        />

        {/* Fulcrum (Triangle) */}
        <div 
          className="absolute top-36 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-primary transition-all duration-300 z-0"
          style={{ left: `${fulcrumPos}%`, transform: 'translateX(-50%)' }}
        />
      </div>

      <input 
        type="range" 
        min="20" max="80" 
        value={fulcrumPos} 
        onChange={(e) => setFulcrumPos(Number(e.target.value))}
        className="w-full max-w-md mt-12 cursor-pointer"
      />
      <div className="flex justify-between w-full max-w-md mt-2 text-sm font-bold text-muted-foreground">
        <span>Mais Força Necessária</span>
        <span>Menos Força Necessária</span>
      </div>
    </div>
  );
}
