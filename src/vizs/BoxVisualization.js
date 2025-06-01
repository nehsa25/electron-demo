import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function BoxVisualization(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  // Return view, these are regular Three.js elements expressed in JSX
  return (
    <mesh {...props} ref={meshRef} scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  );
}

export default BoxVisualization;