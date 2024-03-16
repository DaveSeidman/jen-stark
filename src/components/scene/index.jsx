import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import envFile from '../../assets/images/metro_noord_4k.hdr';

import Model from './model';
import { TourCamera, OverviewCamera } from './cameras';

function Scene({ overview }) {
  return (
    <Canvas
      linear
      gl={{ toneMapping: 2, toneMappingExposure: 1 }}
    >
      <Environment files={envFile} background />
      <TourCamera makeDefault={!overview} />
      <OverviewCamera makeDefault={overview} />
      <Model />
    </Canvas>
  );
}

export default Scene;
