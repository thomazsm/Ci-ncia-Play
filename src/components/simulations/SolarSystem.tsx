import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Trail } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Planet({ position, size, color, name, speed, emissive }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <Trail width={size * 0.5} length={20} color={color} attenuation={(t) => t * t}>
        <mesh position={position} ref={meshRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            roughness={0.7} 
            metalness={0.2} 
            emissive={emissive || '#000000'} 
            emissiveIntensity={emissive ? 2 : 0}
          />
          <Text
            position={[0, size + 0.5, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {name}
          </Text>
        </mesh>
      </Trail>
      {/* Orbit line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[position[0] - 0.05, position[0] + 0.05, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function SolarSystem() {
  return (
    <Canvas camera={{ position: [0, 20, 30], fov: 45 }}>
      <color attach="background" args={['#020205']} />
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#ffcc00" distance={100} decay={2} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial color="#ffcc00" emissive="#ffaa00" emissiveIntensity={4} toneMapped={false} />
        <Text position={[0, 4, 0]} fontSize={0.8} color="white">Sol</Text>
      </mesh>

      {/* Planets */}
      <Planet position={[5, 0, 0]} size={0.4} color="#888888" name="Mercúrio" speed={0.8} />
      <Planet position={[8, 0, 0]} size={0.6} color="#e5e5e5" name="Vênus" speed={0.6} />
      <Planet position={[12, 0, 0]} size={0.8} color="#2b82c9" name="Terra" speed={0.4} />
      <Planet position={[16, 0, 0]} size={0.5} color="#c1440e" name="Marte" speed={0.3} />
      <Planet position={[22, 0, 0]} size={1.5} color="#e3d19c" name="Júpiter" speed={0.1} />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      
      <EffectComposer>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={2} />
      </EffectComposer>
    </Canvas>
  );
}
