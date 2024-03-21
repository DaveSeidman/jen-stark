import React, { useRef, useState, useEffect } from 'react';
import mapFile from './assets/images/map2.png';
import './index.scss';
import { pages } from '../config.json';
import Scene from './components/scene';
import Carousel from './components/carousel';
import Nav from './components/Nav';
import Experience from './components/experience';
import Artist from './components/artist';

function App() {
  const [overview, setOverview] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  return (
    <div className="app">
      <Scene
        overview={overview}
        scrollPercent={scrollPercent}
      />
      <Carousel
        pages={pages}
        setScrollPercent={setScrollPercent}
      />
      <img
        type="button"
        className="map"
        onClick={() => { setOverview((prevOverview) => !prevOverview); }}
        src={mapFile}
      />
      <p className="debug">{scrollPercent}</p>
      <Nav />
      <Experience />
      <Artist />
    </div>
  );
}

export default App;
