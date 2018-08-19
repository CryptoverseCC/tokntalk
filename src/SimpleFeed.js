import React, { Component } from 'react';
import pipe from 'lodash/fp/pipe';
import uniqBy from 'lodash/fp/uniqBy';

import Feed from './Feed';
import AppContext from './Context';
import { isValidFeedItem, enhanceFeedItem, getRanking } from './api';

export default class SimpleFeed extends Component {
  state = {
    loading: false,
    feedLoadingMore: false,
    feedItems: [],
    visibleItemsCount: 0,
  };

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed = async () => {
    this.setState({ loading: true });

    try {
      const { items } = await getRanking(
        [
          {
            algorithm: 'cryptoverse_last_week_popular_feed',
          },
        ],
        'api/decorate-with-opensea',
      );
      let feedItems = items.filter(isValidFeedItem).map(enhanceFeedItem);

      this.setState({ loading: false, feedItems, visibleItemsCount: feedItems.length > 10 ? 10 : feedItems.length });
    } catch (e) {
      console.warn(e);
      this.setState({ loading: false });
    }
  };

  getMoreItems = () => {
    this.setState(({ visibleItemsCount, feedItems }) => ({
      visibleItemsCount: feedItems.length > visibleItemsCount + 30 ? visibleItemsCount + 30 : feedItems.length,
    }));
  };

  render() {
    const { className, style } = this.props;
    const { loading, feedLoadingMore, feedItems, visibleItemsCount } = this.state;

    return (
      <React.Fragment>
        <AppContext.Consumer>
          {({ feedStore: { temporaryReplies, temporaryReactions } }) => {
            // ToDo insert temporary between feedItems if needed
            const allFeedItems = pipe(uniqBy('id'))([...feedItems.slice(0, visibleItemsCount)]);

            return (
              <Feed
                className={className}
                style={style}
                feedItems={allFeedItems}
                feedLoading={loading}
                temporaryReplies={temporaryReplies}
                temporaryReactions={temporaryReactions}
                getMoreFeedItems={this.getMoreItems}
                feedLoadingMore={feedLoadingMore}
              />
            );
          }}
        </AppContext.Consumer>
      </React.Fragment>
    );
  }
}
