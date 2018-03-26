import React, { Component } from 'react';
import KittyImg from './KittyImg';
import { PurrGroupWithForm, PurrsList, ShowNewPurrs } from './Purr';
import colors from './colors';

class ShowCat extends Component {
  componentDidMount() {
    this.refreshPurrs(true);
    this.refreshInterval = setInterval(this.refreshPurrs, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refreshPurrs = async (purge = false) => {
    const response = await fetch(
      `https://api-dev.userfeeds.io/ranking/posts;context=ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:${
        this.props.match.params.catId
      }/filter_sort;by=created_at;order=desc`
    );
    const { items: purrs } = await response.json();
    if (purrs) {
      this.props.updatePurrs(purrs, purge);
    }
  };

  render() {
    const { match: { params: { catId } }, catsInfo, getCatInfo } = this.props;
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
            <PurrGroupWithForm />
            <ShowNewPurrs forCat={catId} />
            <PurrsList forCat={catId} />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ShowCat;
