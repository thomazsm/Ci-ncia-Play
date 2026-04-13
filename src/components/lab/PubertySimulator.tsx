import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, User, ArrowUpCircle, Droplet, Zap } from 'lucide-react';

export function PubertySimulator() {
  const [age, setAge] = useState(8);
  const [sex, setSex] = useState<'male' | 'female'>('female');

  // Calculate hormone levels based on age
  const hormoneLevel = age < 10 ? 10 : Math.min(100, 10 + (age - 9) * 15);
  const hormoneName = sex === 'male' ? 'Testosterona' : 'Estrogênio/Progesterona';
  const hormoneColor = sex === 'male' ? 'bg-blue-500' : 'bg-pink-500';

  const getChanges = () => {
    if (age < 10) return ['Crescimento constante', 'Desenvolvimento cognitivo'];
    
    if (sex === 'female') {
      if (age < 12) return ['Estirão de crescimento', 'Desenvolvimento das mamas'];
      if (age < 14) return ['Primeira menstruação (Menarca)', 'Alargamento do quadril', 'Pelos corporais'];
      return ['Maturidade reprodutiva', 'Ciclo menstrual regular', 'Fim do estirão'];
    } else {
      if (age < 12) return ['Início do estirão de crescimento', 'Aumento dos testículos'];
      if (age < 15) return ['Mudança de voz', 'Pelos faciais e corporais', 'Aumento da massa muscular'];
      return ['Maturidade reprodutiva', 'Produção de espermatozoides', 'Fim do estirão'];
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Puberdade e Hormônios</h2>
      <p className="mb-8 opacity-80 font-medium text-center max-w-2xl">
        A puberdade é a fase de transição impulsionada por hormônios, preparando o corpo para a fase adulta.
      </p>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setSex('female')}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${sex === 'female' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'}`}
        >
          Corpo Feminino
        </button>
        <button 
          onClick={() => setSex('male')}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${sex === 'male' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
        >
          Corpo Masculino
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center justify-center">
        
        {/* Body Visual */}
        <div className="relative w-48 h-80 bg-slate-800 rounded-3xl border-4 border-slate-700 flex flex-col items-center justify-end pb-4 overflow-hidden">
          <motion.div 
            className="absolute bottom-0 w-full opacity-20"
            style={{ height: `${hormoneLevel}%` }}
            animate={{ backgroundColor: sex === 'male' ? '#3b82f6' : '#ec4899' }}
            transition={{ duration: 0.5 }}
          />
          
          <motion.div
            animate={{ 
              scale: 0.8 + (age / 18) * 0.4,
              y: - (age - 8) * 5
            }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="z-10 flex flex-col items-center"
          >
            <User size={120} className={sex === 'male' ? 'text-blue-400' : 'text-pink-400'} />
          </motion.div>

          {/* Brain / Pituitary Gland Signal */}
          {age >= 10 && age <= 14 && (
            <motion.div 
              className="absolute top-10 text-yellow-400 z-20"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], y: [0, 20, 40] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap size={24} />
            </motion.div>
          )}
        </div>

        {/* Controls and Info */}
        <div className="flex-1 w-full space-y-8">
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-xl">Idade: {age} anos</span>
              <span className="text-sm uppercase tracking-wider text-slate-400">
                {age < 10 ? 'Infância' : age < 15 ? 'Puberdade' : 'Adolescência'}
              </span>
            </div>
            <input 
              type="range" 
              min="8" max="18" 
              value={age} 
              onChange={(e) => setAge(Number(e.target.value))}
              className={`w-full h-4 rounded-full appearance-none outline-none cursor-pointer ${sex === 'male' ? 'accent-blue-500 bg-blue-900/30' : 'accent-pink-500 bg-pink-900/30'}`}
            />
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Activity size={20} className={sex === 'male' ? 'text-blue-400' : 'text-pink-400'} /> 
              Nível de {hormoneName}
            </h3>
            <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${hormoneColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${hormoneLevel}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 min-h-[160px]">
            <h3 className="font-bold mb-4 text-slate-300">Principais Mudanças:</h3>
            <ul className="space-y-2">
              <AnimatePresence mode="popLayout">
                {getChanges().map((change, idx) => (
                  <motion.li 
                    key={change}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 font-medium"
                  >
                    <ArrowUpCircle size={16} className={sex === 'male' ? 'text-blue-400' : 'text-pink-400'} />
                    {change}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
