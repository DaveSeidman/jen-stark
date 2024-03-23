import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, CameraHelper, AxesHelper, CatmullRomCurve3 } from 'three';
import { useHelper, PerspectiveCamera } from '@react-three/drei';
import { points } from '../../assets/models/camera-path.json';

const curve = new CatmullRomCurve3(points.map((p) => new Vector3(p.x, p.y, p.z)));
const lookAt = new Vector3();

export function TourCamera({ makeDefault, scrollPercent, lookAhead }) {
  const [containerPosition, setContainerPosition] = useState([0, 0, 0]);
  const progress = useRef(0);

  const containerRef = useRef();
  const cameraRef = useRef();
  useHelper(cameraRef, makeDefault ? AxesHelper : CameraHelper, 'cyan');
  useFrame(() => {
    progress.current += (scrollPercent - progress.current) / 20;
    try {
      const { x, y, z } = curve.getPoint(progress.current);
      curve.getPoint(progress.current + lookAhead, lookAt);
      setContainerPosition([x, y, z]);
      containerRef.current.lookAt(lookAt);
    } catch (err) {
      console.log('err', progress.current);
    }
  });

  return (
    <group
      ref={containerRef}
      position={containerPosition}
    >
      <PerspectiveCamera
        ref={cameraRef}
        rotation={[0, Math.PI, 0]}
        makeDefault={makeDefault}
        fov={makeDefault ? 60 : 30}
        far={makeDefault ? 1000 : 10}
      />
    </group>
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
