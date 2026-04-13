import { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export function ProjectileCannon() {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(50);
  const [gravity, setGravity] = useState(9.8);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => {
          const newT = t + 0.1;
          const y = velocity * Math.sin(angle * Math.PI / 180) * newT - 0.5 * gravity * newT * newT;
          if (y < 0) {
            setIsRunning(false);
            return t;
          }
          return newT;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, angle, velocity, gravity]);

  const x = velocity * Math.cos(angle * Math.PI / 180) * time;
  const y = Math.max(0, velocity * Math.sin(angle * Math.PI / 180) * time - 0.5 * gravity * time * time);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Canhão de Projéteis</h2>
      <p className="mb-8 opacity-80">Ajuste o ângulo e a força para ver a trajetória parabólica.</p>
      
      <div className="relative w-full max-w-3xl h-96 bg-slate-800 rounded-3xl border-4 border-slate-700 overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-slate-600 rounded-tr-full z-20" />
        <div 
          className="absolute bottom-4 left-4 w-24 h-6 bg-slate-500 rounded-full origin-left z-10"
          style={{ transform: `rotate(-${angle}deg)` }}
        />
        
        <div 
          className="absolute bottom-4 left-4 w-6 h-6 bg-red-500 rounded-full z-30 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
          style={{ transform: `translate(${x * 2}px, -${y * 2}px)` }}
        />
      </div>

      <div className="flex gap-8 w-full max-w-3xl bg-black/40 p-6 rounded-2xl">
        <div className="flex-1 space-y-4">
          <div>
            <label className="flex justify-between text-sm font-bold text-slate-400"><span>Ângulo</span><span>{angle}°</span></label>
            <input type="range" min="0" max="90" value={angle} onChange={e => setAngle(Number(e.target.value))} disabled={isRunning} className="w-full accent-blue-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-bold text-slate-400"><span>Força (Velocidade)</span><span>{velocity} m/s</span></label>
            <input type="range" min="10" max="100" value={velocity} onChange={e => setVelocity(Number(e.target.value))} disabled={isRunning} className="w-full accent-red-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-bold text-slate-400"><span>Gravidade</span><span>{gravity} m/s²</span></label>
            <select value={gravity} onChange={e => setGravity(Number(e.target.value))} disabled={isRunning} className="w-full bg-slate-700 p-2 rounded-lg mt-1">
              <option value={9.8}>Terra (9.8 m/s²)</option>
              <option value={1.6}>Lua (1.6 m/s²)</option>
              <option value={24.7}>Júpiter (24.7 m/s²)</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <button onClick={() => { setTime(0); setIsRunning(true); }} disabled={isRunning} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-xl font-bold flex items-center gap-2"><Play /> Disparar</button>
          <button onClick={() => { setTime(0); setIsRunning(false); }} className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold flex items-center gap-2"><RotateCcw /> Resetar</button>
        </div>
      </div>
    </div>
  );
}
