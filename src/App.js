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
    sequence: 5212666,
    token_id: '341605',
    family: 'ethereum'
  },
  {
    author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
    created_at: 1520425637000,
    id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
    message: "I'm supercat! (true story)",
    sequence: 5212665,
    token_id: '341605',
    family: 'ethereum'
  },
  {
    author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
    created_at: 1520425637000,
    id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
    message: "I'm supercat! (true story)",
    sequence: 5212664,
    token_id: '341605',
    family: 'ethereum'
  },
  {
    author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
    created_at: 1520425637000,
    id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
    message: "I'm supercat! (true story)",
    sequence: 5212663,
    token_id: '341603',
    family: 'ethereum'
  },
  {
    author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
    created_at: 1520425637000,
    id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
    message: "I'm supercat! (true story)",
    sequence: 5212662,
    token_id: '341605',
    family: 'ethereum'
  },
  {
    author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
    created_at: 1520425637000,
    id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
    message: "I'm supercat! (true story)",
    sequence: 5212661,
    token_id: '341605',
    family: 'ethereum'
  },
  {
    author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
    created_at: 1520425637000,
    id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
    message: "I'm supercat! (true story)",
    sequence: 5212660,
    token_id: '341605',
    family: 'ethereum'
  }
];

const chunkBy = (items, keySelector) => {
  let chunks = [];
  for (const item of items) {
    const lastChunk = chunks[chunks.length - 1];
    if (lastChunk && lastChunk.key === keySelector(item)) {
      lastChunk.items.push(item);
    } else {
      chunks.push({ key: keySelector(item), items: [item] });
    }
  }
  return chunks;
};

export const transformPurrsToPurrGroups = purrs =>
  chunkBy(purrs, ({ token_id }) => token_id).map(({ key, items }) => ({ catId: key, purrs: items }));

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

const ShowCat = ({ match: { params: { catId } }, activeCat }) => (
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
        {transformPurrsToPurrGroups(purrs.filter(purr => purr.token_id === catId)).map(
          ({ catId, purrs }, groupIndex) => (
            <PurrGroup key={groupIndex} catId={catId} img={kitty1}>
              {activeCat && activeCat.token === catId && <PurrForm />}
              {purrs.map(({ message, sequence }, purrIndex) => (
                <Purr key={purrIndex} message={message} date={sequence} />
              ))}
            </PurrGroup>
          )
        )}
      </div>
    </section>
  </React.Fragment>
);

const Index = ({ activeCat }) => (
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
        {activeCat && (
          <PurrGroup catId={activeCat.token} img={kitty1}>
            <PurrForm />
          </PurrGroup>
        )}
        {transformPurrsToPurrGroups(purrs).map(({ catId, purrs }, groupIndex) => (
          <PurrGroup key={groupIndex} catId={catId} img={kitty1}>
            {purrs.map(({ message, sequence }, purrIndex) => (
              <Purr key={purrIndex} message={message} date={sequence} />
            ))}
          </PurrGroup>
        ))}
      </div>
    </section>
  </React.Fragment>
);

class Dropdown extends Component {
  state = {
    active: false
  };

  componentWillUnmount() {
    this.closeDropdown();
  }

  openDropdown = e => {
    e.stopPropagation();
    this.setState({ active: true }, () => {
      window.addEventListener('click', this.onWindowClick);
      window.addEventListener('touchstart', this.onWindowClick);
    });
  };

  closeDropdown = () => {
    this.setState({ active: false });
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick);
  };

  onWindowClick = event => {
    if (event.target !== this.dropdownElement && !this.dropdownElement.contains(event.target) && this.state.active) {
      this.closeDropdown();
    }
  };

  render() {
    return (
      <div className={`dropdown ${this.state.active ? 'is-active' : ''}`}>
        <div className="dropdown-trigger">
          <button className="button" onClick={e => this.openDropdown(e)}>
            <span>Your kitties</span>
          </button>
        </div>
        <div className="dropdown-menu" ref={dropdown => (this.dropdownElement = dropdown)}>
          <div className="dropdown-content">{this.props.children(this.closeDropdown)}</div>
        </div>
      </div>
    );
  }
}

const DropdownItem = ({ children, to, closeDropdown }) => (
  <Link to={`/${to}`} className="dropdown-item" onClick={closeDropdown}>
    {children}
  </Link>
);

const Navigation = ({ myCats, activeCat, changeActiveCat }) => (
  <nav className="navigation">
    <div className="container">
      <div className="columns" style={{ alignItems: 'center' }}>
        <div className="column is-2">
          <Link to="/">
            <h3 className="logo">Purrbook</h3>
          </Link>
        </div>
        <div className="column is-10 has-text-right">
          <Dropdown>
            {closeDropdown =>
              myCats.map(cat => (
                <DropdownItem key={cat.token} to={cat.token} closeDropdown={closeDropdown}>
                  Kitty {cat.token}
                </DropdownItem>
              ))
            }
          </Dropdown>
        </div>
      </div>
    </div>
  </nav>
);

const Footer = () => (
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
);

class App extends Component {
  state = {
    activeCat: myCats[0],
    myCats,
    changeActiveCat: token => {
      this.setState({ activeCat: myCats.find(cat => cat.token === token) });
    }
  };
  render() {
    const { activeCat, myCats, changeActiveCat } = this.state;
    return (
      <Router>
        <React.Fragment>
          <div className="main">
            <Navigation activeCat={activeCat} myCats={myCats} changeActiveCat={changeActiveCat} />
            <Switch>
              <Route exact path="/:catId">
                {props => <ShowCat {...props} activeCat={activeCat} />}
              </Route>
              <Route exact path="/">
                {props => <Index {...props} activeCat={activeCat} />}
              </Route>
            </Switch>
          </div>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
