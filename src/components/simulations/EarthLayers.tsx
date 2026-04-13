import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Layer({ radius, color, name, opacity = 1, transparent = false, emissiveIntensity = 0 }: any) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64, 0, Math.PI]} />
      <meshStandardMaterial 
        color={color} 
        side={THREE.DoubleSide}
        transparent={transparent}
        opacity={opacity}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        roughness={0.7}
        metalness={0.2}
      />
    </mesh>
  );
}

function EarthModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      {/* Núcleo Interno */}
      <Layer radius={1} color="#fef08a" emissiveIntensity={2} />
      <Text position={[0, 1.2, 0]} fontSize={0.3} color="white" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-EkCc.woff">
        Núcleo Interno
      </Text>

      {/* Núcleo Externo */}
      <Layer radius={2} color="#fb923c" opacity={0.7} transparent emissiveIntensity={1} />
      <Text position={[0, 2.2, 0]} fontSize={0.3} color="white" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-EkCc.woff">
        Núcleo Externo
      </Text>

      {/* Manto */}
      <Layer radius={4} color="#ef4444" opacity={0.6} transparent emissiveIntensity={0.5} />
      <Text position={[0, 4.2, 0]} fontSize={0.3} color="white" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-EkCc.woff">
        Manto
      </Text>

      {/* Crosta */}
      <Layer radius={4.2} color="#22c55e" opacity={0.9} transparent />
      <Text position={[0, 4.6, 0]} fontSize={0.3} color="white" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-EkCc.woff">
        Crosta (Litosfera)
      </Text>
    </group>
  );
}

export function EarthLayers() {
  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-slate-900/80 p-4 rounded-lg backdrop-blur-md border border-slate-700 shadow-2xl">
        <h3 className="font-bold text-white mb-1">Camadas da Terra</h3>
        <p className="text-xs text-slate-400">
          Explore a estrutura interna do nosso planeta, do núcleo à crosta.
        </p>
      </div>

      <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[0, 0, 0]} intensity={2} color="#fef08a" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <EarthModel />
        </Float>

        <OrbitControls enablePan={false} maxDistance={25} minDistance={5} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

