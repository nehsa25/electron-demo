import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function SphereVisualization(props) {
  const meshRef = useRef();
  useFrame((state, delta) => (meshRef.current.rotation.y += delta));

  return (
    <mesh {...props} ref={meshRef} scale={1.2}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color={'royalblue'} />
    </mesh>
  );
}

export default SphereVisualization;
