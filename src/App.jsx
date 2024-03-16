import React, { useRef, useState, useEffect } from 'react';
import mapFile from './assets/images/map2.png';
import './index.scss';

import Scene from './components/scene';

function App() {
  const [overview, setOverview] = useState(false);

  return (
    <div className="app">
      <Scene overview={overview} />
      <img
        type="button"
        className="map"
        onClick={() => { setOverview((prevOverview) => !prevOverview); }}
        src={mapFile}
      />
    </div>
  );
}

export default App;
