import React, { useEffect } from "react";
import './index.scss';
import { pages } from '../../../config.json'

function Progress({ scrollPercent }) {

  let activeIndex = 0;
  let closestAmount = Number.POSITIVE_INFINITY;
  pages.forEach((page, index) => {
    const disatnceToPercent = Math.abs(scrollPercent - page.percentAlongTour)
    if (disatnceToPercent < closestAmount) {
      closestAmount = disatnceToPercent
      activeIndex = index
    }
  })

  return (
    <div className="progress">
      <div className="progress-bar"
        style={{ width: `${scrollPercent * 100}%` }}
      ></div>
      <div className="progress-labels">
        {pages.map((page, index) => (
          page.visible && (<span
            className={`progress-labels-label ${activeIndex === index ? 'active' : ''}`}
            style={{ left: `${page.percentAlongTour * 100}%` }}
          >{page.title}</span>)
        ))}
      </div>
    </div>
  )
}


export default Progress;