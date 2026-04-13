import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Leaf, Rabbit, PawPrint, ArrowRight } from 'lucide-react';

export function FoodWeb() {
  const [level, setLevel] = useState(1); // 1: Sun, 2: Producer, 3: Primary, 4: Secondary

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Ecologia e Fluxo de Energia</h2>
      <p className="mb-8 opacity-80 font-medium">Acompanhe a transferência de energia ao longo da cadeia alimentar (Regra dos 10%).</p>

      <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-4xl mb-12 flex-wrap">
        
        {/* Sun */}
        <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${level >= 1 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center border-2 border-yellow-500">
            <Sun className="w-12 h-12 text-yellow-400 animate-spin-slow" />
          </div>
          <span className="font-bold text-yellow-400">Sol</span>
          <span className="text-xs bg-yellow-500/20 px-2 py-1 rounded">1.000.000 J</span>
        </div>

        <ArrowRight className={`w-8 h-8 text-slate-600 transition-opacity ${level >= 2 ? 'opacity-100' : 'opacity-30'}`} />

        {/* Producer */}
        <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${level >= 2 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500">
            <Leaf className="w-12 h-12 text-emerald-400" />
          </div>
          <span className="font-bold text-emerald-400">Produtor</span>
          <span className="text-xs bg-emerald-500/20 px-2 py-1 rounded">10.000 J</span>
        </div>

        <ArrowRight className={`w-8 h-8 text-slate-600 transition-opacity ${level >= 3 ? 'opacity-100' : 'opacity-30'}`} />

        {/* Primary Consumer */}
        <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${level >= 3 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-500">
            <Rabbit className="w-12 h-12 text-blue-400" />
          </div>
          <span className="font-bold text-blue-400">Consumidor 1º</span>
          <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">1.000 J</span>
        </div>

        <ArrowRight className={`w-8 h-8 text-slate-600 transition-opacity ${level >= 4 ? 'opacity-100' : 'opacity-30'}`} />

        {/* Secondary Consumer */}
        <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${level >= 4 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500">
            <PawPrint className="w-12 h-12 text-red-400" />
          </div>
          <span className="font-bold text-red-400">Consumidor 2º</span>
          <span className="text-xs bg-red-500/20 px-2 py-1 rounded">100 J</span>
        </div>

      </div>

      <div className="w-full max-w-xl">
        <input 
          type="range" 
          min="1" max="4" 
          value={level} 
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full h-4 bg-slate-700 rounded-full appearance-none outline-none cursor-pointer accent-yellow-500"
        />
        <div className="text-center mt-6 bg-black/40 p-4 rounded-xl border border-white/10">
          <p className="text-slate-300">
            Apenas cerca de <strong className="text-yellow-400">10% da energia</strong> é transferida de um nível trófico para o próximo. 
            O resto é perdido na forma de calor e processos metabólicos.
          </p>
        </div>
      </div>
    </div>
  );
}
