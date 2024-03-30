import React, { useState, useEffect, useRef } from 'react';
import './index.scss';

function Restart({ scrollPercent, scrollToTop }) {
  console.log(scrollPercent)

  return (
    <div className={`restart ${scrollPercent === 1 ? '' : 'hidden'}`}>
      <button type="button" onClick={scrollToTop}>Return to Start</button>
    </div >
  )
}

export default Restart