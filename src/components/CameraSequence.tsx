import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraSequence() {
  const { camera } = useThree();
  const startTime = useRef(performance.now());
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const elapsed = (performance.now() - startTime.current) / 1000;
    
    // Phase 1: 0-4s: Close up of wave interaction
    if (elapsed < 4) {
      camera.position.lerp(new THREE.Vector3(0, 2, 8), 0.03);
      lookAtTarget.current.lerp(new THREE.Vector3(0, 0, 0), 0.05);
    } 
    // Phase 2: 4-8s: Dolly zoom out
    else if (elapsed < 8) {
      camera.position.lerp(new THREE.Vector3(0, 6, 12), 0.02);
      lookAtTarget.current.lerp(new THREE.Vector3(0, 0, 0), 0.02);
    } 
    // Phase 3: 8-10s: Reveal full drone
    else if (elapsed < 10) {
      camera.position.lerp(new THREE.Vector3(0, 12, 16), 0.03);
      lookAtTarget.current.lerp(new THREE.Vector3(0, 0, 0), 0.03);
    } 
    // Phase 4: 10s+: Stabilize for UI interaction
    else {
      // Gentle drift
      const driftX = Math.sin((elapsed - 10) * 0.2) * 1.5;
      const driftY = Math.cos((elapsed - 10) * 0.1) * 0.5;
      camera.position.lerp(new THREE.Vector3(driftX, 12 + driftY, 16), 0.01);
      lookAtTarget.current.lerp(new THREE.Vector3(0, 0, 0), 0.05);
    }
    
    camera.lookAt(lookAtTarget.current);
  });

  return null;
}
