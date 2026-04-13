import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Droplet } from 'lucide-react';

const SUBSTANCES = {
  lemon: { name: 'Suco de Limão', ph: 2, color: 'bg-yellow-400' },
  vinegar: { name: 'Vinagre', ph: 3, color: 'bg-amber-200' },
  water: { name: 'Água Pura', ph: 7, color: 'bg-blue-300' },
  soap: { name: 'Sabão Líquido', ph: 9, color: 'bg-emerald-300' },
  ammonia: { name: 'Amônia', ph: 11, color: 'bg-purple-300' },
  bleach: { name: 'Água Sanitária', ph: 13, color: 'bg-yellow-100' }
};

export function PhLab() {
  const [substance, setSubstance] = useState<keyof typeof SUBSTANCES | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const currentSub = substance ? SUBSTANCES[substance] : null;

  // Convert pH to color (Red -> Green -> Blue/Purple)
  const getPhColor = (ph: number) => {
    if (ph < 3) return '#ef4444'; // Red
    if (ph < 5) return '#f97316'; // Orange
    if (ph < 7) return '#eab308'; // Yellow
    if (ph === 7) return '#22c55e'; // Green
    if (ph < 10) return '#0ea5e9'; // Blue
    if (ph < 12) return '#6366f1'; // Indigo
    return '#a855f7'; // Purple
  };

  const testPh = () => {
    setIsTesting(true);
    setTimeout(() => setIsTesting(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Laboratório de pH (Ácidos e Bases)</h2>
      <p className="mb-8 opacity-80 text-center max-w-2xl">
        Adicione substâncias do dia a dia no béquer e use o papel indicador para descobrir se são ácidas, neutras ou básicas.
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center justify-center">
        
        {/* Lab Area */}
        <div className="relative w-64 h-80 bg-slate-800 rounded-3xl border-4 border-slate-700 flex flex-col items-center justify-end overflow-hidden pb-4">
          
          {/* Beaker */}
          <div className="relative w-40 h-48 border-4 border-t-0 border-white/20 rounded-b-3xl overflow-hidden flex flex-col justify-end">
            {/* Liquid */}
            <motion.div 
              className="w-full relative transition-all duration-1000"
              initial={{ height: 0 }}
              animate={{ height: currentSub ? '80%' : '0%', backgroundColor: currentSub ? currentSub.color.replace('bg-', '') : 'transparent' }}
              style={{ backgroundColor: currentSub ? 'rgba(255,255,255,0.5)' : 'transparent' }}
            >
              <div className={`absolute inset-0 ${currentSub?.color} opacity-50`} />
            </motion.div>
          </div>

          {/* Litmus Paper */}
          {currentSub && (
            <motion.div 
              className="absolute top-12 w-8 h-40 bg-yellow-100 rounded-sm shadow-lg origin-top"
              initial={{ y: -100, rotate: -10 }}
              animate={{ y: isTesting ? 40 : -100, rotate: isTesting ? 0 : -10 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="absolute bottom-0 w-full h-1/2 rounded-b-sm transition-colors duration-1000"
                animate={{ backgroundColor: isTesting ? getPhColor(currentSub.ph) : '#fef08a' }}
              />
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="w-full md:w-80 space-y-6">
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-bold text-slate-300 flex items-center gap-2"><FlaskConical size={20}/> Escolher Substância</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(SUBSTANCES) as Array<keyof typeof SUBSTANCES>).map(s => (
                <button 
                  key={s}
                  onClick={() => { setSubstance(s); setIsTesting(false); }}
                  className={`p-2 rounded-lg font-bold text-sm transition-colors ${substance === s ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {SUBSTANCES[s].name}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={testPh}
            disabled={!substance || isTesting}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Droplet size={24} />
            Testar pH
          </button>

          {/* Results */}
          {isTesting && currentSub && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-black/40 p-6 rounded-2xl border border-white/10 text-center"
            >
              <h3 className="font-bold text-xl mb-2" style={{ color: getPhColor(currentSub.ph) }}>
                pH: {currentSub.ph}
              </h3>
              <p className="text-slate-300 font-medium">
                {currentSub.ph < 7 ? 'Substância Ácida' : currentSub.ph > 7 ? 'Substância Básica (Alcalina)' : 'Substância Neutra'}
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
