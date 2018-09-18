import React, { Component } from 'react';
import styled from 'styled-components';

import clubs from './clubs';
import { getRanking } from './api';
import { Storage } from './utils';

const Context = React.createContext();
export const FEED_VERSION_KEY = 'feedVersions';

export class UnreadedMessagesProvider extends Component {
  storage = Storage();
  state = {
    unreadedMessages: {},
  };

  componentDidMount() {
    this.refreshUnreadedMessages();
  }

  refreshUnreadedMessages = async () => {
    try {
      const unreadedMessages = await this.getUnreadedMessages();
      this.setState({ unreadedMessages });
    } catch (e) {}
    setTimeout(this.refreshUnreadedMessages, 5000);
  };

  getUnreadedMessages = async () => {
    const latestVersions = JSON.parse(this.storage.getItem(FEED_VERSION_KEY) || '{}');
    const versions = clubs.reduce((acc, club) => {
      const asset = `${club.network}:${club.address}`;
      return {
        ...acc,
        [asset]: latestVersions[asset] || 0,
      };
    }, {});

    let unreaded;
    const { items } = await getRanking([
      {
        algorithm: 'cryptoverse_club_feed_new_count',
        params: { versions },
      },
    ]);
    unreaded = items.reduce((acc, item) => ({ ...acc, [item.club_id]: item.count }), {});

    const unreadedMessages = clubs.reduce((acc, club) => {
      const asset = `${club.network}:${club.address}`;
      return {
        ...acc,
        [club.address]: unreaded[asset],
      };
    }, {});
    return unreadedMessages;
  };

  render() {
    return <Context.Provider value={this.state.unreadedMessages}>{this.props.children}</Context.Provider>;
  }
}

export const UnreadedCount = ({ token, className, style }) => (
  <Context.Consumer>
    {(undreadedMessages) => {
      const count = undreadedMessages[token.address];

      if (typeof count !== 'number' || count === 0) {
        return null;
      }

      return (
        <UnreadedCountContainer
          className={className}
          style={style}
          primaryColor={token.primaryColor}
          secondaryColor={token.secondaryColor}
        >
          {count === null ? 'Undiscovered' : count > 100 ? '99+' : `${count} New`}
        </UnreadedCountContainer>
      );
    }}
  </Context.Consumer>
);

export const UnreadedCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  align-self: center;
  border-radius: 20px;
  height: 25px;
  float: right;
  max-width: 60px;
  margin-top: 3px;
  font-size: 12px;
  text-align: center;
  font-weight: 600;
  padding: 0 10px;
  color: ${({ primaryColor }) => primaryColor}
  background: ${({ secondaryColor }) => secondaryColor}
`;
