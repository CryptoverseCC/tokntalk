import React, { Component } from 'react';

import { getRanking, isValidFeedItem, enhanceFeedItem } from './api';
import { pageView } from './Analytics';
import { getFeed } from './Feed';
import { FlatContainer } from './Components';
import { IfActiveEntity } from './Entity';
import Context from './Context';

const fetchPersonalFeed = async (params) => {
  const { items } = await getRanking(
    [
      {
        algorithm: 'cryptoverse_club_multiple_feed',
        params: params,
      },
    ],
    'api/decorate-with-opensea',
  );
  return items.filter(isValidFeedItem).map(enhanceFeedItem);
};

const PersonalFeed = getFeed(fetchPersonalFeed);

export default class PersonalPage extends Component {
  componentDidMount() {
    pageView();
  }

  render() {
    return (
      <React.Fragment>
        <div className="columns ordered-mobile">
          <div className="column is-8 fl-1 is-offset-1">
            <IfActiveEntity>
              {(id) => (
                <React.Fragment>
                  <Context.Consumer>
                    {({ entityStore: { getEntity } }) => (
                      <PersonalFeed
                        options={{ id: getEntity(id).tokens.map((token) => `${token.network}:${token.address}`) }}
                      />
                    )}
                  </Context.Consumer>
                </React.Fragment>
              )}
            </IfActiveEntity>
          </div>
          <div className="column is-2">
            <FlatContainer>
              This feed represents all messages posted in clubs that you belong to (you hold their token).
            </FlatContainer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
