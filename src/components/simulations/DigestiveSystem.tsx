import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, MeshDistortMaterial, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Organ({ position, args, color, distort, speed, label, labelPos, progressRef, pathStart, pathEnd, isDigesting }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame(() => {
    if (meshRef.current && materialRef.current) {
      const progress = isDigesting ? progressRef.current : -1;
      
      // Peristaltic bulge effect: increase distortion and scale when bolus is within the organ's path range
      const isNear = isDigesting && progress >= pathStart && progress <= pathEnd;
      
      // Calculate a normalized distance to the bolus within this organ's range
      let bulgeFactor = 0;
      if (isNear) {
        const range = pathEnd - pathStart;
        const center = pathStart + range / 2;
        const dist = Math.abs(progress - center);
        bulgeFactor = Math.max(0, 1 - dist / (range / 2));
      }
      
      const targetDistort = isNear ? distort * (1 + bulgeFactor * 2) : distort;
      const targetSpeed = isNear ? speed * (1 + bulgeFactor) : speed;
      const targetScale = 1 + bulgeFactor * 0.15;
      
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.1);
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.1);
      
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        {args.type === 'sphere' && <sphereGeometry args={args.params} />}
        {args.type === 'cylinder' && <cylinderGeometry args={args.params} />}
        {args.type === 'capsule' && <capsuleGeometry args={args.params} />}
        {args.type === 'torusKnot' && <torusKnotGeometry args={args.params} />}
        {args.type === 'torus' && <torusGeometry args={args.params} />}
        <MeshDistortMaterial 
          ref={materialRef}
          color={color} 
          distort={distort} 
          speed={speed} 
          roughness={0.1} 
          metalness={0.4}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      <Text position={labelPos} fontSize={0.35} color="white">
        {label}
      </Text>
    </group>
  );
}

function AcidBubbles({ active }: { active: boolean }) {
  const count = 15;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        speed: 0.2 + Math.random() * 0.3,
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 1.0,
          (Math.random() - 0.5) * 0.4
        )
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      particles.forEach((p, i) => {
        const { t, speed, pos } = p;
        const time = state.clock.getElapsedTime() * speed + t;
        
        if (active) {
          dummy.position.set(
            pos.x + Math.sin(time * 2) * 0.05,
            pos.y + Math.cos(time * 1.5) * 0.05,
            pos.z
          );
          const s = (Math.sin(time * 3) + 1.5) * 0.04;
          dummy.scale.set(s, s, s);
        } else {
          dummy.scale.set(0, 0, 0);
        }
        
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, count]} position={[-0.8, -1.5, 0.2]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial color="#bef264" transparent opacity={0.6} emissive="#bef264" emissiveIntensity={1} />
    </instancedMesh>
  );
}

function Bolus({ active, progressRef }: { active: boolean, progressRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  const points = useMemo(() => [
    new THREE.Vector3(0, 5, 0.5),    // Mouth
    new THREE.Vector3(0, 2.5, 0.5),  // Esophagus top
    new THREE.Vector3(0, 0, 0.5),    // Esophagus mid
    new THREE.Vector3(-0.8, -1.5, 0.5), // Stomach
    new THREE.Vector3(0, -3.5, 0.5), // Small Intestine
    new THREE.Vector3(0, -4.5, 0.8), // Large Intestine
  ], []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  useFrame((state) => {
    if (active) {
      const t = (state.clock.getElapsedTime() * 0.12) % 1;
      progressRef.current = t;
      
      if (ref.current) {
        const pos = curve.getPoint(t);
        ref.current.position.copy(pos);
        
        const s = 1 + Math.sin(state.clock.getElapsedTime() * 12) * 0.15;
        ref.current.scale.set(s, s, s);
      }

      if (lightRef.current) {
        lightRef.current.intensity = 3 + Math.sin(state.clock.getElapsedTime() * 10) * 1;
      }
    }
  });

  if (!active) return null;

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#fbbf24" 
          emissiveIntensity={5} 
          toneMapped={false} 
        />
        <pointLight ref={lightRef} intensity={3} color="#fbbf24" distance={5} />
      </mesh>
    </group>
  );
}

export function DigestiveSystem() {
  const [isDigesting, setIsDigesting] = useState(false);
  const bolusProgressRef = useRef(0);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-slate-900/80 p-4 rounded-lg backdrop-blur-md border border-slate-700 shadow-2xl">
        <h3 className="font-bold text-white mb-2">Sistema Digestório</h3>
        <p className="text-xs text-slate-400 mb-4 max-w-[200px]">
          Observe o movimento peristáltico e o caminho do bolo alimentar. Os órgãos reagem dinamicamente à passagem do alimento.
        </p>
        <button 
          onClick={() => setIsDigesting(!isDigesting)}
          className={`w-full py-2 px-4 rounded-lg font-bold transition-all shadow-lg ${
            isDigesting 
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' 
            : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
          }`}
        >
          {isDigesting ? 'Parar Digestão' : 'Iniciar Digestão'}
        </button>
      </div>

      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#f43f5e" />
        
        <group position={[0, 2, 0]}>
          {/* Boca (0.0 - 0.15) */}
          <Organ 
            position={[0, 3, 0]} 
            args={{ type: 'sphere', params: [0.8, 32, 32] }} 
            color="#f43f5e" 
            distort={0.2} 
            speed={2} 
            label="Boca" 
            labelPos={[2, 0, 0]} 
            progressRef={bolusProgressRef}
            isDigesting={isDigesting}
            pathStart={0.0}
            pathEnd={0.15}
          />

          {/* Esôfago (0.15 - 0.4) */}
          <Organ 
            position={[0, 1, 0]} 
            args={{ type: 'cylinder', params: [0.3, 0.3, 4, 32] }} 
            color="#fda4af" 
            distort={0.1} 
            speed={3} 
            label="Esôfago" 
            labelPos={[2, 0, 0]} 
            progressRef={bolusProgressRef}
            isDigesting={isDigesting}
            pathStart={0.15}
            pathEnd={0.4}
          />

          {/* Estômago (0.4 - 0.6) */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group>
              <Organ 
                position={[-0.8, -1.5, 0]} 
                args={{ type: 'capsule', params: [0.8, 1.5, 16, 32] }} 
                color="#e11d48" 
                distort={0.3} 
                speed={1.5} 
                label="Estômago" 
                labelPos={[2.5, 0, 0]} 
                progressRef={bolusProgressRef}
                isDigesting={isDigesting}
                pathStart={0.4}
                pathEnd={0.6}
              />
              <AcidBubbles active={isDigesting} />
            </group>
          </Float>

          {/* Intestino Delgado (0.6 - 0.8) */}
          <Organ 
            position={[0, -3.5, 0]} 
            args={{ type: 'torusKnot', params: [1, 0.3, 128, 32, 2, 3] }} 
            color="#fb7185" 
            distort={0.2} 
            speed={2} 
            label="Intestino Delgado" 
            labelPos={[3, 0, 0]} 
            progressRef={bolusProgressRef}
            isDigesting={isDigesting}
            pathStart={0.6}
            pathEnd={0.8}
          />

          {/* Intestino Grosso (0.8 - 1.0) */}
          <Organ 
            position={[0, -3.5, 0]} 
            args={{ type: 'torus', params: [2.2, 0.5, 32, 100] }} 
            color="#9f1239" 
            distort={0.1} 
            speed={1} 
            label="Intestino Grosso" 
            labelPos={[-3.5, 0, 0]} 
            progressRef={bolusProgressRef}
            isDigesting={isDigesting}
            pathStart={0.8}
            pathEnd={1.0}
          />

          <Bolus active={isDigesting} progressRef={bolusProgressRef} />
        </group>

        <OrbitControls enablePan={false} maxDistance={20} minDistance={5} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
