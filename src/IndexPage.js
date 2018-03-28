import React, { Component } from 'react';
import { PurrsList, PurrGroupWithForm, ShowNewPurrs } from './Purr';
import Hero from './Hero';

export default class IndexPage extends Component {
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
    return (
      <React.Fragment>
        <Hero />
        <section style={{ paddingTop: '4rem' }}>
          <div className="container">
            <PurrGroupWithForm />
            <ShowNewPurrs />
            <PurrsList />
          </div>
        </section>
      </React.Fragment>
    );
  }
}
