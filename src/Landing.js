import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './css/landing.css';
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

import realityFirst from './img/landing/reality-1.png';
import realitySecond from './img/landing/reality-2.png';
import realityThird from './img/landing/reality-3.png';

import communityFirst from './img/landing/community-1.png';
import communitySecond from './img/landing/community-2.png';
import communityThird from './img/landing/community-3.png';

import influenceFirst from './img/landing/influence-1.png';
import influenceSecond from './img/landing/influence-2.png';
import influenceThird from './img/landing/influence-3.png';

import buildFirst from './img/landing/build-1.png';
import buildSecond from './img/landing/build-2.png';
import buildThird from './img/landing/build-3.png';
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
    // window.
    this.setState({ showVideo: true });
  };

  render() {
    const { showVideo } = this.state;
    return (
      <React.Fragment>
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
              </div>
              <button className="landing-modal-content-close">
                <img src={exitBig} onClick={this.exitVideo} style={{ cursor: 'pointer' }} />
              </button>
            </div>
          )}

          <div className="container">
            <nav className="level landing-header">
              <div className="level-left">
                <div className="level-item">
                  <Link to="/about" style={{ display: 'flex' }}>
                    <Logo />
                    <p className="landing-logo-typo">Tok'n'talk</p>
                  </Link>
                </div>
              </div>
              <div className="level-right">
                <Link to="/communities" className="level-item landing-header-link">
                  Communities
                </Link>
                <Link to="/owners" className="level-item landing-header-link">
                  Token Owners
                </Link>
                <Link to="/" className="level-item landing-header-link landing-header-link-button">
                  <span>Hop inside</span>
                  <img src={arrowRight} id="landing-header-arrow" />
                </Link>
              </div>
            </nav>
          </div>

          <section
            className="section has-text-centered landing-hero landing-hero-main"
            style={{ borderBottom: 'none' }}
            id="first-section"
          >
            <div className="container">
              <p className="subtitle" style={{ color: '#848DA5' }}>
                Social platform for
              </p>
              <h1 className="title">Tokens</h1>
              <p className="subtitle">
                Explore token oriented communities. Grow your characters and earn rewards from your supporters.
              </p>
              <Link className="landing-link" to="/">
                <span className="landing-link-inside">Start exploring</span>
              </Link>
            </div>
          </section>

          <section
            className="section has-text-centered"
            style={{
              background: 'radial-gradient(at center center, rgb(198, 191, 224) 0%, rgb(255, 255, 255) 70%)',
              marginTop: '0',
              borderBottom: 'none',
            }}
          >
            <div className="container">
              <figure className="landing-video">
                <a className="landing-player" onClick={this.playVideo} style={{ cursor: 'pointer' }}>
                  <img alt="" src={buttonPlay} style={{ marginRight: '-2px', marginTop: '5px' }} />
                </a>
                <div className="landing-video-overlay" />
              </figure>
              <p style={{ fontSize: '20px', color: '#848DA5' }}>35s Introduction</p>
            </div>
          </section>

          <section className="section has-text-centered">
            <div className="container">
              <div className="landing-section-introduction">
                <h2>Explore the reality from many angles.</h2>
                <p className="subtitle">Discover messages from token holders for token holders.</p>
                <Link className="landing-link" to="/">
                  <span className="landing-link-inside">Start exploring</span>
                </Link>
              </div>
              <div className="columns">
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={realityFirst} style={{ width: '585px', height: 'auto' }} />
                  </figure>
                  <h3>Yours</h3>
                  <p className="landing-paragraph">
                    Act as any Non Fungible Token{' '}
                    <span style={{ fontSize: '16px', color: '#848DA5', fontWeight: '700' }}>ERC721</span> or an
                    (0x)Address. Switch between personalities and grow your characters.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={realitySecond} style={{ width: '402px', height: 'auto' }} />
                  </figure>
                  <h3>Transparent</h3>
                  <p className="landing-paragraph">
                    Look at news from many perspectives. <br />
                    Get valuable insight and know motivations behind opinions.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={realityThird} style={{ width: '411px', height: 'auto', marginTop: '100px' }} />
                  </figure>
                  <h3>Controllable</h3>
                  <p className="landing-paragraph">
                    Use your holdings as filters. Display only messages coming from your networks or wander around.
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
                <h2>Grow community around your token.</h2>
                <p className="subtitle">Use existing tokens or create a new one and talk in the trusted environment.</p>
                <Link className="landing-link" to="/discover">
                  <span className="landing-link-inside">Your clubs</span>
                </Link>
                <Link className="landing-link" to="/communities" style={{ marginLeft: '30px' }}>
                  <span className="landing-link-inside">Add your token</span>
                </Link>
              </div>
              <div className="columns">
                <div className="column is-one-third">
                  <figure className="landing-feature blue">
                    <img src={communityFirst} style={{ width: '402px', height: 'auto' }} />
                  </figure>
                  <h3>Instant</h3>
                  <p className="landing-paragraph">
                    Discovery platform for your project from the moment you release your token. <br />
                    Click.
                    <br />
                    You have Social Network.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature blue">
                    <img src={communitySecond} style={{ width: '403px', height: 'auto' }} />
                  </figure>
                  <h3>Trusted</h3>
                  <p className="landing-paragraph">
                    Social feeds with access controlled by tokens. No spam, no trolls, no impersonations.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature blue">
                    <img src={communityThird} style={{ width: '402px', height: 'auto' }} />
                  </figure>
                  <h3>For you</h3>
                  <p className="landing-paragraph">
                    Get to know people, discuss next features, coordinate your efforts. Talk about future of your
                    project.
                  </p>
                </div>
              </div>
              <div className="landing-testimonial">
                <Link to="/ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:680314">
                  <figure className="landing-testimonial-profile" id="falafel" />
                </Link>
                <p className="landing-testimonial-paragraph">
                  “Crypto is tough. Everyone thinks I’m cheating, deleting tweets and playing double game. Now everyone
                  sees my transactions.“
                </p>
                <p className="author">
                  <Link to="/ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:680314">Falafel</Link>, Cryptokitty
                </p>
              </div>
            </div>
          </section>

          <section className="section has-text-centered">
            <div className="container">
              <div className="landing-section-introduction">
                <h2>Get rewards from your supporters.</h2>
                <p className="subtitle">Act according to your beliefs. Grow your community. Be a leader!</p>
                <Link className="landing-link" to="/owners">
                  <span className="landing-link-inside">Learn how to start</span>
                </Link>
              </div>
              <div className="columns">
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={influenceFirst} style={{ width: '399px', height: 'auto' }} />
                  </figure>
                  <h3>Any token</h3>
                  <p className="landing-paragraph">Accept any token from your supporters instantly.</p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={influenceSecond} style={{ width: '402px', height: 'auto' }} />
                  </figure>
                  <h3>Transferable </h3>
                  <p className="landing-paragraph">
                    Pass on your characters when you want to go do something else (and get paid in the process). Don't
                    let your efforts go to waste.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={influenceThird} id="landing-yourtoken" />
                  </figure>
                  <h3>Your token</h3>
                  <p className="landing-paragraph">Create your own token and grow your own economy. </p>
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

          <section className="section has-text-centered">
            <div className="container">
              <div className="landing-section-introduction">
                <h2>Unbundle your creativity.</h2>
                <p className="subtitle">Create a custom functionality for your tokens.</p>
                <a className="landing-link" href="https://github.com/CryptoVerseCC/tokntalk">
                  <span className="landing-link-inside">See on Github</span>
                </a>
              </div>
              <div className="columns">
                <div className="column is-one-third">
                  <figure className="landing-feature yellow">
                    <img src={buildFirst} style={{ width: '340px', height: 'auto', marginTop: '30px' }} />
                  </figure>
                  <h3>Token</h3>
                  <p className="landing-paragraph">
                    Implement token-specific functionality and grow value of your community.{' '}
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature yellow">
                    <img src={buildSecond} style={{ width: '338px', height: 'auto', marginTop: '30px' }} />
                  </figure>
                  <h3>Platform</h3>
                  <p className="landing-paragraph">
                    Create a platform-specific functionality and easily monetize your work.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature yellow">
                    <img src={buildThird} style={{ width: '209px', height: 'auto', marginTop: '30px' }} />
                  </figure>
                  <h3>Multi-chain</h3>
                  <p className="landing-paragraph">
                    Live on Ethereum Mainnet, Kovan, Ropsten. Multiple storage systems available.
                  </p>
                </div>
              </div>
            </div>
            <div className="landing-testimonial">
              <Link to="/ethereum:0x79986af15539de2db9a5086382daeda917a9cf0c:2357">
                <figure className="landing-testimonial-profile" id="cryptovoxel" />
              </Link>
              <p className="landing-testimonial-paragraph">
                “Imagine watching this feed in VR and sending messages to nearby players!“
              </p>
              <p className="author">
                <Link to="/ethereum:0x79986af15539de2db9a5086382daeda917a9cf0c:2357">36 Math Throughway</Link>,
                Cryptovoxel
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
                <Link className="landing-link" to="/">
                  <span className="landing-link-inside">Say hello</span>
                </Link>
              </div>
              <div className="columns">
                <div className="column is-twelve">
                  <figure className="landing-feature landing-ending" id="hopinside">
                    <Link to="/" className="landing-button">
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
                  <p className="landing-paragraph">
                    We are also using the channels you're used to. Dont be a stranger and join the conversation.
                  </p>
                  <a href="https://twitter.com/tokntalkclub" target="_blank" className="landing-footer-intouch">
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
                  <p className="landing-paragraph">
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
                    <Link to="/communities">Communities</Link>
                    <Link to="/owners">Owners</Link>
                    <a
                      href="https://drive.google.com/drive/u/1/folders/1hGOq4bEI2lIf5qZr90XQQdG-N0wLZIGK"
                      target="_blank"
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
      </React.Fragment>
    );
  }
}

export default Landing;
