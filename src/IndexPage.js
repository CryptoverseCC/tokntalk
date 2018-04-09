import React, { Component } from 'react';
import { pageView } from './Analytics';
import { getFeedItems } from './api';
import { ConnectedFeed } from './Feed';
import Hero from './Hero';

export default class IndexPage extends Component {
  componentDidMount() {
    pageView();
    window.scrollTo(0, 0);
    this.refreshFeedItems(true);
    this.refreshInterval = setInterval(this.refreshFeedItems, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refreshFeedItems = async (purge = false) => {
    const feedItems = await getFeedItems();
    this.props.updateFeedItems(feedItems, purge);
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
