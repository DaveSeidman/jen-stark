import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { AnimationMixer, MeshStandardMaterial } from 'three'
import { useGLTF } from '@react-three/drei';
import { VideoTexture, RepeatWrapping } from 'three';
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
      if (obj.name === 'person') {
        obj.frustumCulled = false;
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
        // TODO: check here if this videoTexture already exists 
        // if so, use it, if not, make a new one and push it to the array
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
        obj.material.emissiveMap = videoTexture;
      }
    });


    mixer.current = new AnimationMixer(gltf);
    const action = mixer.current.clipAction(gltf.animations[1]);
    console.log(action)
    // action.play();

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
