import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Microscope, Cuboid, Activity, Gamepad2, Hexagon, Maximize2, Minimize2, XCircle } from 'lucide-react';
import { LabGallery } from '@/src/components/lab/LabGallery';
import { MoleculeViewer } from '@/src/components/lab/MoleculeViewer';
import { GravitySimulator } from '@/src/components/lab/GravitySimulator';
import { AtomBuilder } from '@/src/components/lab/AtomBuilder';
import { XRayBody } from '@/src/components/lab/XRayBody';
import { Button } from '@/src/components/ui/button';

export function LabDashboard() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const tabs = [
    { id: 'gallery', name: 'Galeria Livre', icon: Microscope },
    { id: 'sandbox', name: 'Simulador de Gravidade', icon: Activity },
    { id: 'xray', name: 'Modo Raio-X', icon: Cuboid },
    { id: 'minigames', name: 'Monte seu Átomo', icon: Gamepad2 },
    { id: 'molecules', name: 'Moléculas 3D', icon: Hexagon },
  ];

  const renderActiveTab = () => {
    if (activeTab === 'gallery') return <LabGallery />;

    let Component;
    switch (activeTab) {
      case 'sandbox': Component = <GravitySimulator />; break;
      case 'xray': Component = <XRayBody />; break;
      case 'minigames': Component = <AtomBuilder />; break;
      case 'molecules': Component = <MoleculeViewer />; break;
      default: return null;
    }

    const content = (
      <div className={isFullscreen ? "fixed inset-0 z-[100] bg-black flex flex-col overflow-auto" : "h-full flex flex-col relative rounded-3xl overflow-auto shadow-xl border border-white/20 bg-white dark:bg-slate-900"}>
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-slate-500/20 hover:bg-slate-500/40 text-foreground border-slate-500/20 backdrop-blur-md"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Recolher simulação" : "Expandir simulação"}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>
        </div>
        <div className="flex-1 relative w-full h-full min-h-min">
          {Component}
        </div>
      </div>
    );

    if (isFullscreen) {
      return createPortal(content, document.body);
    }

    return content;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0 mb-8 bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-white/20 shadow-sm backdrop-blur-md"
      >
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-2xl text-primary">
            <Microscope className="w-8 h-8" />
          </div>
          Laboratório 3D
        </h1>
        <p className="text-lg text-muted-foreground ml-14">Explore, experimente e divirta-se no nosso ambiente de simulação livre.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="shrink-0 flex gap-3 mb-6 overflow-x-auto pb-4 pt-2 scrollbar-hide px-2 w-full max-w-[1216px] mr-5"
      >
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsFullscreen(false);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap shadow-sm ${
                activeTab === tab.id 
                  ? 'bg-primary text-white scale-105 shadow-primary/25' 
                  : 'glass text-foreground hover:bg-white/80 hover:scale-105'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.name}
            </button>
          );
        })}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className={activeTab === 'gallery' ? "flex-1 min-h-0 glass rounded-3xl border-white/40 shadow-xl overflow-hidden relative" : "flex-1 min-h-0 relative"}
      >
        {renderActiveTab()}
      </motion.div>
    </div>
  );
}
