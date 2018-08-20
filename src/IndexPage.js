import React, { Component } from 'react';

import AppContext from './Context';
import { pageView } from './Analytics';
import { ConnectedFeed } from './Feed';
import Hero from './Hero';
import { PromotionBox } from './promotion/PromotionBox';
import { HeaderSpacer } from './Header';
import { FlatContainer, ContentContainer } from './Components';
import FeedTypeSwitcher from './FeedTypeSwitcher';
import PopularFeed from './SimpleFeed';
import ActiveEntityTokens from './ActiveEntityTokens';

const { REACT_APP_DEFAULT_TOKEN_ID: DEFAULT_TOKEN_ID } = process.env;

export default class IndexPage extends Component {
  state = { feedType: 'new' };

  componentDidMount() {
    pageView();
    this.props.getFeedItems();
    this.refreshInterval = setInterval(() => this.props.getNewFeedItems(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  changeFeedType = (feedType) => {
    this.setState({ feedType });
    if (feedType === 'new') {
      this.props.getFeedItems();
    }
  };

  render() {
    const { feedType } = this.state;
    return (
      <ContentContainer>
        <HeaderSpacer style={{ marginBottom: '60px' }} />
        <div className="columns">
          <div className="column is-3-widescreen is-4">
            <ActiveEntityTokens />
            <FlatContainer>
              <AppContext.Consumer>
                {({ boostStore: { getBoosts, getSupportings } }) => (
                  <PromotionBox
                    getBoosts={getBoosts}
                    getSupportings={getSupportings}
                    token={DEFAULT_TOKEN_ID}
                    showPurrmoter={true}
                  />
                )}
              </AppContext.Consumer>
            </FlatContainer>
          </div>
          <div className="column is-8 is-offset-1-widescreen">
            <Hero style={{ marginBottom: '30px' }} />
            <FeedTypeSwitcher type={feedType} onChange={this.changeFeedType} style={{ marginBottom: '2em' }} />
            {feedType === 'new' ? <ConnectedFeed className="todo" /> : <PopularFeed />}
          </div>
        </div>
      </ContentContainer>
    );
  }
}
