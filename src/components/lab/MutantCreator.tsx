import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Baby, ArrowRight } from 'lucide-react';

type Genotype = 'AA' | 'Aa' | 'aa';

export function MutantCreator() {
  const [parent1, setParent1] = useState<Genotype>('Aa');
  const [parent2, setParent2] = useState<Genotype>('Aa');
  const [offspring, setOffspring] = useState<Genotype | null>(null);
  const [isBreeding, setIsBreeding] = useState(false);

  const breed = () => {
    setIsBreeding(true);
    setOffspring(null);
    
    setTimeout(() => {
      // Randomly pick one allele from each parent
      const p1Allele = parent1[Math.floor(Math.random() * 2)];
      const p2Allele = parent2[Math.floor(Math.random() * 2)];
      
      // Sort so dominant 'A' is always first if present
      const result = [p1Allele, p2Allele].sort().join('') as Genotype;
      
      setOffspring(result);
      setIsBreeding(false);
    }, 1500);
  };

  // Phenotype logic: A = Green (Dominant), a = Purple (Recessive)
  const getAlienColor = (geno: Genotype) => geno.includes('A') ? 'bg-emerald-500' : 'bg-purple-500';

  const Alien = ({ genotype, size = 'md' }: { genotype: Genotype, size?: 'sm' | 'md' | 'lg' }) => {
    const color = getAlienColor(genotype);
    const dims = size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-32 h-32' : 'w-24 h-24';
    
    return (
      <div className="flex flex-col items-center gap-2">
        <motion.div 
          className={`${dims} ${color} rounded-[40%] flex items-center justify-center relative shadow-lg`}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Eyes */}
          <div className="flex gap-2 mb-2">
            <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center"><div className="w-1 h-1 bg-black rounded-full"/></div>
            <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center"><div className="w-1 h-1 bg-black rounded-full"/></div>
          </div>
          {/* Mouth */}
          <div className="absolute bottom-4 w-6 h-2 bg-black/20 rounded-full" />
        </motion.div>
        <span className="font-bold bg-white/20 px-3 py-1 rounded-full text-sm tracking-widest">{genotype}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Criador de Mutantes (Genética)</h2>
      <p className="mb-8 opacity-80 font-medium text-center max-w-2xl">
        Cruze os alienígenas! A cor verde (A) é dominante sobre a cor roxa (a).
      </p>

      <div className="flex flex-col items-center w-full max-w-3xl bg-slate-800 p-8 rounded-3xl border-4 border-slate-700">
        
        {/* Parents */}
        <div className="flex justify-around w-full mb-8">
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-bold text-slate-400">Pai 1</h3>
            <Alien genotype={parent1} />
            <select 
              value={parent1} 
              onChange={(e) => setParent1(e.target.value as Genotype)}
              className="mt-2 bg-slate-700 text-white px-4 py-2 rounded-lg outline-none font-bold"
            >
              <option value="AA">AA (Verde Puro)</option>
              <option value="Aa">Aa (Verde Híbrido)</option>
              <option value="aa">aa (Roxo Puro)</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <Dna size={48} className="text-slate-600" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h3 className="font-bold text-slate-400">Pai 2</h3>
            <Alien genotype={parent2} />
            <select 
              value={parent2} 
              onChange={(e) => setParent2(e.target.value as Genotype)}
              className="mt-2 bg-slate-700 text-white px-4 py-2 rounded-lg outline-none font-bold"
            >
              <option value="AA">AA (Verde Puro)</option>
              <option value="Aa">Aa (Verde Híbrido)</option>
              <option value="aa">aa (Roxo Puro)</option>
            </select>
          </div>
        </div>

        {/* Action */}
        <button 
          onClick={breed}
          disabled={isBreeding}
          className="px-8 py-4 bg-primary hover:bg-primary/90 disabled:bg-slate-700 text-white rounded-full font-bold text-xl flex items-center gap-3 transition-colors shadow-lg mb-8"
        >
          <Baby size={24} />
          {isBreeding ? 'Cruzando...' : 'Gerar Filhote'}
        </button>

        {/* Offspring */}
        <div className="h-48 flex items-center justify-center w-full border-t-2 border-slate-700 border-dashed pt-8">
          <AnimatePresence mode="wait">
            {isBreeding && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Dna size={48} className="text-primary animate-spin-slow" />
              </motion.div>
            )}
            {offspring && !isBreeding && (
              <motion.div 
                key="result" 
                initial={{ scale: 0, y: 50 }} 
                animate={{ scale: 1, y: 0 }} 
                className="flex flex-col items-center"
              >
                <h3 className="font-bold text-slate-400 mb-4 uppercase tracking-widest">Filhote Gerado</h3>
                <Alien genotype={offspring} size="lg" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
