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

import TokenOwnersZero from './img/landing/TokenOwnersZero.png';
import TokenOwnersFirst from './img/landing/TokenOwnersFirst.png';
import TokenOwnersSecond from './img/landing/TokenOwnersSecond.png';
import TokenOwnersThird from './img/landing/TokenOwnersThird.png';
import TokenOwnersFourth from './img/landing/TokenOwnersFourth.png';
import TokenOwnersFifth from './img/landing/TokenOwnersFifth.png';
import TokenOwnersSixth from './img/landing/TokenOwnersSixth.png';
import TokenOwnersSeventh from './img/landing/TokenOwnersSeventh.png';
import TokenOwnersEigth from './img/landing/TokenOwnersEight.png';
import TokenOwnersNinth from './img/landing/TokenOwnersNinth.png';

class Communities extends Component {
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
                <Link to="/about" className="level-item landing-header-link">
                  Owners
                </Link>
                <Link to="/communities" className="level-item landing-header-link landing-header-link-active">
                  Creators
                </Link>
                <Link to="/" className="level-item landing-header-link landing-header-link-button">
                  <span>Hop inside</span>
                  <img src={arrowRight} id="landing-header-arrow" />
                </Link>
              </div>
            </nav>
          </div>

          <section
            className="section landing-hero landing-hero-communities"
            style={{ borderBottom: 'none' }}
            id="first-section"
          >
            <div className="container" style={{ zIndex: '1' }}>
              <div className="columns">
                <div className="column is-6">
                  <h2>
                    Social Network <br />
                    for Your Token
                  </h2>
                  <p className="subtitle-communities" style={{ maxWidth: '520px' }}>
                    Only messages from token owners. No scams. Everything can be verified.
                  </p>
                  <p style={{ fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' }} className="landing-paste">
                    Paste your ERC20 contract address or <Intercom>contact us</Intercom> for ERC721
                  </p>
                  <div className="control">
                    <input
                      className="input is-large"
                      type="email"
                      placeholder="0xAddress"
                      value={this.state.contractAddress}
                      onChange={this.onInputChange}
                    />
                    <a
                      className={`landing-button button-inside-input ${!this.state.isValid ? 'disabled' : ''}`}
                      onClick={this.generateCommunity}
                    >
                      Generate
                    </a>
                  </div>
                  <div className="columns is-mobile landing-sample-communities">
                    <div className="column">
                      <Link to="/clubs/CC" className="landing-sample-community">
                        <p>ERC721</p>
                        <h4>Crystals</h4>
                      </Link>
                    </div>
                    <div className="column">
                      <Link to="/clubs/％">
                        <div className="landing-sample-community">
                          <p>ERC20</p>
                          <h4>Percent</h4>
                        </div>
                      </Link>
                    </div>
                    <div className="column">
                      <div className="landing-sample-community">
                        <Link to="/clubs/MKR">
                          <p>ERC20</p>
                          <h4>MakerDao</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-6 has-text-centered landing-mobile-no">
                  <img src={TokenOwnersZero} style={{ width: '390px', height: 'auto' }} />
                </div>
              </div>
            </div>
            <div className="columns">
              <div id="landing-hero-background" className="column is-5 offset-by-6 pink" />
            </div>
          </section>

          <section className="section has-text-centered" style={{ marginTop: '0' }}>
            <div className="container">
              <div className="columns">
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersFirst} style={{ width: '340px', height: 'auto' }} />
                  </figure>
                  <h3>Token</h3>
                  <p className="landing-paragraph">
                    Only token owners can take part in the discussion. No spam, no trolls. Every user wants the value of
                    the token to grow.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersSecond} style={{ width: '395px', height: 'auto' }} />
                  </figure>
                  <h3>User</h3>
                  <p className="landing-paragraph">
                    Members of your community can be Addresses or Non Fungible Tokens. <br /> No extra accounts needed.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersThird} style={{ width: '340px', height: 'auto' }} />
                  </figure>
                  <h3>Social Network</h3>
                  <p className="landing-paragraph">
                    Start coordinating your token efforts in a verified, trusful way from the moment of the token
                    release.
                  </p>
                </div>
              </div>
              <div className="landing-testimonial">
                <Link to="/0x9cd16ab977d72bae1385d0fb98114245004c106e">
                  <figure className="landing-testimonial-profile" id="addressICO" />
                </Link>
                <p className="landing-testimonial-paragraph">
                  “I have a little ICO in plans and it seems like a good channel to get in touch with my users.“
                </p>
                <p className="author">
                  <Link to="/0x9cd16ab977d72bae1385d0fb98114245004c106e">0x9cd16...c106e</Link>, Address
                </p>
              </div>
            </div>
          </section>

          <section className="section has-text-centered">
            <div className="container">
              <div className="landing-section-introduction">
                <h2>You are in control.</h2>
                <p className="subtitle">
                  Protect your users and let others discover your project. Define the display of the data.
                </p>
                <Intercom className="landing-link">
                  <span className="landing-link-inside">Contact us</span>
                </Intercom>
              </div>
              <div className="columns is-multiline">
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersFourth} style={{ width: '340px', marginTop: '130px', height: 'auto' }} />
                  </figure>
                  <h3>Discoverability</h3>
                  <p className="landing-paragraph">
                    Every message from your token owners can be displayed on many websites. Like the one{' '}
                    <Link to="/">here.</Link>
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersFifth} style={{ width: '340px', height: 'auto' }} />
                  </figure>
                  <h3>Extra income</h3>
                  <p className="landing-paragraph">
                    Receive your own ERC20 token in exchange for a more visible space in your community.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersSixth} style={{ width: '340px', height: 'auto' }} />
                  </figure>
                  <h3>Protected users</h3>
                  <p className="landing-paragraph">
                    Your users can verify that a particular message came from a token owner. No more impersonations and
                    fake accounts.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersSeventh} style={{ width: '340px', height: 'auto' }} />
                  </figure>
                  <h3>Know more</h3>
                  <p className="landing-paragraph">
                    See your users activity on the blockchain. Learn more about their tokens and transactions.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersEigth} style={{ width: '340px', height: 'auto' }} />
                  </figure>
                  <h3>Custom UI</h3>
                  <p className="landing-paragraph">
                    Your own network can look and feel the way you want. Display information in a most suitable form.
                  </p>
                </div>
                <div className="column is-one-third">
                  <figure className="landing-feature pink">
                    <img src={TokenOwnersNinth} style={{ width: '340px', height: 'auto' }} />
                  </figure>
                  <h3>Custom rankings</h3>
                  <p className="landing-paragraph">
                    Use economic data of the user, like transactions and ownership, to determine the position of the
                    posted message in the feed.
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

          <section className="section has-text-centered" style={{ borderBottom: 'none' }}>
            <div className="container">
              <div className="landing-section-introduction">
                <h2>Your crowd is already here.</h2>
                <p className="subtitle">
                  Every token holder is already a user. <br /> No accounts or extra software needed.
                </p>
              </div>
              <div className="columns">
                <div className="column is-twelve">
                  <figure className="landing-feature landing-ending" id="hopinside">
                    <p
                      style={{ fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' }}
                      className="landing-paste"
                    >
                      Paste your ERC20 contract address or <Link to="/">contact us</Link> for ERC721
                    </p>
                    <div className="control">
                      <input
                        className="input is-large"
                        type="email"
                        placeholder="0xAddress"
                        value={this.state.contractAddress}
                        onChange={this.onInputChange}
                      />
                      <a
                        className={`landing-button button-inside-input ${!this.state.isValid ? 'disabled' : ''}`}
                        onClick={this.generateCommunity}
                      >
                        Generate
                      </a>
                    </div>
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
                    rel="noopener noreferrer"
                    target="_blank"
                    className="landing-footer-intouch"
                  >
                    <img src={twitterColor} />
                    <span>Twitter</span>
                  </a>
                  <Link to="/" className="landing-footer-intouch">
                    <img src={tokntalkColor} />
                    <span>Tok n talk</span>
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

export default Communities;
