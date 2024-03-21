import React from 'react';
import artistPhoto from '../../assets/images/artist.jpg';
import './index.scss';

function Artist() {
  return (
    <div className="artist">
      <div className="artist-photo">
        <img src={artistPhoto} />
      </div>
      <div className="artist-text">
        <h2>Artist</h2>
        <p>Jen Stark's art is driven by her interest in conceptualizing visual systems to simulate plant growth, evolution, infinity, fractals, mimetic topographies, and sacred geometries. Using available materials--paper, wood, metal, paint-Stark strives to make work that balances on a razor's edge of optical seduction and perceptual engagement. In recent years, Stark has introduced new technologies into her diverse practice, delving into the digital realm of interactive projections and distinctive NFTs.</p>
        <p>The resulting works often resemble organic, molecular, cloud-like structures, and are imbued with kinetic, undulating effects that serve to dislocate the viewer from staid reality into an immersive ecosphere of echoing patterns and the implausible designs found in nature. Even her vivid colors are in direct conversation with the natural world; the attractant/ repellent properties of flowers encouraging pollination or insects warning birds of their poisonous traits, and the luminous mystery of phosphorescent sea creatures are among Stark's concerns. Stark's spiritual reservoir.</p>
        <p>READ MORE</p>
      </div>
    </div>
  );
}

export default Artist;
