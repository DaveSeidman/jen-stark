import React from 'react';
import './index.scss';

import map from '../../assets/images/alloy-map.png'

function Venue() {
  return (
    <div id="venue" className="venue">
      <div className='venue-body'>
        <div className="venue-body-map" onClick={() => { window.open('https://maps.app.goo.gl/SCEKdFRQ3K8WGdMs6') }} />
        <div className="venue-body-text back-purple">
          <h2>Venue</h2>
          <p>In the heart of LA's Arts District, a new center of energy has emerged: a multifaceted community where work, retail, and living collide. Welcome to <a href="https://alloyla.com" target="_blank">Alloy</a>, a vibrant place for creatives, artists, and seekers alike. Here, each day brings new experiences and fresh encounters with a lively pedestrian paseo that connects it all.</p>
        </div>
      </div>
    </div>
  );
}

export default Venue;
