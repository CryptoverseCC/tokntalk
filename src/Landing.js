/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './css/landing.scss';
import Logo from './Logo';
import buttonPlay from './img/landing/button-play.svg';
import twitter from './img/landing/twitter.svg';
import tokntalkGrey from './img/landing/tokntalk-grey.svg';
import github from './img/landing/github.svg';
import medium from './img/landing/medium.svg';
import telegramColor from './img/landing/telegram-color.svg';
import twitterColor from './img/landing/twitter-color.svg';
import tokntalkColor from './img/landing/tokntalk-color.svg';
import arrowUp from './img/landing/round-up.svg';
import arrowRight from './img/landing/tail-right.svg';
import exitBig from './img/landing/exit-big.svg';

import buildThird from './img/landing/build-3.webp';
import TokenOwnersFirst from './img/landing/TokenOwnersFirst.webp';
import TokenOwnersSecond from './img/landing/TokenOwnersSecond.webp';
import TokenOwnersSixth from './img/landing/TokenOwnersSixth.webp';
import UserFirst from './img/landing/UserFirst.webp';
import UserSecond from './img/landing/UserSecond.webp';
import UserTransferable from './img/landing/UserTransferable.webp';
import UserConnected from './img/landing/UserConnected.webp';
import UsersNew from './img/landing/UsersNew.webp';

import { pageView } from './Analytics';

class Landing extends Component {
  state = { showVideo: false };

  componentDidMount() {
    pageView();
  }

  exitVideo = () => {
    this.setState({ showVideo: false });
  };

  playVideo = () => {
    this.setState({ showVideo: true });
  };

  render() {
    const { showVideo } = this.state;
    return (
      <div className="landing">
        <div className="wrapper-landing">
          {showVideo && (
            <div className="modal is-active">
              <div className="landing-modal-bg" />
              <div className="landing-modal-content">
                <div className="landing-modal-content-video">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/AYj7MFGF53w?showinfo=0&autoplay=1"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
                <button className="landing-modal-content-close" style={{ cursor: 'pointer' }} onClick={this.exitVideo}>
                  <img src={exitBig} />
                </button>
              </div>
            </div>
          )}

          <div className="container" style={{ zIndex: '9' }}>
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
            className="section landing-hero landing-hero-communities"
            style={{ borderBottom: 'none', position: 'relative' }}
            id="first-section"
          >
            <div className="container" style={{ zIndex: '1' }}>
              <div className="columns">
                <div className="column is-6 has-text-centered landing-mobile-no">
                  <figure className="landing-video">
                    <a className="landing-player" onClick={this.playVideo} style={{ cursor: 'pointer' }}>
                      <img alt="" src={buttonPlay} style={{ marginRight: '-2px', marginTop: '5px' }} />
                    </a>
                    <div className="landing-video-overlay" />
                  </figure>
                  <p style={{ fontSize: '20px', color: '#848DA5', marginTop: '10px', marginRight: '5%' }}>
                    35s Introduction
                  </p>
                </div>
                <div className="column is-6" id="landing-mobile">
                  <h2>
                    Social Platform <br />
                    for Tokens
                  </h2>
                  <p className="subtitle-communities" style={{ maxWidth: '560px' }}>
                    Explore token oriented communities. Grow your characters and earn rewards from your supporters.
                  </p>
                  <Link to="/" className="landing-button landing-button-mobile">
                    Discover token clubs
                  </Link>
                  <Link to="/communities" className="landing-button-secondary landing-button-mobile">
                    Create a club
                  </Link>
                </div>
                <div className="column is-6 has-text-centered landing-mobile-only">
                  <figure className="landing-video">
                    <a className="landing-player" onClick={this.playVideo} style={{ cursor: 'pointer' }}>
                      <img alt="" src={buttonPlay} style={{ marginRight: '-2px', marginTop: '5px' }} />
                    </a>
                    <div className="landing-video-overlay" />
                  </figure>
                  <p style={{ fontSize: '20px', color: '#848DA5', marginTop: '10px', marginRight: '5%' }}>
                    35s Introduction
                  </p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div id="landing-hero-background-main" className="column is-5" />
            </div>
          </section>

          <section className="section has-text-centered">
            <div className="container">
              <div className="columns">
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersSecond} style={{ width: '395px', height: 'auto' }} />
                  </figure>
                  <h3>You</h3>
                  <p className="landing-paragraph">
                    Act as an Addresses or a Non Fungible Token. No extra accounts needed. Switch between personalities.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={UserFirst} style={{ width: '377px', height: 'auto' }} />
                  </figure>
                  <h3>Your tokens</h3>
                  <p className="landing-paragraph">
                    Only token owners can write in the token communities. Participate and start discovering other
                    tokens.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={buildThird} style={{ width: '209px', height: 'auto', marginTop: '30px' }} />
                  </figure>
                  <h3>Earn ETH</h3>
                  <p className="landing-paragraph">
                    Grow your influence. Receive rewards from your supporters in exchange for visible space on your
                    profile.
                  </p>
                </div>
              </div>
              <div className="landing-testimonial">
                <Link to="/0x9093428aa6266d589b866ac2956e328ab9039bee">
                  <figure className="landing-testimonial-profile">
                    <img src="" />
                  </figure>
                </Link>
                <p className="landing-testimonial-paragraph">
                  “I finally see all the trades of the guy recommending me trades.“
                </p>
                <p className="author">
                  <Link to="/0x9093428aa6266d589b866ac2956e328ab9039bee">0x90934...39bee</Link>, Address
                </p>
              </div>
            </div>
          </section>

          <section className="section has-text-centered">
            <div className="container">
              <div className="landing-section-introduction">
                <h2>Social platform that works for you.</h2>
                <Link className="landing-button" to="/">
                  Start posting
                </Link>
              </div>
              <div className="columns is-multiline">
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersSixth} style={{ width: '340px', height: 'auto', marginTop: '30px' }} />
                  </figure>
                  <h3>Transparent</h3>
                  <p className="landing-paragraph">
                    Get valuable insight. Always know what are the motivations behind opinions. See tokens of the people
                    you talk with.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersFirst} style={{ width: '338px', height: 'auto', marginTop: '30px' }} />
                  </figure>
                  <h3>Trustful</h3>
                  <p className="landing-paragraph">
                    Social feeds with access controlled by tokens. No spam, no trolls, no impersonations.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={UserSecond} style={{ width: '340px', height: 'auto', marginTop: '30px' }} />
                  </figure>
                  <h3>Rewarding</h3>
                  <p className="landing-paragraph">
                    Every profile can receive ETH from supporters. Accept donations or offer services assigned to your
                    character.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={UsersNew} style={{ width: '350px', height: 'auto', marginTop: '90px' }} />
                  </figure>
                  <h3>Endless</h3>
                  <p className="landing-paragraph">
                    Find thriving communities and get in early. Coordinate your efforts and grow the economy.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={UserConnected} style={{ width: '340px', height: 'auto', marginTop: '30px' }} />
                  </figure>
                  <h3>Connected</h3>
                  <p className="landing-paragraph">
                    Speak for your community anywhere you want. Connect your social media accounts and link back to your
                    profile.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={UserTransferable} style={{ width: '340px', height: 'auto', marginTop: '30px' }} />
                  </figure>
                  <h3>Transferable</h3>
                  <p className="landing-paragraph">
                    Grow value of your character. Become an influencer and sell your character to receive more Ethereum.
                  </p>
                </div>
              </div>
            </div>
            <div className="landing-testimonial">
              <Link to="/ethereum:0xd4202b234c15255bf0511d3380e83bda9172a72b:78">
                <figure className="landing-testimonial-profile" id="cryptocow" />
              </Link>
              <p className="landing-testimonial-paragraph">“seems like an easy way to get more ethereum :}“</p>
              <p className="author">
                <Link to="/ethereum:0xd4202b234c15255bf0511d3380e83bda9172a72b:78">CryptoCow #78</Link>, Cryptocow
              </p>
            </div>
          </section>

          <section className="section has-text-centered" style={{ borderBottom: 'none' }}>
            <div className="container">
              <div className="landing-section-introduction">
                <h2>Your economic friends are here.</h2>
                <p className="subtitle">
                  More than <span style={{ fontWeight: '600' }}>forty</span> communities accessible through every
                  Ethereum provider.
                </p>
              </div>
              <div className="columns">
                <div className="column is-twelve">
                  <figure className="landing-feature landing-ending" id="usershere">
                    <Link to="/" className="landing-button" id="landing-button-big">
                      Hop inside
                    </Link>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          <footer className="landing-footer">
            <div className="container">
              <div className="columns" style={{ marginBottom: '90px' }}>
                <div className="column has-text-centered">
                  <h3>Stay in touch</h3>
                  <p className="landing-paragraph" style={{ paddingBottom: '0' }}>
                    We are also using the channels you're used to. Dont be a stranger and join the conversation.
                  </p>
                  <a
                    href="https://twitter.com/tokntalkclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="landing-footer-intouch"
                  >
                    <img src={twitterColor} />
                    <span>Twitter</span>
                  </a>
                  <Link to="/" className="landing-footer-intouch">
                    <img src={tokntalkColor} />
                    <span>Tok'n'talk</span>
                  </Link>
                  <a href="https://t.me/joinchat/Ff2fyUYwRF7m3Vxew5UxnA" className="landing-footer-intouch">
                    <img src={telegramColor} />
                    <span>Telegram</span>
                  </a>
                </div>
                <div className="column has-text-centered">
                  <h3>Behind the scenes</h3>
                  <p className="landing-paragraph" style={{ paddingBottom: '0' }}>
                    Find out more about our bigger vision and read what we think about attention economy.
                  </p>
                  <a href="" className="landing-footer-intouch">
                    <img src={medium} style={{ marginBottom: '-4px' }} />
                    <span>Medium</span>
                  </a>
                </div>
              </div>
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

export default Landing;
