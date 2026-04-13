import { useState } from 'react';
import { motion } from 'framer-motion';

export function AtmosphereLayers() {
  const [altitude, setAltitude] = useState(10);

  const getLayer = (alt: number) => {
    if (alt < 12) return { name: 'Troposfera', desc: 'Onde vivemos e onde ocorrem os fenômenos meteorológicos.', temp: '15°C a -50°C', color: 'bg-blue-300 text-slate-900' };
    if (alt < 50) return { name: 'Estratosfera', desc: 'Contém a Camada de Ozônio, que absorve raios UV.', temp: '-50°C a 0°C', color: 'bg-blue-500 text-white' };
    if (alt < 85) return { name: 'Mesosfera', desc: 'Camada mais fria, onde meteoros se desintegram.', temp: '0°C a -90°C', color: 'bg-indigo-700 text-white' };
    if (alt < 600) return { name: 'Termosfera', desc: 'Onde ocorrem as auroras boreais. Muito quente.', temp: '-90°C a 1500°C', color: 'bg-purple-900 text-white' };
    return { name: 'Exosfera', desc: 'Limite com o espaço sideral. Satélites orbitam aqui.', temp: 'Varia muito', color: 'bg-black text-white' };
  };

  const layer = getLayer(altitude);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 h-full bg-slate-900 rounded-2xl text-white">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Altitude: {altitude} km</h2>
        <input 
          type="range" 
          min="0" max="800" 
          value={altitude} 
          onChange={(e) => setAltitude(Number(e.target.value))}
          className="w-8 h-64 appearance-none bg-slate-700 rounded-full outline-none cursor-pointer"
          style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
        />
      </div>
      <motion.div 
        key={layer.name}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`p-8 rounded-3xl max-w-md w-full border border-white/20 shadow-2xl ${layer.color}`}
      >
        <h3 className="text-4xl font-black mb-2">{layer.name}</h3>
        <p className="text-xl mb-6 opacity-90 font-medium">{layer.desc}</p>
        <div className="bg-black/30 p-4 rounded-xl text-white">
          <span className="block text-sm uppercase tracking-wider opacity-70 font-bold">Temperatura Média</span>
          <span className="text-2xl font-bold">{layer.temp}</span>
        </div>
        {layer.name === 'Estratosfera' && (
          <div className="mt-4 bg-emerald-500/30 p-4 rounded-xl border border-emerald-500/50 text-white font-bold">
            🛡️ Camada de Ozônio ativa! Protegendo contra raios UV.
          </div>
        )}
      </motion.div>
    </div>
  );
}
