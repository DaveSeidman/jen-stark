import React from 'react';
import { useGLTF } from '@react-three/drei';
import sceneFile from '../../assets/models/scene6.glb';

function Model() {
  const gltf = useGLTF(sceneFile);
  gltf.scene.traverse((obj) => {
    if (obj.isLIght) console.log(obj);
  });

  return (
    <group>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default Model;
