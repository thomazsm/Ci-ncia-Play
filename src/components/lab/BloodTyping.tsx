import { useState } from 'react';
import { motion } from 'framer-motion';
import { Syringe, Droplet, User } from 'lucide-react';

const PATIENTS = [
  { id: 1, name: 'Paciente 1', type: 'A+' },
  { id: 2, name: 'Paciente 2', type: 'B-' },
  { id: 3, name: 'Paciente 3', type: 'O+' },
  { id: 4, name: 'Paciente 4', type: 'AB-' }
];

export function BloodTyping() {
  const [patient, setPatient] = useState(PATIENTS[0]);
  const [results, setResults] = useState({ antiA: false, antiB: false, antiRh: false });
  const [tested, setTested] = useState({ antiA: false, antiB: false, antiRh: false });

  const testReagent = (reagent: 'antiA' | 'antiB' | 'antiRh') => {
    setTested(prev => ({ ...prev, [reagent]: true }));
    
    let agglutinates = false;
    if (reagent === 'antiA' && patient.type.includes('A')) agglutinates = true;
    if (reagent === 'antiB' && patient.type.includes('B')) agglutinates = true;
    if (reagent === 'antiRh' && patient.type.includes('+')) agglutinates = true;

    setResults(prev => ({ ...prev, [reagent]: agglutinates }));
  };

  const reset = (newPatient: typeof PATIENTS[0]) => {
    setPatient(newPatient);
    setResults({ antiA: false, antiB: false, antiRh: false });
    setTested({ antiA: false, antiB: false, antiRh: false });
  };

  const BloodDrop = ({ reagent, label, color }: { reagent: 'antiA' | 'antiB' | 'antiRh', label: string, color: string }) => (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center overflow-hidden">
        {/* Base Blood */}
        <div className="absolute inset-2 bg-red-600 rounded-full opacity-80" />
        
        {/* Agglutination Effect */}
        {tested[reagent] && results[reagent] && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 p-2"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-red-900 rounded-full" />
            ))}
          </motion.div>
        )}

        {/* Reagent Drop Animation */}
        {tested[reagent] && (
          <motion.div 
            initial={{ y: -50, opacity: 1 }} animate={{ y: 0, opacity: 0 }} transition={{ duration: 0.5 }}
            className={`absolute top-0 w-4 h-4 ${color} rounded-full`}
          />
        )}
      </div>
      
      <button 
        onClick={() => testReagent(reagent)}
        disabled={tested[reagent]}
        className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors ${tested[reagent] ? 'bg-slate-700 text-slate-500' : `${color} text-slate-900 hover:opacity-80`}`}
      >
        <Syringe size={16} /> Pingar {label}
      </button>

      {tested[reagent] && (
        <span className={`text-sm font-bold ${results[reagent] ? 'text-red-400' : 'text-emerald-400'}`}>
          {results[reagent] ? 'Aglutinou!' : 'Normal'}
        </span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Tipagem Sanguínea</h2>
      <p className="mb-8 opacity-80 text-center max-w-2xl">
        Pingue os reagentes nas amostras de sangue. Se o sangue aglutinar (empelotar), significa que ele possui aquele antígeno.
      </p>

      <div className="flex flex-col items-center w-full max-w-4xl bg-slate-800 p-8 rounded-3xl border-4 border-slate-700">
        
        {/* Patient Selector */}
        <div className="flex gap-4 mb-12">
          {PATIENTS.map(p => (
            <button 
              key={p.id}
              onClick={() => reset(p)}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${patient.id === p.id ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            >
              <User size={20} /> {p.name}
            </button>
          ))}
        </div>

        {/* Testing Area */}
        <div className="flex justify-around w-full mb-12">
          <BloodDrop reagent="antiA" label="Anti-A" color="bg-blue-400" />
          <BloodDrop reagent="antiB" label="Anti-B" color="bg-yellow-400" />
          <BloodDrop reagent="antiRh" label="Anti-Rh" color="bg-slate-200" />
        </div>

        {/* Result Area */}
        <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center w-full max-w-md">
          <h3 className="font-bold text-slate-400 mb-2 uppercase tracking-wider text-sm">Diagnóstico do Tipo Sanguíneo</h3>
          {tested.antiA && tested.antiB && tested.antiRh ? (
            <div className="text-5xl font-black text-red-500 mt-2">
              {patient.type}
            </div>
          ) : (
            <div className="text-slate-500 mt-2 font-medium">
              Faça os 3 testes para confirmar o tipo.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
