import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Droplets, Wind, Leaf } from 'lucide-react';

export function PhotosynthesisLab() {
  const [light, setLight] = useState(50); // 0-100
  const [water, setWater] = useState(50); // 0-100
  const [co2, setCo2] = useState(50); // 0-100
  const [growth, setGrowth] = useState(0); // 0-100
  const [bubbles, setBubbles] = useState<{id: number, x: number}[]>([]);

  // Photosynthesis rate formula (simplified limiting factor)
  const rate = Math.min(light, water, co2) / 100;

  useEffect(() => {
    const interval = setInterval(() => {
      if (rate > 0.1) {
        setGrowth(g => Math.min(100, g + (rate * 0.5)));
        
        // Generate O2 bubbles
        if (Math.random() < rate) {
          setBubbles(b => [...b, { id: Date.now(), x: 20 + Math.random() * 60 }]);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [rate]);

  // Cleanup old bubbles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setBubbles(b => b.filter(bubble => Date.now() - bubble.id < 2000));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Fábrica de Fotossíntese</h2>
      <p className="mb-8 opacity-80 text-center max-w-2xl">
        Ajuste a Luz, Água e CO₂. A planta só cresce e produz Oxigênio (O₂) se todos os ingredientes estiverem disponíveis!
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center justify-center">
        
        {/* Greenhouse Area */}
        <div className="relative w-64 h-96 bg-slate-800 rounded-t-full border-4 border-slate-600 flex flex-col items-center justify-end overflow-hidden pb-8 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Sun Light Effect */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-yellow-400 mix-blend-overlay transition-opacity duration-300"
            style={{ opacity: light / 100 }}
          />

          {/* O2 Bubbles */}
          <AnimatePresence>
            {bubbles.map(b => (
              <motion.div
                key={b.id}
                initial={{ y: 200, opacity: 1, scale: 0.5 }}
                animate={{ y: -100, opacity: 0, scale: 1.5 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute w-3 h-3 border-2 border-cyan-300 rounded-full z-20"
                style={{ left: `${b.x}%` }}
              />
            ))}
          </AnimatePresence>

          {/* Plant */}
          <div className="relative flex flex-col items-center z-10">
            {/* Leaves */}
            <motion.div 
              className="flex gap-2 mb-[-10px]"
              style={{ scale: 0.5 + (growth / 200) }}
            >
              <div className="w-16 h-16 bg-emerald-500 rounded-tl-full rounded-br-full origin-bottom-right -rotate-12 shadow-lg" />
              <div className="w-16 h-16 bg-emerald-500 rounded-tr-full rounded-bl-full origin-bottom-left rotate-12 shadow-lg" />
            </motion.div>
            {/* Stem */}
            <motion.div 
              className="w-4 bg-emerald-700 rounded-full"
              style={{ height: 40 + growth }}
            />
          </div>

          {/* Soil */}
          <div className="absolute bottom-0 w-full h-16 bg-amber-900 border-t-4 border-amber-800">
            {/* Water level in soil */}
            <div 
              className="absolute bottom-0 w-full bg-blue-500/30 transition-all duration-300"
              style={{ height: `${water}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="w-full md:w-80 space-y-6">
          
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <h3 className="font-bold text-slate-400 mb-2 uppercase tracking-wider text-sm">Taxa de Fotossíntese</h3>
            <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${rate * 100}%` }} />
            </div>
            <div className="text-slate-500 text-sm mt-2">{Math.round(rate * 100)}% de eficiência</div>
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-6">
            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span className="flex items-center gap-2 text-yellow-400"><Sun size={16}/> Luz Solar</span>
                <span>{light}%</span>
              </label>
              <input type="range" min="0" max="100" value={light} onChange={e => setLight(Number(e.target.value))} className="w-full accent-yellow-500" />
            </div>

            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span className="flex items-center gap-2 text-blue-400"><Droplets size={16}/> Água (H₂O)</span>
                <span>{water}%</span>
              </label>
              <input type="range" min="0" max="100" value={water} onChange={e => setWater(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>

            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span className="flex items-center gap-2 text-slate-300"><Wind size={16}/> Gás Carbônico (CO₂)</span>
                <span>{co2}%</span>
              </label>
              <input type="range" min="0" max="100" value={co2} onChange={e => setCo2(Number(e.target.value))} className="w-full accent-slate-400" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
