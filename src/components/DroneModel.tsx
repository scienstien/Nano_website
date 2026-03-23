import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function DroneModel(props: any) {
  const group = useRef<THREE.Group>(null);
  
  // Create a procedural stealth delta-wing shape
  const droneGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 6);       // Nose
    shape.lineTo(4, -3);      // Right wingtip
    shape.lineTo(0, -1.5);    // Rear center cutout
    shape.lineTo(-4, -3);     // Left wingtip
    shape.lineTo(0, 6);       // Close
    
    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.1
    };
    
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center the geometry
    geo.computeBoundingBox();
    const centerOffset = -0.5 * (geo.boundingBox!.max.y - geo.boundingBox!.min.y);
    geo.translate(0, centerOffset, 0);
    geo.rotateX(Math.PI / 2); // Lay flat
    return geo;
  }, []);

  // Subtle banking animation
  useFrame((state) => {
    if (group.current) {
      // Gentle hovering
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.2;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={group} {...props}>
      <mesh geometry={droneGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial 
          color="#0a0a0c"
          metalness={0.9}
          roughness={0.2}
          clearcoat={0.1}
          clearcoatRoughness={0.2}
          envMapIntensity={2.0}
        />
      </mesh>
      
      {/* Engine glow */}
      <mesh position={[-1, 0, 3.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" />
        <pointLight color="#00f0ff" intensity={2} distance={5} />
      </mesh>
      <mesh position={[1, 0, 3.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" />
        <pointLight color="#00f0ff" intensity={2} distance={5} />
      </mesh>
    </group>
  );
}
