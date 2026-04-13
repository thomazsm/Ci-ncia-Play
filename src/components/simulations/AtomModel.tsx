import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Trail, Float, Stars, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { SimulationInfoCard } from '@/src/components/ui/SimulationInfoCard';

const ELEMENTS = [
  { symbol: 'H', name: 'Hidrogênio', protons: 1, neutrons: 0, electrons: 1, color: '#ef4444' },
  { symbol: 'He', name: 'Hélio', protons: 2, neutrons: 2, electrons: 2, color: '#f59e0b' },
  { symbol: 'Li', name: 'Lítio', protons: 3, neutrons: 4, electrons: 3, color: '#ec4899' },
  { symbol: 'Be', name: 'Berílio', protons: 4, neutrons: 5, electrons: 4, color: '#8b5cf6' },
  { symbol: 'B', name: 'Boro', protons: 5, neutrons: 6, electrons: 5, color: '#3b82f6' },
  { symbol: 'C', name: 'Carbono', protons: 6, neutrons: 6, electrons: 6, color: '#10b981' },
  { symbol: 'N', name: 'Nitrogênio', protons: 7, neutrons: 7, electrons: 7, color: '#06b6d4' },
  { symbol: 'O', name: 'Oxigênio', protons: 8, neutrons: 8, electrons: 8, color: '#f97316' },
];

function QuantumCloud({ count = 1000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.5) * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#4ade80"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.2}
      />
    </Points>
  );
}

function Electron({ radius, speed, color, offset, shellIndex }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    if (meshRef.current) {
      // Add a bit of vertical wobble for a more "quantum" feel
      const wobble = Math.sin(t * 2) * 0.5;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = wobble;
    }
  });

  return (
    <group rotation={[offset * 0.5, offset, 0]}>
      <Trail width={0.4} length={6} color={color} attenuation={(t) => t * t}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={10} toneMapped={false} />
        </mesh>
      </Trail>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.01, radius + 0.01, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Nucleus({ protons, neutrons }: { protons: number, neutrons: number }) {
  const particles = useMemo(() => {
    const total = protons + neutrons;
    const temp = [];
    for (let i = 0; i < total; i++) {
      const isProton = i < protons;
      // Fibonacci sphere distribution for a compact nucleus
      const phi = Math.acos(1 - 2 * (i + 0.5) / total);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = 0.6;
      temp.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ],
        color: isProton ? '#ef4444' : '#3b82f6'
      });
    }
    return temp;
  }, [protons, neutrons]);

  return (
    <group>
      {particles.map((p, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={p.position as any}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial 
              color={p.color} 
              emissive={p.color} 
              emissiveIntensity={2} 
              toneMapped={false} 
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
      <pointLight intensity={2} color="#ffffff" distance={5} />
    </group>
  );
}

export function AtomModel() {
  const [selectedElement, setSelectedElement] = useState(ELEMENTS[5]); // Carbono default
  const [showCloud, setShowCloud] = useState(true);

  const electronShells = useMemo(() => {
    const shells = [];
    let remaining = selectedElement.electrons;
    const shellCapacities = [2, 8, 18, 32];
    
    for (let i = 0; i < shellCapacities.length && remaining > 0; i++) {
      const count = Math.min(remaining, shellCapacities[i]);
      shells.push({ radius: (i + 1) * 2.5, count });
      remaining -= count;
    }
    return shells;
  }, [selectedElement]);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden relative">
      {/* Element Selector UI */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-4">
        <SimulationInfoCard title="Laboratório Atômico">
          <p className="text-xs text-slate-400 mb-3">Selecione um elemento para visualizar sua estrutura.</p>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {ELEMENTS.map((el) => (
              <button
                key={el.symbol}
                onClick={() => setSelectedElement(el)}
                className={`w-10 h-10 rounded flex items-center justify-center font-bold transition-all ${
                  selectedElement.symbol === el.symbol
                    ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {el.symbol}
              </button>
            ))}
          </div>

          <div className="space-y-1 border-t border-slate-700 pt-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Elemento:</span>
              <span className="text-white font-medium">{selectedElement.name}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-red-400">Prótons:</span>
              <span className="text-white font-medium">{selectedElement.protons}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-blue-400">Nêutrons:</span>
              <span className="text-white font-medium">{selectedElement.neutrons}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-emerald-400">Elétrons:</span>
              <span className="text-white font-medium">{selectedElement.electrons}</span>
            </div>
          </div>

          <button
            onClick={() => setShowCloud(!showCloud)}
            className={`mt-4 w-full py-2 px-3 rounded text-xs font-bold transition-all ${
              showCloud ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {showCloud ? 'Ocultar Nuvem Quântica' : 'Mostrar Nuvem Quântica'}
          </button>
        </SimulationInfoCard>
      </div>

      <Canvas camera={{ position: [0, 8, 15], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.2} />
        
        <group>
          <Nucleus protons={selectedElement.protons} neutrons={selectedElement.neutrons} />
          
          {electronShells.map((shell, sIdx) => (
            <group key={`shell-${sIdx}`}>
              {[...Array(shell.count)].map((_, eIdx) => (
                <Electron
                  key={`e-${sIdx}-${eIdx}`}
                  radius={shell.radius}
                  speed={2 / (sIdx + 1)}
                  color="#4ade80"
                  offset={(eIdx * (Math.PI * 2)) / shell.count}
                  shellIndex={sIdx}
                />
              ))}
            </group>
          ))}

          {showCloud && <QuantumCloud />}
        </group>

        <OrbitControls enablePan={false} maxDistance={30} minDistance={5} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
