import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import KittyAvatar, { KittyImg } from './KittyAvatar';
import { PurrGroup, PurrForm, Purr } from './Purr';
import colors from './colors';

class ShowCat extends Component {
  componentDidMount() {
    this.refreshPurrs();
    this.refreshInterval = setInterval(this.refreshPurrs, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refreshPurrs = async () => {
    const response = await fetch(
      `https://api-dev.userfeeds.io/ranking/posts;context=ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:${
        this.props.match.params.catId
      }/filter_sort;by=created_at;order=desc`
    );
    const { items: purrs } = await response.json();
    if (purrs) {
      this.props.updatePurrs(purrs);
    }
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

  render() {
    const { match: { params: { catId } }, myCats, catsInfo, getCatInfo, purrs, purr } = this.props;
    const catIsOwned = !!myCats.find(({ token }) => catId === token);
    const backgroundColor = catsInfo[catId] ? colors[catsInfo[catId].color] : '';
    return (
      <React.Fragment>
        <section className="hero hero-kitten is-small" style={{ backgroundColor }}>
          <div className="hero-body">
            <div className="columns">
              <div className="column is-12 has-text-centered">
                <div className="your-kitten">
                  <KittyImg catsInfo={catsInfo} getCatInfo={getCatInfo} catId={catId} style={{ width: '450px' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={{ paddingTop: '4rem' }}>
          <div className="container">
            {!catIsOwned && !purrs.length ? null : (
              <PurrGroup Avatar={this.StaticAvatar} catId={catId} >
                {myCats.find(({ token }) => catId === token) && <PurrForm catId={catId} purr={purr} />}
                {purrs.map(({ message, created_at }, purrIndex) => (
                  <Purr key={purrIndex} message={message} date={created_at} />
                ))}
              </PurrGroup>
            )}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ShowCat;
