import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, CameraHelper, CatmullRomCurve3 } from 'three';
import { useHelper, PerspectiveCamera, Stars, useGLTF, Environment } from '@react-three/drei';
import sceneFile from './assets/models/scene1.glb';
import envFile from './assets/images/metro_noord_4k.hdr';
import './index.scss';
import { points } from './assets/models/path1.json';

function Model({ curve }) {
  const { scene, animations } = useGLTF(sceneFile);

  const mixerRef = useRef();

  return (
    <group>
      <primitive object={scene} />
      <animationMixer ref={mixerRef} clip={animations[0]} />
    </group>
  );
}

function Camera() {
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0]);
  const [progress, setProgress] = useState(0);
  const progressTarget = useRef(0);
  // const progress = useRef(0);
  const curve = new CatmullRomCurve3(points.map((p) => new Vector3(p.x, p.y, p.z)));
  const cameraRef = useRef();
  useHelper(cameraRef, CameraHelper, 'cyan');

  useFrame(() => {
    setProgress((prevProgress) => {
      const nextProgress = (progressTarget.current - prevProgress) / 10;
      // if (nextProgress < 0) nextProgress += 1;
      return nextProgress;
    });

    const { x, y, z } = curve.getPointAt(progress % 1);
    // a point just ahead of progress on the curve
    const target = curve.getPointAt((progress + 0.05) % 1);
    setCameraPosition([x, y, z]);
    cameraRef.current.lookAt(target);
  });

  const wheel = ({ deltaY }) => {
    progressTarget.current += (deltaY * -0.0005);
  };

  useEffect(() => {
    addEventListener('mousewheel', wheel);
    return () => {
      removeEventListener('mousewheel', wheel);
    };
  }, []);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      position={cameraPosition}
      makeDefault
    />
  );
}

function Scene() {
  return (
    <Canvas
      linear
      gl={{ toneMapping: 1, toneMappingExposure: 0.1 }}
    >
      <Camera />
      <Model />
      <Environment files={envFile} background />
      <Stars />
    </Canvas>
  );
}

export default Scene;
