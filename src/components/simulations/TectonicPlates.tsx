import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Plates({ offset }: { offset: number }) {
  // offset ranges from -1.5 (convergent) to 2 (divergent)
  const isConvergent = offset < 0;
  
  return (
    <group>
      {/* Magma/Mantle base */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[12, 2, 6]} />
        <meshStandardMaterial color="#ea580c" emissive="#c2410c" emissiveIntensity={0.5} />
      </mesh>
      <Text position={[0, -1.5, 3.5]} fontSize={0.5} color="white">Manto (Magma)</Text>

      {/* Left Plate */}
      <mesh position={[-3 - offset, 0, 0]}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial color="#4ade80" roughness={0.8} />
      </mesh>
      
      {/* Right Plate */}
      <mesh position={[3 + offset, 0, 0]}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>

      {/* Mountain/Subduction effect when convergent */}
      {isConvergent && (
        <mesh position={[0, Math.abs(offset) * 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[Math.abs(offset) * 1.5, Math.abs(offset) * 1.5, 5]} />
          <meshStandardMaterial color="#65a30d" roughness={0.9} />
        </mesh>
      )}
      
      {/* Lava emerging when divergent */}
      {offset > 0 && (
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[offset * 2, 1.2, 5]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

function CameraShake({ offset }: { offset: number }) {
  useFrame((state) => {
    // Shake camera if plates are colliding heavily (offset < -1)
    if (offset < -1) {
      const intensity = (Math.abs(offset) - 1) * 0.1;
      state.camera.position.x += (Math.random() - 0.5) * intensity;
      state.camera.position.y += (Math.random() - 0.5) * intensity;
    } else {
      // Return to base position smoothly if not shaking
      state.camera.position.lerp(new THREE.Vector3(0, 5, 12), 0.1);
    }
  });
  return null;
}

export function TectonicPlates() {
  const [offset, setOffset] = useState(0);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden relative">
      <div className="absolute top-4 left-4 right-4 z-10 bg-slate-900/80 p-4 rounded-lg backdrop-blur-md border border-slate-700 shadow-2xl">
        <label className="flex justify-between text-sm font-bold text-slate-200 mb-2">
          <span className="text-red-400">Convergente (Colisão)</span>
          <span className="text-orange-400">Divergente (Separação)</span>
        </label>
        <input 
          type="range" 
          min="-1.5" max="2" step="0.05"
          value={offset} 
          onChange={(e) => setOffset(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
      </div>
      
      <div className="flex-1">
        <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
          <color attach="background" args={['#020617']} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[0, -2, 0]} intensity={2} color="#ea580c" />
          
          <Plates offset={offset} />
          <CameraShake offset={offset} />
          
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2 - 0.1} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
