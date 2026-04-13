import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function EnergySkatePark() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [mass, setMass] = useState(50); // kg
  
  // Physics constants
  const gravity = 9.8;
  const maxHeight = 5; // meters
  const trackWidth = 300; // pixels for visual

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 0.05);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Simple harmonic motion for the U-ramp
  // x = A * cos(wt), y = x^2 (parabola)
  const omega = Math.sqrt(gravity / maxHeight); // angular frequency
  const positionX = Math.cos(omega * time); // ranges from -1 to 1
  const positionY = positionX * positionX; // ranges from 0 to 1 (1 is top, 0 is bottom)

  // Energy calculations
  const totalEnergy = mass * gravity * maxHeight;
  const potentialEnergy = mass * gravity * (positionY * maxHeight);
  const kineticEnergy = totalEnergy - potentialEnergy;

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Pista de Skate (Energia)</h2>
      <p className="mb-8 opacity-80 text-center max-w-2xl">
        Observe a transformação entre Energia Potencial (altura) e Energia Cinética (velocidade). A energia total se conserva!
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-center justify-center">
        
        {/* Skate Park Area */}
        <div className="relative w-full max-w-lg h-80 bg-slate-800 rounded-3xl border-4 border-slate-700 flex items-end justify-center overflow-hidden pb-8">
          
          {/* U-Ramp SVG */}
          <svg width="400" height="200" viewBox="0 0 400 200" className="absolute bottom-8">
            <path d="M 50 0 Q 200 400 350 0" fill="none" stroke="#475569" strokeWidth="16" strokeLinecap="round" />
            <path d="M 50 0 Q 200 400 350 0" fill="none" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
          </svg>

          {/* Skater (Ball) */}
          <motion.div 
            className="absolute w-8 h-8 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10"
            style={{ 
              left: `calc(50% + ${positionX * 150}px - 16px)`, 
              bottom: 32 + (positionY * 150) 
            }}
          />
        </div>

        {/* Controls & Charts */}
        <div className="w-full md:w-80 space-y-6">
          
          {/* Energy Bar Charts */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-slate-300 mb-4">Gráficos de Energia</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-blue-400">
                <span>Energia Potencial</span>
                <span>{Math.round(potentialEnergy)} J</span>
              </div>
              <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-75" style={{ width: `${(potentialEnergy / totalEnergy) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-red-400">
                <span>Energia Cinética</span>
                <span>{Math.round(kineticEnergy)} J</span>
              </div>
              <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 transition-all duration-75" style={{ width: `${(kineticEnergy / totalEnergy) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex justify-between text-xs font-bold text-emerald-400">
                <span>Energia Total</span>
                <span>{Math.round(totalEnergy)} J</span>
              </div>
              <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400"><span>Massa do Skatista</span><span>{mass} kg</span></label>
              <input type="range" min="10" max="100" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-emerald-500 mt-2" />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${isRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
              >
                {isRunning ? <><Pause size={20}/> Pausar</> : <><Play size={20}/> Iniciar</>}
              </button>
              <button onClick={reset} className="px-4 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
