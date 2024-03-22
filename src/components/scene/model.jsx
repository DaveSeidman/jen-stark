import React from 'react';
import { useGLTF, useVideoTexture } from '@react-three/drei';
import sceneFile from '../../assets/models/scene6.glb';

function Model() {
  const gltf = useGLTF(sceneFile);

  const comingSoonTexture = useVideoTexture('jen-stark/coming-soon.mp4');

  gltf.scene.traverse((obj) => {
    if (obj.isLIght) console.log(obj);
    if (obj.name.indexOf('coming-soon') >= 0) {
      obj.material.map = comingSoonTexture;
    }
  });

  return (
    <group>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default Model;
