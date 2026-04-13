import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculum } from '@/src/data/curriculum';
import { lessonDetails } from '@/src/data/lessonDetails';
import { theoryContent } from '@/src/data/theory';
import { Button } from '@/src/components/ui/button';
import { ChevronLeft, Info, Target, Lightbulb, BookOpen, FlaskConical, Maximize2, Minimize2, Printer } from 'lucide-react';
import { SolarSystem } from '@/src/components/simulations/SolarSystem';
import { EarthLayers } from '@/src/components/simulations/EarthLayers';
import { AtomModel } from '@/src/components/simulations/AtomModel';
import { CellDivision } from '@/src/components/simulations/CellDivision';
import { MoonPhases } from '@/src/components/simulations/MoonPhases';
import { WaveSimulator } from '@/src/components/simulations/WaveSimulator';
import { PeriodicTable } from '@/src/components/simulations/PeriodicTable';
import { DigestiveSystem } from '@/src/components/simulations/DigestiveSystem';
import { RespiratorySystem } from '@/src/components/simulations/RespiratorySystem';
import { MendelLab } from '@/src/components/simulations/MendelLab';
import { WaterCycle } from '@/src/components/simulations/WaterCycle';
import { MatterStates } from '@/src/components/simulations/MatterStates';
import { Biomes } from '@/src/components/simulations/Biomes';
import { DNAModel } from '@/src/components/simulations/DNAModel';
import { Quiz } from '@/src/components/simulations/Quiz';
import { MixtureSeparation } from '@/src/components/lab/MixtureSeparation';
import { RockCycle } from '@/src/components/lab/RockCycle';
import { AtmosphereLayers } from '@/src/components/lab/AtmosphereLayers';
import { SimpleMachines } from '@/src/components/lab/SimpleMachines';
import { SustainabilityCity } from '@/src/components/lab/SustainabilityCity';
import { ThermalMachine } from '@/src/components/lab/ThermalMachine';
import { BiodiversityImpact } from '@/src/components/lab/BiodiversityImpact';
import { SeasonsSimulator } from '@/src/components/lab/SeasonsSimulator';
import { PrimitiveEarth } from '@/src/components/lab/PrimitiveEarth';
import { GreenhouseEffect } from '@/src/components/lab/GreenhouseEffect';
import { ReproductionSim } from '@/src/components/lab/ReproductionSim';
import { IstPrevention } from '@/src/components/lab/IstPrevention';
import { DrugsBrain } from '@/src/components/lab/DrugsBrain';
import { CardiovascularSystem } from '@/src/components/lab/CardiovascularSystem';
import { DcntSim } from '@/src/components/lab/DcntSim';
import { ChemicalReactions } from '@/src/components/lab/ChemicalReactions';
import { BiotechLab } from '@/src/components/lab/BiotechLab';
import { NaturalSelection } from '@/src/components/lab/NaturalSelection';
import { FoodWeb } from '@/src/components/lab/FoodWeb';
import { EnvironmentalImpacts } from '@/src/components/lab/EnvironmentalImpacts';
import { PubertySimulator } from '@/src/components/lab/PubertySimulator';
import { ScientificMethod } from '@/src/components/lab/ScientificMethod';
import { ChemistryMixer } from '@/src/components/lab/ChemistryMixer';
import { CircuitBuilder } from '@/src/components/lab/CircuitBuilder';
import { VirtualDissection } from '@/src/components/lab/VirtualDissection';
import { EcosystemBuilder } from '@/src/components/lab/EcosystemBuilder';
import { OpticsLab } from '@/src/components/lab/OpticsLab';
import { MutantCreator } from '@/src/components/lab/MutantCreator';
import { DensityTank } from '@/src/components/lab/DensityTank';
import { EnergySkatePark } from '@/src/components/lab/EnergySkatePark';
import { PhLab } from '@/src/components/lab/PhLab';
import { GasLaws } from '@/src/components/lab/GasLaws';
import { PhotosynthesisLab } from '@/src/components/lab/PhotosynthesisLab';
import { BloodTyping } from '@/src/components/lab/BloodTyping';
import { GravitySimulator } from '@/src/components/lab/GravitySimulator';
import { ProjectileCannon } from '@/src/components/lab/ProjectileCannon';
import { Microscope } from '@/src/components/lab/Microscope';
import { TectonicPlates } from '@/src/components/lab/TectonicPlates';
import { WeatherMachine } from '@/src/components/lab/WeatherMachine';

export function Lesson() {
  const { gradeId, moduleId, lessonId } = useParams();
  const grade = curriculum.find(g => g.id === gradeId);
  const module = grade?.modules.find(m => m.id === moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  const [activeTab, setActiveTab] = useState<'lab' | 'theory'>(lesson?.type === 'text' ? 'theory' : 'lab');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrint = () => {
    window.focus();
    window.print();
  };

  // Update active tab when lesson changes
  useEffect(() => {
    if (lesson?.type === 'text') {
      setActiveTab('theory');
    } else {
      setActiveTab('lab');
    }
  }, [lesson?.id, lesson?.type]);

  if (!lesson) {
    return <div>Aula não encontrada.</div>;
  }

  const details = lessonDetails[lesson.id];

  const renderSimulation = () => {
    switch (lesson.content) {
      case 'solar-system':
        return <SolarSystem />;
      case 'earth-layers':
        return <EarthLayers />;
      case 'atom-model':
        return <AtomModel />;
      case 'cell-division':
        return <CellDivision />;
      case 'moon-phases':
        return <MoonPhases />;
      case 'wave-simulator':
        return <WaveSimulator />;
      case 'periodic-table':
        return <PeriodicTable />;
      case 'digestive-system':
        return <DigestiveSystem />;
      case 'respiratory-system':
        return <RespiratorySystem />;
      case 'mendel-lab':
        return <MendelLab />;
      case 'biogeochemical-cycles':
        return <WaterCycle />;
      case 'matter-states':
        return <MatterStates />;
      case 'biomes':
        return <Biomes />;
      case 'dna-model':
        return <DNAModel />;
      case 'quiz':
        return <Quiz />;
      case 'mixture-separation':
        return <MixtureSeparation />;
      case 'rock-cycle':
        return <RockCycle />;
      case 'atmosphere-layers':
        return <AtmosphereLayers />;
      case 'simple-machines':
        return <SimpleMachines />;
      case 'sustainability-city':
        return <SustainabilityCity />;
      case 'thermal-machine':
        return <ThermalMachine />;
      case 'biodiversity-impact':
        return <BiodiversityImpact />;
      case 'seasons-simulator':
        return <SeasonsSimulator />;
      case 'terra-primitiva':
        return <PrimitiveEarth />;
      case 'greenhouse-effect':
        return <GreenhouseEffect />;
      case 'reproduction-sim':
        return <ReproductionSim />;
      case 'ist-prevention':
        return <IstPrevention />;
      case 'drugs-brain':
        return <DrugsBrain />;
      case 'cardiovascular-system':
        return <CardiovascularSystem />;
      case 'dcnt-sim':
        return <DcntSim />;
      case 'chemical-reactions':
        return <ChemicalReactions />;
      case 'biotech-lab':
        return <BiotechLab />;
      case 'natural-selection':
        return <NaturalSelection />;
      case 'food-web':
        return <FoodWeb />;
      case 'environmental-impacts':
        return <EnvironmentalImpacts />;
      case 'puberty-simulator':
        return <PubertySimulator />;
      case 'scientific-method':
        return <ScientificMethod />;
      case 'chemistry-mixer':
        return <ChemistryMixer />;
      case 'circuit-builder':
        return <CircuitBuilder />;
      case 'virtual-dissection':
        return <VirtualDissection />;
      case 'ecosystem-builder':
        return <EcosystemBuilder />;
      case 'optics-lab':
        return <OpticsLab />;
      case 'mutant-creator':
        return <MutantCreator />;
      case 'density-tank':
        return <DensityTank />;
      case 'energy-skate-park':
        return <EnergySkatePark />;
      case 'ph-lab':
        return <PhLab />;
      case 'gas-laws':
        return <GasLaws />;
      case 'photosynthesis-lab':
        return <PhotosynthesisLab />;
      case 'blood-typing':
        return <BloodTyping />;
      case 'gravity-simulator':
        return <GravitySimulator />;
      case 'projectile-cannon':
        return <ProjectileCannon />;
      case 'microscope-view':
        return <Microscope />;
      case 'tectonic-plates':
        return <TectonicPlates />;
      case 'weather-machine':
        return <WeatherMachine />;
      default:
        return (
          <div className="flex items-center justify-center h-full bg-muted/30 rounded-xl border border-dashed">
            <div className="text-center text-muted-foreground">
              <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Simulação em desenvolvimento para: {lesson.title}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/grade/${gradeId}`}>
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="text-sm text-muted-foreground">{module?.title}</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
          {/* Tabs Header */}
          {lessonId && theoryContent[lessonId] && (
            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab('lab')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'lab' 
                    ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <FlaskConical size={18} />
                Laboratório
              </button>
              <button
                onClick={() => setActiveTab('theory')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'theory' 
                    ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <BookOpen size={18} />
                Teoria
              </button>
            </div>
          )}

          {/* Main Content Area */}
          <div className={
            isFullscreen 
              ? "fixed inset-0 z-[100] bg-black flex flex-col" 
              : "flex-1 bg-black rounded-xl overflow-y-auto overflow-x-hidden relative shadow-lg border"
          }>
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 z-50 flex gap-2 print:hidden">
              {activeTab === 'theory' && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border shadow-sm"
                  onClick={handlePrint}
                  title="Imprimir conteúdo teórico"
                >
                  <Printer className="w-5 h-5" />
                </Button>
              )}
              {activeTab !== 'theory' && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? "Recolher simulação" : "Expandir simulação"}
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </Button>
              )}
            </div>

            {activeTab === 'theory' && lessonId && theoryContent[lessonId] ? (
              <div className="h-full w-full bg-white dark:bg-slate-900 overflow-y-auto">
                {theoryContent[lessonId]}
              </div>
            ) : (
              <div className="flex-1 relative w-full h-full">
                {renderSimulation()}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-card rounded-xl border shadow-sm p-6 overflow-y-auto flex flex-col">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="bg-primary/10 text-primary p-2 rounded-lg">👨‍🏫</span>
            Professor Interativo
          </h2>
          
          <div className="prose prose-sm dark:prose-invert flex-1">
            <p className="text-lg font-medium text-foreground mb-4">
              {details?.greeting || `Olá! Vamos aprender sobre ${lesson.title.toLowerCase()}.`}
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {details?.explanation || lesson.description}
            </p>
            
            {lesson.type === '3d' && (
              <div className="bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 p-4 rounded-lg border border-blue-100 dark:border-blue-900 mb-6">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4" /> Dica de Interação
                </h4>
                <p className="text-sm">
                  Use o mouse ou toque na tela para girar o modelo 3D. Use o scroll para aproximar ou afastar.
                </p>
              </div>
            )}

            {details && (
              <>
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-primary" /> O que você vai aprender:
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {details.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Exemplos Práticos:
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {details.practicalExamples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {!details && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">O que você vai aprender:</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Conceitos fundamentais</li>
                  <li>Exemplos práticos</li>
                  <li>Aplicações no dia a dia</li>
                </ul>
              </div>
            )}
          </div>
          
          <div className="pt-6 mt-6 border-t">
            <Button className="w-full">
              Fazer Exercícios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}



