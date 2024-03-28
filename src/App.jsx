import React, { useRef, useState, useEffect } from 'react';
import mapFile from './assets/images/map2.png';
import './index.scss';
import { pages } from '../config.json';
// import Scene from './components/scene';
import Scene from './components/scene';
import Carousel from './components/carousel';
import Nav from './components/nav';
import Experience from './components/experience';
import Artist from './components/artist';
import Venue from './components/venue';
// import Partner from './components/partner';
// import Footer from './components/footer';
import VideoCover from './components/videocover';
import VideoBreak from './components/videobreak';
import Alloy from './components/alloy';
import { version } from '../package.json';
import Progress from './components/progress';
import icon2D from './assets/images/2d.svg';
import icon3D from './assets/images/3d.svg';

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
      ></Scene>
      <Carousel
        lookAhead={lookAhead}
        pages={pages}
        setScrollPercent={setScrollPercent}
      />
      <button
        type="button"
        className="map"
        onClick={() => { setOverview((prevOverview) => !prevOverview); }}
      ><img src={overview ? icon3D : icon2D} /></button>
      <Progress scrollPercent={scrollPercent}></Progress>
      <a className="scrollHint" href="#nav">pull up for more</a>
      <Nav />
      <Experience />
      <Artist />
      <VideoBreak />
      <Alloy />
      <Venue />

      {/* <Partner /> */}
      {/* <Footer /> */}
      <VideoCover></VideoCover>
      <p className="version">{`version: ${version}`}</p>
    </div>
  );
}

export default App;
