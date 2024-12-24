import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { generateSphereNodes } from '../../utils/three';

export default function NetworkSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = generateSphereNodes(15);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[2, 32, 32]}>
        <meshPhongMaterial
          color="#0ea5e9"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhongMaterial color="#0ea5e9" />
        </mesh>
      ))}
    </group>
  );
}