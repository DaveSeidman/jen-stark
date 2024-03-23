import React, { useRef, useState, useEffect } from 'react';
import mapFile from './assets/images/map2.png';
import './index.scss';
import { pages } from '../config.json';
import Scene from './components/scene';
import Carousel from './components/carousel';
import Nav from './components/nav';
import Experience from './components/experience';
import Artist from './components/artist';
// import Venue from './components/venue';
// import Partner from './components/partner';
// import Footer from './components/footer';
import { version } from '../package.json';
import Progress from './components/progress';

function App() {
  const [overview, setOverview] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const lookAhead = 0.005;



  return (
    <div className="app">
      <Scene
        overview={overview}
        scrollPercent={scrollPercent}
        lookAhead={lookAhead}

      />
      <Carousel
        lookAhead={lookAhead}
        pages={pages}
        setScrollPercent={setScrollPercent}
      />
      <img
        type="button"
        className="map"
        onClick={() => { setOverview((prevOverview) => !prevOverview); }}
        src={mapFile}
      />
      <Progress scrollPercent={scrollPercent}></Progress>
      <a className="scrollHint" href="#nav">pull up for more</a>
      <Nav />
      <Experience />
      <Artist />
      {/* <Venue /> */}
      {/* <Partner /> */}
      {/* <Footer /> */}
      <p className="version">{`version: ${version}`}</p>
    </div>
  );
}

export default App;
