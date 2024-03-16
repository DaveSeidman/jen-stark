import React, { useEffect, useState, useRef } from 'react';
import './index.scss';

function Carousel({ pages }) {
  useEffect(() => {

  }, []);

  return (
    <div className="carousel">
      <div className="carousel-pages">
        {pages.map((page, index) => (
          <div
            className="carousel-pages-page"
            style={{ top: `${index * 100}%` }}
          >
            <h1>{page.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
