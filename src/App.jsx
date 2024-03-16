import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, CameraHelper, CatmullRomCurve3 } from 'three';
import { useHelper, PerspectiveCamera, Stars, useGLTF, Environment } from '@react-three/drei';
import sceneFile from './assets/models/scene1.glb';
import envFile from './assets/images/metro_noord_4k.hdr';
import mapFile from './assets/images/map2.png';
import './index.scss';
import { points } from './assets/models/path1.json';

function Model() {
  const { scene, animations } = useGLTF(sceneFile);

  console.log(scene.getObjectByName('Art1'));

  const mixerRef = useRef();

  return (
    <group>
      <primitive object={scene} />
      <animationMixer ref={mixerRef} clip={animations[0]} />
    </group>
  );
}

const curve = new CatmullRomCurve3(points.map((p) => new Vector3(p.x, p.y, p.z)));
curve.closed = true;
const lookAt = new Vector3();
const lookAhead = 0.05;
const tourSpeed = -0.0005;

function TourCamera({ makeDefault }) {
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0]);
  const [progress, setProgress] = useState(0);
  const progressTarget = useRef(0);

  const cameraRef = useRef();
  // useHelper(cameraRef, CameraHelper, 'cyan');

  useFrame(() => {
    setProgress((prevProgress) => (progressTarget.current - prevProgress) / 10);

    const { x, y, z } = curve.getPoint(progress);
    // a point just ahead of progress on the curve
    curve.getPoint(progress + lookAhead, lookAt);
    setCameraPosition([x, y, z]);
    cameraRef.current.lookAt(lookAt);
  });

  const wheel = ({ deltaY }) => {
    progressTarget.current += (deltaY * tourSpeed);
  };

  const touchmove = (e) => {
    console.log(e);
  };

  useEffect(() => {
    addEventListener('mousewheel', wheel);
    addEventListener('touchmove', touchmove);
    return () => {
      removeEventListener('mousewheel', wheel);
      removeEventListener('touchmove', touchmove);
    };
  }, []);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      position={cameraPosition}
      makeDefault={makeDefault}
    />
  );
}

function OverviewCamera({ makeDefault }) {
  return (
    <PerspectiveCamera
      makeDefault={makeDefault}
      position={[0, 4, -4]}
      rotation={[0.1, 0, 0]}
    />
  );
}

function Scene({ overview }) {
  return (
    <Canvas
      linear
      gl={{ toneMapping: 1, toneMappingExposure: 0.1 }}
    >
      <TourCamera makeDefault={!overview} />
      <OverviewCamera makeDefault={overview} />
      <Model />
      <Environment files={envFile} background />
      <Stars />
    </Canvas>
  );
}

function App() {
  const [overview, setOverview] = useState(false);

  return (
    <div className="app">
      <Scene overview={overview} />
      <img
        type="button"
        className="map"
        onClick={() => { setOverview((prevOverview) => !prevOverview); }}
        src={mapFile}
      />
    </div>
  );
}

export default App;
