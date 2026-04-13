import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float, Points, PointMaterial, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { SimulationInfoCard } from '@/src/components/ui/SimulationInfoCard';

function BloodParticles({ count = 100, color = "#ff0000", speed = 1, radius = 2, offset = 0 }: any) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 0.5;
      p[i * 3 + 1] = (Math.random() - 0.5) * 5;
      p[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime() * speed;
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= 0.05 * speed;
        if (positions[i * 3 + 1] < -2.5) positions[i * 3 + 1] = 2.5;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[radius, 0, 0]} rotation={[0, 0, offset]}>
      <Points ref={ref} positions={points} stride={3}>
        <PointMaterial
          transparent
          color={color}
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Heart({ bpm }: { bpm: number }) {
  const heartRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const beatFrequency = (bpm / 60) * Math.PI * 2;
    const beat = Math.pow(Math.sin(time * beatFrequency), 4);
    
    if (heartRef.current) {
      const s = 1 + beat * 0.15;
      heartRef.current.scale.set(s, s, s);
    }
    
    if (materialRef.current) {
      materialRef.current.distort = 0.2 + beat * 0.4;
      materialRef.current.speed = 2 + beat * 5;
    }
  });

  return (
    <group ref={heartRef}>
      {/* Left Ventricle */}
      <mesh position={[-0.4, -0.5, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.8, 1.2, 16, 32]} />
        <MeshDistortMaterial 
          ref={materialRef}
          color="#be123c" 
          distort={0.3} 
          speed={2} 
          roughness={0.1} 
          metalness={0.2}
          emissive="#be123c"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Right Ventricle */}
      <mesh position={[0.4, -0.3, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.7, 1, 16, 32]} />
        <MeshDistortMaterial 
          color="#e11d48" 
          distort={0.2} 
          speed={1.5} 
          roughness={0.1} 
          metalness={0.2}
        />
      </mesh>

      {/* Atria */}
      <mesh position={[-0.3, 0.8, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#9f1239" />
      </mesh>
      <mesh position={[0.3, 0.7, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#881337" />
      </mesh>

      {/* Aorta */}
      <mesh position={[-0.2, 1.5, -0.2]} rotation={[0, 0, 0.5]}>
        <torusGeometry args={[0.8, 0.2, 16, 100, Math.PI]} />
        <meshStandardMaterial color="#be123c" />
      </mesh>

      {/* Vena Cava */}
      <mesh position={[0.6, 1.2, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
    </group>
  );
}

export function HeartSystem() {
  const [bpm, setBpm] = useState(70);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 w-full max-w-xs pr-8">
        <SimulationInfoCard title="Sistema Circulatório">
          <p className="text-xs text-slate-400 mb-4">
            O coração é uma bomba muscular que impulsiona o sangue por todo o corpo.
          </p>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Frequência Cardíaca</span>
              <span className="text-white font-mono">{bpm} BPM</span>
            </div>
            <input 
              type="range" 
              min="40" 
              max="180" 
              value={bpm} 
              onChange={(e) => setBpm(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Repouso</span>
              <span>Exercício Intenso</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <span className="text-[10px] text-slate-300">Sangue Oxigenado (Artérias)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-[10px] text-slate-300">Sangue Venoso (Veias)</span>
            </div>
          </div>
        </SimulationInfoCard>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#be123c" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          <Heart bpm={bpm} />
          
          {/* Blood Flow Visualization */}
          <BloodParticles count={150} color="#ef4444" speed={bpm / 60} radius={-2} offset={0.2} />
          <BloodParticles count={150} color="#3b82f6" speed={bpm / 60} radius={2} offset={-0.2} />
        </Float>

        <OrbitControls enablePan={false} maxDistance={20} minDistance={5} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
