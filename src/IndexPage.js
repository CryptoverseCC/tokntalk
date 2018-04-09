import React, { Component } from 'react';
import { ConnectedFeed } from './Feed';
import Hero from './Hero';

export default class IndexPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.refreshFeedItems(true);
    this.refreshInterval = setInterval(this.refreshFeedItems, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refreshFeedItems = async (purge = false) => {
    const response = await fetch(
      `https://api-dev.userfeeds.io/ranking/feed;context=ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d`
    );
    const { items: feedItems } = await response.json();
    if (feedItems) {
      this.props.updateFeedItems(
        feedItems.filter(feedItem => ['regular', 'like', 'post_to', 'response', 'post_about'].includes(feedItem.type)),
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
