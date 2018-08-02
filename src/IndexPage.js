import React, { Component } from 'react';

import AppContext from './Context';
import { pageView } from './Analytics';
import { ConnectedFeed } from './Feed';
import Hero from './Hero';
import Advertised from './Catvertised';
import { HeaderSpacer } from './Header';
import { FlatContainer, ContentContainer } from './Components';

const { REACT_APP_DEFAULT_TOKEN_ID: DEFAULT_TOKEN_ID } = process.env;

export default class IndexPage extends Component {
  componentDidMount() {
    pageView();
    window.scrollTo(0, 0);
    this.props.getFeedItems();
    this.refreshInterval = setInterval(() => this.props.getNewFeedItems(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <ContentContainer>
        <HeaderSpacer style={{ marginBottom: '60px' }} />
        <div className="columns">
          <div className="column is-3">
            <FlatContainer>
              <AppContext.Consumer>
                {({ boostStore: { getBoosts } }) => <Advertised getBoosts={getBoosts} token={DEFAULT_TOKEN_ID} />}
              </AppContext.Consumer>
            </FlatContainer>
          </div>
          <div className="column is-8 is-offset-1">
            <Hero style={{ marginBottom: '30px' }} />
            <ConnectedFeed className="todo" />
          </div>
        </div>
      </ContentContainer>
    );
  }
}
