import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import kitty1 from './img/1.png';
import kitty2 from './img/2.png';
import kitty3 from './img/3.png';
import arrow from './img/arrow.svg';
import kitten from './img/kitten.svg';
import metamask from './img/metamask.png';

const myCats = [{ sequence: 4784520, token: '341605' }, { sequence: 4784503, token: '347851' }];
const purrs = [
  {
    author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
    created_at: 1520425637000,
    id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
    message: "I'm supercat! (true story)",
    sequence: 5212559,
    token_id: '341605',
    family: 'ethereum'
  },
  {
    author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
    created_at: 1520425637000,
    id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
    message: "I'm supercat! (true story)",
    sequence: 5212559,
    token_id: '341603',
    family: 'ethereum'
  },
  {
    author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
    created_at: 1520425637000,
    id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
    message: "I'm supercat! (true story)",
    sequence: 5212559,
    token_id: '341605',
    family: 'ethereum'
  }
];

class PurrForm extends Component {
  state = {
    purr: undefined
  };
  render() {
    return (
      <div className="purr--form">
        <form>
          <div className="group">
            <input
              className={this.state.purr ? 'filled' : 'empty'}
              type="text"
              value={this.state.purr}
              onChange={e => this.setState({ purr: e.target.value })}
            />
            <span className="highlight" />
            <span className="bar" />
            <label className="txtwav bounce">
              <SplitString>Purr about cat problems!</SplitString>
            </label>
          </div>
          <div className={this.state.purr ? '' : 'hidden'}>
            <a className="button purrit">
              <img alt="MetaMask" style={{ width: '22px', marginRight: '20px', height: 'auto' }} src={metamask} />Purr
              it!
            </a>
          </div>
        </form>
      </div>
    );
  }
}

const SplitString = ({ children: string }) =>
  string.split('').map((letter, index) => (letter === ' ' ? ' ' : <span key={index}>{letter}</span>));

const Purr = ({ message, date }) => (
  <div className="purr" style={{ display: 'flex', alignItems: 'center' }}>
    <h3 className="purr--message">{message}</h3>
    <span className="purr--date">{date}</span>
  </div>
);

const PurrGroup = ({ catId, img, children }) => (
  <div className="columns link-group">
    <div className="kitten column is-3 has-text-centered">
      <Link to={`${catId}`}>
        <img style={{ width: '50px', height: 'auto' }} src={img} />
        <p>Kitty #{catId}</p>
      </Link>
    </div>
    <div className="column is-9" style={{ paddingTop: 0, paddingBottom: 0 }}>
      {children}
    </div>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <div className="main">
            <nav className="navigation">
              <div className="container">
                <div className="columns" style={{ alignItems: 'center' }}>
                  <div className="column is-2">
                    <Link to="/">
                      <h3 className="logo">Purrbook</h3>
                    </Link>
                  </div>
                  <div className="column is-10 has-text-right">
                    <div className="select">
                      <select id="account">
                        <option>Kitten #189402</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <Switch>
              <Route exact path="/:catId">
                <React.Fragment>
                  <section className="hero hero-kitten is-small">
                    <div className="hero-body">
                      <div className="columns">
                        <div className="column is-12 has-text-centered">
                          <div className="your-kitten">
                            <img style={{ width: '450px', height: 'auto' }} src={kitten} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section style={{ paddingTop: '4rem' }}>
                    <div className="container">
                      <PurrGroup catId="189402" img={kitty1}>
                        <PurrForm />
                        <Purr message={'Teddy bears taking over!'} date={'10/12/2018'} />
                        <Purr
                          message={'A thank you, to everyone working countless hours to solve the scaling problem'}
                          date={'09/12/2018'}
                        />
                        <Purr
                          message={
                            'Anyone interested to be the iOS track judge for @it_challenges this weekend in Krakow? #iosdev https://itchallenges.me/'
                          }
                          date={'10/12/2018'}
                        />
                        <Purr
                          message={
                            '#DeleteFacebook Movement Gains Steam After 50 Million Users Have Data Leaked $FB https://goo.gl/LA9wRb'
                          }
                          date={'09/12/2018'}
                        />
                        <Purr
                          message={
                            "I deleted my Facebook account over a year ago and noticed a very real drop in anxiety. I have never been a particularly anxious person and until then, hadn't realised how deeply entrenched I had become in what is essentially an addictive game with shit graphics. #DeleteFacebook"
                          }
                          date={'10/12/2018'}
                        />
                        <Purr
                          message={
                            'There is a pleasure in righteous fury. I savor it about silly things, like lids left ajar or autocorrect insisting “lids” is “kids” So that I can be kind about things that matter.'
                          }
                          date={'09/12/2018'}
                        />
                      </PurrGroup>
                    </div>
                  </section>
                </React.Fragment>
              </Route>
              <Route exact path="/">
                <React.Fragment>
                  <section className="hero">
                    <div className="hero-body">
                      <div className="container">
                        <div className="columns">
                          <div className="column is-9 is-offset-3">
                            <h1 className="title txtwav slow">
                              <SplitString>Purr Purr</SplitString>
                            </h1>
                            <div className="subtitle">
                              <h2 className="txtwav slow">
                                <SplitString>Make your cryptokitten talk with</SplitString>
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section style={{ paddingTop: '4rem' }}>
                    <div className="container">
                      <PurrGroup catId="189402" img={kitty1}>
                        <PurrForm />
                      </PurrGroup>
                      <PurrGroup catId="189402" img={kitty1}>
                        <Purr message={'Teddy bears taking over!'} date={'10/12/2018'} />
                        <Purr
                          message={'A thank you, to everyone working countless hours to solve the scaling problem'}
                          date={'09/12/2018'}
                        />
                      </PurrGroup>
                      <PurrGroup catId="189403" img={kitty2}>
                        <Purr
                          message={
                            'Anyone interested to be the iOS track judge for @it_challenges this weekend in Krakow? #iosdev https://itchallenges.me/'
                          }
                          date={'10/12/2018'}
                        />
                        <Purr
                          message={
                            '#DeleteFacebook Movement Gains Steam After 50 Million Users Have Data Leaked $FB https://goo.gl/LA9wRb'
                          }
                          date={'09/12/2018'}
                        />
                      </PurrGroup>
                      <PurrGroup catId="189404" img={kitty3}>
                        <Purr
                          message={
                            "I deleted my Facebook account over a year ago and noticed a very real drop in anxiety. I have never been a particularly anxious person and until then, hadn't realised how deeply entrenched I had become in what is essentially an addictive game with shit graphics. #DeleteFacebook"
                          }
                          date={'10/12/2018'}
                        />
                        <Purr
                          message={
                            'There is a pleasure in righteous fury. I savor it about silly things, like lids left ajar or autocorrect insisting “lids” is “kids” So that I can be kind about things that matter.'
                          }
                          date={'09/12/2018'}
                        />
                      </PurrGroup>
                    </div>
                  </section>
                </React.Fragment>
              </Route>
            </Switch>
          </div>
          <footer className="fixed_footer">
            <div className="container">
              <div className="columns">
                <div className="column is-offset-3">
                  <h3 className="is-size-2">Every address is a feed. Interested?</h3>
                </div>
              </div>

              <div className="columns">
                <div className="column is-offset-3">
                  <a className="external" href="https://linkexchange.io" target="_blank">
                    <div className="columns">
                      <div className="column is-1 arrow">
                        <img style={{ width: '16px', height: 'auto', marginTop: '10px' }} src={arrow} />
                      </div>

                      <div className="column">
                        <h2>Brought by Link Exchange</h2>
                        <p>"It's like Google AdSense for Token-based Communities"</p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="column">
                  <a className="external" href="https://userfeeds.io" target="_blank">
                    <div className="columns">
                      <div className="column is-1 arrow">
                        <img style={{ width: '16px', height: 'auto', marginTop: '10px' }} src={arrow} />
                      </div>

                      <div className="column">
                        <h2>Powered by Userfeeds</h2>
                        <p>Attention Economies for Token-Based Communities</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
