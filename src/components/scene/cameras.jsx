import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, CameraHelper, CatmullRomCurve3, MeshBasicMaterial } from 'three';
import { useHelper, PerspectiveCamera, Stars, useGLTF, Environment } from '@react-three/drei';
import sceneFile from '../../assets/models/scene1.glb';
import envFile from '../../assets/images/metro_noord_4k.hdr';
import { points } from '../../assets/models/path1.json';

const curve = new CatmullRomCurve3(points.map((p) => new Vector3(p.x, p.y, p.z)));
console.log(curve.getLength());
// curve.closed = true;
const lookAt = new Vector3();
const lookAhead = 0.05;
const tourSpeed = -0.0005;

export function TourCamera({ makeDefault }) {
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0]);
  const [progress, setProgress] = useState(0);
  const progressTarget = useRef(0);

  const cameraRef = useRef();
  const helper = useHelper(cameraRef, CameraHelper, 'cyan');

  useFrame(() => {
    setProgress((prevProgress) => (progressTarget.current - prevProgress) / 10);

    const { x, y, z } = curve.getPoint(progress);
    curve.getPoint(progress + lookAhead, lookAt);
    setCameraPosition([x, y, z]);
    cameraRef.current.lookAt(lookAt);
  });

  const wheel = ({ deltaY }) => {
    progressTarget.current += (deltaY * tourSpeed);
    if (progressTarget.current < 0) progressTarget.current = 11.08187483486707;
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
      fov={50}
      far={60}
    />
  );
}

export function OverviewCamera({ makeDefault }) {
  return (
    <PerspectiveCamera
      makeDefault={makeDefault}
      position={[0, 80, 100]}
      rotation={[-38 * (Math.PI / 180), 0, 0]}
      fov={20}
    />
  );
}
