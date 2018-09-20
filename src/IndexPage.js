import React, { Component } from 'react';

import { getFeedItemsFromCache, getRanking, isValidFeedItem, enhanceFeedItem } from './api';
import AppContext from './Context';
import { pageView } from './Analytics';
import { getFeed } from './Feed';
import Hero from './Hero';
import { PromotionBox } from './promotion/PromotionBox';
import { FlatContainer } from './Components';
import FeedTypeSwitcher from './FeedTypeSwitcher';
import Investors from './Investors';
import { Entities, WithActiveEntity } from './Entity';

const { REACT_APP_DEFAULT_TOKEN_ID: DEFAULT_TOKEN_ID } = process.env;

const fetchPopularFeed = async () => {
  const { items } = await getRanking(
    [
      {
        algorithm: 'cryptoverse_last_week_popular_feed',
      },
    ],
    'api/decorate-with-opensea',
  );
  return items.filter(isValidFeedItem).map(enhanceFeedItem);
};

const fetchNotificationsFeed = async ({ tokens }) => {
  const { items } = await getRanking(
    [
      {
        algorithm: 'cryptoverse_notifications_feed',
        params: { id: tokens },
      },
    ],
    'api/decorate-with-opensea',
  );
  return items.filter(isValidFeedItem).map(enhanceFeedItem);
};

const NewestFeed = getFeed(getFeedItemsFromCache(), true, true, undefined, (f0, f1) => f1.created_at - f0.created_at);
const PopularFeed = getFeed(fetchPopularFeed, false, false);
const ActiveFeed = getFeed(getFeedItemsFromCache('cache-cryptoverse-active-feed'), true, false);
const NotificationsFeed = getFeed(fetchNotificationsFeed, false, false);

export default class IndexPage extends Component {
  state = { feedType: 'new' };

  componentDidMount() {
    pageView();
  }

  changeFeedType = (feedType) => {
    this.setState({ feedType });
  };

  render() {
    const { feedType } = this.state;
    const defaultUnloggedFeeds = [FeedTypeSwitcher.NEW, FeedTypeSwitcher.POPULAR, FeedTypeSwitcher.ACTIVE];
    return (
      <React.Fragment>
        <div className="columns ordered-mobile">
          <div className="column is-7 fl-1 is-offset-1">
            <Investors />
            <Hero style={{ marginBottom: '30px' }} />
            <WithActiveEntity>
              {(activeEntity) => (
                <FeedTypeSwitcher
                  type={feedType}
                  onChange={this.changeFeedType}
                  style={{ marginBottom: '2em' }}
                  options={
                    activeEntity ? defaultUnloggedFeeds.concat(FeedTypeSwitcher.NOTIFICATIONS) : defaultUnloggedFeeds
                  }
                />
              )}
            </WithActiveEntity>
            {feedType === FeedTypeSwitcher.NEW && <NewestFeed />}
            {feedType === FeedTypeSwitcher.POPULAR && <PopularFeed />}
            {feedType === FeedTypeSwitcher.ACTIVE && <ActiveFeed />}
            {feedType === FeedTypeSwitcher.NOTIFICATIONS && (
              <Entities>
                {({ entities }) => <NotificationsFeed options={{ tokens: entities.map((entity) => entity.id) }} />}
              </Entities>
            )}
          </div>
          <div className="column is-3">
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
        </div>
      </React.Fragment>
    );
  }
}
