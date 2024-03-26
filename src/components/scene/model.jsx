import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'
import { useGLTF } from '@react-three/drei';
// import { MeshTransmissionMaterial, MeshReflectorMaterial } from '@pmndrs/vanilla'
import { VideoTexture, RepeatWrapping } from 'three';
import sceneFile from '../../assets/models/scene.glb';

function Model() {
  const gltf = useGLTF(sceneFile);
  const videoTextures = useRef([])
  const videosStarted = useRef(false);

  const startVideos = () => {
    if (videosStarted.current) return
    console.log(videoTextures.current.length);
    videoTextures.current.forEach((texture) => {
      texture.source.data.play()
    })
    videosStarted.current = true;
  }

  // const comingSoonTexture = useVideoTexture('jen-stark/coming-soon.mp4');
  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj.name === 'floor') {
        obj.receiveShadow = true;
        obj.castShadow = true;
        obj.smoothness = 10
        obj.material = new MeshStandardMaterial({ color: 0x000000, envMapIntensity: .5, roughness: 0, metalness: 0 })
      }
      if (obj.material?.name.includes('mp4')) {
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
        videoTextures.current.push(videoTexture);
        obj.material.map = videoTexture;
      }
    });


    addEventListener('click', startVideos);
    // addEventListener('scroll', startVideos);

    return () => {
      removeEventListener('click', startVideos)
      // removeEventListener('scroll', startVideos);
    }
  }, [])

  useFrame(() => {
    videoTextures.current.forEach(texture => {
      texture.update();
    })
  })

  return (
    <group>
      <primitive object={gltf.scene} />
    </group >
  );
}

export default Model;
