import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { BufferGeometry, MeshStandardMaterial, DoubleSide, LineBasicMaterial, MeshBasicMaterial } from 'three';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, SSR } from '@react-three/postprocessing'
import { Environment, Html, PerspectiveCamera, Plane, Sphere, Box, RoundedBox, useProgress, OrbitControls } from '@react-three/drei';
import envFile from '../../assets/images/spree_bank_2k.hdr';
import { points } from '../../assets/models/camera-path.json';
import { useControls } from 'leva'
import { TourCamera, OverviewCamera } from '../scene/cameras';

import Model from '../scene/model'
import './index.scss';


function Loader() {
  const { progress } = useProgress();
  return (
    <Html className="loader" center>{`${Math.round(progress)}%`}</Html>
  );
}

function Scene2({ overview, scrollPercent, scrollOffset, lookAhead }) {
  // const [overview, setOverview] = useState(false)
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
    <Canvas className='scene'
      shadows
      gl={{
        logarithmicDepthBuffer: true,
        antialias: false,
        stencil: false,
        depth: false
      }}
    // camera={{ position: [24, 22, 25], fov: 20 }}
    >

      <TourCamera makeDefault={!overview} lookAhead={lookAhead} scrollPercent={scrollPercent} scrollOffset={scrollOffset} />
      <OverviewCamera makeDefault={overview} />
      <color attach="background" args={['#151520']} />
      <hemisphereLight intensity={0.5} />
      <directionalLight position={[0, 2, 5]} castShadow intensity={1} />
      {/* <ambientLight intensity={2}></ambientLight> */}
      {/* <pointLight intensity={20} position={[2, 1, 0]} ></pointLight> */}
      <RoundedBox receiveShadow castShadow smoothness={10} radius={0.015} scale={[10, 10, 10]}>
        <meshStandardMaterial color="#2299bb" envMapIntensity={0.5} roughness={0} metalness={0} />
      </RoundedBox>
      <RoundedBox receiveShadow castShadow smoothness={10} radius={0.015} scale={[40, 1, 100]} >
        <meshStandardMaterial color="#000000" envMapIntensity={0.5} roughness={0} metalness={0} />
      </RoundedBox>

      {/* <Suspense fallback={<Loader />}> */}
      <Model />
      {/* </Suspense> */}
      <EffectComposer disableNormalPass>
        <SSR {...props} />
      </EffectComposer>
      {/* <perspectiveCamera makeDefault position={[0, 10, -100]} /> */}
      {/* <OrbitControls /> */}
    </Canvas>
  )
}


export default Scene2;