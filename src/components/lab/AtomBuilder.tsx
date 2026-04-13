import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { SimulationInfoCard } from '@/src/components/ui/SimulationInfoCard';

const elementsData = [
  { p: 1, name: 'Hidrogênio (H)' },
  { p: 2, name: 'Hélio (He)' },
  { p: 3, name: 'Lítio (Li)' },
  { p: 4, name: 'Berílio (Be)' },
  { p: 5, name: 'Boro (B)' },
  { p: 6, name: 'Carbono (C)' },
  { p: 7, name: 'Nitrogênio (N)' },
  { p: 8, name: 'Oxigênio (O)' },
  { p: 9, name: 'Flúor (F)' },
  { p: 10, name: 'Neônio (Ne)' },
];

export function AtomBuilder() {
  const [protons, setProtons] = useState(1);
  const [neutrons, setNeutrons] = useState(0);
  const [electrons, setElectrons] = useState(1);

  const element = elementsData.find(e => e.p === protons) || { name: 'Desconhecido' };
  const charge = protons - electrons;
  const mass = protons + neutrons;

  return (
    <div className="flex flex-col md:flex-row min-h-full p-6 gap-6 bg-slate-50 dark:bg-slate-900 rounded-2xl relative">
      <div className="absolute top-4 left-4 z-10 w-full max-w-sm pr-8">
        <SimulationInfoCard title="Construtor de Átomos">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-red-500">Prótons (p⁺)</span>
                <span className="font-bold">{protons}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setProtons(Math.max(1, protons - 1))} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Minus className="w-4 h-4" /></button>
                <input type="range" min="1" max="10" value={protons} onChange={(e) => setProtons(Number(e.target.value))} className="flex-1 accent-red-500" />
                <button onClick={() => setProtons(Math.min(10, protons + 1))} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-slate-500">Nêutrons (n⁰)</span>
                <span className="font-bold">{neutrons}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setNeutrons(Math.max(0, neutrons - 1))} className="p-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300"><Minus className="w-4 h-4" /></button>
                <input type="range" min="0" max="12" value={neutrons} onChange={(e) => setNeutrons(Number(e.target.value))} className="flex-1 accent-slate-500" />
                <button onClick={() => setNeutrons(Math.min(12, neutrons + 1))} className="p-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-blue-500">Elétrons (e⁻)</span>
                <span className="font-bold">{electrons}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setElectrons(Math.max(0, electrons - 1))} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Minus className="w-4 h-4" /></button>
                <input type="range" min="0" max="10" value={electrons} onChange={(e) => setElectrons(Number(e.target.value))} className="flex-1 accent-blue-500" />
                <button onClick={() => setElectrons(Math.min(10, electrons + 1))} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Elemento</span>
                <span className="font-bold text-lg">{element.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Massa Atômica</span>
                <span className="font-bold text-lg">{mass}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Carga Líquida</span>
                <span className={`font-bold text-lg ${charge > 0 ? 'text-red-500' : charge < 0 ? 'text-blue-500' : 'text-emerald-500'}`}>
                  {charge > 0 ? `+${charge}` : charge} {charge === 0 && '(Neutro)'}
                  {charge !== 0 && '(Íon)'}
                </span>
              </div>
            </div>
          </div>
        </SimulationInfoCard>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border-4 border-slate-800 min-h-[400px]">
        {/* Nucleus */}
        <div className="relative z-10 flex flex-wrap justify-center items-center w-16 h-16">
          {Array.from({ length: protons }).map((_, i) => (
            <div key={`p-${i}`} className="w-4 h-4 bg-red-500 rounded-full border border-red-700 -ml-1 -mt-1 shadow-sm" />
          ))}
          {Array.from({ length: neutrons }).map((_, i) => (
            <div key={`n-${i}`} className="w-4 h-4 bg-slate-400 rounded-full border border-slate-600 -ml-1 -mt-1 shadow-sm" />
          ))}
        </div>

        {/* Electron Orbits */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {electrons > 0 && (
            <div className="absolute w-32 h-32 rounded-full border border-slate-700 animate-[spin_4s_linear_infinite]">
              {Array.from({ length: Math.min(2, electrons) }).map((_, i) => (
                <div key={`e1-${i}`} className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" 
                     style={{ top: i === 0 ? '-6px' : 'auto', bottom: i === 1 ? '-6px' : 'auto', left: 'calc(50% - 6px)' }} />
              ))}
            </div>
          )}
          {electrons > 2 && (
            <div className="absolute w-56 h-56 rounded-full border border-slate-700 animate-[spin_8s_linear_infinite_reverse]">
              {Array.from({ length: Math.min(8, electrons - 2) }).map((_, i) => {
                const angle = (i / Math.min(8, electrons - 2)) * Math.PI * 2;
                const x = Math.cos(angle) * 112;
                const y = Math.sin(angle) * 112;
                return (
                  <div key={`e2-${i}`} className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" 
                       style={{ transform: `translate(${x}px, ${y}px)`, top: 'calc(50% - 6px)', left: 'calc(50% - 6px)' }} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
