import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function MoonSystem() {
  const moonOrbitRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (moonOrbitRef.current) {
      // Rotate the moon around the earth
      moonOrbitRef.current.rotation.y += delta * 0.5;
    }
    if (earthRef.current) {
      // Earth rotation
      earthRef.current.rotation.y += delta * 0.2;
    }
    if (moonRef.current) {
      // Moon rotation (tidally locked, so it matches orbit roughly, but we can just spin it slowly)
      moonRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color="#2b82c9" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Moon Orbit */}
      <group ref={moonOrbitRef}>
        <mesh ref={moonRef} position={[6, 0, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.6, 64, 64]} />
          <meshStandardMaterial 
            color="#e2e8f0" 
            roughness={1} 
            metalness={0}
            bumpScale={0.02}
          />
        </mesh>
      </group>

      {/* Orbit Path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.98, 6.02, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function MoonPhases() {
  return (
    <Canvas shadows camera={{ position: [0, 8, 15], fov: 45 }}>
      <color attach="background" args={['#020617']} />
      <ambientLight intensity={0.02} />
      
      {/* Sun light coming from the right */}
      <directionalLight 
        position={[20, 0, 0]} 
        intensity={4} 
        color="#fffbeb" 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Visual representation of the sun direction */}
      <mesh position={[25, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      
      <MoonSystem />
      
      <OrbitControls enablePan={false} maxDistance={30} minDistance={5} />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={2} />
      </EffectComposer>
    </Canvas>
  );
}
