import React from "react";
import './index.scss';

import { carousels } from '../../../config.json'
console.log(carousels.alloy);

function Alloy() {


  return (
    <div className="alloy">
      <div className="allow-carousel">
        {
          carousels.alloy.map((image) => (
            <div
              key={image}
              className="allow-carousel-image"
              style={{ background: `alloy/${image}` }}></div>
          ))
        }
      </div>

      <div className="allow-logo"></div>
    </div >
  )
}

export default Alloy;