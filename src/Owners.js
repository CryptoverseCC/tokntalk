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
import arrowRight from './img/landing/tail-right.svg';

import tokenJap from './img/landing/token-jap.png';
import tokenPineapple from './img/landing/token-pineapple.png';
import tokenEth from './img/landing/token-eth.png';
import tokenSpline from './img/landing/token-spline.png';
import tokenSmile from './img/landing/token-smile.png';

import reputationFirst from './img/landing/reputation-1.png';
import reputationSecond from './img/landing/reputation-2.png';
import reputationThird from './img/landing/reputation-3.png';

import supportersFirst from './img/landing/supporters-1.png';
import supportersSecond from './img/landing/supporters-2.png';
import supportersThird from './img/landing/supporters-3.png';

const Landing = styled((props) => (
  <React.Fragment>
    <div class="wrapper-landing">
      <div class="container">
        <nav class="level landing-header">
          <div class="level-left">
            <div class="level-item">
              <a href="/landing" style={{ display: 'flex' }}>
                <Logo />
                <p style={{ display: 'inline-block', marginTop: '10px' }} class="landing-logo-typo">
                  Tok'n'talk
                </p>
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
              <span>Go to app</span>
              <img src={arrowRight} id="landing-header-arrow" />
            </a>
          </div>
        </nav>
      </div>

      <section
        class="section has-text-centered landing-hero landing-hero-owner"
        style={{ borderBottom: 'none' }}
        id="first-section"
      >
        <div class="container">
          <h1 class="title">Earn</h1>
          <p class="subtitle" style={{ maxWidth: '650px' }}>
            Be a mentor of your community. Share relevant posts and receive Ethereum in return.
          </p>
          <div class="landing-owners-introduction">
            <div class="columns">
              <div class="column">
                <img src={tokenJap} style={{ width: '148px', height: 'auto' }} />
              </div>
              <div class="column">
                <img src={tokenPineapple} style={{ width: '187px', height: 'auto' }} />
              </div>
              <div class="column">
                <img src={tokenEth} style={{ width: '265px', height: 'auto' }} />
              </div>
              <div class="column">
                <img src={tokenSpline} style={{ width: '184px', height: 'auto' }} />
              </div>
              <div class="column">
                <img src={tokenSmile} style={{ width: '168px', height: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section has-text-centered" style={{ marginTop: '0' }}>
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Build your reputation.</h2>
            <p class="subtitle">Every action is permanent. Grow your influence by social activities.</p>
            <a class="landing-link" href="/">
              <span class="landing-link-inside">Start posting</span>
            </a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature blue">
                <img src={reputationFirst} style={{ width: '465px', height: 'auto' }} />
              </figure>
              <h3>Share</h3>
              <p class="landing-paragraph">
                Share helpful information and easily prove your good motivations. Highlight what’s important.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature blue">
                <img src={reputationSecond} style={{ width: '452px', height: 'auto' }} />
              </figure>
              <h3>Represent</h3>
              <p class="landing-paragraph">
                Speak for your community anywhere you want. Connect your social media accounts.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature blue">
                <img src={reputationThird} style={{ width: '465px', height: 'auto', marginTop: '100px' }} />
              </figure>
              <h3>Help</h3>
              <p class="landing-paragraph">
                Be helpful to community members. Guide them and help them make informed decisions.
              </p>
            </div>
          </div>
          <div class="landing-testimonial">
            <a href="https://tokntalk.club/ethereum:0xa6d954d08877f8ce1224f6bfb83484c7d3abf8e9:480">
              <figure class="landing-testimonial-profile" id="ethmoji" />
            </a>
            <p class="landing-testimonial-paragraph">
              “I like to share things that might be helpful to others. People like and support my efforts.”
            </p>
            <p class="author">
              <a href="https://tokntalk.club/ethereum:0xa6d954d08877f8ce1224f6bfb83484c7d3abf8e9:480">#480</a>, Ethmoji
            </p>
          </div>
        </div>
      </section>

      <section class="section has-text-centered">
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Gather supporters.</h2>
            <p class="subtitle">Accept Ethereum or any token as a reward for your hard work.</p>
            <a class="landing-link" href="/">
              <span class="landing-link-inside">Start posting</span>
            </a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature pink">
                <img src={supportersFirst} style={{ width: '399px', height: 'auto' }} />
              </figure>
              <h3>
                <span style={{ fontSize: '30px', letterSpacing: '0.02em', fontWeight: '700' }}>ETH</span> accepted
              </h3>
              <p class="landing-paragraph">
                People can support you through the “Supporters box” visible on your profile. We cut 10% for future
                development.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature pink">
                <img src={supportersSecond} style={{ width: '402px', height: 'auto' }} />
              </figure>
              <h3>Influence</h3>
              <p class="landing-paragraph">
                Grow value of your token by making it more popular. You can trade it with existing crowd.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature pink">
                <img src={supportersThird} style={{ width: '382px', height: 'auto' }} />
              </figure>
              <h3>Together</h3>
              <p class="landing-paragraph">
                Everyone knows about your supporters. Your success is a success of the whole community.
              </p>
            </div>
          </div>
          <div class="landing-testimonial">
            <div id="landing-messageTo">
              <a href="https://tokntalk.club/ethereum:0xf7a6e15dfd5cdd9ef12711bd757a9b6021abf643:5630">
                <figure class="landing-testimonial-profile" id="bot" style={{ display: 'inline-block' }} />
              </a>
              <a
                href="https://tokntalk.club/ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:134330"
                style={{ display: 'inline-block', marginLeft: '40px' }}
              >
                <figure class="landing-testimonial-profile" id="barbossa" />
              </a>
            </div>
            <p class="landing-testimonial-paragraph">
              ““For me, you’re the hero that this community needs. I am happy to support you.“
            </p>
            <p class="author">
              <a href="https://tokntalk.club/ethereum:0xf7a6e15dfd5cdd9ef12711bd757a9b6021abf643:5630">#5630</a>,
              Cryptobot
            </p>
          </div>
        </div>
      </section>

      <section class="section has-text-centered" style={{ borderBottom: 'none' }}>
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Start earning Ethereum!</h2>
            <p class="subtitle">Be the hero this community deserves.</p>
            <a class="landing-link" href="/">
              <span class="landing-link-inside">Start posting</span>
            </a>
          </div>
          <div class="columns">
            <div class="column is-twelve">
              <figure class="landing-feature landing-ending" id="startearning">
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
