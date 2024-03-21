import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, CameraHelper, CatmullRomCurve3 } from 'three';
import { useHelper, PerspectiveCamera } from '@react-three/drei';
import { points } from '../../assets/models/path4.json';

const curve = new CatmullRomCurve3(points.map((p) => new Vector3(p.x, p.y, p.z)));
const lookAt = new Vector3();
const lookAhead = 0.05;

export function TourCamera({ makeDefault, scrollPercent }) {
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0]);
  // const [progress, setProgress] = useState(0);
  const progress = useRef(0);

  const cameraRef = useRef();
  const helper = useHelper(cameraRef, CameraHelper, 'cyan');

  useFrame(() => {
    progress.current += (scrollPercent - progress.current) / 20;
    try {
      const { x, y, z } = curve.getPoint(progress.current);
      curve.getPoint(progress.current + lookAhead, lookAt);
      setCameraPosition([x, y, z]);
      cameraRef.current.lookAt(lookAt);
    } catch (err) {
      console.log('err', progress.current);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      position={cameraPosition}
      makeDefault={makeDefault}
      fov={50}
      far={100}
    />
  );
}

export function OverviewCamera({ makeDefault }) {
  return (
    <PerspectiveCamera
      makeDefault={makeDefault}
      position={[0, 300, 0]}
      rotation={[-90 * (Math.PI / 180), 0, 0]}
      fov={25}
    />
  );
}
