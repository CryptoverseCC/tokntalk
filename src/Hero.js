import React from 'react';
import Context from './Context';
import KittyImg from './KittyImg';
import colors from './colors';

const Hero = ({ forCat }) => {
  if (forCat) {
    return (
      <Context.Consumer>
        {({ catStore: { catsInfo, getCatInfo } }) => {
          const backgroundColor = catsInfo[forCat] ? colors[catsInfo[forCat].color] : '';
          return (
            <section className="hero hero-kitten is-small" style={{ backgroundColor }}>
              <div className="hero-body">
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <div className="your-kitten">
                      <KittyImg catsInfo={catsInfo} getCatInfo={getCatInfo} catId={forCat} style={{ width: '450px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }}
      </Context.Consumer>
    );
  } else {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-9 is-offset-3">
                <h1 className="title txtwav slow">Purr Purr</h1>
                <div className="subtitle">
                  <h2 className="txtwav slow">Make your cryptokitten talk with</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Hero;
