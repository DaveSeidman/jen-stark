import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Vector3, CameraHelper, CatmullRomCurve3 } from 'three';
import { useHelper, OrbitControls, PerspectiveCamera, Stars, useGLTF, Environment } from '@react-three/drei';
import sceneFile from './assets/models/scene1.glb';
import envFile from './assets/images/metro_noord_4k.hdr';
import './index.scss';
import { points } from './assets/models/path1.json';

function Model({ curve }) {
  const { scene, animations } = useGLTF(sceneFile);

  const mixerRef = useRef();
  // const cameraPosition = useRef(new Vector3())

  // useFrame((_, delta) => {
  //   mixerRef.current?.update(delta);
  //   setProgress((prevProgress) => prevProgress + delta * 0.05); // Adjust speed here
  //   if (progress > 1) {
  //     setProgress(0);
  //   }

  //   cameraPosition.current.copy(curve.getPointAt(progress));
  // });

  return (
    <group>
      <primitive object={scene} />
      <animationMixer ref={mixerRef} clip={animations[0]} />
      {/* <mesh position={[cameraPosition.current.x, cameraPosition.current.y, cameraPosition.current.z]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh> */}
    </group>
  );
}

function Camera() {
  const cameraPosition = useRef([0, 0, 0]);
  const [progress, setProgress] = useState(0);
  const curve = new CatmullRomCurve3(points.map((p) => new Vector3(p.x, p.y, p.z)));
  const cameraRef = useRef();
  useHelper(cameraRef, CameraHelper, 'cyan');

  useFrame((_, delta) => {
    setProgress((prevProgress) => prevProgress + delta * 0.05); // Adjust speed here

    const position = curve.getPointAt(progress % 1);
    const target = curve.getPointAt((progress + 0.05) % 1);
    cameraPosition.current = [position.x, position.y, position.z];
    cameraRef.current.lookAt(target);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      position={cameraPosition.current}
      makeDefault
    />
  );
}

function Scene() {
  return (
    <Canvas
      // camera={(
      //   <PerspectiveCamera
      //     makeDefault
      //     position={[0, 0, 5]}
      //     ref={cameraRef}
      //   />
      // )}
      linear
      gl={{ toneMapping: 1, toneMappingExposure: 0.1 }}
    >
      <Camera />
      <Model />
      <Environment files={envFile} background />
      <OrbitControls enablePan enableZoom enableRotate enableDamping dampingFactor={0.2} target={[0, 0, 0]} />
      <Stars />
    </Canvas>
  );
}

export default Scene;
