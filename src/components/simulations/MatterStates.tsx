import { useEffect, useRef, useState } from 'react';

export function MatterStates() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperature, setTemperature] = useState(20); // 0 to 100

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Initialize particles
    const numParticles = 64; // 8x8 grid for solid
    const particles: { x: number, y: number, vx: number, vy: number, targetX: number, targetY: number, radius: number }[] = [];
    
    const cols = 8;
    const spacing = 25;
    const startX = canvas.width / 2 - (cols * spacing) / 2 + spacing / 2;
    const startY = canvas.height - (cols * spacing) - 20;

    for (let i = 0; i < numParticles; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const tx = startX + col * spacing;
      const ty = startY + row * spacing;
      particles.push({
        x: tx,
        y: ty,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        targetX: tx,
        targetY: ty,
        radius: 10
      });
    }

    const resolveCollision = (p1: typeof particles[0], p2: typeof particles[0]) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = p1.radius + p2.radius;

      if (distance < minDistance) {
        // Resolve overlap
        const overlap = minDistance - distance;
        const nx = dx / distance;
        const ny = dy / distance;
        
        p1.x -= nx * overlap * 0.5;
        p1.y -= ny * overlap * 0.5;
        p2.x += nx * overlap * 0.5;
        p2.y += ny * overlap * 0.5;

        // Simple elastic bounce
        const kx = (p1.vx - p2.vx);
        const ky = (p1.vy - p2.vy);
        const p = 2.0 * (nx * kx + ny * ky) / 2;
        
        p1.vx = p1.vx - p * nx;
        p1.vy = p1.vy - p * ny;
        p2.vx = p2.vx + p * nx;
        p2.vy = p2.vy + p * ny;
      }
    };

    const render = () => {
      // Create trailing effect for gas/liquid
      ctx.fillStyle = `rgba(30, 41, 59, ${temperature > 50 ? 0.3 : 1})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw container
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(10, canvas.height - 10);
      ctx.lineTo(canvas.width - 10, canvas.height - 10);
      ctx.lineTo(canvas.width - 10, 10);
      ctx.stroke();

      const isSolid = temperature < 30;
      const isLiquid = temperature >= 30 && temperature < 70;
      const isGas = temperature >= 70;

      const speedMultiplier = temperature / 20;

      // Update physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isSolid) {
          // Pull to target grid position
          p.vx += (p.targetX - p.x) * 0.1;
          p.vy += (p.targetY - p.y) * 0.1;
          // Add thermal vibration
          p.vx += (Math.random() - 0.5) * speedMultiplier;
          p.vy += (Math.random() - 0.5) * speedMultiplier;
          // Damping
          p.vx *= 0.8;
          p.vy *= 0.8;
        } else if (isLiquid) {
          // Gravity pull
          p.vy += 0.5;
          // Thermal movement
          p.vx += (Math.random() - 0.5) * speedMultiplier;
          p.vy += (Math.random() - 0.5) * speedMultiplier;
          // Damping
          p.vx *= 0.95;
          p.vy *= 0.95;
        } else if (isGas) {
          // High thermal movement, no gravity
          p.vx += (Math.random() - 0.5) * speedMultiplier * 2;
          p.vy += (Math.random() - 0.5) * speedMultiplier * 2;
          // Less damping
          p.vx *= 0.99;
          p.vy *= 0.99;
        }

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Collision with walls
        if (p.x < 10 + p.radius) { p.x = 10 + p.radius; p.vx *= -1; }
        if (p.x > canvas.width - 10 - p.radius) { p.x = canvas.width - 10 - p.radius; p.vx *= -1; }
        if (p.y < 10 + p.radius) { p.y = 10 + p.radius; p.vy *= -1; }
        if (p.y > canvas.height - 10 - p.radius) { p.y = canvas.height - 10 - p.radius; p.vy *= -1; }
      }

      // Particle-Particle Collisions (only for liquid and gas to allow flow)
      if (!isSolid) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            resolveCollision(particles[i], particles[j]);
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Dynamic color based on temperature
        if (isSolid) {
          ctx.fillStyle = '#3b82f6';
          ctx.shadowColor = '#60a5fa';
          ctx.shadowBlur = 5;
        } else if (isLiquid) {
          ctx.fillStyle = '#0ea5e9';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = '#ef4444';
          ctx.shadowColor = '#f87171';
          ctx.shadowBlur = 15;
        }
        
        ctx.fill();
        ctx.closePath();
      });
      
      // Reset shadow for container
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [temperature]);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl p-6 shadow-2xl">
      <div className="flex-1 flex items-center justify-center min-h-[400px] relative">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={400} 
          className="bg-slate-900 rounded-lg shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] max-w-full h-auto border border-slate-700"
        />
        {/* Heat source visual */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full blur-xl transition-all duration-300"
          style={{ 
            background: temperature > 50 ? `rgba(239, 68, 68, ${temperature / 100})` : 'transparent',
            boxShadow: temperature > 50 ? `0 0 30px rgba(239, 68, 68, ${temperature / 100})` : 'none'
          }}
        />
      </div>
      
      <div className="mt-8 bg-slate-900/80 backdrop-blur-md p-6 rounded-xl border border-slate-700 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Temperatura</h3>
          <span className={`text-2xl font-mono font-bold ${temperature < 30 ? 'text-blue-400' : temperature < 70 ? 'text-sky-400' : 'text-red-500'}`}>
            {temperature}°C
          </span>
        </div>
        
        <input 
          type="range" 
          min="0" max="100" 
          value={temperature} 
          onChange={(e) => setTemperature(Number(e.target.value))}
          className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
          style={{ accentColor: temperature < 30 ? '#3b82f6' : temperature < 70 ? '#0ea5e9' : '#ef4444' }}
        />
        
        <div className="flex justify-between text-sm font-bold text-slate-500 mt-3">
          <span className={temperature < 30 ? 'text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]' : ''}>Sólido</span>
          <span className={temperature >= 30 && temperature < 70 ? 'text-sky-400 drop-shadow-[0_0_5px_rgba(14,165,233,0.8)]' : ''}>Líquido</span>
          <span className={temperature >= 70 ? 'text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]' : ''}>Gasoso</span>
        </div>
      </div>
    </div>
  );
}
