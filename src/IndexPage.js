import React, { Component } from 'react';
import styled from 'styled-components';
import find from 'lodash/fp/find';

import Link from './Link';
import AppContext from './Context';
import { pageView } from './Analytics';
import { ConnectedFeed } from './Feed';
import Hero from './Hero';
import { Supporters } from './Supporters';
import { HeaderSpacer } from './Header';
import { IfActiveEntity, Entity } from './Entity';
import { FlatContainer, ContentContainer, H4 } from './Components';
import clubs, { TokenImage } from './clubs';
import { DiscoverIcon } from './Icons';

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
            <ActiveEntityTokens />
            <FlatContainer>
              <AppContext.Consumer>
                {({ boostStore: { getBoosts } }) => <Supporters getBoosts={getBoosts} token={DEFAULT_TOKEN_ID} />}
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
            <DiscoverMore />
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
    <DiscoverMore />
  </YourCommunitiesContainer>
);

const DiscoverMore = styled((props) => (
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
      Discover more
    </Link>
  </div>
))`
  // styles
`;

const Token = ({ asset }) => {
  const [network, address] = asset.split(':');
  const token = find({ network, address })(clubs);

  return (
    <YourCommunitiesLink to={`/discover/byToken/${token.symbol}`}>
      <TokenImage token={token} style={{ width: '22px', height: '22px', marginRight: '15px' }} />
      {token.name}
    </YourCommunitiesLink>
  );
};
