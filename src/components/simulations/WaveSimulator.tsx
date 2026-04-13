import { useState, useEffect } from 'react';

export function WaveSimulator() {
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(5);
  const [speed, setSpeed] = useState(2);
  const [time, setTime] = useState(0);

  // Simple animation loop for the wave
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setTime((t) => t + speed * 0.05);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [speed]);

  const generateWavePath = (phaseOffset = 0, ampMult = 1, freqMult = 1) => {
    const points = [];
    for (let x = 0; x <= 800; x += 5) {
      const y = 200 + Math.sin((x * frequency * freqMult) / 100 - time + phaseOffset) * (amplitude * ampMult);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-6 rounded-xl">
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <svg width="100%" height="100%" viewBox="0 0 800 400" className="bg-slate-800 rounded-lg border border-slate-700 shadow-inner">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Grid lines */}
          <line x1="0" y1="200" x2="800" y2="200" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="400" y1="0" x2="400" y2="400" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Secondary Wave (Interference) */}
          <path d={generateWavePath(Math.PI, 0.5, 1.5)} fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.5" filter="url(#glow-pink)" />
          
          {/* The Main Wave */}
          <path d={generateWavePath()} fill="none" stroke="#06b6d4" strokeWidth="4" filter="url(#glow)" />
        </svg>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="space-y-2">
          <label className="flex justify-between text-sm font-medium text-slate-300">
            <span>Amplitude (Altura)</span>
            <span className="text-cyan-400">{amplitude}</span>
          </label>
          <input 
            type="range" 
            min="10" max="150" 
            value={amplitude} 
            onChange={(e) => setAmplitude(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
        
        <div className="space-y-2">
          <label className="flex justify-between text-sm font-medium text-slate-300">
            <span>Frequência (Ondas)</span>
            <span className="text-cyan-400">{frequency}</span>
          </label>
          <input 
            type="range" 
            min="1" max="20" 
            value={frequency} 
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <label className="flex justify-between text-sm font-medium text-slate-300">
            <span>Velocidade</span>
            <span className="text-cyan-400">{speed}</span>
          </label>
          <input 
            type="range" 
            min="0" max="10" step="0.5"
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}
