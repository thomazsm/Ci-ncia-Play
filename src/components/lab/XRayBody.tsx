import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { SimulationInfoCard } from '@/src/components/ui/SimulationInfoCard';

function AbstractOrgan({ position, color, scale, speed = 1 }: any) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * speed) * 0.05);
    }
  });
  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.8} roughness={0.2} />
    </mesh>
  );
}

function Skeleton() {
  return (
    <group>
      {/* Spine */}
      <mesh position={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.2, 0.2, 6, 16]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Ribs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, 1.5 - i * 0.5, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2 - i * 0.1, 0.1, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      ))}
      {/* Skull */}
      <mesh position={[0, 3.5, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
}

export function XRayBody() {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showRespiratory, setShowRespiratory] = useState(true);
  const [showDigestive, setShowDigestive] = useState(true);

  return (
    <div className="flex flex-col md:flex-row min-h-full bg-slate-900 relative">
      <div className="absolute top-4 left-4 z-10 w-full max-w-xs pr-8">
        <SimulationInfoCard title="Sistemas do Corpo">
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 text-slate-200 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" checked={showSkeleton} onChange={(e) => setShowSkeleton(e.target.checked)} className="w-5 h-5 accent-slate-400" />
              Esquelético
            </label>
            <label className="flex items-center gap-3 text-slate-200 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" checked={showRespiratory} onChange={(e) => setShowRespiratory(e.target.checked)} className="w-5 h-5 accent-blue-400" />
              Respiratório
            </label>
            <label className="flex items-center gap-3 text-slate-200 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" checked={showDigestive} onChange={(e) => setShowDigestive(e.target.checked)} className="w-5 h-5 accent-orange-400" />
              Digestório
            </label>
          </div>
        </SimulationInfoCard>
      </div>

      <div className="flex-1 relative min-h-[500px] w-full">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          
          <group position={[0, -1, 0]}>
            {showSkeleton && <Skeleton />}
            
            {showRespiratory && (
              <group>
                {/* Lungs */}
                <AbstractOrgan position={[-0.8, 1, 0]} color="#60a5fa" scale={0.8} speed={2} />
                <AbstractOrgan position={[0.8, 1, 0]} color="#60a5fa" scale={0.8} speed={2} />
                {/* Trachea */}
                <mesh position={[0, 2.2, 0]}>
                  <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
                  <meshStandardMaterial color="#93c5fd" />
                </mesh>
              </group>
            )}

            {showDigestive && (
              <group>
                {/* Stomach */}
                <AbstractOrgan position={[-0.5, -0.5, 0.2]} color="#fb923c" scale={0.6} speed={0.5} />
                {/* Liver */}
                <AbstractOrgan position={[0.5, -0.2, 0.2]} color="#b91c1c" scale={0.7} speed={0.2} />
                {/* Intestines */}
                <mesh position={[0, -2, 0.2]}>
                  <torusGeometry args={[0.8, 0.3, 16, 32]} />
                  <meshStandardMaterial color="#fcd34d" />
                </mesh>
                {/* Esophagus */}
                <mesh position={[0, 1, 0.1]}>
                  <cylinderGeometry args={[0.1, 0.1, 2.5, 16]} />
                  <meshStandardMaterial color="#fdba74" />
                </mesh>
              </group>
            )}
          </group>

          <OrbitControls enablePan={false} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/1.5} />
        </Canvas>
      </div>
    </div>
  );
}
