import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { SimulationInfoCard } from '@/src/components/ui/SimulationInfoCard';

const PHASES = [
  { name: 'Interfase', description: 'A célula cresce e o DNA é duplicado.', color: '#22c55e' },
  { name: 'Prófase', description: 'O DNA se condensa em cromossomos visíveis.', color: '#10b981' },
  { name: 'Metáfase', description: 'Os cromossomos se alinham no centro da célula.', color: '#059669' },
  { name: 'Anáfase', description: 'As cromátides irmãs são separadas para polos opostos.', color: '#047857' },
  { name: 'Telófase', description: 'Dois novos núcleos se formam.', color: '#065f46' },
  { name: 'Citocinese', description: 'A célula se divide em duas células filhas.', color: '#064e3b' },
];

function Chromosome({ position, rotation, color = '#a855f7', visible = true }: any) {
  if (!visible) return null;
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0.1, 0, 0]}>
        <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.1, 0, 0]}>
        <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function MitosisCell({ phaseIndex }: { phaseIndex: number }) {
  const membraneRef = useRef<THREE.Mesh>(null);
  const membraneRef2 = useRef<THREE.Mesh>(null);
  
  const isDividing = phaseIndex >= 3; // Anaphase onwards
  const isSeparated = phaseIndex === 5; // Cytokinesis

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulse = Math.sin(time * 2) * 0.05;

    if (membraneRef.current) {
      // Scale and position based on phase
      if (phaseIndex === 0) {
        membraneRef.current.scale.setScalar(1 + pulse);
        membraneRef.current.position.x = 0;
      } else if (phaseIndex === 1 || phaseIndex === 2) {
        membraneRef.current.scale.set(1.2 + pulse, 1, 1);
        membraneRef.current.position.x = 0;
      } else if (phaseIndex === 3) {
        membraneRef.current.scale.set(1.5 + pulse, 0.9, 0.9);
        membraneRef.current.position.x = 0;
      } else if (phaseIndex === 4) {
        membraneRef.current.scale.set(1 + pulse, 1, 1);
        membraneRef.current.position.x = -1.5;
      } else if (phaseIndex === 5) {
        membraneRef.current.scale.setScalar(0.8 + pulse);
        membraneRef.current.position.x = -2.5;
      }
    }

    if (membraneRef2.current) {
      if (phaseIndex === 4) {
        membraneRef2.current.scale.setScalar(1 + pulse);
        membraneRef2.current.position.x = 1.5;
        membraneRef2.current.visible = true;
      } else if (phaseIndex === 5) {
        membraneRef2.current.scale.setScalar(0.8 + pulse);
        membraneRef2.current.position.x = 2.5;
        membraneRef2.current.visible = true;
      } else {
        membraneRef2.current.visible = false;
      }
    }
  });

  const chromosomes = useMemo(() => {
    return [...Array(4)].map((_, i) => ({
      id: i,
      initialPos: new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5),
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number]
    }));
  }, []);

  return (
    <group>
      {/* Main Membrane */}
      <mesh ref={membraneRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial 
          color="#22c55e" 
          distort={phaseIndex === 3 ? 0.6 : 0.3} 
          speed={2} 
          transparent 
          opacity={0.5} 
          transmission={0.5}
          thickness={1}
        />
      </mesh>

      {/* Second Membrane (for Telophase/Cytokinesis) */}
      <mesh ref={membraneRef2}>
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial 
          color="#22c55e" 
          distort={0.3} 
          speed={2} 
          transparent 
          opacity={0.5} 
          transmission={0.5}
        />
      </mesh>

      {/* Chromosomes Logic */}
      <group>
        {chromosomes.map((c, i) => {
          let pos = new THREE.Vector3().copy(c.initialPos);
          let rot = [...c.rotation] as [number, number, number];
          let visible = phaseIndex > 0;

          if (phaseIndex === 2) { // Metaphase: Align in center
            pos.set(0, (i - 1.5) * 0.5, 0);
            rot = [0, 0, Math.PI / 2];
          } else if (phaseIndex === 3) { // Anaphase: Split
            pos.set(-1, (i - 1.5) * 0.5, 0);
            rot = [0, 0, Math.PI / 2];
          } else if (phaseIndex >= 4) { // Telophase: Move to nuclei
            pos.set(-1.5 + c.initialPos.x * 0.5, c.initialPos.y * 0.5, c.initialPos.z * 0.5);
          }

          return <Chromosome key={`c1-${i}`} position={pos} rotation={rot} visible={visible} />;
        })}

        {/* Second set of chromosomes for Anaphase onwards */}
        {phaseIndex >= 3 && chromosomes.map((c, i) => {
          let pos = new THREE.Vector3();
          let rot = [0, 0, Math.PI / 2] as [number, number, number];

          if (phaseIndex === 3) {
            pos.set(1, (i - 1.5) * 0.5, 0);
          } else if (phaseIndex >= 4) {
            pos.set(1.5 + c.initialPos.x * 0.5, c.initialPos.y * 0.5, c.initialPos.z * 0.5);
            rot = c.rotation;
          }

          return <Chromosome key={`c2-${i}`} position={pos} rotation={rot} color="#d946ef" />;
        })}
      </group>

      {/* Spindle Fibers (Centrioles) */}
      {phaseIndex >= 1 && phaseIndex <= 3 && (
        <group>
          <mesh position={[-2.5, 0, 0]}>
            <boxGeometry args={[0.2, 0.4, 0.2]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[2.5, 0, 0]}>
            <boxGeometry args={[0.2, 0.4, 0.2]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        </group>
      )}
    </group>
  );
}

export function CellDivision() {
  const [phase, setPhase] = useState(0);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 w-full max-w-sm pr-8">
        <SimulationInfoCard title="Simulação de Mitose">
          <div className="mb-4">
            <span className="inline-block px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              Fase: {PHASES[phase].name}
            </span>
            <p className="text-sm text-slate-300 leading-relaxed">
              {PHASES[phase].description}
            </p>
          </div>
          
          <div className="flex gap-2 mb-6">
            {PHASES.map((_, i) => (
              <button
                key={i}
                onClick={() => setPhase(i)}
                className={`flex-1 h-2 rounded-full transition-all ${
                  phase === i ? 'bg-emerald-500' : 'bg-slate-700 hover:bg-slate-600'
                }`}
                title={PHASES[i].name}
              />
            ))}
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={() => setPhase((p) => Math.max(0, p - 1))}
              disabled={phase === 0}
              className="flex-1 py-2 px-4 rounded bg-slate-800 text-white font-bold hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              Anterior
            </button>
            <button
              onClick={() => setPhase((p) => Math.min(PHASES.length - 1, p + 1))}
              disabled={phase === PHASES.length - 1}
              className="flex-1 py-2 px-4 rounded bg-emerald-500 text-white font-bold hover:bg-emerald-600 disabled:opacity-50 transition-colors"
            >
              Próxima
            </button>
          </div>
        </SimulationInfoCard>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          <MitosisCell phaseIndex={phase} />
        </Float>

        <OrbitControls enablePan={false} maxDistance={20} minDistance={5} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
