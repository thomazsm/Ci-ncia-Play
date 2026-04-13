import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { SimulationInfoCard } from '@/src/components/ui/SimulationInfoCard';

function DoubleHelix() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Organic rotation and floating
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      groupRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.8;
    }
  });

  const numPairs = 40;
  const radius = 2.5;
  const heightStep = 0.6;
  const angleStep = 0.4;

  const pairs = useMemo(() => {
    return Array.from({ length: numPairs }).map((_, i) => {
      const y = (i - numPairs / 2) * heightStep;
      const angle = i * angleStep;
      
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      const isAT = Math.random() > 0.5;
      const color1 = isAT ? '#ef4444' : '#3b82f6'; // A (red) or C (blue)
      const color2 = isAT ? '#eab308' : '#22c55e'; // T (yellow) or G (green)

      return { y, x1, z1, x2, z2, angle, color1, color2 };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {pairs.map((pair, i) => (
        <group key={i}>
          {/* Sugar-Phosphate Backbone */}
          <mesh position={[pair.x1, pair.y, pair.z1]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshPhysicalMaterial color="#cbd5e1" metalness={0.5} roughness={0.2} clearcoat={1} />
          </mesh>
          <mesh position={[pair.x2, pair.y, pair.z2]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshPhysicalMaterial color="#cbd5e1" metalness={0.5} roughness={0.2} clearcoat={1} />
          </mesh>

          {/* Hydrogen Bonds (Glowing) */}
          <mesh position={[pair.x1 * 0.5, pair.y, pair.z1 * 0.5]} rotation={[0, -pair.angle, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, radius, 16]} />
            <meshStandardMaterial color={pair.color1} emissive={pair.color1} emissiveIntensity={2} toneMapped={false} />
          </mesh>
          <mesh position={[pair.x2 * 0.5, pair.y, pair.z2 * 0.5]} rotation={[0, -(pair.angle + Math.PI), Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, radius, 16]} />
            <meshStandardMaterial color={pair.color2} emissive={pair.color2} emissiveIntensity={2} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function DNAModel() {
  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10">
        <SimulationInfoCard title="Pares de Bases">
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></div><span className="text-slate-300">Adenina (A)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308]"></div><span className="text-slate-300">Timina (T)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div><span className="text-slate-300">Citosina (C)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div><span className="text-slate-300">Guanina (G)</span></div>
          </div>
        </SimulationInfoCard>
      </div>

      <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        <DoubleHelix />
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.5} />
        
        <EffectComposer>
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={3} height={480} />
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
