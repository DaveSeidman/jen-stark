import React, { useEffect, useRef, useState } from 'react';
import drip1Image from '../../assets/images/drip1.png'
import './index.scss';

function Experience() {
  const experienceRef = useRef();
  const [showDrips, setShowDrips] = useState(false);

  const scroll = () => {
    const { top, height } = experienceRef.current.getBoundingClientRect();
    setShowDrips(innerHeight - (top + height / 2) > 0);
  }

  useEffect(() => {
    addEventListener('scroll', scroll);

    return () => {
      removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div ref={experienceRef} id="experience" className="experience">
      <div className="experience-body">
        <h2>Experience</h2>
        <p>Building on the success of its 2021 debut in New York, Cascade will unveil its next edition in LA's Arts District in fall 2024, housed in the brand-new, cutting-edge Alloy building. This initiative, a collaboration between visual artist Jen Stark and New York gallerist Josh Liner, promises a unique blend of marketing and merchandising opportunities through distinct engagement channels.</p>
        <p>The event will immerse attendees in Stark's celebrated interactive art, enriched with new exhibition elements, guiding them through enchanting spaces filled with light, movement, and sound, culminating in a lounge and gift shop featuring Stark's exclusive collaborations and select beverages.</p>
        <p>Anticipated to attract 50,000 visitors, Cascade offers vast sponsorship opportunities and audience engagement, bolstered by a promotional campaign to a 400,000-strong social media following. It will enable meaningful brand interactions, client acquisition, and innovative food, beverage, and merchandising partnerships.</p>
        <img
          className={`drip ${showDrips ? 'active' : ''}`}
          src={drip1Image} />
      </div>
    </div>
  );
}

export default Experience;
