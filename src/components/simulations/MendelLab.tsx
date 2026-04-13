import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Dna, GitMerge, RotateCcw, ChevronRight, Calculator } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

const TRAITS = {
  color: { id: 'color', dom: 'V', rec: 'v', domName: 'Amarela', recName: 'Verde' },
  texture: { id: 'texture', dom: 'R', rec: 'r', domName: 'Lisa', recName: 'Rugosa' },
  flower: { id: 'flower', dom: 'B', rec: 'b', domName: 'Púrpura', recName: 'Branca' }
};

function getGametes(genotype: string[]) {
  if (genotype.length === 2) {
    return [genotype[0], genotype[1]];
  }
  if (genotype.length === 4) {
    return [
      genotype[0] + genotype[2],
      genotype[0] + genotype[3],
      genotype[1] + genotype[2],
      genotype[1] + genotype[3]
    ];
  }
  return [];
}

function combineGametes(g1: string, g2: string) {
  if (g1.length === 1) {
    return [g1, g2].sort((a, b) => a < b ? -1 : 1).join('');
  }
  if (g1.length === 2) {
    const t1 = [g1[0], g2[0]].sort((a, b) => a < b ? -1 : 1).join('');
    const t2 = [g1[1], g2[1]].sort((a, b) => a < b ? -1 : 1).join('');
    return t1 + t2;
  }
  return '';
}

function getPhenotype(genotype: string, trait1: any, trait2?: any) {
  const p1 = genotype.includes(trait1.dom) ? trait1.domName : trait1.recName;
  if (!trait2) return p1;
  const p2 = genotype.includes(trait2.dom) ? trait2.domName : trait2.recName;
  return `${p1} e ${p2}`;
}

const TraitVisual = ({ genotype, trait1, trait2, className = "w-12 h-12" }: { genotype: string, trait1: any, trait2?: any, className?: string }) => {
  if (trait1.id === 'flower') {
    const isPurple = genotype.includes('B');
    return <Flower2 className={`${className} ${isPurple ? 'text-purple-500' : 'text-slate-200 drop-shadow-md'}`} fill="currentColor" />;
  }
  
  const isYellow = trait1.id === 'color' ? genotype.includes('V') : true;
  const isSmooth = trait2 ? genotype.includes('R') : (trait1.id === 'texture' ? genotype.includes('R') : true);
  
  const colorClass = trait1.id === 'texture' && !trait2 ? 'bg-yellow-400' : (isYellow ? 'bg-yellow-400' : 'bg-green-500');
  const radius = isSmooth ? '50%' : '40% 60% 70% 30% / 40% 50% 60% 50%';
  
  return (
    <div 
      className={`${className} ${colorClass} shadow-inner border border-black/20 transition-all duration-500`} 
      style={{ borderRadius: radius }} 
    />
  );
};

const ProbabilitiesPanel = ({ grid, trait1, trait2 }: { grid: string[][], trait1: any, trait2?: any }) => {
  const flat = grid.flat();
  const total = flat.length;
  
  const genCounts: Record<string, number> = {};
  const phenCounts: Record<string, number> = {};
  
  flat.forEach(g => {
    genCounts[g] = (genCounts[g] || 0) + 1;
    const p = getPhenotype(g, trait1, trait2);
    phenCounts[p] = (phenCounts[p] || 0) + 1;
  });
  
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6 h-full">
      <div className="flex items-center gap-2 mb-4 text-primary">
        <Calculator className="w-5 h-5" />
        <h3 className="font-bold text-lg">Probabilidades</h3>
      </div>
      
      <div>
        <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">Fenótipos (Visual)</h4>
        <div className="space-y-3">
          {Object.entries(phenCounts).sort((a,b) => b[1] - a[1]).map(([p, c]) => (
            <div key={p} className="flex justify-between items-center">
              <span className="text-sm font-medium">{p}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{c}/{total}</span>
                <span className="font-bold bg-primary/10 text-primary px-2 py-1 rounded-md min-w-[3rem] text-center">
                  {((c/total)*100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-border">
        <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">Genótipos (Alelos)</h4>
        <div className="space-y-3">
          {Object.entries(genCounts).sort((a,b) => b[1] - a[1]).map(([g, c]) => (
            <div key={g} className="flex justify-between items-center">
              <span className="text-sm font-mono font-bold">{g}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{c}/{total}</span>
                <span className="font-bold bg-secondary text-secondary-foreground px-2 py-1 rounded-md min-w-[3rem] text-center">
                  {((c/total)*100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function MendelLab() {
  const [activeTab, setActiveTab] = useState<'mono' | 'di' | 'gen'>('mono');
  
  // Monohybrid State
  const [monoTrait, setMonoTrait] = useState<keyof typeof TRAITS>('color');
  const [monoP1, setMonoP1] = useState(['V', 'v']);
  const [monoP2, setMonoP2] = useState(['V', 'v']);
  
  // Dihybrid State
  const [diP1, setDiP1] = useState(['V', 'v', 'R', 'r']);
  const [diP2, setDiP2] = useState(['V', 'v', 'R', 'r']);
  
  // Generations State
  const [genStep, setGenStep] = useState(0);

  const toggleMonoAllele = (parent: number, index: number) => {
    const trait = TRAITS[monoTrait];
    const newP = [...(parent === 1 ? monoP1 : monoP2)];
    newP[index] = newP[index] === trait.dom ? trait.rec : trait.dom;
    if (parent === 1) setMonoP1(newP);
    else setMonoP2(newP);
  };

  const toggleDiAllele = (parent: number, index: number) => {
    const trait = index < 2 ? TRAITS.color : TRAITS.texture;
    const newP = [...(parent === 1 ? diP1 : diP2)];
    newP[index] = newP[index] === trait.dom ? trait.rec : trait.dom;
    if (parent === 1) setDiP1(newP);
    else setDiP2(newP);
  };

  // Change mono trait and reset alleles to match new trait letters
  const handleMonoTraitChange = (t: keyof typeof TRAITS) => {
    setMonoTrait(t);
    const tr = TRAITS[t];
    setMonoP1([tr.dom, tr.rec]);
    setMonoP2([tr.dom, tr.rec]);
  };

  const renderMonohybrid = () => {
    const g1 = getGametes(monoP1);
    const g2 = getGametes(monoP2);
    const grid = [
      [combineGametes(g1[0], g2[0]), combineGametes(g1[0], g2[1])],
      [combineGametes(g1[1], g2[0]), combineGametes(g1[1], g2[1])]
    ];
    const trait = TRAITS[monoTrait];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-center gap-4 mb-8">
            <Button variant={monoTrait === 'color' ? 'default' : 'outline'} onClick={() => handleMonoTraitChange('color')}>Cor da Semente</Button>
            <Button variant={monoTrait === 'texture' ? 'default' : 'outline'} onClick={() => handleMonoTraitChange('texture')}>Textura da Semente</Button>
            <Button variant={monoTrait === 'flower' ? 'default' : 'outline'} onClick={() => handleMonoTraitChange('flower')}>Cor da Flor</Button>
          </div>

          <div className="flex justify-around items-center bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">Pai 1</h3>
              <div className="flex gap-2 justify-center">
                <button onClick={() => toggleMonoAllele(1, 0)} className="w-12 h-12 text-xl font-bold rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors">{monoP1[0]}</button>
                <button onClick={() => toggleMonoAllele(1, 1)} className="w-12 h-12 text-xl font-bold rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors">{monoP1[1]}</button>
              </div>
              <TraitVisual genotype={monoP1.join('')} trait1={trait} className="w-10 h-10 mx-auto mt-2" />
            </div>
            <div className="text-2xl font-bold text-slate-300 dark:text-slate-600">X</div>
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">Pai 2</h3>
              <div className="flex gap-2 justify-center">
                <button onClick={() => toggleMonoAllele(2, 0)} className="w-12 h-12 text-xl font-bold rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors">{monoP2[0]}</button>
                <button onClick={() => toggleMonoAllele(2, 1)} className="w-12 h-12 text-xl font-bold rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors">{monoP2[1]}</button>
              </div>
              <TraitVisual genotype={monoP2.join('')} trait1={trait} className="w-10 h-10 mx-auto mt-2" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 max-w-md mx-auto">
            <div className="grid grid-cols-3 gap-4">
              <div />
              <div className="text-center font-bold text-xl text-slate-500">{g2[0]}</div>
              <div className="text-center font-bold text-xl text-slate-500">{g2[1]}</div>
              
              <div className="flex items-center justify-center font-bold text-xl text-slate-500">{g1[0]}</div>
              <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-border">
                <TraitVisual genotype={grid[0][0]} trait1={trait} className="w-12 h-12 mb-2" />
                <span className="font-bold font-mono">{grid[0][0]}</span>
              </div>
              <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-border">
                <TraitVisual genotype={grid[0][1]} trait1={trait} className="w-12 h-12 mb-2" />
                <span className="font-bold font-mono">{grid[0][1]}</span>
              </div>

              <div className="flex items-center justify-center font-bold text-xl text-slate-500">{g1[1]}</div>
              <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-border">
                <TraitVisual genotype={grid[1][0]} trait1={trait} className="w-12 h-12 mb-2" />
                <span className="font-bold font-mono">{grid[1][0]}</span>
              </div>
              <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-border">
                <TraitVisual genotype={grid[1][1]} trait1={trait} className="w-12 h-12 mb-2" />
                <span className="font-bold font-mono">{grid[1][1]}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ProbabilitiesPanel grid={grid} trait1={trait} />
        </div>
      </div>
    );
  };

  const renderDihybrid = () => {
    const g1 = getGametes(diP1);
    const g2 = getGametes(diP2);
    
    const grid = g1.map(gam1 => g2.map(gam2 => combineGametes(gam1, gam2)));

    return (
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="flex justify-around items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">Pai 1</h3>
              <div className="flex gap-1 justify-center">
                {[0,1,2,3].map(i => (
                  <button key={i} onClick={() => toggleDiAllele(1, i)} className={`w-10 h-10 text-lg font-bold rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors ${i===1 ? 'mr-2' : ''}`}>{diP1[i]}</button>
                ))}
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-300 dark:text-slate-600">X</div>
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">Pai 2</h3>
              <div className="flex gap-1 justify-center">
                {[0,1,2,3].map(i => (
                  <button key={i} onClick={() => toggleDiAllele(2, i)} className={`w-10 h-10 text-lg font-bold rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors ${i===1 ? 'mr-2' : ''}`}>{diP2[i]}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-5 gap-2">
                <div />
                {g2.map((g, i) => <div key={i} className="text-center font-bold text-lg text-slate-500">{g}</div>)}
                
                {g1.map((gam1, i) => (
                  <React.Fragment key={i}>
                    <div className="flex items-center justify-center font-bold text-lg text-slate-500">{gam1}</div>
                    {g2.map((gam2, j) => {
                      const genotype = grid[i][j];
                      return (
                        <div key={j} className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-border p-2">
                          <TraitVisual genotype={genotype} trait1={TRAITS.color} trait2={TRAITS.texture} className="w-10 h-10 mb-2" />
                          <span className="font-bold font-mono text-sm">{genotype}</span>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <ProbabilitiesPanel grid={grid} trait1={TRAITS.color} trait2={TRAITS.texture} />
        </div>
      </div>
    );
  };

  const renderGenerations = () => {
    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12 relative px-4">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10 -translate-y-1/2" />
          {['Geração P', 'Geração F1', 'Geração F2'].map((label, i) => (
            <div key={i} className={`px-6 py-2 rounded-full font-bold text-sm shadow-sm transition-colors ${genStep >= i ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
              {label}
            </div>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          {genStep === 0 && (
            <motion.div key="step0" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="text-center space-y-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-border">
              <div>
                <h3 className="text-3xl font-bold mb-2">Geração Parental (P)</h3>
                <p className="text-muted-foreground">Cruzamento entre duas linhagens puras (homozigotas).</p>
              </div>
              <div className="flex justify-center items-center gap-12">
                <div className="space-y-3">
                  <TraitVisual genotype="VV" trait1={TRAITS.color} className="w-24 h-24 mx-auto" />
                  <div className="font-mono font-bold text-2xl">VV</div>
                  <div className="text-sm font-medium text-muted-foreground">Amarela Pura (Dominante)</div>
                </div>
                <div className="text-4xl font-bold text-slate-300">X</div>
                <div className="space-y-3">
                  <TraitVisual genotype="vv" trait1={TRAITS.color} className="w-24 h-24 mx-auto" />
                  <div className="font-mono font-bold text-2xl">vv</div>
                  <div className="text-sm font-medium text-muted-foreground">Verde Pura (Recessiva)</div>
                </div>
              </div>
              <Button onClick={() => setGenStep(1)} size="lg" className="mt-8 px-8">Cruzar Geração P <ChevronRight className="ml-2" /></Button>
            </motion.div>
          )}
          
          {genStep === 1 && (
            <motion.div key="step1" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="text-center space-y-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-border">
              <div>
                <h3 className="text-3xl font-bold mb-2">Geração F1 (Primeira Filiação)</h3>
                <p className="text-muted-foreground">100% dos descendentes herdam o alelo dominante (V) e apresentam a mesma característica.</p>
              </div>
              <div className="flex justify-center items-center gap-8">
                <div className="space-y-3">
                  <TraitVisual genotype="Vv" trait1={TRAITS.color} className="w-24 h-24 mx-auto" />
                  <div className="font-mono font-bold text-2xl">Vv</div>
                  <div className="text-sm font-medium text-muted-foreground">100% Amarela (Heterozigota)</div>
                </div>
              </div>
              <div className="pt-8 border-t border-border mt-8">
                <p className="mb-6 text-muted-foreground">Agora vamos cruzar dois indivíduos da geração F1 (Vv x Vv).</p>
                <Button onClick={() => setGenStep(2)} size="lg" className="px-8">Autofecundar F1 <ChevronRight className="ml-2" /></Button>
              </div>
            </motion.div>
          )}
          
          {genStep === 2 && (
            <motion.div key="step2" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="space-y-8">
              <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="text-3xl font-bold mb-2">Geração F2 (Segunda Filiação)</h3>
                <p className="text-muted-foreground">O alelo recessivo (v) reaparece na famosa proporção de 3:1.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-3 gap-3">
                    <div />
                    <div className="text-center font-bold text-2xl text-slate-500">V</div>
                    <div className="text-center font-bold text-2xl text-slate-500">v</div>
                    
                    <div className="flex items-center justify-center font-bold text-2xl text-slate-500">V</div>
                    <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-border">
                      <TraitVisual genotype="VV" trait1={TRAITS.color} className="w-14 h-14 mb-3" />
                      <span className="font-bold font-mono text-lg">VV</span>
                    </div>
                    <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-border">
                      <TraitVisual genotype="Vv" trait1={TRAITS.color} className="w-14 h-14 mb-3" />
                      <span className="font-bold font-mono text-lg">Vv</span>
                    </div>
                    
                    <div className="flex items-center justify-center font-bold text-2xl text-slate-500">v</div>
                    <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-border">
                      <TraitVisual genotype="Vv" trait1={TRAITS.color} className="w-14 h-14 mb-3" />
                      <span className="font-bold font-mono text-lg">Vv</span>
                    </div>
                    <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-border">
                      <TraitVisual genotype="vv" trait1={TRAITS.color} className="w-14 h-14 mb-3" />
                      <span className="font-bold font-mono text-lg">vv</span>
                    </div>
                  </div>
                </div>
                
                <ProbabilitiesPanel grid={[['VV', 'Vv'], ['Vv', 'vv']]} trait1={TRAITS.color} />
              </div>
              
              <div className="text-center pt-4">
                <Button onClick={() => setGenStep(0)} variant="outline" size="lg"><RotateCcw className="w-4 h-4 mr-2" /> Recomeçar Experimento</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full p-6 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-auto">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant={activeTab === 'mono' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('mono')}
            className="rounded-full px-6"
          >
            <Dna className="w-4 h-4 mr-2" /> Cruzamento Simples
          </Button>
          <Button 
            variant={activeTab === 'di' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('di')}
            className="rounded-full px-6"
          >
            <GitMerge className="w-4 h-4 mr-2" /> Cruzamento Diíbrido
          </Button>
          <Button 
            variant={activeTab === 'gen' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('gen')}
            className="rounded-full px-6"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Simulador de Gerações
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'mono' && renderMonohybrid()}
            {activeTab === 'di' && renderDihybrid()}
            {activeTab === 'gen' && renderGenerations()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
