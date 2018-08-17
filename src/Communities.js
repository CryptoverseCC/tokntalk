import React, { Component } from 'react';
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

import stairsHero from './img/landing/stairs.png';

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

const { NODE_ENV, REACT_APP_INTERCOM_APP_ID } = process.env;

const Landing = styled((props) => (
  <React.Fragment>
    <div class="wrapper-landing">
      <div class="container">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <Logo />
              <p>Tok talk</p>
            </div>
          </div>
          <div class="level-right">
            <p class="level-item">
              <strong>All</strong>
            </p>
            <p class="level-item">
              <a>Published</a>
            </p>
          </div>
        </nav>
      </div>

      <section
        class="section has-text-centered landing-hero-communities"
        style={{ borderBottom: 'none' }}
        id="first-section"
      >
        <div class="container">
          <p class="subtitle">Your tokens</p>
          <h1 class="title">Boosted</h1>
          <p class="subtitle" style={{ maxWidth: '650px' }}>
            Know more about your community and start accepting payments in your native currency.
          </p>
          <img src={stairsHero} style={{ width: '850px', height: 'auto' }} />
        </div>
      </section>

      <section class="section has-text-centered" style={{ marginTop: '0' }}>
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Better economy.</h2>
            <p class="subtitle">Let your project be discovered by other communities. Receive more tokens.</p>
            <a
              class="landing-link"
              id="userfeeds-crypto-intercom"
              href={`mailto:${REACT_APP_INTERCOM_APP_ID}@intercom-mail.com`}
            >
              <span class="landing-link-inside">Add a token</span>
            </a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature pink">
                <img src={realityFirst} style={{ width: '585px', height: 'auto' }} />
              </figure>
              <h3>Discoverability</h3>
              <p class="landing-paragraph">
                Distribute your tokens more easily. Take care of your community and your community will take care of
                you.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature pink">
                <img src={realitySecond} style={{ width: '402px', height: 'auto' }} />
              </figure>
              <h3>Extra income</h3>
              <p class="landing-paragraph">
                Accept Ethereum or your own ERC20 token for a special place in your community.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature pink">
                <img src={realityThird} style={{ width: '411px', height: 'auto', marginTop: '100px' }} />
              </figure>
              <h3>For your users</h3>
              <p class="landing-paragraph">
                Another use-case for your project. Safe space for your token holders. Your tokens outside your website.
              </p>
            </div>
          </div>
          <div class="landing-testimonial">
            <a href="https://tokntalk.club/0x9093428aa6266d589b866ac2956e328ab9039bee">
              <figure class="landing-testimonial-profile">
                <img src="" />
              </figure>
            </a>
            <p class="landing-testimonial-paragraph">
              “I finally see all the trades of the guy recommending me trades.“
            </p>
            <p class="author">
              <a href="https://tokntalk.club/0x9093428aa6266d589b866ac2956e328ab9039bee">0x90934...39bee</a>, Address
            </p>
          </div>
        </div>
      </section>

      <section class="section has-text-centered">
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Get to know your community.</h2>
            <p class="subtitle">Messages coming only from your token holders. No spam, no trolls, no impersonations.</p>
            <a class="landing-link" href="https://github.com/CryptoVerseCC/tokntalk">
              <span class="landing-link-inside">Add a token</span>
            </a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature blue">
                <img src={communityFirst} style={{ width: '402px', height: 'auto' }} />
              </figure>
              <h3>Know</h3>
              <p class="landing-paragraph">
                See holdings and your users’ activity. Find out about your competition and related tokens.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature blue">
                <img src={communitySecond} style={{ width: '403px', height: 'auto' }} />
              </figure>
              <h3>Learn</h3>
              <p class="landing-paragraph">
                Learn from their discussions and improve your product. You can be sure that this people have ‘skin in
                the game’.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature blue">
                <img src={communityThird} style={{ width: '402px', height: 'auto' }} />
              </figure>
              <h3>Improve</h3>
              <p class="landing-paragraph">
                Be amazed with your community. Your project’s alive. It’s true digital ownership, after all.
              </p>
            </div>
          </div>
          <div class="landing-testimonial">
            <a href="https://tokntalk.club/ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:680314">
              <figure class="landing-testimonial-profile" id="falafel" />
            </a>
            <p class="landing-testimonial-paragraph">
              “Crypto is tough. Everyone thinks I’m cheating, deleting tweets and playing double game. Now everyone sees
              my transactions.“
            </p>
            <p class="author">
              <a href="https://tokntalk.club/ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:680314">Falafel</a>,
              Cryptokitty
            </p>
          </div>
        </div>
      </section>

      <section class="section has-text-centered" style={{ borderBottom: 'none' }}>
        <div class="container">
          <div class="landing-section-introduction">
            <h2>It's for your community.</h2>
            <p class="subtitle">
              More than <span style={{ fontWeight: '600' }}>forty</span> communities accessible through every Ethereum
              provider.
            </p>
          </div>
          <div class="columns">
            <div class="column is-twelve">
              <figure class="landing-feature landing-hopinside">
                <a href="app.html" class="landing-button">
                  Add a token
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
                <a href="communities.html">Communities</a>
                <a href="holders.html">Holders</a>
                <a href="press.html">Press</a>
                <a href="app.html">Hop Inside</a>
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
