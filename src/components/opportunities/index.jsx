import React from 'react';
import './index.scss';

function Opportunities() {
  return (
    <div id="opportunities" className="opportunities">
      <div className="opportunities-body">
        <h1 className="opportunities-title">Opportunities</h1>
        <p>Anticipated to attract 50,000 visitors over five months, Cascade offers vast sponsorship opportunities and audience engagement, bolstered by a promotional campaign to a 400,000-strong social media following. It will enable meaningful brand interactions, client acquisition, and innovative food, beverage, and merchandising partnerships.</p>
        <div className="opportunities-body-levels">
          <div className='opportunities-body-levels-level'>
            <h2>Partnerships</h2>
            <p>Let's work together to shape a custom strategic investment opporunity for meaningful returns.</p>
            <a className="button" href="mailto:partnerships@jenstark.com?subject=Cascade Partnership Opportunities!">Email Us</a>
          </div>
          <div className='opportunities-body-levels-level'>
            <h2>Sponsors</h2>
            <p>From the Cascade Lounge to our Bar, Digital to OOH, we have numbers ways for your brand to get involved.</p>
            <button className="email-button" type="button">Email Us</button>
          </div>
          <div className='opportunities-body-levels-level'>
            <h2>Patronage</h2>
            <p>Looking to be an essential part of making Cascade a reality? Learn more about becoming a Patron.</p>
            <button className="email-button" type="button">Email Us</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Opportunities;