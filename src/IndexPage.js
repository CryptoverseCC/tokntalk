import React, { Component } from 'react';
import styled from 'styled-components';
import find from 'lodash/fp/find';

import Link from './Link';
import AppContext from './Context';
import { pageView } from './Analytics';
import { ConnectedFeed } from './Feed';
import Hero from './Hero';
import { PromotionBox } from './promotion/PromotionBox';
import { HeaderSpacer } from './Header';
import { IfActiveEntity, Entity } from './Entity';
import { FlatContainer, ContentContainer, H4 } from './Components';
import clubs, { TokenImage } from './clubs';
import { DiscoverIcon } from './Icons';
import { UnreadedCount } from './UnreadedMessages';
import FeedTypeSwitcher from './FeedTypeSwitcher';
import PopularFeed from './SimpleFeed';

const { REACT_APP_DEFAULT_TOKEN_ID: DEFAULT_TOKEN_ID } = process.env;

const YourCommunitiesContainer = styled.div`
  margin-bottom: 3rem;
  background-color: 'transparent';
  padding: 0;
  border-radius: 0;
  background-color: #ecf1f9;
  position: relative;
  padding: 30px;
  border-radius: 12px;
  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
  }
`;

const YourCommunitiesLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 7px 0;
  font-size: 1rem;
  color: #1b2437;
  transition: all 0.15s ease;

  :hover {
    color: #264dd9;
    transition: all 0.15s ease;
  }
`;

export default class IndexPage extends Component {
  state = { feedType: 'new' };

  componentDidMount() {
    pageView();
    window.scrollTo(0, 0);
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

const ActiveEntityTokens = () => (
  <IfActiveEntity other={<NoActiveEntity />}>
    {(activeEntityId) => (
      <Entity id={activeEntityId}>
        {(entity) => (
          <YourCommunitiesContainer>
            <H4 style={{ marginBottom: '15px' }}>Your communities</H4>
            {entity.tokens.map((asset) => (
              <Token key={asset} asset={asset} />
            ))}
            <DiscoverMore>{!entity.tokens.length ? 'Join your first community' : 'Discover more'}</DiscoverMore>
          </YourCommunitiesContainer>
        )}
      </Entity>
    )}
  </IfActiveEntity>
);

const NoActiveEntity = () => (
  <YourCommunitiesContainer>
    <H4 style={{ marginBottom: '15px' }}>Your communities</H4>
    <span
      style={{
        color: '#fc0035',
        fontWeight: 600,
        textShadow: '0 0 10px rgba(252,0,53,0.3)',
      }}
    >
      Unlock your wallet to see where you belong
    </span>
  </YourCommunitiesContainer>
);

const DiscoverMore = ({ children, props }) => (
  <div {...props}>
    <Link
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '1px solid #dce0eb',
      }}
      to="/discover"
    >
      <DiscoverIcon
        style={{
          width: '24px',
          height: '24px',
          marginRight: '15px',
        }}
      />
      {children}
    </Link>
  </div>
);

const StyledUnreadedMessages = styled(UnreadedCount)`
  color: #1b2437;
  background: white;
`;

const Token = ({ asset }) => {
  const [network, address] = asset.split(':');
  const token = find({ network, address })(clubs);

  return (
    <YourCommunitiesLink to={`/discover/byToken/${token.symbol}`}>
      <TokenImage token={token} style={{ width: '22px', height: '22px', marginRight: '15px' }} />
      {token.name}
      <StyledUnreadedMessages token={token} />
    </YourCommunitiesLink>
  );
};
