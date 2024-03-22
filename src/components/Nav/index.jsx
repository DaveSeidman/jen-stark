import React from 'react';
import './index.scss';

function Nav() {
  console.log('nav');

  return (
    <div className="nav">
      <div className="nav-title">
        <h1>
          <span className="large">Cascade</span>
          <span>A Jen Stark</span>
          <span>Experience</span>
          <span className="yellow">Coming to LA</span>
        </h1>
      </div>
      <div className="nav-links">
        <a className="back-red">Experience</a>
        <a className="back-orange">Artist</a>
        <a className="back-green">Venue</a>
        <a className="back-purple">Partner</a>
      </div>
    </div>
  );
}

export default Nav;
