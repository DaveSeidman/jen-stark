import React, { useEffect, useState, useRef } from 'react';
import './index.scss';

function Carousel({ pages, setScrollPercent, lookAhead }) {
  const pagesRef = useRef();

  const scroll = ({ target }) => {
    const { scrollTop, scrollHeight } = target;
    const { height } = target.getBoundingClientRect();
    const nextScrollPercent = (scrollTop / (scrollHeight - height));
    setScrollPercent(nextScrollPercent);
  };

  return (
    <div className="carousel">
      <div
        ref={pagesRef}
        className="carousel-pages"
        onScroll={scroll}
      >
        {
          pages.map((page) => {
            return (
              <div
                key={page.slug}
                className="carousel-pages-page"
                style={{
                  height: `${page.pathLength * 100}vh`
                }}
              >
                {/* <div className="carousel-pages-page-title">{page.title}</div> */}
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Carousel;
