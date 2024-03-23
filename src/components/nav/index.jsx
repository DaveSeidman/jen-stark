import React from 'react';
import './index.scss';

function Nav() {
  return (
    <div id="nav" className="nav">
      <div className="nav-title">
        <h1>
          <span className="large">Cascade</span>
          <span>A Jen Stark</span>
          <span>Experience</span>
          <span className="yellow">Coming to LA</span>
        </h1>
      </div>
      <div className="nav-links">
        <a href="#experience" className="back-red">Experience</a>
        <a href="#artist" className="back-orange">Artist</a>
        <a href="#venue" className="back-green">Venue</a>
        <a href="#partner" className="back-purple">Partner</a>
      </div>
    </div>
  );
}

export default Nav;
