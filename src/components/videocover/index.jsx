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
        src={`${location.pathname}/VideoCover.mp4`}
      />
      <h1>Enter &nbsp;&nbsp; Cascade &nbsp;&nbsp; LA</h1>
    </div>
  )
}

export default VideoCover