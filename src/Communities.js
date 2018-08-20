import React from 'react';
import { Link } from 'react-router-dom';

import { Intercom } from './Intercom';
import css from './css/landing.css';
import styled from 'styled-components';
import Logo from './Logo';
import buttonPlay from './img/landing/button-play.svg';
import twitter from './img/landing/twitter.svg';
import tokntalk from './img/landing/tokntalk.svg';
import tokntalkGrey from './img/landing/tokntalk-grey.svg';
import telegram from './img/landing/telegram.svg';
import github from './img/landing/github.svg';
import medium from './img/landing/medium.svg';
import telegramColor from './img/landing/telegram-color.svg';
import twitterColor from './img/landing/twitter-color.svg';
import tokntalkColor from './img/landing/tokntalk-color.svg';
import arrowUp from './img/landing/round-up.svg';
import arrowRight from './img/landing/tail-right.svg';

import stairsHero from './img/landing/stairs.png';

import economyFirst from './img/landing/economy-1.png';
import economySecond from './img/landing/economy-2.png';
import economyThird from './img/landing/economy-3.png';

import knowFirst from './img/landing/know-1.png';
import knowSecond from './img/landing/know-2.png';
import knowThird from './img/landing/know-3.png';

const Landing = styled((props) => (
  <React.Fragment>
    <div className="wrapper-landing">
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
        className="section has-text-centered landing-hero landing-hero-communities"
        style={{ borderBottom: 'none' }}
        id="first-section"
      >
        <div className="container">
          <h1 className="title">Boost</h1>
          <p className="subtitle" style={{ maxWidth: '650px' }}>
            Know more about your community and start accepting payments in your native currency.
          </p>
          <img src={stairsHero} style={{ width: '850px', height: 'auto' }} id="landing-stairs" />
        </div>
      </section>

      <section className="section has-text-centered" style={{ marginTop: '0' }}>
        <div className="container">
          <div className="landing-section-introduction">
            <h2>Better economy.</h2>
            <p className="subtitle">Let your project be discovered by other communities. Grow your economy.</p>
            <Intercom className="landing-link">
              <span className="landing-link-inside">Add a token</span>
            </Intercom>
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <figure className="landing-feature pink">
                <img src={economyFirst} style={{ width: '432px', height: 'auto' }} />
              </figure>
              <h3>Discoverability</h3>
              <p className="landing-paragraph">
                Distribute your tokens more easily. Take care of your community and your community will take care of
                you.
              </p>
            </div>
            <div className="column is-one-third">
              <figure className="landing-feature pink">
                <img src={economySecond} style={{ width: '399px', height: 'auto' }} />
              </figure>
              <h3>Extra income</h3>
              <p className="landing-paragraph">Accept Ether or your own ERC20 token from your supporters.</p>
            </div>
            <div className="column is-one-third">
              <figure className="landing-feature pink">
                <img src={economyThird} style={{ width: '402px', height: 'auto', marginTop: '100px' }} />
              </figure>
              <h3>For your users</h3>
              <p className="landing-paragraph">
                Let your crowd track latest news in your project in a verifiable way from the moment you release your
                token.
              </p>
            </div>
          </div>
          <div className="landing-testimonial">
            <a href="https://tokntalk.club/0x9cd16ab977d72bae1385d0fb98114245004c106e">
              <figure className="landing-testimonial-profile" id="addressICO" />
            </a>
            <p className="landing-testimonial-paragraph">
              “I have a little ICO in plans and it seems like a good channel to get in touch with my users.“
            </p>
            <p className="author">
              <a href="https://tokntalk.club/0x9cd16ab977d72bae1385d0fb98114245004c106e">0x9cd16...c106e</a>, Address
            </p>
          </div>
        </div>
      </section>

      <section className="section has-text-centered">
        <div className="container">
          <div className="landing-section-introduction">
            <h2>Get to know your community.</h2>
            <p className="subtitle">
              Messages coming only from your token holders. No spam, no trolls, no impersonations.
            </p>
            <Intercom className="landing-link">
              <span className="landing-link-inside">Add a token</span>
            </Intercom>
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <figure className="landing-feature blue">
                <img src={knowFirst} style={{ width: '402px', height: 'auto' }} />
              </figure>
              <h3>Know</h3>
              <p className="landing-paragraph">
                See holdings and your users’ activity. Find out about your competition and related tokens.
              </p>
            </div>
            <div className="column is-one-third">
              <figure className="landing-feature blue">
                <img src={knowSecond} style={{ width: '402px', height: 'auto' }} />
              </figure>
              <h3>Learn</h3>
              <p className="landing-paragraph">
                Learn from their discussions or ask them questions. You can be sure that your users have ‘skin in the
                game’.
              </p>
            </div>
            <div className="column is-one-third">
              <figure className="landing-feature blue">
                <img src={knowThird} style={{ width: '402px', height: 'auto' }} />
              </figure>
              <h3>Improve</h3>
              <p className="landing-paragraph">
                Receive feedback from valuable, verified members of your community and improve your product.
              </p>
            </div>
          </div>
          <div className="landing-testimonial">
            <a href="https://tokntalk.club/ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:128">
              <figure className="landing-testimonial-profile" id="furlin" />
            </a>
            <p className="landing-testimonial-paragraph">“now i understand“</p>
            <p className="author">
              <a href="https://tokntalk.club/ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:680314">Furlin</a>,
              Cryptokitty
            </p>
          </div>
        </div>
      </section>

      <section className="section has-text-centered" style={{ borderBottom: 'none' }}>
        <div className="container">
          <div className="landing-section-introduction">
            <h2>Your crowd is already here.</h2>
            <p className="subtitle">Every token holder is a user.</p>
            <a className="landing-link" href="/">
              <span className="landing-link-inside">Add your token</span>
            </a>
          </div>
          <div className="columns">
            <div className="column is-twelve">
              <figure className="landing-feature landing-ending" id="usershere">
                <Link to="/" className="landing-button">
                  Say Hello
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
              <a href="http://tokntalk.club/" className="landing-footer-intouch">
                <img src={tokntalkColor} />
                <span>Tok n talk</span>
              </a>
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
))`
  ${css};
`;

export default Landing;
