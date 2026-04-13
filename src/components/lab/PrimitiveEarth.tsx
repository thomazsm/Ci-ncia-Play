import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Droplets, Leaf } from 'lucide-react';

export function PrimitiveEarth() {
  const [era, setEra] = useState(0); // 0: Magma, 1: Resfriamento, 2: Oceanos, 3: Vida

  const eras = [
    { title: 'Hadeano (4.5 Bilhões de anos)', desc: 'Terra coberta por magma, vulcões e bombardeio de meteoros.', icon: <Flame className="text-orange-500 w-8 h-8"/>, color: 'bg-orange-900' },
    { title: 'Arqueano (4.0 Bilhões de anos)', desc: 'Resfriamento da crosta terrestre e formação das primeiras rochas.', icon: <Clock className="text-slate-400 w-8 h-8"/>, color: 'bg-slate-800' },
    { title: 'Proterozoico (2.5 Bilhões de anos)', desc: 'Formação dos oceanos primitivos e acúmulo de oxigênio.', icon: <Droplets className="text-blue-400 w-8 h-8"/>, color: 'bg-blue-900' },
    { title: 'Fanerozoico (541 Milhões de anos)', desc: 'Explosão da vida, plantas, dinossauros e mamíferos.', icon: <Leaf className="text-emerald-400 w-8 h-8"/>, color: 'bg-emerald-900' }
  ];

  return (
    <div className={`flex flex-col items-center justify-center p-8 h-full rounded-2xl text-white transition-colors duration-1000 ${eras[era].color}`}>
      <h2 className="text-3xl font-bold mb-2">Terra Primitiva e Tempo Geológico</h2>
      <p className="mb-8 opacity-80 font-medium">Avance no tempo para ver a evolução do nosso planeta.</p>

      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-12 flex items-center justify-center">
        {era === 0 && (
          <motion.div className="absolute inset-0 bg-gradient-to-tr from-red-600 via-orange-500 to-yellow-500" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
        )}
        {era === 1 && (
          <motion.div className="absolute inset-0 bg-gradient-to-tr from-slate-700 via-slate-600 to-slate-800" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
        )}
        {era === 2 && (
          <motion.div className="absolute inset-0 bg-gradient-to-tr from-blue-800 via-blue-600 to-cyan-500" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
        )}
        {era === 3 && (
          <motion.div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-emerald-500 to-green-600" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} />
        )}
        
        {/* Atmosphere glow */}
        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] rounded-full" />
      </div>

      <div className="w-full max-w-2xl bg-black/40 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          {eras[era].icon}
          <h3 className="text-2xl font-bold">{eras[era].title}</h3>
        </div>
        <p className="text-lg opacity-90 mb-6">{eras[era].desc}</p>
        
        <input 
          type="range" 
          min="0" max="3" 
          value={era} 
          onChange={(e) => setEra(Number(e.target.value))}
          className="w-full h-3 bg-white/20 rounded-full appearance-none outline-none cursor-pointer"
        />
        <div className="flex justify-between text-xs mt-2 opacity-60 font-bold uppercase">
          <span>Passado</span>
          <span>Presente</span>
        </div>
      </div>
    </div>
  );
}
