import React, { useState } from "react"
import './index.scss';

function VideoCover() {
  const [show, setShow] = useState(true);
  return (
    <div className={`videocover ${show ? '' : 'hidden'}`}
      onClick={() => {
        setShow(false)
      }}
    >
      <video
        playsInline
        muted
        autoPlay
        loop
        src={`${location.pathname}/StrobeWall.mp4`}
      />
      <h1>Click to Begin Virtual Tour</h1>
    </div>
  )
}

export default VideoCover