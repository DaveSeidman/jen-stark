import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, useProgress } from '@react-three/drei';
import envFile from '../../assets/images/spree_bank_2k.hdr';

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

function Scene({ overview, scrollPercent, scrollOffset, lookAhead }) {
  return (
    <Canvas
      className="scene"
      linear
      gl={{ toneMapping: 3, toneMappingExposure: 2 }}
    >
      <Environment files={envFile} background />
      <TourCamera makeDefault={!overview} lookAhead={lookAhead} scrollPercent={scrollPercent} scrollOffset={scrollOffset} />
      <OverviewCamera makeDefault={overview} />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </Canvas>
  );
}

export default Scene;
