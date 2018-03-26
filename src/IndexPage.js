import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import KittyAvatar, { ChangableAvatar } from './KittyAvatar';
import { PurrGroup, PurrForm, Purr, PurrsList, PurrGroupWithForm, ShowNewPurrs } from './Purr';
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
            <PurrGroupWithForm />
            <ShowNewPurrs />
            <PurrsList purrs={purrs} />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;
