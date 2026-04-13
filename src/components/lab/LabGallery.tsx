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
import { GravitySimulator } from './GravitySimulator';
import { AtomBuilder } from './AtomBuilder';
import { XRayBody } from './XRayBody';
import { MoleculeViewer } from './MoleculeViewer';
import { XCircle, Maximize2, Minimize2, PlayCircle, Box, Layers } from 'lucide-react';
import { Button } from '../ui/button';

const simulations = [
  { id: 'solar', name: 'Sistema Solar', component: SolarSystem, type: '3D', icon: Box },
  { id: 'earth', name: 'Camadas da Terra', component: EarthLayers, type: '3D', icon: Layers },
  { id: 'moon', name: 'Fases da Lua', component: MoonPhases, type: '3D', icon: Box },
  { id: 'tectonic', name: 'Placas Tectônicas', component: TectonicPlates, type: '3D', icon: Layers },
  { id: 'water', name: 'Ciclo da Água', component: WaterCycle, type: '2D', icon: PlayCircle },
  { id: 'biomes', name: 'Biomas', component: Biomes, type: '2D', icon: PlayCircle },
  { id: 'digestive', name: 'Sistema Digestório', component: DigestiveSystem, type: '3D', icon: Box },
  { id: 'respiratory', name: 'Sistema Respiratório', component: RespiratorySystem, type: '3D', icon: Box },
  { id: 'heart', name: 'Sistema Circulatório', component: HeartSystem, type: '3D', icon: Box },
  { id: 'cell', name: 'Divisão Celular', component: CellDivision, type: '3D', icon: Box },
  { id: 'dna', name: 'Modelo de DNA', component: DNAModel, type: '3D', icon: Box },
  { id: 'photosynthesis', name: 'Fotossíntese', component: Photosynthesis, type: '2D', icon: PlayCircle },
  { id: 'chemistry', name: 'Lab de Química', component: ChemistryLab, type: '3D', icon: Box },
  { id: 'mendel', name: 'Lab de Mendel', component: MendelLab, type: '2D', icon: PlayCircle },
  { id: 'atom', name: 'Modelo Atômico', component: AtomModel, type: '3D', icon: Box },
  { id: 'periodic', name: 'Tabela Periódica', component: PeriodicTable, type: '2D', icon: PlayCircle },
  { id: 'matter', name: 'Estados da Matéria', component: MatterStates, type: '2D', icon: PlayCircle },
  { id: 'waves', name: 'Ondas', component: WaveSimulator, type: '2D', icon: PlayCircle },
  { id: 'gravity', name: 'Simulador de Gravidade', component: GravitySimulator, type: '2D', icon: PlayCircle },
  { id: 'xray', name: 'Modo Raio-X', component: XRayBody, type: '3D', icon: Box },
  { id: 'atombuilder', name: 'Monte seu Átomo', component: AtomBuilder, type: '2D', icon: PlayCircle },
  { id: 'molecules', name: 'Moléculas 3D', component: MoleculeViewer, type: '3D', icon: Box },
];

export function LabGallery() {
  const [activeSim, setActiveSim] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (activeSim) {
    const sim = simulations.find(s => s.id === activeSim);
    const Component = sim?.component;
    
    const content = (
      <div className={isFullscreen ? "fixed inset-0 z-[100] bg-black flex flex-col" : "h-[80vh] min-h-[600px] flex flex-col relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"}>
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
    <div className="w-full pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {simulations.map(sim => {
          const Icon = sim.icon;
          return (
            <button
              key={sim.id}
              onClick={() => setActiveSim(sim.id)}
              className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group flex flex-col justify-between hover:-translate-y-1 text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150" />
              <Icon className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-100 dark:text-slate-800/50 group-hover:text-primary/5 transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-12" />
              
              <div className="relative z-10 w-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {sim.name}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {sim.type}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
