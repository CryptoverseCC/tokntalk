import React from 'react';
import arrow from './img/arrow.svg';

const Footer = () => (
  <footer className="fixed_footer">
    <div className="container">
      <div className="columns">
        <div className="column is-offset-3">
          <h3 className="is-size-2">Every address is a feed. Interested?</h3>
        </div>
      </div>
      <div className="columns">
        <div className="column is-offset-3">
          <a className="external" href="https://linkexchange.io" target="_blank" rel="noopener noreferrer">
            <div className="columns">
              <div className="column is-1 arrow">
                <img style={{ width: '16px', height: 'auto', marginTop: '10px' }} src={arrow} alt='arrow' />
              </div>
              <div className="column">
                <h2>Brought by Link Exchange</h2>
                <p>"It's like Google AdSense for Token-based Communities"</p>
              </div>
            </div>
          </a>
        </div>
        <div className="column">
          <a className="external" href="https://userfeeds.io" target="_blank" rel="noopener noreferrer">
            <div className="columns">
              <div className="column is-1 arrow">
                <img style={{ width: '16px', height: 'auto', marginTop: '10px' }} src={arrow} alt='arrow' />
              </div>

              <div className="column">
                <h2>Powered by Userfeeds</h2>
                <p>Attention Economies for Token-Based Communities</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
