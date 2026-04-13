import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Droplets, Sun, TreePine } from 'lucide-react';

const biomes = [
  {
    id: 'amazonia',
    name: 'Amazônia',
    color: 'bg-emerald-600',
    description: 'Maior floresta tropical do mundo, com imensa biodiversidade e a maior bacia hidrográfica.',
    climate: 'Equatorial úmido',
    flora: 'Árvores de grande porte, vitórias-régias, seringueiras.',
    fauna: 'Onça-pintada, arara-vermelha, boto-cor-de-rosa, sucuri.'
  },
  {
    id: 'cerrado',
    name: 'Cerrado',
    color: 'bg-amber-500',
    description: 'Conhecido como a "caixa d\'água do Brasil", é a savana mais rica em biodiversidade do mundo.',
    climate: 'Tropical sazonal (inverno seco, verão chuvoso)',
    flora: 'Árvores com troncos retorcidos, cascas grossas, gramíneas.',
    fauna: 'Lobo-guará, tamanduá-bandeira, ema, seriema.'
  },
  {
    id: 'caatinga',
    name: 'Caatinga',
    color: 'bg-orange-400',
    description: 'Bioma exclusivamente brasileiro, adaptado a longos períodos de seca.',
    climate: 'Semiárido',
    flora: 'Cactos (mandacaru, xique-xique), arbustos espinhosos.',
    fauna: 'Tatu-bola, ararinha-azul, calango, carcará.'
  },
  {
    id: 'mata-atlantica',
    name: 'Mata Atlântica',
    color: 'bg-green-700',
    description: 'Bioma costeiro extremamente diverso, mas também o mais devastado do Brasil.',
    climate: 'Tropical úmido',
    flora: 'Pau-brasil, ipês, orquídeas, bromélias.',
    fauna: 'Mico-leão-dourado, tucano-de-bico-verde, onça-pintada.'
  },
  {
    id: 'pantanal',
    name: 'Pantanal',
    color: 'bg-teal-500',
    description: 'Maior planície alagável do planeta, com rica vida aquática e aves.',
    climate: 'Tropical (com estações de cheia e seca)',
    flora: 'Plantas aquáticas, palmeiras, gramíneas.',
    fauna: 'Tuiuiú, jacaré-do-pantanal, capivara, onça-pintada.'
  },
  {
    id: 'pampa',
    name: 'Pampa',
    color: 'bg-lime-500',
    description: 'Campos sulinos com relevo suave e vegetação rasteira.',
    climate: 'Subtropical',
    flora: 'Gramíneas, arbustos, árvores esparsas.',
    fauna: 'João-de-barro, veado-campeiro, quero-quero.'
  }
];

export function Biomes() {
  const [selected, setSelected] = useState(biomes[0]);

  return (
    <div className="flex flex-col md:flex-row h-full gap-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl">
      <div className="w-full md:w-1/3 flex flex-col gap-3 overflow-y-auto pr-2">
        <h3 className="font-bold text-xl mb-2 text-slate-800 dark:text-slate-100">Biomas Brasileiros</h3>
        {biomes.map((biome) => (
          <button
            key={biome.id}
            onClick={() => setSelected(biome)}
            className={`p-4 rounded-xl text-left transition-all ${
              selected.id === biome.id 
                ? `${biome.color} text-white shadow-md scale-[1.02]` 
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <h4 className="font-bold text-lg">{biome.name}</h4>
          </button>
        ))}
      </div>

      <div className="w-full md:w-2/3 bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-2 ${selected.color}`} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">{selected.name}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {selected.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 text-blue-500 mb-2">
                  <Sun className="w-5 h-5" />
                  <h4 className="font-bold">Clima</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{selected.climate}</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 text-emerald-500 mb-2">
                  <TreePine className="w-5 h-5" />
                  <h4 className="font-bold">Flora</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{selected.flora}</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700 sm:col-span-2">
                <div className="flex items-center gap-2 text-orange-500 mb-2">
                  <MapPin className="w-5 h-5" />
                  <h4 className="font-bold">Fauna</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{selected.fauna}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
