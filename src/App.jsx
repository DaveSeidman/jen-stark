import React, { useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, PerspectiveCamera, Stars, useGLTF } from '@react-three/drei';
import sceneFile from './assets/models/scene1.glb';
import './index.scss';

function Model() {
  const gltf = useGLTF(sceneFile);
  return <primitive object={gltf.scene} />;
}

function Scene() {
  const cameraRef = useRef();

  return (
    <Canvas
      camera={(
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          ref={cameraRef}
        />
      )}
    >
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.8} position={[300, 300, 400]} />

      <Model />

      <OrbitControls enablePan enableZoom enableRotate enableDamping dampingFactor={0.2} target={[0, 0, 0]} />
      <Stars />
    </Canvas>
  );
}

export default Scene;
