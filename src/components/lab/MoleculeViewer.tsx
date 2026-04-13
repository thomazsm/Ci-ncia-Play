import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const molecules = [
  { 
    id: 'h2o', name: 'Água (H₂O)', 
    atoms: [
      { pos: [0, 0, 0], color: '#ef4444', size: 0.8 }, // O
      { pos: [-0.8, -0.6, 0], color: '#f8fafc', size: 0.5 }, // H
      { pos: [0.8, -0.6, 0], color: '#f8fafc', size: 0.5 }  // H
    ],
    bonds: [
      { pos: [-0.4, -0.3, 0], rot: [0, 0, 0.64] },
      { pos: [0.4, -0.3, 0], rot: [0, 0, -0.64] }
    ]
  },
  { 
    id: 'co2', name: 'Dióxido de Carbono (CO₂)', 
    atoms: [
      { pos: [0, 0, 0], color: '#334155', size: 0.7 }, // C
      { pos: [-1.5, 0, 0], color: '#ef4444', size: 0.8 }, // O
      { pos: [1.5, 0, 0], color: '#ef4444', size: 0.8 }  // O
    ],
    bonds: [
      { pos: [-0.75, 0.1, 0], rot: [0, 0, Math.PI/2] },
      { pos: [-0.75, -0.1, 0], rot: [0, 0, Math.PI/2] },
      { pos: [0.75, 0.1, 0], rot: [0, 0, Math.PI/2] },
      { pos: [0.75, -0.1, 0], rot: [0, 0, Math.PI/2] }
    ]
  },
  { 
    id: 'ch4', name: 'Metano (CH₄)', 
    atoms: [
      { pos: [0, 0, 0], color: '#334155', size: 0.7 }, // C
      { pos: [0, 1.1, 0], color: '#f8fafc', size: 0.5 }, // H
      { pos: [-1.04, -0.36, 0], color: '#f8fafc', size: 0.5 }, // H
      { pos: [0.52, -0.36, -0.9], color: '#f8fafc', size: 0.5 }, // H
      { pos: [0.52, -0.36, 0.9], color: '#f8fafc', size: 0.5 }  // H
    ],
    bonds: [
      { pos: [0, 0.55, 0], rot: [0, 0, 0] },
      { pos: [-0.52, -0.18, 0], rot: [0, 0, 1.23] },
      { pos: [0.26, -0.18, -0.45], rot: [1.04, 0, -0.61] },
      { pos: [0.26, -0.18, 0.45], rot: [-1.04, 0, -0.61] }
    ]
  }
];

export function MoleculeViewer() {
  const [activeMol, setActiveMol] = useState(molecules[0]);

  return (
    <div className="flex flex-col md:flex-row min-h-full bg-slate-900 relative">
      <div className="w-full md:w-64 p-4 bg-slate-800/80 backdrop-blur border-r border-slate-700 flex flex-col gap-2 z-10">
        <h3 className="font-bold text-white mb-2">Moléculas</h3>
        {molecules.map(mol => (
          <button
            key={mol.id}
            onClick={() => setActiveMol(mol)}
            className={`px-4 py-3 rounded-lg text-left transition-colors font-medium ${
              activeMol.id === mol.id ? 'bg-primary text-primary-foreground' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {mol.name}
          </button>
        ))}
      </div>
      
      <div className="flex-1 relative min-h-[400px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <group key={activeMol.id}>
            {activeMol.atoms.map((atom, i) => (
              <mesh key={`atom-${i}`} position={atom.pos as any}>
                <sphereGeometry args={[atom.size, 32, 32]} />
                <meshStandardMaterial color={atom.color} roughness={0.2} metalness={0.1} />
              </mesh>
            ))}
            {activeMol.bonds.map((bond, i) => (
              <mesh key={`bond-${i}`} position={bond.pos as any} rotation={bond.rot as any}>
                <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
                <meshStandardMaterial color="#94a3b8" />
              </mesh>
            ))}
          </group>
          <OrbitControls autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
    </div>
  );
}
