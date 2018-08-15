import React, { Component } from 'react';
import css from './css/landing.css';
import styled from 'styled-components';
import Logo from './Logo';

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
          <a class="bump" href="#">
            Explore
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
            <p>kupa</p>
          </figure>
        </div>
      </section>

      <section class="section has-text-centered">
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Explore the reality from many angles.</h2>
            <p class="subtitle">Discover messages from token holders for token holders.</p>
            <a class="landing-button">Start exploring</a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Yours</h3>
              <p>Act as any Non Fungible Token (ERC721) or an address. Switch between personalities.</p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Yours</h3>
              <p>Act as any Non Fungible Token (ERC721) or an address. Switch between personalities.</p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Yours</h3>
              <p>Act as any Non Fungible Token (ERC721) or an address. Switch between personalities.</p>
            </div>
          </div>
          <div class="landing-testimonial">
            <figure class="landing-testimonial-profile">
              <img src="" />
            </figure>
            <p>Something awesome</p>
            <p class="author">Kitty</p>
          </div>
        </div>
      </section>

      <section class="section has-text-centered">
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Explore the reality from many angles.</h2>
            <p class="subtitle">Discover messages from token holders for token holders.</p>
            <a class="landing-button">Start exploring</a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Yours</h3>
              <p>Act as any Non Fungible Token (ERC721) or an address. Switch between personalities.</p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Yours</h3>
              <p>Act as any Non Fungible Token (ERC721) or an address. Switch between personalities.</p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Yours</h3>
              <p>Act as any Non Fungible Token (ERC721) or an address. Switch between personalities.</p>
            </div>
          </div>
          <div class="landing-testimonial">
            <figure class="landing-testimonial-profile">
              <img src="" />
            </figure>
            <p>Something awesome</p>
            <p class="author">Kitty</p>
          </div>
        </div>
      </section>

      <section class="section has-text-centered">
        <div class="container">
          <div class="landing-section-introduction">
            <h2>Explore the reality from many angles.</h2>
            <p class="subtitle">Discover messages from token holders for token holders.</p>
            <a class="landing-button">Start exploring</a>
          </div>
          <div class="columns">
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Yours</h3>
              <p>Act as any Non Fungible Token (ERC721) or an address. Switch between personalities.</p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Yours</h3>
              <p>Act as any Non Fungible Token (ERC721) or an address. Switch between personalities.</p>
            </div>
            <div class="column is-one-third">
              <figure class="landing-feature">
                <img src="" />
              </figure>
              <h3>Yours</h3>
              <p>Act as any Non Fungible Token (ERC721) or an address. Switch between personalities.</p>
            </div>
          </div>
        </div>
        <div class="landing-testimonial">
          <figure class="landing-testimonial-profile">
            <img src="" />
          </figure>
          <p>Something awesome</p>
          <p class="author">Kitty</p>
        </div>
      </section>
    </div>
  </React.Fragment>
))`
  ${css};
`;

export default Landing;
