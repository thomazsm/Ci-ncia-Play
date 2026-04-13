import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, ArrowDownToLine, Flame } from 'lucide-react';

export function GasLaws() {
  const [temperature, setTemperature] = useState(300); // Kelvin (200 to 600)
  const [volume, setVolume] = useState(50); // % (20 to 100)
  
  // Ideal Gas Law: P = (nRT) / V. We'll use a simplified proportional constant.
  const pressure = Math.round((temperature / volume) * 10); 

  // Generate random particles
  const [particles, setParticles] = useState(Array.from({ length: 30 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
  })));

  useEffect(() => {
    const speedMultiplier = temperature / 300;
    
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => {
        let newX = p.x + p.vx * speedMultiplier;
        let newY = p.y + p.vy * speedMultiplier;
        let newVx = p.vx;
        let newVy = p.vy;

        // Bounce off walls (0 to 100% width, 0 to volume% height)
        if (newX <= 0 || newX >= 100) { newVx *= -1; newX = Math.max(0, Math.min(100, newX)); }
        if (newY <= 0 || newY >= volume) { newVy *= -1; newY = Math.max(0, Math.min(volume, newY)); }

        return { x: newX, y: newY, vx: newVx, vy: newVy };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [temperature, volume]);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Seringa de Gases (Leis dos Gases)</h2>
      <p className="mb-8 opacity-80 text-center max-w-2xl">
        Altere a temperatura e o volume para ver como a pressão e a agitação das moléculas mudam.
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center justify-center">
        
        {/* Syringe Area */}
        <div className="relative w-64 h-96 bg-slate-800 rounded-3xl border-4 border-slate-700 flex flex-col items-center justify-end overflow-hidden pb-8">
          
          {/* Piston Handle */}
          <div 
            className="absolute w-4 h-full bg-slate-600 top-0 transition-all duration-300"
            style={{ height: `${100 - volume}%` }}
          />
          {/* Piston Head */}
          <div 
            className="absolute w-full h-4 bg-slate-400 transition-all duration-300 z-20"
            style={{ bottom: `${volume}%` }}
          />

          {/* Gas Chamber */}
          <div 
            className="absolute bottom-0 w-full bg-blue-500/10 border-t-4 border-blue-500/30 transition-all duration-300"
            style={{ height: `${volume}%` }}
          >
            {/* Particles */}
            {particles.map((p, i) => (
              <div 
                key={i}
                className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_5px_rgba(96,165,250,0.8)]"
                style={{ left: `calc(${p.x}% - 6px)`, bottom: `calc(${p.y}% - 6px)` }}
              />
            ))}
          </div>

          {/* Fire (if hot) */}
          {temperature > 400 && (
            <div className="absolute -bottom-4 flex gap-2 text-orange-500 animate-pulse">
              <Flame size={32} /><Flame size={40} /><Flame size={32} />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="w-full md:w-80 space-y-6">
          
          {/* Pressure Gauge */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <h3 className="font-bold text-slate-400 mb-2 uppercase tracking-wider text-sm">Pressão Interna</h3>
            <div className="text-5xl font-black text-emerald-400">{pressure}</div>
            <div className="text-slate-500 text-sm mt-1">atm (relativo)</div>
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-6">
            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span className="flex items-center gap-2"><Thermometer size={16}/> Temperatura</span>
                <span className={temperature > 400 ? 'text-orange-400' : 'text-blue-400'}>{temperature} K</span>
              </label>
              <input 
                type="range" min="200" max="600" 
                value={temperature} 
                onChange={e => setTemperature(Number(e.target.value))} 
                className="w-full accent-orange-500" 
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span className="flex items-center gap-2"><ArrowDownToLine size={16}/> Volume</span>
                <span>{volume} mL</span>
              </label>
              <input 
                type="range" min="20" max="100" 
                value={volume} 
                onChange={e => setVolume(Number(e.target.value))} 
                className="w-full accent-blue-500" 
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
