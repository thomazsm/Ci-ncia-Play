import { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Droplets, Wind, Leaf, ArrowRight } from 'lucide-react';

interface Molecule {
  id: number;
  type: 'water' | 'co2';
  x: number;
  y: number;
}

export function Photosynthesis() {
  const [molecules, setMolecules] = useState<Molecule[]>([]);
  const [glucoseCount, setGlucoseCount] = useState(0);
  const [oxygenCount, setOxygenCount] = useState(0);
  const [waterIn, setWaterIn] = useState(0);
  const [co2In, setCo2In] = useState(0);

  const addMolecule = (type: 'water' | 'co2') => {
    const newMol: Molecule = {
      id: Date.now(),
      type,
      x: Math.random() * 80 + 10,
      y: -20,
    };
    setMolecules([...molecules, newMol]);
  };

  const handleDrop = (id: number, type: 'water' | 'co2') => {
    setMolecules(molecules.filter(m => m.id !== id));
    if (type === 'water') setWaterIn(prev => prev + 1);
    if (type === 'co2') setCo2In(prev => prev + 1);

    // Photosynthesis formula: 6 CO2 + 6 H2O -> C6H12O6 + 6 O2
    if (waterIn >= 5 && co2In >= 5) {
      setWaterIn(0);
      setCo2In(0);
      setGlucoseCount(prev => prev + 1);
      setOxygenCount(prev => prev + 6);
    }
  };

  return (
    <div className="flex flex-col h-full bg-emerald-950 rounded-xl overflow-hidden relative font-sans">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10 bg-slate-900/90 p-6 rounded-2xl backdrop-blur-md border border-emerald-500/30 shadow-2xl max-w-sm">
        <h3 className="font-bold text-emerald-400 text-2xl mb-2 flex items-center gap-2">
          <Leaf className="w-6 h-6" /> Fábrica de Oxigênio
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          Ajude a planta a realizar a fotossíntese! Arraste água e CO₂ para dentro do cloroplasto.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-emerald-900/40 p-3 rounded-xl border border-emerald-500/20">
            <div className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold mb-1">Glicose Produzida</div>
            <div className="text-2xl font-mono text-white">{glucoseCount}</div>
          </div>
          <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-500/20">
            <div className="text-[10px] uppercase tracking-wider text-blue-500 font-bold mb-1">Oxigênio Liberado</div>
            <div className="text-2xl font-mono text-white">{oxygenCount}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>H₂O (Água): {waterIn}/6</span>
            <span>CO₂ (Gás Carbônico): {co2In}/6</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
            <motion.div 
              className="bg-blue-500 h-full" 
              animate={{ width: `${(waterIn / 6) * 50}%` }}
            />
            <motion.div 
              className="bg-slate-400 h-full" 
              animate={{ width: `${(co2In / 6) * 50}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className="flex-1 relative overflow-hidden">
        {/* Sun Rays */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <Sun className="absolute top-8 right-8 w-16 h-16 text-yellow-400 animate-pulse" />

        {/* Chloroplast (Drop Zone) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-80 h-80 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-emerald-800/40 border-4 border-emerald-400/50 backdrop-blur-sm relative flex items-center justify-center"
            animate={{ 
              borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <div className="text-center">
              <div className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2">Cloroplasto</div>
              <div className="flex gap-2 justify-center">
                <div className="w-2 h-8 bg-emerald-500/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-8 bg-emerald-500/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-8 bg-emerald-500/30 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>

            {/* Internal Thylakoids */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-12 h-4 bg-emerald-600/40 rounded-full border border-emerald-400/20"
                style={{ 
                  top: `${20 + i * 15}%`, 
                  left: `${30 + (i % 2) * 20}%`,
                  transform: `rotate(${i * 15}deg)`
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Draggable Molecules */}
        <AnimatePresence>
          {molecules.map((mol) => (
            <motion.div
              key={mol.id}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragEnd={(_, info) => {
                // Simple hit detection for the center zone
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                if (Math.abs(info.point.x - centerX) < 150 && Math.abs(info.point.y - centerY) < 150) {
                  handleDrop(mol.id, mol.type);
                }
              }}
              initial={{ scale: 0, x: `${mol.x}%`, y: '90%' }}
              animate={{ scale: 1, y: '80%' }}
              exit={{ scale: 0, opacity: 0 }}
              className={`absolute cursor-grab active:cursor-grabbing p-3 rounded-full shadow-lg border-2 flex items-center gap-2 backdrop-blur-md ${
                mol.type === 'water' 
                  ? 'bg-blue-500/30 border-blue-400 text-blue-200' 
                  : 'bg-slate-500/30 border-slate-400 text-slate-200'
              }`}
            >
              {mol.type === 'water' ? <Droplets className="w-4 h-4" /> : <Wind className="w-4 h-4" />}
              <span className="text-xs font-bold">{mol.type === 'water' ? 'H₂O' : 'CO₂'}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        <button 
          onClick={() => addMolecule('water')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-blue-900/40 flex items-center gap-2 transition-all active:scale-95"
        >
          <Droplets className="w-5 h-5" /> Adicionar Água
        </button>
        <button 
          onClick={() => addMolecule('co2')}
          className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-slate-900/40 flex items-center gap-2 transition-all active:scale-95"
        >
          <Wind className="w-5 h-5" /> Adicionar CO₂
        </button>
      </div>

      {/* Formula Overlay */}
      <div className="absolute bottom-4 right-4 text-[10px] text-emerald-500/50 font-mono">
        6 CO₂ + 6 H₂O + Luz → C₆H₁₂O₆ + 6 O₂
      </div>
    </div>
  );
}
