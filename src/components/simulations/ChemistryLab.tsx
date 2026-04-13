import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, useGLTF, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, FlaskConical, Thermometer, Info, ArrowRight } from 'lucide-react';
import { SimulationInfoCard } from '@/src/components/ui/SimulationInfoCard';

const EXPERIMENTS = [
  {
    id: 'volcano',
    name: 'Vinagre + Bicarbonato',
    formula: 'CH₃COOH + NaHCO₃ → CO₂ ↑',
    description: 'Reação ácido-base clássica que libera gás carbônico.',
    liquidColor: '#e2e8f0',
    reactionColor: '#f8fafc',
    effect: 'foam',
    info: 'O ácido acético reage com o bicarbonato, liberando bolhas de CO₂ que criam a efervescência.'
  },
  {
    id: 'elephant',
    name: 'Pasta de Dente de Elefante',
    formula: '2H₂O₂ → 2H₂O + O₂ ↑',
    description: 'Decomposição rápida de peróxido de hidrogênio usando um catalisador.',
    liquidColor: '#60a5fa',
    reactionColor: '#f472b6',
    effect: 'eruption',
    info: 'O catalisador acelera a liberação de oxigênio, criando uma espuma gigante e quente (exotérmica)!'
  },
  {
    id: 'ph',
    name: 'Indicador de pH',
    formula: 'Antocianina + Ácido/Base',
    description: 'Mudança de cor baseada na acidez ou alcalinidade da solução.',
    liquidColor: '#7e22ce',
    reactionColor: '#ef4444',
    effect: 'color-change',
    info: 'O suco de repolho roxo muda de roxo para vermelho em ácidos e para verde/azul em bases.'
  },
  {
    id: 'precipitate',
    name: 'Precipitação',
    formula: 'AgNO₃ + NaCl → AgCl(s) ↓',
    description: 'Formação de um sólido insolúvel a partir de duas soluções líquidas.',
    liquidColor: '#ffffff',
    reactionColor: '#cbd5e1',
    effect: 'solid',
    info: 'Os íons se combinam para formar um sal insolúvel que "precipita" (cai) no fundo do recipiente.'
  }
];

function FoamParticles({ active, type, color }: { active: boolean, type: string, color: string }) {
  const count = type === 'eruption' ? 1000 : 400;
  const meshRef = useRef<THREE.Points>(null);
  
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 0.5;
      p[i * 3 + 1] = -1;
      p[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current && active) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      const speed = type === 'eruption' ? 0.08 : 0.03;
      
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += speed + Math.random() * 0.02;
        positions[i * 3] += (Math.random() - 0.5) * 0.02;
        positions[i * 3 + 2] += (Math.random() - 0.5) * 0.02;
        
        const maxHeight = type === 'eruption' ? 4 : 2;
        if (positions[i * 3 + 1] > maxHeight) {
          positions[i * 3 + 1] = -1;
          positions[i * 3] = (Math.random() - 0.5) * 0.5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!active || type === 'color-change' || type === 'solid') return null;

  return (
    <Points ref={meshRef} positions={points} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={type === 'eruption' ? 0.25 : 0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function LabEquipment({ experiment, reactionActive }: { experiment: typeof EXPERIMENTS[0], reactionActive: boolean }) {
  return (
    <group>
      {/* Beaker */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[1, 1, 2.5, 32, 1, true]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.3} 
          roughness={0} 
          transmission={0.9} 
          thickness={0.5} 
          color="#ffffff"
        />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>

      {/* Liquid */}
      <mesh position={[0, reactionActive && experiment.effect !== 'solid' ? -0.5 : -1.5, 0]}>
        <cylinderGeometry args={[0.95, 0.95, reactionActive && experiment.effect !== 'solid' ? 1.5 : 0.5, 32]} />
        <meshStandardMaterial 
          color={reactionActive ? experiment.reactionColor : experiment.liquidColor} 
          transparent 
          opacity={0.8} 
        />
      </mesh>

      {/* Precipitate Solid */}
      {reactionActive && experiment.effect === 'solid' && (
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.2, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      )}

      <FoamParticles active={reactionActive} type={experiment.effect} color={experiment.reactionColor} />
    </group>
  );
}

function FallingPowder({ active }: { active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (ref.current && active) {
      if (ref.current.position.y > -1) {
        ref.current.position.y -= delta * 4;
      } else {
        ref.current.visible = false;
      }
    }
  });

  if (!active) return null;

  return (
    <group ref={ref} position={[0, 3, 0]}>
      <Points positions={new Float32Array(300).map(() => (Math.random() - 0.5) * 0.5)} stride={3}>
        <PointMaterial color="#ffffff" size={0.05} />
      </Points>
    </group>
  );
}

export function ChemistryLab() {
  const [selectedExp, setSelectedExp] = useState(EXPERIMENTS[0]);
  const [isReacting, setIsReacting] = useState(false);
  const [step, setStep] = useState(0);

  const startReaction = () => {
    setStep(1);
    setTimeout(() => {
      setStep(2);
      setIsReacting(true);
    }, 1000);
  };

  const reset = () => {
    setIsReacting(false);
    setStep(0);
  };

  const handleSelect = (exp: typeof EXPERIMENTS[0]) => {
    setSelectedExp(exp);
    reset();
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden relative">
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10 w-full max-w-sm pr-8">
        <SimulationInfoCard title="Laboratório de Química">
          <div className="space-y-2 mb-6">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">Escolha o Experimento</div>
            <div className="grid grid-cols-1 gap-2">
              {EXPERIMENTS.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => handleSelect(exp)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    selectedExp.id === exp.id 
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10' 
                      : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold">{exp.name}</div>
                  <div className="text-[10px] opacity-60 truncate">{exp.formula}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-300 leading-relaxed">{selectedExp.description}</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                key="step0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <button 
                  onClick={startReaction}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
                >
                  Iniciar Reação
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl mb-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                    <Info className="w-4 h-4" /> O que está acontecendo?
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    {selectedExp.info}
                  </p>
                </div>
                <button 
                  onClick={reset}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
                >
                  Limpar e Reiniciar
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-500">{selectedExp.formula.split('→')[0]}</span>
              <ArrowRight className="w-3 h-3 text-slate-700" />
              <span className="text-blue-400">{selectedExp.formula.split('→')[1] || 'Reação'}</span>
            </div>
          </div>
        </SimulationInfoCard>
      </div>

      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
          <LabEquipment experiment={selectedExp} reactionActive={isReacting} />
          <FallingPowder active={step === 1} />
        </Float>

        <OrbitControls enablePan={false} maxDistance={15} minDistance={3} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
