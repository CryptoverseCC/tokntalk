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

      <div class="container">
        <section class="section has-text-centered landing-hero">
          <p class="subtitle" style={{ color: '#848DA5' }}>
            Social platform for
          </p>
          <h1 class="title">Tokens</h1>
          <p class="subtitle">
            Explore token - oriented communities. Grow your influence and earn tokens in the trusted environment.
          </p>
          <a class="landing-link" href="#">
            <span class="landing-link-inside">Explore</span>
          </a>
        </section>
      </div>

      <section
        class="section has-text-centered"
        style={{
          background: 'radial-gradient(at center center, rgb(198, 191, 224) 0%, rgb(255, 255, 255) 70%)',
          marginTop: '0',
        }}
      >
        <div class="container">
          <figure class="landing-video">
            <a href="#" class="landing-player">
              <img alt="" src={buttonPlay} style={{ marginRight: '-2px', marginTop: '5px' }} />
            </a>
            <div class="landing-video-overlay" />
          </figure>
        </div>
      </section>

      <section class="section has-text-centered">
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Explore the reality from many angles.</h2>
            <p class="subtitle">Discover messages from token holders for token holders.</p>
            <a class="landing-link" href="#">
              <span class="landing-link-inside">Start exploring</span>
            </a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Yours</h3>
              <p class="landing-paragraph">
                Act as any Non Fungible Token{' '}
                <span style={{ fontSize: '16px', color: '#848DA5', fontWeight: '700' }}>ERC721</span> or an address.
                Switch between personalities and grow your characters.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Transparent</h3>
              <p class="landing-paragraph">
                Look at news from many perspectives. <br />
                Get valuable insight and know motivations behind opinions.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Safe</h3>
              <p class="landing-paragraph">
                Use your holdings as filters. Display only messages coming from your networks or wander around.
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
            <h2>Grow community around your token.</h2>
            <p class="subtitle">Use existing or create a new one and talk in the trusted environment.</p>
            <a class="landing-link" href="https://tokntalk.club/discover">
              <span class="landing-link-inside">Your clubs</span>
            </a>
            <a class="landing-link" href="#" style={{ marginLeft: '30px' }}>
              <span class="landing-link-inside">Add your token</span>
            </a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Instant</h3>
              <p class="landing-paragraph">
                Discovery for your project from the moment of a token release. Click. Social Network.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Trusted</h3>
              <p class="landing-paragraph">
                Secure social feeds with access controlled by tokens. No spam, no trolls, no impersonations.
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>For you</h3>
              <p class="landing-paragraph">
                Discuss next features, coordinate your efforts. Talk about future of your project.
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

      <section class="section has-text-centered">
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Get paid for your influence.</h2>
            <p class="subtitle">Grow influence of your avatar. Let people support you.</p>
            <a class="landing-link" href="#">
              <span class="landing-link-inside">Learn how to earn</span>
            </a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Any token</h3>
              <p class="landing-paragraph">Accept tokens for an advertisement on your profile out of the box.</p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Influential</h3>
              <p class="landing-paragraph">
                How much would you pay for a celebrity Cryptokitty that ends up on the front page of your favorite
                magazine?
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Your token</h3>
              <p class="landing-paragraph">Create your own token and grow your own economy. </p>
            </div>
          </div>
        </div>
        <div class="landing-testimonial">
          <figure class="landing-testimonial-profile">
            <img src="" />
          </figure>
          <p class="landing-testimonial-paragraph">Something awesome</p>
          <p class="author">Kitty</p>
        </div>
      </section>

      <section class="section has-text-centered">
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Unbundle your creativity.</h2>
            <p class="subtitle">Create a custom functionality for your token or the platform.</p>
            <a class="landing-link" href="https://github.com/CryptoVerseCC/tokntalk">
              <span class="landing-link-inside">See on Github</span>
            </a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Token</h3>
              <p class="landing-paragraph">
                Implement token - specific functionality and grow value of your community.{' '}
              </p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Platform</h3>
              <p class="landing-paragraph">Create a platform - specific functionality and easily monetize your work.</p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Multi-chain</h3>
              <p class="landing-paragraph">
                Live on Ethereum Mainnet, Kovan, Ropsten. Multiple storage systems available.
              </p>
            </div>
          </div>
        </div>
        <div class="landing-testimonial">
          <figure class="landing-testimonial-profile">
            <img src="" />
          </figure>
          <p class="landing-testimonial-paragraph">LMAO DANCING KITTY</p>
          <p class="author">Kitty</p>
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
              <a href="" class="landing-footer-intouch">
                <img src={twitterColor} />
                <span>Twitter</span>
              </a>
              <a href="" class="landing-footer-intouch">
                <img src={tokntalkColor} />
                <span>Tok n talk</span>
              </a>
              <a href="" class="landing-footer-intouch">
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
              <a href="">
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
