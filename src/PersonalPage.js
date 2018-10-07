import React, { Component } from 'react';

import { getRanking, isValidFeedItem, enhanceFeedItem } from './api';
import { pageView } from './Analytics';
import { getFeed } from './Feed';
import { FlatContainer } from './Components';
import { Entity, WithActiveEntity } from './Entity';

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
            <WithActiveEntity>
              {(activeEntity) => (
                <React.Fragment>
                  {activeEntity && (
                    <Entity id={activeEntity.id}>
                      {(entity) => (
                        <PersonalFeed
                          options={{ id: entity.tokens.map((token) => `${token.network}:${token.address}`) }}
                        />
                      )}
                    </Entity>
                  )}
                </React.Fragment>
              )}
            </WithActiveEntity>
          </div>
          <div className="column is-3">
            <FlatContainer>
              This feed represents all messages posted in clubs that you belong to (you hold their token).
            </FlatContainer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
