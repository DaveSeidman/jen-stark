import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, CameraHelper, CatmullRomCurve3, MeshBasicMaterial } from 'three';
import { useHelper, PerspectiveCamera, Stars, useGLTF, Environment } from '@react-three/drei';
import sceneFile from '../../assets/models/scene1.glb';

function Model() {
  const { scene, animations } = useGLTF(sceneFile);
  const wireMat = new MeshBasicMaterial({ wireframe: true });
  console.log(scene.getObjectByName('Art1'));

  scene.traverse((obj) => {
    if (obj.isMesh) {
      // obj.material = wireMat;
    }
  });

  const mixerRef = useRef();

  return (
    <group>
      <primitive object={scene} />
      <animationMixer ref={mixerRef} clip={animations[0]} />
    </group>
  );
}

export default Model;
