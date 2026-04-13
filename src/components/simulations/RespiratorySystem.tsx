import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, MeshDistortMaterial, Float, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function BreathParticles() {
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = Math.random() * 5 - 2.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      const isInhaling = Math.sin(time * 2) > 0;
      
      // Move particles up and down based on breathing
      ref.current.position.y = Math.sin(time * 2) * 0.5;
      ref.current.rotation.y += 0.01;
      
      // Fade particles based on breathing cycle
      if (ref.current.material instanceof THREE.PointsMaterial) {
        ref.current.material.opacity = Math.abs(Math.sin(time * 2)) * 0.5;
      }
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#93c5fd"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Lungs() {
  const leftLungRef = useRef<THREE.Mesh>(null);
  const rightLungRef = useRef<THREE.Mesh>(null);
  const diaphragmRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const breathingFactor = Math.sin(time * 2);
    const scale = 1 + breathingFactor * 0.15;
    
    if (leftLungRef.current && rightLungRef.current) {
      leftLungRef.current.scale.set(scale, scale, scale);
      rightLungRef.current.scale.set(scale, scale, scale);
      
      // Subtle color shift
      const colorIntensity = 0.5 + breathingFactor * 0.2;
      (leftLungRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = colorIntensity;
      (rightLungRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = colorIntensity;
    }

    if (diaphragmRef.current) {
      // Diaphragm moves down when inhaling (scale up)
      diaphragmRef.current.position.y = -3.5 - breathingFactor * 0.3;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Traqueia */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 3, 32]} />
        <meshPhysicalMaterial 
          color="#f1f5f9" 
          roughness={0.1} 
          metalness={0.1} 
          transmission={0.5} 
          thickness={1}
        />
      </mesh>
      <Text position={[0, 5, 0]} fontSize={0.4} color="white">Traqueia</Text>
      
      <BreathParticles />

      {/* Pulmão Esquerdo */}
      <mesh ref={leftLungRef} position={[-1.8, 0, 0]} rotation={[0, 0, -0.1]}>
        <capsuleGeometry args={[1.2, 2.5, 16, 32]} />
        <MeshDistortMaterial 
          color="#fca5a5" 
          distort={0.2} 
          speed={2} 
          roughness={0.3}
          emissive="#fca5a5"
          emissiveIntensity={0.5}
        />
      </mesh>
      <Text position={[-4, 0, 0]} fontSize={0.4} color="white">Pulmão Direito</Text>

      {/* Pulmão Direito */}
      <mesh ref={rightLungRef} position={[1.8, 0, 0]} rotation={[0, 0, 0.1]}>
        <capsuleGeometry args={[1.2, 2.5, 16, 32]} />
        <MeshDistortMaterial 
          color="#fca5a5" 
          distort={0.2} 
          speed={2} 
          roughness={0.3}
          emissive="#fca5a5"
          emissiveIntensity={0.5}
        />
      </mesh>
      <Text position={[4, 0, 0]} fontSize={0.4} color="white">Pulmão Esquerdo</Text>

      {/* Diafragma */}
      <mesh ref={diaphragmRef} position={[0, -3.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3.5, 3.5, 0.2, 32]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>
      <Text position={[0, -4.5, 0]} fontSize={0.4} color="white">Diafragma</Text>
    </group>
  );
}

export function RespiratorySystem() {
  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-slate-900/80 p-4 rounded-lg backdrop-blur-md border border-slate-700 shadow-2xl">
        <h3 className="font-bold text-white mb-1">Sistema Respiratório</h3>
        <p className="text-xs text-slate-400">
          Observe a expansão dos pulmões e o movimento do diafragma durante a respiração.
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Lungs />
        </Float>

        <OrbitControls enablePan={false} maxDistance={20} minDistance={5} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
