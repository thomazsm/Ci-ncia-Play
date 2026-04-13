import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function GravitySimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [planetMass, setPlanetMass] = useState(1);
  const [planetVelocity, setPlanetVelocity] = useState(3);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  
  // Physics state
  const state = useRef({
    x: 150, // initial distance from sun
    y: 0,
    vx: 0,
    vy: 3, // initial velocity
    trail: [] as {x: number, y: number}[]
  });

  const G = 1000; // Gravitational constant scaled for visual
  const sunMass = 10;

  const reset = () => {
    setIsRunning(false);
    state.current = {
      x: 150,
      y: 0,
      vx: 0,
      vy: planetVelocity,
      trail: []
    };
    draw();
  };

  // Update initial velocity when slider changes (only if not running)
  useEffect(() => {
    if (!isRunning) {
      state.current.vy = planetVelocity;
      state.current.trail = [];
      draw();
    }
  }, [planetVelocity]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Clear
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Stars (static background)
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 50; i++) {
      // Use a pseudo-random based on index to keep stars static
      const sx = (Math.sin(i * 12.34) * 0.5 + 0.5) * canvas.width;
      const sy = (Math.cos(i * 43.21) * 0.5 + 0.5) * canvas.height;
      const size = (Math.sin(i) * 0.5 + 0.5) * 1.5;
      ctx.globalAlpha = (Math.sin(Date.now() / 1000 + i) * 0.5 + 0.5) * 0.8 + 0.2;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Draw Trail
    if (state.current.trail.length > 0) {
      ctx.beginPath();
      ctx.moveTo(cx + state.current.trail[0].x, cy + state.current.trail[0].y);
      for (let i = 1; i < state.current.trail.length; i++) {
        ctx.lineTo(cx + state.current.trail[i].x, cy + state.current.trail[i].y);
      }
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)'; // blue-500
      ctx.lineWidth = 3;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#3b82f6';
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    }

    // Draw Sun
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#eab308'; // yellow-500
    ctx.shadowBlur = 40;
    ctx.shadowColor = '#eab308';
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    // Draw Planet
    ctx.beginPath();
    ctx.arc(cx + state.current.x, cy + state.current.y, 8 + (planetMass * 2), 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6'; // blue-500
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#3b82f6';
    ctx.fill();
    ctx.shadowBlur = 0; // reset
  };

  const updatePhysics = () => {
    const s = state.current;
    const dt = 0.1;

    // Distance to sun (0,0)
    const r2 = s.x * s.x + s.y * s.y;
    const r = Math.sqrt(r2);

    // Collision with sun
    if (r < 25) {
      setIsRunning(false);
      return;
    }

    // Gravity force magnitude: F = G * M1 * M2 / r^2
    // Acceleration: a = F / M2 = G * M1 / r^2
    const a = (G * sunMass) / r2;

    // Acceleration components
    const ax = -a * (s.x / r);
    const ay = -a * (s.y / r);

    // Update velocity
    s.vx += ax * dt;
    s.vy += ay * dt;

    // Update position
    s.x += s.vx * dt;
    s.y += s.vy * dt;

    // Save trail
    if (Math.random() < 0.2) {
      s.trail.push({ x: s.x, y: s.y });
      if (s.trail.length > 200) s.trail.shift();
    }
  };

  const loop = () => {
    if (isRunning) {
      updatePhysics();
      draw();
      requestRef.current = requestAnimationFrame(loop);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning]);

  // Initial draw
  useEffect(() => {
    draw();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Simulador de Gravidade e Órbitas</h2>
      <p className="mb-8 opacity-80 text-center max-w-2xl">
        Ajuste a velocidade inicial do planeta. Se for muito devagar, ele cai na estrela. Se for muito rápido, ele escapa da órbita!
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-center justify-center">
        
        {/* Canvas Area */}
        <div className="relative bg-slate-900 rounded-3xl border-4 border-slate-700 overflow-hidden shadow-2xl">
          <canvas 
            ref={canvasRef} 
            width={500} 
            height={400} 
            className="block"
          />
        </div>

        {/* Controls */}
        <div className="w-full md:w-80 space-y-6">
          
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-6">
            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span>Velocidade Inicial</span>
                <span>{planetVelocity} km/s</span>
              </label>
              <input 
                type="range" min="1" max="6" step="0.1"
                value={planetVelocity} 
                onChange={e => setPlanetVelocity(Number(e.target.value))} 
                disabled={isRunning}
                className="w-full accent-blue-500" 
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span>Massa do Planeta</span>
                <span>{planetMass}x</span>
              </label>
              <input 
                type="range" min="1" max="5" step="1"
                value={planetMass} 
                onChange={e => setPlanetMass(Number(e.target.value))} 
                className="w-full accent-emerald-500" 
              />
              <p className="text-xs text-slate-500 mt-2">A massa do planeta não afeta a órbita, apenas o visual (Princípio da Equivalência).</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${isRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
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
  );
}
