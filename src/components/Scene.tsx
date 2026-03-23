import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import WaveSurface from './WaveSurface';
import DroneModel from './DroneModel';
import CameraSequence from './CameraSequence';

export default function Scene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
        <color attach="background" args={['#030308']} />
        <fog attach="fog" args={['#030308', 10, 40]} />
        
        <CameraSequence />
        
        {/* Soft Key Light */}
        <ambientLight intensity={0.1} color="#ffffff" />
        <directionalLight 
          castShadow 
          position={[5, 10, -5]} 
          intensity={0.6} 
          color="#ffffff"
          shadow-mapSize={[2048, 2048]} 
        />
        
        {/* Rim Light for silhouette */}
        <spotLight 
          position={[-10, 5, -10]} 
          intensity={2.5} 
          color="#00f0ff" 
          angle={0.6} 
          penumbra={1} 
        />
        
        {/* High quality environment map */}
        <Environment preset="night" />
        
        <WaveSurface />
        <DroneModel position={[0, 0.3, 0]} />
      </Canvas>
    </div>
  );
}
