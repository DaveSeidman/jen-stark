import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Vector2, Vector3, CameraHelper, AxesHelper, CatmullRomCurve3 } from 'three';
import { useHelper, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { points } from '../../assets/models/camera-path.json';

const curve = new CatmullRomCurve3(points.map((p) => new Vector3(p.x, p.y, p.z)));
const lookAt = new Vector3();

export function TourCamera({ makeDefault, scrollPercent, lookAhead }) {
  const [containerPosition, setContainerPosition] = useState([0, 0, 0]);
  const progress = useRef(0);
  const { gl } = useThree();
  const containerRef = useRef();
  const cameraRef = useRef();
  const rotationTarget = useRef(new Vector2())

  useHelper(cameraRef, makeDefault ? AxesHelper : CameraHelper, 'cyan');
  useFrame(() => {
    progress.current += (scrollPercent - progress.current) / 20; // TODO: make 20 a variable and base on frame delta
    const { x, y, z } = curve.getPoint(progress.current);
    curve.getPoint(progress.current + lookAhead, lookAt);
    setContainerPosition([x, y, z]);
    containerRef.current.lookAt(lookAt);
    cameraRef.current.rotation.x += (rotationTarget.current.x - cameraRef.current.rotation.x) / 20;
    cameraRef.current.rotation.y += (rotationTarget.current.y - cameraRef.current.rotation.y) / 20;
  });

  const pointerMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height } = gl.domElement.getBoundingClientRect()
    rotationTarget.current.y = Math.PI - ((clientX / width) - .5) * .5;
    rotationTarget.current.x = ((clientY / height) - .5) * .5;
  };

  useEffect(() => {
    addEventListener('pointermove', pointerMove);

    return () => {
      removeEventListener('pointermove', pointerMove);
    };
  }, []);

  return (
    <group
      ref={containerRef}
      position={containerPosition}
    >
      <PerspectiveCamera
        ref={cameraRef}
        rotation={[0, 0, 0]}
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
