import React, { Component } from 'react';
import { ConnectedFeed } from './Feed';
import Hero from './Hero';

export default class IndexPage extends Component {
  componentDidMount() {
    this.refreshPurrs(true);
    this.refreshInterval = setInterval(this.refreshPurrs, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refreshPurrs = async (purge = false) => {
    const response = await fetch(
      `https://api-dev.userfeeds.io/ranking/feed;context=ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d`
    );
    const { items: purrs } = await response.json();
    if (purrs) {
      this.props.updatePurrs(
        purrs.filter(purr => ['regular', 'like', 'post_to', 'response'].includes(purr.type)),
        purge
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <Hero />
        <ConnectedFeed />
      </React.Fragment>
    );
  }
}
