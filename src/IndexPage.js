import React, { Component } from 'react';
import { pageView } from './Analytics';
import { getFeedItems } from './api';
import { ConnectedFeed, FeedContainer } from './Feed';
import Hero from './Hero';
import { FeedCatvertised } from './Catvertised';

const { REACT_APP_DEFAULT_TOKEN_ID: DEFAULT_TOKEN_ID } = process.env;

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
    if (purge) this.props.startFeedLoading();
    try {
      const feedItems = await getFeedItems();
      this.props.updateFeedItems(feedItems, purge);
    } catch (e) {
      console.warn('Failed to download feedItems');
    }
  };

  render() {
    return (
      <React.Fragment>
        <Hero />
        <FeedContainer>
          <FeedCatvertised tokenId={DEFAULT_TOKEN_ID} />
          <ConnectedFeed className="column is-6" />
        </FeedContainer>
      </React.Fragment>
    );
  }
}
