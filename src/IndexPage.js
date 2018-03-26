import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import KittyAvatar from './KittyAvatar';
import { PurrGroup, PurrForm, Purr, PurrsList } from './Purr';
import { transformPurrsToPurrGroups } from './utils';
import Context from './Context';

class Index extends Component {
  componentDidMount() {
    this.refreshPurrs(true);
    this.refreshInterval = setInterval(this.refreshPurrs, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refreshPurrs = async (purge = false) => {
    const response = await fetch(
      `https://api-dev.userfeeds.io/ranking/posts;context=ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d/filter_sort;by=created_at;order=desc`
    );
    const { items: purrs } = await response.json();
    if (purrs) {
      this.props.updatePurrs(purrs, purge);
    }
  };

  ChangableAvatar = () => {
    const { catsInfo, getCatInfo } = this.props;
    return (
      <Context.Consumer>
        {({ catStore: { myCats, changeActiveCatToNext, changeActiveCatToPrevious, activeCat } }) => (
          <Link to={`/cryptopurr/${activeCat.token}`}>
            <div style={{ position: 'relative' }}>
              <KittyAvatar catId={activeCat.token} catsInfo={catsInfo} getCatInfo={getCatInfo} />
              {myCats.length > 1 && (
                <React.Fragment>
                  <ArrowButton direction="back" onClick={changeActiveCatToPrevious} />
                  <ArrowButton direction="forward" onClick={changeActiveCatToNext} />
                </React.Fragment>
              )}
            </div>
            <p>{catsInfo[activeCat.token].name || `Kitty #${activeCat.token}`}</p>
          </Link>
        )}
      </Context.Consumer>
    );
  };

  render() {
    const { purrs, purr, newPurrsCount, showNewPurrs, allowPurr } = this.props;

    return (
      <React.Fragment>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-9 is-offset-3">
                  <h1 className="title txtwav slow">Purr Purr</h1>
                  <div className="subtitle">
                    <h2 className="txtwav slow">Make your cryptokitten talk with</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={{ paddingTop: '4rem' }}>
          <div className="container">
            {allowPurr && (
              <PurrGroup Avatar={this.ChangableAvatar}>
                <PurrForm purr={purr} />
              </PurrGroup>
            )}
            {newPurrsCount > 0 && (
              <div className="columns">
                <button className="column is-9 is-offset-3 new-purrs--button" onClick={showNewPurrs}>
                  {newPurrsCount} new purrs. Click here to show them!
                </button>
              </div>
            )}
            <PurrsList purrs={purrs} />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const ArrowButton = ({ direction, onClick }) => (
  <button
    className={`changeCat--button changeCat--button-${direction}`}
    style={{
      ...(direction === 'back' ? { left: 'calc(50% - 60px)' } : { right: 'calc(50% - 60px)' })
    }}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <svg className="changeCat--arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <path
        fill="currentColor"
        d="M8,12c-0.232,0-0.463-0.08-0.651-0.241l-7.759-6.65L0.892,3.59L8,9.683l7.108-6.093l1.302,1.519l-7.759,6.65 C8.463,11.92,8.232,12,8,12z"
      />
    </svg>
  </button>
);

export default Index;
