/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isAddress } from 'web3-utils';

import { Intercom } from './Intercom';
import './css/landing.scss';
import Logo from './Logo';
import twitter from './img/landing/twitter.svg';
import tokntalkGrey from './img/landing/tokntalk-grey.svg';
import github from './img/landing/github.svg';
import medium from './img/landing/medium.svg';
import telegramColor from './img/landing/telegram-color.svg';
import twitterColor from './img/landing/twitter-color.svg';
import tokntalkColor from './img/landing/tokntalk-color.svg';
import arrowUp from './img/landing/round-up.svg';
import arrowRight from './img/landing/tail-right.svg';

import ThreadsFirst from './img/landing/threads-1.png';
import ThreadsSecond from './img/landing/threads-2.png';
import ThreadsThird from './img/landing/threads-3.png';
import ThreadsFourth from './img/landing/threads-4.png';

class Threads extends Component {
  state = {
    contractAddress: '',
    isValid: false,
  };

  generateCommunity = () => {
    if (this.state.isValid) {
      this.props.history.push(`/clubs/ethereum:${this.state.contractAddress}`);
    }
  };

  onInputChange = (e) => {
    const { value } = e.target;
    this.setState({ contractAddress: value, isValid: isAddress(value) });
  };

  render() {
    return (
      <div className="landing">
        <div className="wrapper-landing">
          <div className="container" style={{ zIndex: '1' }}>
            <nav className="level landing-header">
              <div className="level-left">
                <div className="level-item">
                  <Link to="/about" style={{ display: 'flex' }}>
                    <Logo />
                    <p className="landing-logo-typo">Tokntalk</p>
                  </Link>
                </div>
              </div>
              <div className="level-right">
                <Link to="/communities" className="level-item landing-header-link">
                  Create a token club
                </Link>
                <Link to="/" className="level-item landing-header-link landing-header-link-button">
                  <span>Discover clubs</span>
                  <img src={arrowRight} id="landing-header-arrow" />
                </Link>
              </div>
            </nav>
          </div>

          <section
            className="section landing-hero"
            style={{ borderBottom: 'none', marginBottom: '0' }}
            id="first-section"
          >
            <div className="container" style={{ zIndex: '1' }}>
              <div className="columns">
                <div className="column is-12 has-text-centered">
                  <h2 style={{ maxWidth: '1000px' }}>Receive Ether* for relevant answers.</h2>
                  <p className="subtitle-communities" style={{ maxWidth: '760px', margin: '0 auto' }}>
                    Share your knowledge or post a meme. Better the thread, higher the reward.
                  </p>
                  <p style={{ color: '#848da5', marginBottom: '0.5rem', marginTop: '2rem' }} className="landing-paste">
                    *or any ERC20 token
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section has-text-centered" style={{ marginTop: '0', borderBottom: '0' }}>
            <div className="container">
              <div className="columns is-multiline">
                <div className="column is-half">
                  <h4 className="landing-steps-counter">1.</h4>
                  <h3 className="landing-steps">Create a thread</h3>
                  <p className="landing-paragraph">Ask a question or set a topic of the discussion.</p>
                  <figure className="landing-feature pink">
                    <img src={ThreadsFirst} style={{ width: '90%', height: 'auto' }} />
                  </figure>
                </div>
                <div className="column is-half">
                  <h4 className="landing-steps-counter">2.</h4>
                  <h3 className="landing-steps">Discussion is on!</h3>
                  <p className="landing-paragraph">Discuss, share, post and upvote interesting replies.</p>
                  <figure className="landing-feature pink">
                    <img src={ThreadsSecond} style={{ width: '90%', height: 'auto' }} />
                  </figure>
                </div>
                <div className="column is-half">
                  <h4 className="landing-steps-counter">3.</h4>
                  <h3 className="landing-steps">Receive Ether or a particular token</h3>
                  <p className="landing-paragraph">
                    As soon as the sponsored place is bought, <br />
                    everyone receives a share!
                  </p>
                  <figure className="landing-feature pink">
                    <img src={ThreadsThird} style={{ width: '90%', height: 'auto', marginTop: '130px' }} />
                  </figure>
                </div>
                <div className="column is-half">
                  <h4 className="landing-steps-counter">4.</h4>
                  <h3 className="landing-steps">Keep receiving!</h3>
                  <p className="landing-paragraph">
                    People keep bidding for the sponsored place and you keep receiving the passive income.
                  </p>
                  <figure className="landing-feature pink">
                    <img
                      src={ThreadsFourth}
                      style={{ width: '100%', height: '100%', marginTop: '0', borderRadius: '20px' }}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </section>

          <section className="section has-text-centered" style={{ borderBottom: 'none' }}>
            <div className="container">
              <div>
                <h2>Join our Beta</h2>
                <p className="subtitle">We want to test this feature and we need your feedback.</p>
                <div className="columns">
                  <div className="column is-twelve">
                    <a
                      href="https://twitter.com/tokntalkclub"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="landing-footer-intouch"
                    >
                      <img src={twitterColor} />
                      <span>Twitter</span>
                    </a>
                    <Link
                      to="/thread/claim:0x3336c309406810ec4c4b8906d79e79a8cb7102e9a5384cd913094c65df41dc636d639bfac03881780e4289b5828c310ac9e49385d0a89d5b726c535cad85662b1c?backUrl=%2Fclubs%2F%25EF%25BC%2585"
                      className="landing-footer-intouch"
                    >
                      <img src={tokntalkColor} />
                      <span>Tok n talk</span>
                    </Link>
                    <a href="https://t.me/joinchat/Ff2fyUYwRF7m3Vxew5UxnA" className="landing-footer-intouch">
                      <img src={telegramColor} />
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="landing-footer" style={{ paddingBottom: '0' }}>
            <div className="container">
              <div className="columns has-text-centered">
                <div className="column">
                  <a href="#first-section" className="landing-goup">
                    <img src={arrowUp} id="arrowup" />
                    <img src={tokntalkGrey} />
                  </a>
                  <div className="landing-footer-navigation">
                    <Link to="/communities">Creators</Link>
                    <Link to="/about">Owners</Link>
                    <a
                      href="https://drive.google.com/drive/u/1/folders/1hGOq4bEI2lIf5qZr90XQQdG-N0wLZIGK"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Press
                    </a>
                    <Link to="/">Hop Inside</Link>
                  </div>
                  <div className="landing-footer-social">
                    <a href="https://github.com/CryptoVerseCC/tokntalk">
                      <img src={github} />
                    </a>
                    <a href="https://twitter.com/tokntalkclub">
                      <img src={twitter} />
                    </a>
                    <a href="https://medium.com/coinmonks/social-network-for-any-token-960afd36d280">
                      <img src={medium} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Threads;
