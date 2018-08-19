import React, { Component } from 'react';

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
    <div class="wrapper-landing">
      <div class="container">
        <nav class="level landing-header">
          <div class="level-left">
            <div class="level-item">
              <a href="/landing" style={{ display: 'flex' }}>
                <Logo />
                <p class="landing-logo-typo">Tok'n'talk</p>
              </a>
            </div>
          </div>
          <div class="level-right">
            <a href="/communities" class="level-item landing-header-link">
              Communities
            </a>
            <a href="/owners" class="level-item landing-header-link">
              Token Owners
            </a>
            <a href="/" class="level-item landing-header-link landing-header-link-button">
              <span>Hop inside</span>
              <img src={arrowRight} id="landing-header-arrow" />
            </a>
          </div>
        </nav>
      </div>

      <section
        class="section has-text-centered landing-hero landing-hero-communities"
        style={{ borderBottom: 'none' }}
        id="first-section"
      >
        <div class="container">
          <h1 class="title">Boost</h1>
          <p class="subtitle" style={{ maxWidth: '650px' }}>
            Know more about your community and start accepting payments in your native currency.
          </p>
          <img src={stairsHero} style={{ width: '850px', height: 'auto' }} id="landing-stairs" />
        </div>
      </section>

      <section class="section has-text-centered" style={{ marginTop: '0' }}>
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Better economy.</h2>
            <p class="subtitle">Let your project be discovered by other communities. Receive more tokens.</p>
            <Intercom className="landing-link">
              <span class="landing-link-inside">Add a token</span>
            </Intercom>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature pink">
                <img src={economyFirst} style={{ width: '432px', height: 'auto' }} />
              </figure>
              <h3>Discoverability</h3>
              <p class="landing-paragraph">
                Distribute your tokens more easily. Take care of your community and your community will take care of
                you.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature pink">
                <img src={economySecond} style={{ width: '399px', height: 'auto' }} />
              </figure>
              <h3>Extra income</h3>
              <p class="landing-paragraph">
                Accept Ethereum or your own ERC20 token for a special place in your community.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature pink">
                <img src={economyThird} style={{ width: '402px', height: 'auto', marginTop: '100px' }} />
              </figure>
              <h3>For your users</h3>
              <p class="landing-paragraph">
                Communicate with your token holders in a secure, verified way from the moment of the token release.
              </p>
            </div>
          </div>
          <div class="landing-testimonial">
            <a href="https://tokntalk.club/0x9cd16ab977d72bae1385d0fb98114245004c106e">
              <figure class="landing-testimonial-profile" id="addressICO" />
            </a>
            <p class="landing-testimonial-paragraph">
              “I have a little ICO in plans and it seems like a good channel to communicate with my users.“
            </p>
            <p class="author">
              <a href="https://tokntalk.club/0x9cd16ab977d72bae1385d0fb98114245004c106e">0x9cd16...c106e</a>, Address
            </p>
          </div>
        </div>
      </section>

      <section class="section has-text-centered">
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Get to know your community.</h2>
            <p class="subtitle">Messages coming only from your token holders. No spam, no trolls, no impersonations.</p>
            <Intercom className="landing-link">
              <span class="landing-link-inside">Add a token</span>
            </Intercom>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature blue">
                <img src={knowFirst} style={{ width: '402px', height: 'auto' }} />
              </figure>
              <h3>Know</h3>
              <p class="landing-paragraph">
                See holdings and your users’ activity. Find out about your competition and related tokens.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature blue">
                <img src={knowSecond} style={{ width: '402px', height: 'auto' }} />
              </figure>
              <h3>Learn</h3>
              <p class="landing-paragraph">
                Learn from their discussions and improve your product. You can be sure that your users have ‘skin in the
                game’.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature blue">
                <img src={knowThird} style={{ width: '402px', height: 'auto' }} />
              </figure>
              <h3>Improve</h3>
              <p class="landing-paragraph">
                Receive feedback from valuable, verified members of your community and improve your product.
              </p>
            </div>
          </div>
          <div class="landing-testimonial">
            <a href="https://tokntalk.club/ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:128">
              <figure class="landing-testimonial-profile" id="furlin" />
            </a>
            <p class="landing-testimonial-paragraph">“now i understand“</p>
            <p class="author">
              <a href="https://tokntalk.club/ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:680314">Furlin</a>,
              Cryptokitty
            </p>
          </div>
        </div>
      </section>

      <section class="section has-text-centered" style={{ borderBottom: 'none' }}>
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Your crowd is already here.</h2>
            <p class="subtitle">Every token holder is a user.</p>
            <a class="landing-link" href="/">
              <span class="landing-link-inside">Add your token</span>
            </a>
          </div>
          <div class="columns">
            <div class="column is-twelve">
              <figure class="landing-feature landing-ending" id="usershere">
                <a href="/" class="landing-button">
                  Say Hello
                </a>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <footer class="landing-footer">
        <div class="container">
          <div class="columns" style={{ marginBottom: '90px' }}>
            <div class="column has-text-centered">
              <h3>Stay in touch</h3>
              <p class="landing-paragraph">
                We are also using the channels you're used to. Dont be a stranger and join the conversation.
              </p>
              <a href="https://twitter.com/tokntalkclub" target="_blank" class="landing-footer-intouch">
                <img src={twitterColor} />
                <span>Twitter</span>
              </a>
              <a href="http://tokntalk.club/" class="landing-footer-intouch">
                <img src={tokntalkColor} />
                <span>Tok n talk</span>
              </a>
              <a href="https://t.me/joinchat/Ff2fyUYwRF7m3Vxew5UxnA" class="landing-footer-intouch">
                <img src={telegramColor} />
                <span>Telegram</span>
              </a>
            </div>
            <div class="column has-text-centered">
              <h3>Behind the scenes</h3>
              <p class="landing-paragraph">
                Find out more about our bigger vision and read what we think about attention economy.
              </p>
              <a href="" class="landing-footer-intouch">
                <img src={medium} style={{ marginBottom: '-4px' }} />
                <span>Medium</span>
              </a>
            </div>
          </div>
          <div class="columns has-text-centered">
            <div class="column">
              <a href="#first-section" class="landing-goup">
                <img src={arrowUp} id="arrowup" />
                <img src={tokntalkGrey} />
              </a>
              <div class="landing-footer-navigation">
                <a href="/communities">Communities</a>
                <a href="/owners">Owners</a>
                <a href="/">Hop Inside</a>
              </div>
              <div class="landing-footer-social">
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
