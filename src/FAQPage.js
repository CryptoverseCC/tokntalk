import React from 'react';
import hypno from './img/hypno.png';
import graph from './img/graph.png';
import barbossa from './img/barbossa.png';
import testnet from './img/testnet.png';

const FAQ = () => {
  return (
    <div>
      <div className="faq">
        <section className="hero hero-faq is-medium">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-offset-1 is-3">
                  <div className="barbossa">
                    <div className="imageContainer">
                      <div className="stroke" />
                      <img className="image" src={hypno} alt="" width="74" height="42" />
                    </div>
                  </div>
                </div>
                <div className="column is-offset-1 is-6">
                  <h1 className="faq-title">FAQ</h1>
                  <h2 className="faq-subtitle">Cpt. Barbossa resolves your doubts</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-faq">
          <div className="container">
            <div className="columns">
              <div className="column is-offset-1 is-3">
                <h2 className="faq-subtitle" style={{ paddingTop: '20px' }}>
                  Getting Started
                </h2>
              </div>
              <div className="column is-offset-1 is-6">
                <div className="toggle">
                  <div className="toggle-title">
                    <h3>
                      <i />
                      <span className="title-name">Installing MetaMask</span>
                    </h3>
                  </div>
                  <div className="toggle-inner">
                    <p>
                      MetaMask is a bridge that allows you to visit the distributed web of tomorrow in your browser
                      today. It is a Chrome extension that lets you to run Ethereum dApps right in your browser without
                      running a full Ethereum node.
                    </p>
                    <p>To install metamask:</p>
                    <ol>
                      <li>
                        Visit <a href="https://metamask.io">metamask.io</a>
                      </li>
                      <li>
                        Click <strong>Get Chrome Extension</strong> You will be redirected to the Chrome webstore
                      </li>
                      <li>
                        Click <strong>Add to Chrome</strong> and accept the associated privacy notice.
                      </li>
                    </ol>
                    <iframe
                      title="Metamask installation"
                      style={{ paddingTop: '2em' }}
                      width="100%"
                      height="400"
                      src="https://www.youtube.com/embed/tfETpi-9ORs"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div className="toggle">
                  <div className="toggle-title">
                    <h3>
                      <i />
                      <span className="title-name">Getting a kittie</span>
                    </h3>
                  </div>
                  <div className="toggle-inner">
                    <p>
                      You need a cat to purr, obviously. You can get one either on the{' '}
                      <a href="https://cryptokitties.co">Cryptokitties site</a>, or at an exchange such as{' '}
                      <a href="https://opensea.io/">OpenSea</a>.
                    </p>
                  </div>
                </div>

                <div className="toggle">
                  <div className="toggle-title">
                    <h3>
                      <i />
                      <span className="title-name">Getting test Ethereum</span>
                    </h3>
                  </div>
                  <div className="toggle-inner">
                    <p>
                      While your cat is stored on the Mainnet, its purrs are stored on an an available test network.
                    </p>
                    <p>To try out purring yourself, use one of the following networks to generate test Ethereum.</p>
                    <h4 className="network-name">
                      Kovan <div className="faq-label">Recommended</div>
                    </h4>
                    <p>
                      <a href="https://gitter.im/kovan-testnet/faucet">Send a message with your address to get 5kETH</a>
                    </p>
                    <h4 className="network-name">Ropsten</h4>
                    <p>
                      <a href="https://faucet.metamask.io/">Metamask faucet</a>
                    </p>
                    <h4 className="network-name">Rinkeby</h4>
                    <p>
                      <a href="https://faucet.rinkeby.io/">Rinkeby Authenticated Faucet</a>
                    </p>
                  </div>
                </div>

                <div class="toggle">
                  <div class="toggle-title">
                    <h3>
                      <i />
                      <span class="title-name">Switch to test net</span>
                    </h3>
                  </div>
                  <div class="toggle-inner">
                    <p>
                      Log in to your MetaMask. In the top left corner, click ‘Main Network’ and in the displayed menu,
                      select Kovan.{' '}
                      <a href="https://blog.userfeeds.io/do-you-own-a-cryptokittie-have-some-keth-858359d2d718">
                        We've sent you some kETH already!
                      </a>
                    </p>
                    <img src={testnet} alt="How to switch network" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-faq">
          <div className="container">
            <div className="columns">
              <div className="column is-offset-1 is-3">
                <h2 className="faq-subtitle" style={{ paddingTop: '20px' }}>
                  Understanding
                </h2>
              </div>
              <div className="column is-offset-1 is-6">
                <div className="toggle">
                  <div className="toggle-title">
                    <h3>
                      <i />
                      <span className="title-name">What are Kitties?</span>
                    </h3>
                  </div>
                  <div className="toggle-inner">
                    <p>
                      We're demonstrating the proof of concept of using non-fungible tokens as new social avatars or
                      even media brands. Once established, these characters can then act as uniquely identifiable and
                      tradable information channels.
                    </p>
                    <p>
                      Each piece of information your kittie delivers, whether its a message or a like or a vote, is
                      called a Purr.
                    </p>
                  </div>
                </div>

                <div className="toggle">
                  <div className="toggle-title">
                    <h3>
                      <i />
                      <span className="title-name">Why would I purr?</span>
                    </h3>
                  </div>
                  <div className="toggle-inner">
                    <p>
                      If you own an ERC721 token, you can increase its value by producing, curating and distributing
                      information via NFT-based channels. As the reputation, credibilty and reach of your character
                      grows, so does its potential marketing value.
                    </p>
                    <p>
                      To read more about how characters can be used to distribute information,{' '}
                      <a
                        style={{ marginTop: '1em' }}
                        href="https://blog.userfeeds.io/giving-cryptokitties-a-voice-fe70215b9c23"
                      >
                        click here
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-faq">
          <div className="container">
            <div className="columns">
              <div className="column is-offset-1 is-3">
                <h2 className="faq-subtitle" style={{ paddingTop: '20px' }}>
                  Earning money
                </h2>
              </div>
              <div className="column is-offset-1 is-6">
                <div className="toggle">
                  <div className="toggle-title">
                    <h3>
                      <i />
                      <span className="title-name">Character Value</span>
                    </h3>
                  </div>
                  <div className="toggle-inner">
                    <p>Grow the value of a character by developing its personality over time.</p>
                    <img style={{ marginTop: '1em' }} src={graph} alt="Graph" />
                    <p>
                      Like any other social media personality, your character's value is derived from the attention it
                      can command on social channels. Valuable characters can then be traded like any other commodity
                    </p>
                  </div>
                </div>

                <div className="toggle">
                  <div className="toggle-title">
                    <h3>
                      <i />
                      <span className="title-name">Distributing Information</span>
                    </h3>
                  </div>
                  <div className="toggle-inner">
                    <img src={barbossa} alt="Barbossa" />
                    <p>
                      Would you pay more for a digital cat that is genetically mediocre but often ends up on the front
                      page of the Wired magazine because of the quality of information they publish?
                    </p>
                    <p>
                      If more people can hear your kittie's messages, then you can demand a higher price per message
                      from sponsored posts. Your kittie's posts can also be valued based on the character's reputation
                      (i.e trust and authenticity) and previous interactions, all of which are traceable through the
                      blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-faq">
          <div className="container">
            <div className="columns">
              <div className="column is-offset-1 is-3">
                <h2 className="faq-subtitle" style={{ paddingTop: '20px' }}>
                  I'm a developer!
                </h2>
              </div>
              <div className="column is-offset-1 is-6">
                <div className="toggle">
                  <div className="toggle-title">
                    <h3>
                      <i />
                      <span className="title-name">I want the same for my ERC721!</span>
                    </h3>
                  </div>
                  <div className="toggle-inner">
                    <p>And we want to help!</p>
                    <p>
                      Cryptopurr is an open source project.{' '}
                      <a href="https://github.com/Userfeeds/cryptopurr">Fork it on Github </a>
                      or contact us on <a href="gitter.im/Userfeeds/">Gitter</a>{' '}
                      <span style={{ color: '#D5D2DE' }}>/</span> <a href="https://t.me/userfeeds">Telegram</a>
                    </p>
                  </div>
                </div>

                <div className="toggle">
                  <div className="toggle-title">
                    <h3>
                      <i />
                      <span className="title-name">I want to include a kitties feed in my dApp</span>
                    </h3>
                  </div>
                  <div className="toggle-inner">
                    <p>
                      We can implement a custom design just for you. Contact us on{' '}
                      <a href="https://gitter.im/Userfeeds/">Gitter</a> <span style={{ color: '#D5D2DE' }}>/</span>{' '}
                      <a href="https://t.me/userfeeds">Telegram</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
