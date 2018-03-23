import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import KittyAvatar from './KittyAvatar';
import { PurrGroup, PurrForm, Purr } from './Purr';
import { SplitString, transformPurrsToPurrGroups } from './utils';

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

  changableAvatar = () => {
    const { activeCat, changeActiveCatToNext, changeActiveCatToPrevious, catsInfo, getCatInfo } = this.props;

    return (
      <Link to={`/cryptopurr/${activeCat.token}`}>
        <div style={{ position: 'relative' }}>
          <KittyAvatar catId={activeCat.token} catsInfo={catsInfo} getCatInfo={getCatInfo} />
          {this.props.myCats.length > 1 && (
            <React.Fragment>
              <ArrowButton direction="back" onClick={changeActiveCatToPrevious} />
              <ArrowButton direction="forward" onClick={changeActiveCatToNext} />
            </React.Fragment>
          )}
        </div>
        <p>Kitty #{activeCat.token}</p>
      </Link>
    );
  };

  StaticAvatar = ({ catId }) => {
    const { catsInfo, getCatInfo } = this.props;
    return (
      <Link to={`/cryptopurr/${catId}`}>
        <KittyAvatar catId={catId} catsInfo={catsInfo} getCatInfo={getCatInfo} />
        <p>Kitty #{catId}</p>
      </Link>
    );
  };

  PurrsList = ({ purrs }) =>
    transformPurrsToPurrGroups(purrs).map(({ catId, purrs }, groupIndex) => (
      <PurrGroup key={groupIndex} catId={catId} Avatar={this.StaticAvatar}>
        {purrs.map(({ message, created_at }, purrIndex) => (
          <Purr key={purrIndex} message={message} date={created_at} />
        ))}
      </PurrGroup>
    ));

  render() {
    const { activeCat, purrs, purr, newPurrsCount, showNewPurrs } = this.props;
    return (
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
              <PurrGroup Avatar={this.changableAvatar}>
                <PurrForm catId={activeCat.token} purr={purr} />
              </PurrGroup>
            )}
            {newPurrsCount > 0 && (
              <div className="columns">
                <button className="column is-9 is-offset-3 new-purrs--button" onClick={showNewPurrs}>
                  {newPurrsCount} new purrs. Click here to show them!
                </button>
              </div>
            )}
            <this.PurrsList purrs={purrs} />
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
