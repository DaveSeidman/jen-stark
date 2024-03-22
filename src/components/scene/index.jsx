import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, useProgress } from '@react-three/drei';
import envFile from '../../assets/images/metro_noord_4k.hdr';

import Model from './model';
import { TourCamera, OverviewCamera } from './cameras';
import './index.scss';

function Loader() {
  const { progress } = useProgress();
  console.log('progress', progress);
  return (
    <Html center>
      {progress}
      {' '}
      % loaded
    </Html>
  );
}

function Scene({ overview, scrollPercent, scrollOffset }) {
  return (
    <Canvas
      className="scene"
      linear
      gl={{ toneMapping: 1, toneMappingExposure: 3 }}
    >
      <Environment files={envFile} background />
      <TourCamera makeDefault={!overview} scrollPercent={scrollPercent} scrollOffset={scrollOffset} />
      <OverviewCamera makeDefault={overview} />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </Canvas>
  );
}

export default Scene;
