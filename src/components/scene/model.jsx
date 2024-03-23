import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei';
import { VideoTexture } from 'three';
import sceneFile from '../../assets/models/scene.glb';

function Model() {
  const gltf = useGLTF(sceneFile);
  const videoTextures = useRef([])
  const videosStarted = useRef(false);
  const startVideos = () => {
    if (videosStarted.current) return
    videoTextures.current.forEach((texture) => {
      texture.source.data.play()
    })
    videosStarted.current = true;
  }

  // const comingSoonTexture = useVideoTexture('jen-stark/coming-soon.mp4');
  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj.material?.name.includes('mp4')) {
        const video = document.createElement('video');
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
        video.setAttribute('muted', true);
        video.setAttribute('loop', true);
        video.src = `${location.pathname}/${obj.material.name}`;
        // video.play().then(res => {
        //   console.log('played', res)
        // })
        const videoTexture = new VideoTexture(video)
        videoTexture.flipY = false;
        videoTextures.current.push(videoTexture);
        // const nextTextures = [...videoTextures]
        // nextTextures.push(videoTexture);
        // console.log(nextTextures)
        // setVideoTextures(nextTextures)

        obj.material.map = videoTexture;
        // console.log(videoTexture)
        // const texture = useVideoTexture('')
      }
      // if (obj.material
      //   console.log(obj)
      // }
      // if (obj.name.indexOf('coming-soon') >= 0) {
      // obj.material.map = comingSoonTexture;
      // }
    });

    addEventListener('click', startVideos);
    addEventListener('scroll', startVideos);

    return () => {
      removeEventListener('click', startVideos)
      removeEventListener('scroll', startVideos);
    }
  }, [])

  useFrame(() => {
    // console.log('frame', videoTextures.length)
    videoTextures.current.forEach(texture => {
      texture.update();
      // console.log(texture);
    })
  })

  return (
    <group>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default Model;
