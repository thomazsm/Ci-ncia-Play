import { useState } from 'react';
import { createPortal } from 'react-dom';
import { SolarSystem } from '../simulations/SolarSystem';
import { EarthLayers } from '../simulations/EarthLayers';
import { AtomModel } from '../simulations/AtomModel';
import { CellDivision } from '../simulations/CellDivision';
import { MoonPhases } from '../simulations/MoonPhases';
import { WaveSimulator } from '../simulations/WaveSimulator';
import { PeriodicTable } from '../simulations/PeriodicTable';
import { DigestiveSystem } from '../simulations/DigestiveSystem';
import { RespiratorySystem } from '../simulations/RespiratorySystem';
import { TectonicPlates } from '../simulations/TectonicPlates';
import { MendelLab } from '../simulations/MendelLab';
import { WaterCycle } from '../simulations/WaterCycle';
import { MatterStates } from '../simulations/MatterStates';
import { Biomes } from '../simulations/Biomes';
import { DNAModel } from '../simulations/DNAModel';
import { HeartSystem } from '../simulations/HeartSystem';
import { Photosynthesis } from '../simulations/Photosynthesis';
import { ChemistryLab } from '../simulations/ChemistryLab';
import { XCircle, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '../ui/button';

const simulations = [
  { id: 'solar', name: 'Sistema Solar', component: SolarSystem, type: '3D' },
  { id: 'earth', name: 'Camadas da Terra', component: EarthLayers, type: '3D' },
  { id: 'moon', name: 'Fases da Lua', component: MoonPhases, type: '3D' },
  { id: 'tectonic', name: 'Placas Tectônicas', component: TectonicPlates, type: '3D' },
  { id: 'water', name: 'Ciclo da Água', component: WaterCycle, type: '2D' },
  { id: 'biomes', name: 'Biomas', component: Biomes, type: '2D' },
  { id: 'digestive', name: 'Sistema Digestório', component: DigestiveSystem, type: '3D' },
  { id: 'respiratory', name: 'Sistema Respiratório', component: RespiratorySystem, type: '3D' },
  { id: 'heart', name: 'Sistema Circulatório', component: HeartSystem, type: '3D' },
  { id: 'cell', name: 'Divisão Celular', component: CellDivision, type: '3D' },
  { id: 'dna', name: 'Modelo de DNA', component: DNAModel, type: '3D' },
  { id: 'photosynthesis', name: 'Fotossíntese', component: Photosynthesis, type: '2D' },
  { id: 'chemistry', name: 'Lab de Química', component: ChemistryLab, type: '3D' },
  { id: 'mendel', name: 'Lab de Mendel', component: MendelLab, type: '2D' },
  { id: 'atom', name: 'Modelo Atômico', component: AtomModel, type: '3D' },
  { id: 'periodic', name: 'Tabela Periódica', component: PeriodicTable, type: '2D' },
  { id: 'matter', name: 'Estados da Matéria', component: MatterStates, type: '2D' },
  { id: 'waves', name: 'Ondas', component: WaveSimulator, type: '2D' },
];

export function LabGallery() {
  const [activeSim, setActiveSim] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (activeSim) {
    const sim = simulations.find(s => s.id === activeSim);
    const Component = sim?.component;
    
    const content = (
      <div className={isFullscreen ? "fixed inset-0 z-[100] bg-black flex flex-col" : "h-full flex flex-col relative bg-black"}>
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Recolher simulação" : "Expandir simulação"}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>
          <button 
            onClick={() => {
              setActiveSim(null);
              setIsFullscreen(false);
            }}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur transition-colors"
            title="Fechar simulação"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 relative w-full h-full">
          {Component && <Component />}
        </div>
      </div>
    );

    if (isFullscreen) {
      return createPortal(content, document.body);
    }

    return content;
  }

  return (
    <div className="h-full p-6 overflow-y-auto bg-slate-50 dark:bg-slate-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {simulations.map(sim => (
          <button
            key={sim.id}
            onClick={() => setActiveSim(sim.id)}
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="font-bold text-primary">{sim.type}</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-center">{sim.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
