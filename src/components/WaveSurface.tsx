import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function WaveSurface() {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorGlow: { value: new THREE.Color("#00f0ff") },
  }), []);

  useFrame((state) => {
    if (uniforms) {
      uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const onBeforeCompile = (shader: any) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uColorGlow = uniforms.uColorGlow;
    
    // Pass time and elevation to fragment
    shader.vertexShader = `
      uniform float uTime;
      varying float vElevation;
      ${shader.vertexShader}
    `;
    
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      
      // Stage 1: Simple sine displacement
      float distToCenter = length(position.xy);
      float wave = sin(distToCenter * 2.0 - uTime * 4.0);
      
      // Stage 2: Basic attenuation (distance-based fading)
      float attenuation = clamp(1.0 - (distToCenter / 12.0), 0.0, 1.0);
      
      float elevation = wave * attenuation * 0.4;
      transformed.z += elevation;
      vElevation = elevation;
      `
    );

    // We INTENTIONALLY skip normal calculation to maintain maximum GPU stability
    // The surface will reflect ambiently, but rim lights won't trace the wave contours.
    
    shader.fragmentShader = `
      uniform vec3 uColorGlow;
      varying float vElevation;
      ${shader.fragmentShader}
    `;
    
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `
      #include <emissivemap_fragment>
      
      // Basic glow logic mapping to elevation peaks
      float glow = clamp(vElevation * 2.0, 0.0, 1.0);
      totalEmissiveRadiance += uColorGlow * glow;
      `
    );
  };

  return (
    <group position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh receiveShadow>
        {/* Strictly reduced to 32x32 to guarantee rendering capability */}
        <planeGeometry args={[25, 25, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#030308"
          roughness={0.8}
          metalness={0.2}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
    </group>
  );
}
