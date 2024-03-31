import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { BufferGeometry, MeshStandardMaterial, DoubleSide, LineBasicMaterial, MeshBasicMaterial, AmbientLight, Vector2 } from 'three';
import { Bloom, DepthOfField, ChromaticAberration, EffectComposer, Noise, Vignette, SSR } from '@react-three/postprocessing'
// import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'
import { Environment, Html, PerspectiveCamera, Plane, Sphere, Box, RoundedBox, useProgress } from '@react-three/drei';
import envFile from '../../assets/images/metro_noord_4k.hdr';
import { TourCamera, OverviewCamera } from '../scene/cameras';

import Model from '../scene/model'
import './index.scss';


function Loader({ setLoaded }) {
  const { progress } = useProgress();
  if (progress === 100) setLoaded(true);
  return (
    <Html className="preloader">
      <h1>{`${Math.round(progress)}%`}</h1>
    </Html>
  );
}

function Scene({ overview, scrollPercent, scrollOffset, lookAhead, setLoaded }) {
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
  const [dpr, setDpr] = useState(1)

  return (
    <Canvas className='scene'
      dpr={dpr}
      shadows
      // shadowMap
      gl={{
        logarithmicDepthBuffer: true,
        antialias: false,
        stencil: false,
        depth: false,
        // toneMapping: 1,
        // toneMappingExposure: .15
      }}
    >
      <ambientLight intensity={.5} />
      {/* <PerformanceMonitorApi onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} ></PerformanceMonitorApi> */}
      <TourCamera makeDefault={!overview} lookAhead={lookAhead} scrollPercent={scrollPercent} scrollOffset={scrollOffset} />
      <OverviewCamera makeDefault={overview} />
      <Environment files={envFile} background={false} intensity={1} />

      {/* <color attach="background" args={['#151520']} /> */}
      {/* <hemisphereLight intensity={0.5} /> */}
      {/*<directionalLight position={[0, 2, 5]} castShadow intensity={1} /> */}
      <Suspense fallback={<Loader setLoaded={setLoaded} />}>
        <Model />
      </Suspense>
      <EffectComposer disableNormalPass>
        <SSR {...props} />
        {/* <DepthOfField focusDistance={1} focalLength={0.02} bokehScale={2} height={480} /> */}
        <Vignette />
        <ChromaticAberration offset={new Vector2(.0005, 0)} />
        {/* <Bloom
          intensity={1.5}
          height={1}
          luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
          mipmapBlur // Enables or disables mipmap blur.
        /> */}

      </EffectComposer>
    </Canvas>
  )
}


export default Scene;