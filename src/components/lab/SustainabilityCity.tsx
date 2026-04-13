import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Wind, Recycle, Car, Factory, TreePine } from 'lucide-react';

export function SustainabilityCity() {
  const [solar, setSolar] = useState(false);
  const [recycling, setRecycling] = useState(false);
  const [publicTransport, setPublicTransport] = useState(false);

  const score = (solar ? 30 : 0) + (recycling ? 30 : 0) + (publicTransport ? 40 : 0);
  const isGreen = score > 50;

  return (
    <div className={`flex flex-col items-center justify-center p-8 h-full rounded-2xl transition-colors duration-1000 ${isGreen ? 'bg-emerald-900 text-white' : 'bg-slate-800 text-slate-200'}`}>
      <h2 className="text-3xl font-bold mb-2">Cidade Sustentável</h2>
      <p className="mb-8 opacity-80 font-medium">Ative as políticas públicas para melhorar a qualidade de vida e reduzir a poluição.</p>

      <div className="flex flex-col md:flex-row gap-12 items-center w-full max-w-4xl">
        {/* City Visual */}
        <div className="flex-1 relative h-64 w-full bg-black/20 rounded-3xl overflow-hidden border border-white/10 flex items-end justify-center pb-8">
          {/* Sky */}
          <div className={`absolute inset-0 transition-colors duration-1000 ${isGreen ? 'bg-blue-400/20' : 'bg-amber-900/40'}`} />
          
          {/* Elements */}
          <div className="flex gap-4 items-end z-10">
            {solar ? <Sun className="w-16 h-16 text-yellow-400 mb-12 animate-spin-slow" /> : <Factory className="w-16 h-16 text-slate-500 mb-4" />}
            <TreePine className={`w-24 h-24 transition-colors duration-1000 ${isGreen ? 'text-emerald-500' : 'text-emerald-900'}`} />
            <div className={`w-32 h-48 rounded-t-xl transition-colors duration-1000 ${isGreen ? 'bg-slate-300' : 'bg-slate-700'}`} />
            <div className={`w-24 h-32 rounded-t-xl transition-colors duration-1000 ${isGreen ? 'bg-slate-400' : 'bg-slate-600'}`} />
            {publicTransport ? <div className="w-20 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-xs font-bold">METRÔ</div> : <Car className="w-12 h-12 text-red-500" />}
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-4 w-full">
          <div className="bg-black/20 p-6 rounded-2xl mb-6">
            <div className="text-sm uppercase tracking-wider opacity-70 mb-2 font-bold">Índice de Sustentabilidade</div>
            <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${isGreen ? 'bg-emerald-500' : 'bg-red-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
              />
            </div>
            <div className="text-right mt-2 font-bold">{score}%</div>
          </div>

          <button onClick={() => setSolar(!solar)} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-colors ${solar ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>
            <span className="flex items-center gap-3"><Sun size={20}/> Energia Solar</span>
            <span>{solar ? 'Ativado' : 'Desativado'}</span>
          </button>
          <button onClick={() => setRecycling(!recycling)} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-colors ${recycling ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>
            <span className="flex items-center gap-3"><Recycle size={20}/> Reciclagem Obrigatória</span>
            <span>{recycling ? 'Ativado' : 'Desativado'}</span>
          </button>
          <button onClick={() => setPublicTransport(!publicTransport)} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-colors ${publicTransport ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>
            <span className="flex items-center gap-3"><Wind size={20}/> Transporte Público Verde</span>
            <span>{publicTransport ? 'Ativado' : 'Desativado'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
