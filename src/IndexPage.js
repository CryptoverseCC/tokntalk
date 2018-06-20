import React, { Component } from 'react';
import { pageView } from './Analytics';
import { ConnectedFeed, FeedContainer } from './Feed';
import Hero from './Hero';
import { FeedCatvertised } from './Catvertised';

const { REACT_APP_DEFAULT_TOKEN_ID: DEFAULT_TOKEN_ID } = process.env;

export default class IndexPage extends Component {
  componentDidMount() {
    pageView();
    window.scrollTo(0, 0);
    this.props.getFeedItems();
    // this.refreshInterval = setInterval(() => this.props.getNewFeedItems(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <React.Fragment>
        <Hero />
        <FeedContainer>
          <FeedCatvertised token={DEFAULT_TOKEN_ID} />
          <ConnectedFeed className="column is-6" />
        </FeedContainer>
      </React.Fragment>
    );
  }
}
