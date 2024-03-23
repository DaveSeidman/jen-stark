import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector2, Vector3, CameraHelper, AxesHelper, CatmullRomCurve3 } from 'three';
import { useHelper, PerspectiveCamera, OrbitControls } from '@react-three/drei';
// import { OrbitControls } from 'orbit-controls-es6'; // Import OrbitControls
import { points } from '../../assets/models/camera-path.json';

const curve = new CatmullRomCurve3(points.map((p) => new Vector3(p.x, p.y, p.z)));
const lookAt = new Vector3();

export function TourCamera({ makeDefault, scrollPercent, lookAhead }) {
  const [containerPosition, setContainerPosition] = useState([0, 0, 0]);
  const progress = useRef(0);
  const { gl } = useThree();
  const containerRef = useRef();
  const cameraRef = useRef();
  const pointerTarget = useRef(new Vector2())
  const rotationTarget = useRef(new Vector2());
  const controlsRef = useRef(); // Ref for OrbitControls
  const drag = useRef(false);

  useHelper(cameraRef, makeDefault ? AxesHelper : CameraHelper, 'cyan');
  useFrame(() => {
    progress.current += (scrollPercent - progress.current) / 20;
    const { x, y, z } = curve.getPoint(progress.current);
    curve.getPoint(progress.current + lookAhead, lookAt);
    setContainerPosition([x, y, z]);
    containerRef.current.lookAt(lookAt);
    // cameraRef.current.rotation.x += (rotationTarget.current.x - cameraRef.current.rotation.x) / 20;
    cameraRef.current.rotation.y += (rotationTarget.current.y - cameraRef.current.rotation.y) / 20;
    // cameraRef.current.rotation.y = rotationTarget.current.y;
    // cameraRef.current.rotation.x = rotationTarget.current.x;

    if (controlsRef.current) {
      controlsRef.current.update(); // Update OrbitControls
    }
  });

  const pointerDown = (e) => {
    drag.current = true;
    const { clientX, clientY } = e;
    const { width, height } = gl.domElement.getBoundingClientRect();
    pointerTarget.current.x = clientY / height;
    pointerTarget.current.y = clientX / width;
  }

  const pointerUp = () => {
    drag.current = false;
  }

  const pointerMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height } = gl.domElement.getBoundingClientRect();
    // rotationTarget.current.y = Math.PI - ((clientX / width) - 0.5) * 0.5;
    // rotationTarget.current.x = ((clientY / height) - 0.5) * 0.5;


    if (drag.current) {
      // console.log(e)
      rotationTarget.current.x += ((clientY / height) - pointerTarget.current.x) * 4;
      rotationTarget.current.y += ((clientX / width) - pointerTarget.current.y) * 4;
    }
    pointerTarget.current.x = clientY / height;
    pointerTarget.current.y = clientX / width;
  };

  useEffect(() => {
    addEventListener('pointerdown', pointerDown);
    addEventListener('pointermove', pointerMove);
    addEventListener('pointerup', pointerUp);

    return () => {
      removeEventListener('pointerdown', pointerDown);
      removeEventListener('pointermove', pointerMove);
      removeEventListener('pointerup', pointerUp);
    };
  }, []);

  useEffect(() => {
    rotationTarget.current.y = Math.PI;

  }, [scrollPercent])

  return (
    <group ref={containerRef} position={containerPosition}>
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
