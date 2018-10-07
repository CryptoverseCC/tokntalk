import React, { Component } from 'react';

import TranslationsContext from './Translations';
import { getRanking, isValidFeedItem, enhanceFeedItem } from './api';
import { pageView } from './Analytics';
import { getFeed } from './Feed';
import { FlatContainer } from './Components';
import { Entities } from './Entity';

const fetchFeed = async ({ tokens }) => {
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
const Feed = getFeed(fetchFeed, false, false);

export default class Notifications extends Component {
  componentDidMount() {
    pageView();
  }

  render() {
    return (
      <React.Fragment>
        <div className="columns ordered-mobile">
          <div className="column is-9 fl-1">
            <Entities>
              {({ entities }) => (
                <Feed
                  options={{ tokens: entities.map((entity) => entity.id) }}
                  emptyFeedMessage={
                    <TranslationsContext.Consumer>
                      {({ emptyNotificationsFeed }) => emptyNotificationsFeed}
                    </TranslationsContext.Consumer>
                  }
                />
              )}
            </Entities>
          </div>
          <div className="column is-3">
            <FlatContainer>This feed shows all messages sent to you or in threads you were active in.</FlatContainer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
