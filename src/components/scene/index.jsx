import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BufferGeometry, LineBasicMaterial } from 'three';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, SSR } from '@react-three/postprocessing'
import { Environment, Html, useProgress } from '@react-three/drei';
import envFile from '../../assets/images/spree_bank_2k.hdr';
import { points } from '../../assets/models/camera-path.json';
import { useControls } from 'leva'

import Model from './model';
import { TourCamera, OverviewCamera } from './cameras';
import './index.scss';

const pathGeometry = new BufferGeometry().setFromPoints(points);
const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });

function Loader() {
  const { progress } = useProgress();
  return (
    <Html className="loader" center>{`${Math.round(progress)}%`}</Html>
  );
}

function Scene({ overview, scrollPercent, scrollOffset, lookAhead }) {
  const props = useControls({
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
    maxSamples: { value: 0, min: 0, max: 1 },
    resolutionScale: { value: 1, min: 0, max: 1 },
    blurMix: { value: 0.5, min: 0, max: 1 },
    blurKernelSize: { value: 8, min: 0, max: 8 },
    blurSharpness: { value: 0.5, min: 0, max: 1 },
    rayStep: { value: 0.3, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 5 },
    maxRoughness: { value: 0.1, min: 0, max: 1 },
    jitter: { value: 0.7, min: 0, max: 5 },
    jitterSpread: { value: 0.45, min: 0, max: 1 },
    jitterRough: { value: 0.1, min: 0, max: 1 },
    roughnessFadeOut: { value: 1, min: 0, max: 1 },
    rayFadeOut: { value: 0, min: 0, max: 1 },
    MAX_STEPS: { value: 20, min: 0, max: 20 },
    NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
    maxDepthDifference: { value: 3, min: 0, max: 10 },
    maxDepth: { value: 1, min: 0, max: 1 },
    thickness: { value: 10, min: 0, max: 10 },
    ior: { value: 1.45, min: 0, max: 2 }
  })
  return (
    <Canvas
      className="scene"
      linear
      dpr={[0.2, 1]}
      gl={{ toneMapping: 1, toneMappingExposure: 1.5 }}
    >
      <Environment files={envFile} background />
      <TourCamera makeDefault={!overview} lookAhead={lookAhead} scrollPercent={scrollPercent} scrollOffset={scrollOffset} />
      <OverviewCamera makeDefault={overview} />
      {/* <AdaptiveDpr /> */}
      {overview
        && (
          <line
            geometry={pathGeometry}
            material={lineMaterial}
          />
        )}
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
      <EffectComposer
        disableNormalPass
      >
        <SSR {...props}></SSR>
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
        {/* <DepthOfField focusDistance={1} focalLength={0.0001} bokehScale={4} height={480} /> */}
      </EffectComposer>
    </Canvas>
  );
}

export default Scene;
