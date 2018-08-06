import React, { Component } from 'react';
import styled from 'styled-components';
import find from 'lodash/fp/find';

import Link from './Link';
import AppContext from './Context';
import { pageView } from './Analytics';
import { ConnectedFeed } from './Feed';
import Hero from './Hero';
import Advertised from './Catvertised';
import { HeaderSpacer } from './Header';
import { IfActiveEntity, Entity } from './Entity';
import { FlatContainer, ContentContainer, H4 } from './Components';
import ercs20, { TokenImage } from './erc20';

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
            <ActiveEntityTokens />
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

const ActiveEntityTokens = () => (
  <IfActiveEntity>
    {(activeEntityId) => (
      <Entity id={activeEntityId}>
        {(entity) => (
          <FlatContainer style={{ marginBottom: '2rem' }}>
            <H4>Your communities</H4>
            {entity.tokens.map((asset) => (
              <Token key={asset} asset={asset} />
            ))}
            <DiscoverMore />
          </FlatContainer>
        )}
      </Entity>
    )}
  </IfActiveEntity>
);

const DiscoverMore = styled((props) => (
  <div {...props}>
    <Link to="/discover">Discover more</Link>
  </div>
))`
  // styles
`;

const Token = ({ asset }) => {
  const [network, address] = asset.split(':');
  const token = find({ network, address })(ercs20);

  return (
    <Link to={`/discover/byToken/${token.symbol}`} style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
      <TokenImage token={token} style={{ width: '30px', height: '30px', marginRight: '15px' }} />
      {token.name}
    </Link>
  );
};
