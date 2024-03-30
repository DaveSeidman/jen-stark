import React, { useEffect, useState, useRef } from 'react';
import './index.scss';

function Carousel({ pages, scrollPercent, setScrollPercent }) {
  const pagesRef = useRef();

  const scroll = ({ target }) => {
    const { scrollTop, scrollHeight } = target;
    const { height } = target.getBoundingClientRect();
    const nextScrollPercent = (scrollTop / (scrollHeight - height));
    setScrollPercent(nextScrollPercent);
  };

  const scrollToTop = () => {
    pagesRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

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
              </div>
            );
          })
        }
      </div>
      <div className={`carousel-restart ${scrollPercent === 1 ? '' : 'hidden'}`}>
        <button onClick={scrollToTop}>Return to Lounge</button>
      </div>
    </div>
  );
}

export default Carousel;
