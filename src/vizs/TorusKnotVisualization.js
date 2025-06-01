import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function TorusKnotVisualization(props) {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.7;
    meshRef.current.rotation.z += delta * 0.3;
  });

  return (
    <mesh {...props} ref={meshRef} scale={1.5}>
      <torusKnotGeometry args={[0.5, 0.2, 100, 16]} />
      <meshStandardMaterial color={'lightgreen'} />
    </mesh>
  );
}

export default TorusKnotVisualization;
