import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { BufferGeometry, MeshStandardMaterial, DoubleSide, LineBasicMaterial, MeshBasicMaterial } from 'three';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, SSR } from '@react-three/postprocessing'
import { Environment, Html, PerspectiveCamera, Plane, Sphere, Box, RoundedBox, useProgress } from '@react-three/drei';
import envFile from '../../assets/images/spree_bank_2k.hdr';
import { TourCamera, OverviewCamera } from '../scene/cameras';

import Model from '../scene/model'
import './index.scss';


function Loader() {
  const { progress } = useProgress();
  return (
    <Html className="loader" center>{`${Math.round(progress)}%`}</Html>
  );
}

function Scene({ overview, scrollPercent, scrollOffset, lookAhead }) {
  // const [overview, setOverview] = useState(false)
  const props = {
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    temporalResolveMix: 0.9,
    temporalResolveCorrectionMix: 0.25,
    maxSamples: 0,
    resolutionScale: 1,
    blurMix: 0.5,
    blurKernelSize: 8,
    blurSharpness: 0.5,
    rayStep: 0.3,
    intensity: 1,
    maxRoughness: 0.1,
    jitter: 0.7,
    jitterSpread: 0.45,
    jitterRough: 0.1,
    roughnessFadeOut: 1,
    rayFadeOut: 0,
    MAX_STEPS: 20,
    NUM_BINARY_SEARCH_STEPS: 5,
    maxDepthDifference: 3,
    maxDepth: 1,
    thickness: 10,
    ior: 1.5
  }
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas className='scene'
      dpr={dpr}
      shadows
      gl={{
        logarithmicDepthBuffer: true,
        antialias: false,
        stencil: false,
        depth: false,
        toneMapping: 1,
        toneMappingExposure: 1
      }}
    >
      {/* <PerformanceMonitorApi onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} ></PerformanceMonitorApi> */}
      <ambientLight intensity={1} />
      <TourCamera makeDefault={!overview} lookAhead={lookAhead} scrollPercent={scrollPercent} scrollOffset={scrollOffset} />
      <OverviewCamera makeDefault={overview} />
      {/* <Environment files={envFile} intensity={0.1} /> */}

      <color attach="background" args={['#151520']} />
      {/* <hemisphereLight intensity={0.5} />
      <directionalLight position={[0, 2, 5]} castShadow intensity={1} /> */}
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
      <EffectComposer disableNormalPass>
        <SSR {...props} />
      </EffectComposer>
      {/* <perspectiveCamera makeDefault position={[0, 10, -100]} /> */}
      {/* <OrbitControls /> */}
    </Canvas>
  )
}


export default Scene;