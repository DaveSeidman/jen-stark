import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { AnimationMixer, MeshNormalMaterial, MeshStandardMaterial, VideoTexture, RepeatWrapping, SkinnedMesh, MeshBasicMaterial } from 'three'
import { useGLTF } from '@react-three/drei';
import sceneFile from '../../assets/models/scene.glb';
// import { MeshTransmissionMaterial } from '@pmndrs/vanilla';

function Model() {
  // Ask GPT if we should move the gltf loading outside of here
  const gltf = useGLTF(sceneFile);
  const videoTextures = useRef({})
  const videosStarted = useRef(false);
  const mixer = useRef();

  const tranmissionMat = useRef();

  const startVideos = () => {
    if (videosStarted.current) return
    Object.keys(videoTextures.current).forEach((name) => {
      videoTextures.current[name].source.data.play();
    })
    videosStarted.current = true;
  }
  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
      if (obj.name === 'person') {
        obj.frustumCulled = false;
        mixer.current = new AnimationMixer(obj);
        const action = mixer.current.clipAction(gltf.animations[0]);
        action.play();
      }

      if (obj.material && obj.material.name.toLowerCase().includes('glass')) {
        // console.log(obj)
      }

      if (obj.material && obj.material.name === 'neon-yellow') {
        // obj.material.emissiveIntensity = 100;
        // console.log(obj.material);
      }

      if (obj.name === 'floor') {
        obj.receiveShadow = true;
        obj.castShadow = true;
        obj.smoothness = 10
        obj.material = new MeshStandardMaterial({
          color: 0x000000,
          envMapIntensity: .5,
          roughness: 0,
          metalness: 0,
          normalMap: obj.material.normalMap
        })
      }
      if (obj.material?.name.includes('mp4') && !videoTextures.current[obj.material.name]) {
        const video = document.createElement('video');
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
        video.setAttribute('muted', true);
        video.setAttribute('loop', true);
        video.src = `${location.pathname}/${obj.material.name}`;
        const videoTexture = new VideoTexture(video)
        videoTexture.flipY = false;
        videoTexture.wrapS = RepeatWrapping;
        videoTextures.current[obj.material.name] = videoTexture;
        obj.material.map = videoTexture;
        // TODO: this might not be working
        // TODO: check emissiveIntensity cglobally 
        obj.material.emissiveMap = videoTexture;
      }
    });

    addEventListener('click', startVideos);

    return () => {
      removeEventListener('click', startVideos)
    }
  }, [])

  useFrame((_, delta) => {
    Object.keys(videoTextures.current).forEach(name => {
      videoTextures.current[name].update();
    })

    if (mixer.current) {
      mixer.current.update(delta)
    }
  })

  return (
    <group>
      <primitive object={gltf.scene} />
      {/* <meshTransmissionMaterial ref={tranmissionMat} /> */}
    </group >
  );
}

export default Model;
