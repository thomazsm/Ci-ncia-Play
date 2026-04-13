import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';

const elements = [
  { num: 1, symbol: 'H', name: 'Hidrogênio', group: 'nonmetal', col: 1, row: 1 },
  { num: 2, symbol: 'He', name: 'Hélio', group: 'noble', col: 18, row: 1 },
  { num: 3, symbol: 'Li', name: 'Lítio', group: 'alkali', col: 1, row: 2 },
  { num: 4, symbol: 'Be', name: 'Berílio', group: 'alkaline', col: 2, row: 2 },
  { num: 5, symbol: 'B', name: 'Boro', group: 'metalloid', col: 13, row: 2 },
  { num: 6, symbol: 'C', name: 'Carbono', group: 'nonmetal', col: 14, row: 2 },
  { num: 7, symbol: 'N', name: 'Nitrogênio', group: 'nonmetal', col: 15, row: 2 },
  { num: 8, symbol: 'O', name: 'Oxigênio', group: 'nonmetal', col: 16, row: 2 },
  { num: 9, symbol: 'F', name: 'Flúor', group: 'halogen', col: 17, row: 2 },
  { num: 10, symbol: 'Ne', name: 'Neônio', group: 'noble', col: 18, row: 2 },
  { num: 11, symbol: 'Na', name: 'Sódio', group: 'alkali', col: 1, row: 3 },
  { num: 12, symbol: 'Mg', name: 'Magnésio', group: 'alkaline', col: 2, row: 3 },
  { num: 13, symbol: 'Al', name: 'Alumínio', group: 'post-transition', col: 13, row: 3 },
  { num: 14, symbol: 'Si', name: 'Silício', group: 'metalloid', col: 14, row: 3 },
  { num: 15, symbol: 'P', name: 'Fósforo', group: 'nonmetal', col: 15, row: 3 },
  { num: 16, symbol: 'S', name: 'Enxofre', group: 'nonmetal', col: 16, row: 3 },
  { num: 17, symbol: 'Cl', name: 'Cloro', group: 'halogen', col: 17, row: 3 },
  { num: 18, symbol: 'Ar', name: 'Argônio', group: 'noble', col: 18, row: 3 },
  { num: 19, symbol: 'K', name: 'Potássio', group: 'alkali', col: 1, row: 4 },
  { num: 20, symbol: 'Ca', name: 'Cálcio', group: 'alkaline', col: 2, row: 4 },
  { num: 21, symbol: 'Sc', name: 'Escândio', group: 'transition', col: 3, row: 4 },
  { num: 22, symbol: 'Ti', name: 'Titânio', group: 'transition', col: 4, row: 4 },
  { num: 23, symbol: 'V', name: 'Vanádio', group: 'transition', col: 5, row: 4 },
  { num: 24, symbol: 'Cr', name: 'Cromo', group: 'transition', col: 6, row: 4 },
  { num: 25, symbol: 'Mn', name: 'Manganês', group: 'transition', col: 7, row: 4 },
  { num: 26, symbol: 'Fe', name: 'Ferro', group: 'transition', col: 8, row: 4 },
  { num: 27, symbol: 'Co', name: 'Cobalto', group: 'transition', col: 9, row: 4 },
  { num: 28, symbol: 'Ni', name: 'Níquel', group: 'transition', col: 10, row: 4 },
  { num: 29, symbol: 'Cu', name: 'Cobre', group: 'transition', col: 11, row: 4 },
  { num: 30, symbol: 'Zn', name: 'Zinco', group: 'transition', col: 12, row: 4 },
  { num: 31, symbol: 'Ga', name: 'Gálio', group: 'post-transition', col: 13, row: 4 },
  { num: 32, symbol: 'Ge', name: 'Germânio', group: 'metalloid', col: 14, row: 4 },
  { num: 33, symbol: 'As', name: 'Arsênio', group: 'metalloid', col: 15, row: 4 },
  { num: 34, symbol: 'Se', name: 'Selênio', group: 'nonmetal', col: 16, row: 4 },
  { num: 35, symbol: 'Br', name: 'Bromo', group: 'halogen', col: 17, row: 4 },
  { num: 36, symbol: 'Kr', name: 'Criptônio', group: 'noble', col: 18, row: 4 },
  { num: 37, symbol: 'Rb', name: 'Rubídio', group: 'alkali', col: 1, row: 5 },
  { num: 38, symbol: 'Sr', name: 'Estrôncio', group: 'alkaline', col: 2, row: 5 },
  { num: 39, symbol: 'Y', name: 'Ítrio', group: 'transition', col: 3, row: 5 },
  { num: 40, symbol: 'Zr', name: 'Zircônio', group: 'transition', col: 4, row: 5 },
  { num: 41, symbol: 'Nb', name: 'Nióbio', group: 'transition', col: 5, row: 5 },
  { num: 42, symbol: 'Mo', name: 'Molibdênio', group: 'transition', col: 6, row: 5 },
  { num: 43, symbol: 'Tc', name: 'Tecnécio', group: 'transition', col: 7, row: 5 },
  { num: 44, symbol: 'Ru', name: 'Rutênio', group: 'transition', col: 8, row: 5 },
  { num: 45, symbol: 'Rh', name: 'Ródio', group: 'transition', col: 9, row: 5 },
  { num: 46, symbol: 'Pd', name: 'Paládio', group: 'transition', col: 10, row: 5 },
  { num: 47, symbol: 'Ag', name: 'Prata', group: 'transition', col: 11, row: 5 },
  { num: 48, symbol: 'Cd', name: 'Cádmio', group: 'transition', col: 12, row: 5 },
  { num: 49, symbol: 'In', name: 'Índio', group: 'post-transition', col: 13, row: 5 },
  { num: 50, symbol: 'Sn', name: 'Estanho', group: 'post-transition', col: 14, row: 5 },
  { num: 51, symbol: 'Sb', name: 'Antimônio', group: 'metalloid', col: 15, row: 5 },
  { num: 52, symbol: 'Te', name: 'Telúrio', group: 'metalloid', col: 16, row: 5 },
  { num: 53, symbol: 'I', name: 'Iodo', group: 'halogen', col: 17, row: 5 },
  { num: 54, symbol: 'Xe', name: 'Xenônio', group: 'noble', col: 18, row: 5 },
  { num: 55, symbol: 'Cs', name: 'Césio', group: 'alkali', col: 1, row: 6 },
  { num: 56, symbol: 'Ba', name: 'Bário', group: 'alkaline', col: 2, row: 6 },
  // Lanthanides (57-71) placed in row 8 for standard layout
  { num: 57, symbol: 'La', name: 'Lantânio', group: 'lanthanide', col: 4, row: 8 },
  { num: 58, symbol: 'Ce', name: 'Cério', group: 'lanthanide', col: 5, row: 8 },
  { num: 59, symbol: 'Pr', name: 'Praseodímio', group: 'lanthanide', col: 6, row: 8 },
  { num: 60, symbol: 'Nd', name: 'Neodímio', group: 'lanthanide', col: 7, row: 8 },
  { num: 61, symbol: 'Pm', name: 'Promécio', group: 'lanthanide', col: 8, row: 8 },
  { num: 62, symbol: 'Sm', name: 'Samário', group: 'lanthanide', col: 9, row: 8 },
  { num: 63, symbol: 'Eu', name: 'Európio', group: 'lanthanide', col: 10, row: 8 },
  { num: 64, symbol: 'Gd', name: 'Gadolínio', group: 'lanthanide', col: 11, row: 8 },
  { num: 65, symbol: 'Tb', name: 'Térbio', group: 'lanthanide', col: 12, row: 8 },
  { num: 66, symbol: 'Dy', name: 'Disprósio', group: 'lanthanide', col: 13, row: 8 },
  { num: 67, symbol: 'Ho', name: 'Hólmio', group: 'lanthanide', col: 14, row: 8 },
  { num: 68, symbol: 'Er', name: 'Érbio', group: 'lanthanide', col: 15, row: 8 },
  { num: 69, symbol: 'Tm', name: 'Túlio', group: 'lanthanide', col: 16, row: 8 },
  { num: 70, symbol: 'Yb', name: 'Itérbio', group: 'lanthanide', col: 17, row: 8 },
  { num: 71, symbol: 'Lu', name: 'Lutécio', group: 'lanthanide', col: 18, row: 8 },
  // Back to row 6
  { num: 72, symbol: 'Hf', name: 'Háfnio', group: 'transition', col: 4, row: 6 },
  { num: 73, symbol: 'Ta', name: 'Tântalo', group: 'transition', col: 5, row: 6 },
  { num: 74, symbol: 'W', name: 'Tungstênio', group: 'transition', col: 6, row: 6 },
  { num: 75, symbol: 'Re', name: 'Rênio', group: 'transition', col: 7, row: 6 },
  { num: 76, symbol: 'Os', name: 'Ósmio', group: 'transition', col: 8, row: 6 },
  { num: 77, symbol: 'Ir', name: 'Irídio', group: 'transition', col: 9, row: 6 },
  { num: 78, symbol: 'Pt', name: 'Platina', group: 'transition', col: 10, row: 6 },
  { num: 79, symbol: 'Au', name: 'Ouro', group: 'transition', col: 11, row: 6 },
  { num: 80, symbol: 'Hg', name: 'Mercúrio', group: 'transition', col: 12, row: 6 },
  { num: 81, symbol: 'Tl', name: 'Tálio', group: 'post-transition', col: 13, row: 6 },
  { num: 82, symbol: 'Pb', name: 'Chumbo', group: 'post-transition', col: 14, row: 6 },
  { num: 83, symbol: 'Bi', name: 'Bismuto', group: 'post-transition', col: 15, row: 6 },
  { num: 84, symbol: 'Po', name: 'Polônio', group: 'metalloid', col: 16, row: 6 },
  { num: 85, symbol: 'At', name: 'Astato', group: 'halogen', col: 17, row: 6 },
  { num: 86, symbol: 'Rn', name: 'Radônio', group: 'noble', col: 18, row: 6 },
  { num: 87, symbol: 'Fr', name: 'Frâncio', group: 'alkali', col: 1, row: 7 },
  { num: 88, symbol: 'Ra', name: 'Rádio', group: 'alkaline', col: 2, row: 7 },
  // Actinides (89-103) placed in row 9 for standard layout
  { num: 89, symbol: 'Ac', name: 'Actínio', group: 'actinide', col: 4, row: 9 },
  { num: 90, symbol: 'Th', name: 'Tório', group: 'actinide', col: 5, row: 9 },
  { num: 91, symbol: 'Pa', name: 'Protactínio', group: 'actinide', col: 6, row: 9 },
  { num: 92, symbol: 'U', name: 'Urânio', group: 'actinide', col: 7, row: 9 },
  { num: 93, symbol: 'Np', name: 'Netúnio', group: 'actinide', col: 8, row: 9 },
  { num: 94, symbol: 'Pu', name: 'Plutônio', group: 'actinide', col: 9, row: 9 },
  { num: 95, symbol: 'Am', name: 'Amerício', group: 'actinide', col: 10, row: 9 },
  { num: 96, symbol: 'Cm', name: 'Cúrio', group: 'actinide', col: 11, row: 9 },
  { num: 97, symbol: 'Bk', name: 'Berquélio', group: 'actinide', col: 12, row: 9 },
  { num: 98, symbol: 'Cf', name: 'Califórnio', group: 'actinide', col: 13, row: 9 },
  { num: 99, symbol: 'Es', name: 'Einstênio', group: 'actinide', col: 14, row: 9 },
  { num: 100, symbol: 'Fm', name: 'Férmio', group: 'actinide', col: 15, row: 9 },
  { num: 101, symbol: 'Md', name: 'Mendelévio', group: 'actinide', col: 16, row: 9 },
  { num: 102, symbol: 'No', name: 'Nobélio', group: 'actinide', col: 17, row: 9 },
  { num: 103, symbol: 'Lr', name: 'Laurêncio', group: 'actinide', col: 18, row: 9 },
  // Back to row 7
  { num: 104, symbol: 'Rf', name: 'Rutherfórdio', group: 'transition', col: 4, row: 7 },
  { num: 105, symbol: 'Db', name: 'Dúbnio', group: 'transition', col: 5, row: 7 },
  { num: 106, symbol: 'Sg', name: 'Seabórgio', group: 'transition', col: 6, row: 7 },
  { num: 107, symbol: 'Bh', name: 'Bóhrio', group: 'transition', col: 7, row: 7 },
  { num: 108, symbol: 'Hs', name: 'Hássio', group: 'transition', col: 8, row: 7 },
  { num: 109, symbol: 'Mt', name: 'Meitnério', group: 'transition', col: 9, row: 7 },
  { num: 110, symbol: 'Ds', name: 'Darmstádio', group: 'transition', col: 10, row: 7 },
  { num: 111, symbol: 'Rg', name: 'Roentgênio', group: 'transition', col: 11, row: 7 },
  { num: 112, symbol: 'Cn', name: 'Copernício', group: 'transition', col: 12, row: 7 },
  { num: 113, symbol: 'Nh', name: 'Nihônio', group: 'post-transition', col: 13, row: 7 },
  { num: 114, symbol: 'Fl', name: 'Fleróvio', group: 'post-transition', col: 14, row: 7 },
  { num: 115, symbol: 'Mc', name: 'Moscóvio', group: 'post-transition', col: 15, row: 7 },
  { num: 116, symbol: 'Lv', name: 'Livermório', group: 'post-transition', col: 16, row: 7 },
  { num: 117, symbol: 'Ts', name: 'Tenessino', group: 'halogen', col: 17, row: 7 },
  { num: 118, symbol: 'Og', name: 'Oganessônio', group: 'noble', col: 18, row: 7 },
];

const groupColors: Record<string, string> = {
  'nonmetal': 'bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-400',
  'noble': 'bg-purple-500/20 border-purple-500/50 text-purple-700 dark:text-purple-400',
  'alkali': 'bg-red-500/20 border-red-500/50 text-red-700 dark:text-red-400',
  'alkaline': 'bg-orange-500/20 border-orange-500/50 text-orange-700 dark:text-orange-400',
  'metalloid': 'bg-teal-500/20 border-teal-500/50 text-teal-700 dark:text-teal-400',
  'halogen': 'bg-yellow-500/20 border-yellow-500/50 text-yellow-700 dark:text-yellow-400',
  'transition': 'bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-400',
  'post-transition': 'bg-indigo-500/20 border-indigo-500/50 text-indigo-700 dark:text-indigo-400',
  'lanthanide': 'bg-pink-500/20 border-pink-500/50 text-pink-700 dark:text-pink-400',
  'actinide': 'bg-rose-500/20 border-rose-500/50 text-rose-700 dark:text-rose-400',
};

interface ElementData {
  num: number | string;
  symbol: string;
  name: string;
  group: string;
  col?: number;
  row?: number;
  description?: string;
}

export function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

  return (
    <div className="flex flex-col h-full p-6 bg-background rounded-xl">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-18 gap-1 min-w-[1000px]">
          {/* Placeholders to show the gap for Lanthanides/Actinides */}
          <motion.div
            whileHover={{ scale: 1.1, zIndex: 10 }}
            onClick={() => setSelectedElement({
              num: '57-71',
              symbol: 'La-Lu',
              name: 'Lantanídeos',
              group: 'lanthanide',
              description: 'A série dos lantanídeos compreende os 15 elementos metálicos com números atômicos de 57 a 71, do lantânio ao lutécio. São frequentemente chamados de terras raras.'
            })}
            className={cn(
              "cursor-pointer border rounded-md p-1 flex flex-col items-center justify-center aspect-square transition-colors",
              groupColors['lanthanide'],
              selectedElement?.name === 'Lantanídeos' ? "ring-2 ring-primary ring-offset-2" : ""
            )}
            style={{ gridColumn: 3, gridRow: 6 }}
          >
            <span className="text-[10px] self-start opacity-70">57-71</span>
            <span className="font-bold text-sm leading-none mt-1">La-Lu</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, zIndex: 10 }}
            onClick={() => setSelectedElement({
              num: '89-103',
              symbol: 'Ac-Lr',
              name: 'Actinídeos',
              group: 'actinide',
              description: 'A série dos actinídeos abrange os 15 elementos metálicos radioativos com números atômicos de 89 a 103, do actínio ao laurêncio.'
            })}
            className={cn(
              "cursor-pointer border rounded-md p-1 flex flex-col items-center justify-center aspect-square transition-colors",
              groupColors['actinide'],
              selectedElement?.name === 'Actinídeos' ? "ring-2 ring-primary ring-offset-2" : ""
            )}
            style={{ gridColumn: 3, gridRow: 7 }}
          >
            <span className="text-[10px] self-start opacity-70">89-103</span>
            <span className="font-bold text-sm leading-none mt-1">Ac-Lr</span>
          </motion.div>

          {elements.map((el) => (
            <motion.div
              key={el.num}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              onClick={() => setSelectedElement(el)}
              className={cn(
                "cursor-pointer border rounded-md p-1 flex flex-col items-center justify-center aspect-square transition-colors",
                groupColors[el.group],
                selectedElement?.num === el.num ? "ring-2 ring-primary ring-offset-2" : ""
              )}
              style={{
                gridColumn: el.col,
                gridRow: el.row,
              }}
            >
              <span className="text-[10px] self-start opacity-70">{el.num}</span>
              <span className="font-bold text-lg leading-none">{el.symbol}</span>
              <span className="text-[8px] truncate w-full text-center mt-1 opacity-80">{el.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedElement && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 rounded-lg border bg-card"
        >
          <div className="flex items-center gap-6">
            <div className={cn(
              "w-24 h-24 rounded-lg border flex flex-col items-center justify-center",
              groupColors[selectedElement.group]
            )}>
              <span className="text-sm opacity-70">{selectedElement.num}</span>
              <span className="font-bold text-4xl">{selectedElement.symbol}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{selectedElement.name}</h3>
              <p className="text-muted-foreground capitalize mt-1">Grupo: {selectedElement.group}</p>
              <p className="text-sm mt-4 max-w-md">
                {selectedElement.description || `O ${selectedElement.name} é um elemento químico de símbolo ${selectedElement.symbol} e número atômico ${selectedElement.num}.`}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

