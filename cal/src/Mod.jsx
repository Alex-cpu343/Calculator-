import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Shape({ type }) {
  let geometry;

  switch (type) {
    case 'cube':
      geometry = new THREE.BoxGeometry(1, 1, 1);
      break;
    case 'sphere':
      geometry = new THREE.SphereGeometry(0.7, 32, 32);
      break;
    case 'cylinder':
      geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
      break;
    case 'cone':
      geometry = new THREE.ConeGeometry(0.5, 1.5, 32);
      break;
    case 'torus':
      geometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
      break;
    case 'plane':
      geometry = new THREE.PlaneGeometry(2, 2);
      break;
    case 'ring':
      geometry = new THREE.RingGeometry(0.3, 0.7, 32);
      break;
    case 'tetrahedron':
      geometry = new THREE.TetrahedronGeometry(1);
      break;
    case 'octahedron':
      geometry = new THREE.OctahedronGeometry(1);
      break;
    case 'icosahedron':
      geometry = new THREE.IcosahedronGeometry(1);
      break;
    case 'dodecahedron':
      geometry = new THREE.DodecahedronGeometry(1);
      break;
    case 'torusKnot':
      geometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
      break;
    default:
      console.error('Невідомий тип фігури:', type);
      return null;
  }

  return (
    <mesh geometry={geometry} position={[0, 0, 0]}>
      <meshStandardMaterial color={Math.random() * 0xffffff} />
    </mesh>
  );
}

export default function Mod() {
  const [shape, setShape] = useState(null);

  return (
    <>
      <div style={{ marginBottom: '10px' } }className='shadow-lg sm:h-15 text-center rounded-xl grid sm:grid-cols-13 gap-20  grid-rows-3 grid-cols-4  '>
        <button onClick={() => setShape('cube')} className='relative top-2 shadow-lg w-20 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold left-5'>Куб</button>
        <button onClick={() => setShape('sphere')} className='relative top-2 shadow-lg w-20 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold left-5'>Сфера</button>
        <button onClick={() => setShape('cone')}className='relative top-2 shadow-lg w-20 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold left-5' >Конус</button>
        <button onClick={() => setShape('cylinder')}className='relative top-2 shadow-lg w-20 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold left-5'>Циліндр</button>
        <button onClick={() => setShape('torus')}className='relative top-2 shadow-lg w-20 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold left-5'>Тор</button>
        <button onClick={() => setShape('tetrahedron')}className='relative top-2 shadow-lg w-20 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold left-5'>Тетраедр</button>
        <button onClick={() => setShape('octahedron')}className='relative top-2 shadow-lg w-20 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold left-5'>Октаедр</button>
        <button onClick={() => setShape('icosahedron')}className='relative top-2 shadow-lg w-20 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold left-5'>Ікосаедр</button>
        <button onClick={() => setShape('dodecahedron')}className='relative top-2 shadow-lg w-25 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold left-5'>Додекаедр</button>
        <button onClick={() => setShape('torusKnot')}className='relative top-2 shadow-lg w-30 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold left-10'>Тор-Вузол</button>
        <button onClick={() => setShape(null)}className='relative top-2 shadow-lg w-20 h-10 rounded-lg text-lg hover:scale-110 hover:font-bold bg-black text-white left-20'>Очистити</button>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ height: '80vh', background: 'white' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls />
        {shape && <Shape type={shape} />}
      </Canvas>
    </>
  );
}
