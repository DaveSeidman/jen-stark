import React, { useEffect, useState, useRef } from 'react';
import './index.scss';

function Carousel({ pages, setScrollPercent, lookAhead }) {
  const pagesRef = useRef();
  const [pagesArray, setPagesArray] = useState(pages);

  useEffect(() => {
    const array = Array.from(pagesRef.current.children);
    const nextPagesArray = [...pagesArray];
    nextPagesArray.forEach((page, index) => {
      page.el = array[index];
    });
    setPagesArray(nextPagesArray);
  }, []);

  const scroll = ({ target }) => {
    const { scrollTop, scrollHeight } = target;
    const { height } = target.getBoundingClientRect();
    const nextScrollPercent = (scrollTop / (scrollHeight - height)) * (1 - (lookAhead + 0.001));
    console.log(nextScrollPercent);
    setScrollPercent(nextScrollPercent);

    // const nextPagesArray = [...pagesArray];
    // const update = false;
    // pagesArray.forEach((page, index) => {
    //   const { top, height } = page.el.getBoundingClientRect();
    //   const { length } = pagesArray;

    //   // if (top < -height) {
    //   //   page.offset += 1;
    //   //   update = true;
    //   // }
    //   // if (top > (length * height) - height) {
    //   //   page.offset -= 1;
    //   //   update = true;
    //   // }

    //   if (index === 0) {
    //     const scrollPercent = 1 - ((top + height) / (height * length));
    //     setScrollPercent(Math.max(scrollPercent, 0));
    //   }
    // });
    // if (update) setPagesArray(nextPagesArray);
  };

  return (
    <div className="carousel">
      <div
        ref={pagesRef}
        className="carousel-pages"
        onScroll={scroll}
      >
        {
          pagesArray.map((page, index) => {
            const height = page.el ? page.el.getBoundingClientRect().height : 0;
            const length = pagesArray.length;

            return (
              <div
                key={page.slug}
                className="carousel-pages-page"
                style={{
                  top: `${index * innerHeight}px`,
                  transform: `translateY(${(page.offset * length) * height}px)`,
                }}
              >
                <div className="carousel-pages-page-title">{page.title}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Carousel;
