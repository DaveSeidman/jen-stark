import React, { useEffect, useState, useRef } from 'react';
import './index.scss';

function Carousel({ pages, setScrollPercent }) {
  const pagesRef = useRef();
  const [pagesArray, setPagesArray] = useState(pages);

  useEffect(() => {
    console.log(pagesRef.current);
    // if(!pagesArray)
    const array = Array.from(pagesRef.current.children);
    const nextPagesArray = [...pagesArray];
    nextPagesArray.forEach((page, index) => {
      page.el = array[index];
    });
    setPagesArray(nextPagesArray);
    // pagesArray.current = array.map((page, index) => ({ el: page, id: index, offset: 0 }));
    // console.log(pagesArray);
  }, []);

  const scroll = () => {
    const nextPagesArray = [...pagesArray];
    let update = false;
    pagesArray.forEach((page, index) => {
      const { top } = page.el.getBoundingClientRect();
      const { length } = pagesArray;

      if (top < -innerHeight) {
        page.offset += 1;
        update = true;
      }
      if (top > (length * innerHeight) - innerHeight) {
        page.offset -= 1;
        update = true;
      }

      if (index === 0) setScrollPercent((top + innerHeight) / (innerHeight * length));
    });
    if (update) setPagesArray(nextPagesArray);
  };

  return (
    <div className="carousel">
      <div
        ref={pagesRef}
        className="carousel-pages"
        onScroll={scroll}
      >
        {pagesArray.map((page, index) => (
          <div
            key={index}
            className="carousel-pages-page"
            style={{
              top: `${index * innerHeight}px`,
              transform: `translateY(${(page.offset * pagesArray.length) * innerHeight}px)`,
            }}
          >
            <h1>{page.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
