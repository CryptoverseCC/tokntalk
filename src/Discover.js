import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import timeago from 'timeago.js';
import pipe from 'lodash/fp/pipe';
import uniqBy from 'lodash/fp/uniqBy';
import sortBy from 'lodash/fp/sortBy';
import reverse from 'lodash/fp/reverse';
import find from 'lodash/fp/find';

import Link from './Link';
import Feed from './Feed';
import Loader from './Loader';
import AppContext from './Context';
import { HeaderSpacer } from './Header';
import { validateParams } from './utils';
import { ExclamationMark } from './Icons';
import ercs20, { TokenImage } from './erc20';
import { ConnectedClubForm, CommentForm } from './CommentForm';
import { hasValidContext, getRanking, isValidFeedItem } from './api';
import { socialIcons } from './Icons';
import { FlatContainer, WarningContainer, H1, H2, H3, SocialUsername, ContentContainer } from './Components';
import {
  EntityName,
  LinkedEntityAvatar,
  IfActiveEntity,
  IfActiveEntityIs,
  IsActiveEntityFromFamily,
  Entity,
  IfActiveEntityHasToken,
  DoesActiveEntityHasToken,
} from './Entity';
import Catvertised from './Catvertised';

const DiscoveryContext = React.createContext();

export default class Discover extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Index} />
        <Route path={`${match.url}/byToken/:token`} component={decoratedByTokenIndex} />
      </Switch>
    );
  }
}

class Index extends Component {
  renderEntityTokens = (entity) =>
    this.renderTiles(
      entity.tokens.map((asset) => {
        const [network, address] = asset.split(':');
        return find({ network, address })(ercs20);
      }),
    );

  renderOthersTokens = () => this.renderTiles(ercs20);

  renderTiles = (tokens) => {
    const { match } = this.props;
    return (
      <div className="columns is-multiline">
        {tokens.map((token) => (
          <TokenTile
            linkTo={`${match.url}/byToken/${token.symbol}`}
            key={token.address}
            token={token}
            className="column is-one-quarter"
          />
        ))}
      </div>
    );
  };

  render() {
    return (
      <ContentContainer>
        <HeaderSpacer />
        <H1 style={{ margin: '60px 0' }}>Discover</H1>
        <div className="columns">
          <div className="column is-12">
            <H2>Communities</H2>
            <IfActiveEntity
              then={(entityId) => (
                <Entity id={entityId}>
                  {(entity) => (
                    <React.Fragment>
                      <H3 style={{ marginTop: '30px', marginBottom: '15px' }}>Yours</H3>
                      {this.renderEntityTokens(entity)}
                      <H3 style={{ marginTop: '30px', marginBottom: '15px' }}>Others</H3>
                      {this.renderOthersTokens()}
                    </React.Fragment>
                  )}
                </Entity>
              )}
              other={
                <React.Fragment>
                  <H3 style={{ marginTop: '30px', marginBottom: '15px' }}>Others</H3> {this.renderOthersTokens()}
                </React.Fragment>
              }
            />
          </div>
          <div className="column is-3 is-offset-1" />
        </div>
      </ContentContainer>
    );
  }
}

class ByTokenIndex extends Component {
  state = {
    loading: false,
    data: {
      latest: [],
      twitter: [],
      facebook: [],
      instagram: [],
      github: [],
    },
  };

  componentDidMount() {
    this.fetchRanking();
  }

  fetchRanking = async () => {
    const { token } = this.props;
    this.setState({ loading: true });
    try {
      const data = await fetch(
        `https://api.userfeeds.io/api/cache-cryptoverse-discovery?asset=${token.network}:${token.address}`,
      ).then((res) => res.json());
      this.setState({ data, loading: false });
    } catch (e) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { match, token } = this.props;
    const { loading, data } = this.state;

    return (
      <DiscoveryContext.Provider value={{ loading, ...data }}>
        <Switch>
          <Route exact path={`${match.url}/`} render={(props) => <ByToken token={token} {...props} />} />
          <Route
            exact
            path={`${match.url}/recentlyActive`}
            render={(props) => <RecentlyActivePage token={token} {...props} />}
          />
          <Route exact path={`${match.url}/social`} render={(props) => <SocialPage token={token} {...props} />} />
          <Route exact path={`${match.url}/feed`} render={(props) => <FeedPage token={token} {...props} />} />
        </Switch>
      </DiscoveryContext.Provider>
    );
  }
}

const ByToken = ({ match, token }) => (
  <React.Fragment>
    <Hero
      primaryColor={token.primaryColor}
      secondaryColor={token.secondaryColor}
      className="is-flex"
      style={{ alignItems: 'center' }}
    >
      <ContentContainer style={{ flex: 1 }}>
        <Link to="/discover">
          <Back className="columns is-mobile" style={{ color: token.secondaryColor, opacity: 0.6 }}>
            <div className="column is-1">
              <BackArrow>
                <H2 className="is-pulled-right">←</H2>
              </BackArrow>
            </div>
            <div className="column">
              <H2>Communities</H2>
            </div>
          </Back>
        </Link>
        <div className="columns is-mobile">
          <div className="column is-1">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <TokenImage token={token} />
            </div>
          </div>
          <div className="column">
            <H1>{token.name}</H1>
          </div>
        </div>
      </ContentContainer>
    </Hero>
    <ContentContainer>
      <div className="columns">
        <div className="column is-8">
          <FlatContainer>
            <H3>Recently active</H3>
            <Link to={`${match.url}/recentlyActive`}>
              <SeeMore style={{ marginBottom: '15px' }}>See more</SeeMore>
            </Link>
            <RecentlyActive asset={`${token.network}:${token.address}`} limit={9} />
          </FlatContainer>
          <H2 style={{ marginTop: '60px', marginBottom: '30px' }}>
            Messages in this community
            <Link to={`${match.url}/feed`}>
              <SeeMore style={{ marginLeft: '15px' }}>See more</SeeMore>
            </Link>
          </H2>
          <IfActiveEntityHasToken asset={`${token.network}:${token.address}`} other={<NoTokensWarning token={token} />}>
            {token.is721 ? (
              <IfActiveEntityIs
                asset={`${token.network}:${token.address}`}
                other={<ActiveEntityIsNotFromFamily token={token} />}
              >
                <FormContainer>
                  <ConnectedClubForm token={token} Form={CommentForm} />
                </FormContainer>
              </IfActiveEntityIs>
            ) : (
              <FormContainer>
                <ConnectedClubForm token={token} Form={CommentForm} />
              </FormContainer>
            )}
          </IfActiveEntityHasToken>
          <IsActiveEntityFromFamily asset={`${token.network}:${token.address}`}>
            {(isActiveEntityFromFamily) => (
              <DoesActiveEntityHasToken asset={`${token.network}:${token.address}`}>
                {(hasToken) => (
                  <FeedForToken
                    disabledInteractions={!hasToken || (token.is721 && !isActiveEntityFromFamily)}
                    className="feed-for-token"
                    style={{ marginTop: '60px' }}
                    token={token}
                  />
                )}
              </DoesActiveEntityHasToken>
            )}
          </IsActiveEntityFromFamily>
        </div>
        <div className="column is-3 is-offset-1">
          <FlatContainer>
            <H3>In social</H3>
            <Link to={`${match.url}/social`}>
              <SeeMore style={{ marginBottom: '15px' }}>See more</SeeMore>
            </Link>
            <Social asset={`${token.network}:${token.address}`} social="github" limit={2} />
            <Social asset={`${token.network}:${token.address}`} social="twitter" limit={2} />
            <Social asset={`${token.network}:${token.address}`} social="instagram" limit={2} />
            <Social asset={`${token.network}:${token.address}`} social="facebook" limit={2} />
          </FlatContainer>
          <hr/>
          <FlatContainer>
            <H3>VIP</H3>
            <AppContext.Consumer>
              {({ boostStore: { getBoosts } }) => <Catvertised token={token.is721?token.payments.token:token.network+':'+token.address} owner={token.payments.owner} getBoosts={getBoosts}/>}
            </AppContext.Consumer>
          </FlatContainer>
        </div>
      </div>
    </ContentContainer>
  </React.Fragment>
);

const Hero = styled.div`
  background: ${({ primaryColor }) => primaryColor};
  color: ${({ secondaryColor }) => secondaryColor};
  padding-top: 65px;
  height: calc(15rem + 65px);
  margin-bottom: 68px;

  @media (max-width: 770px) {
    height: 7.5rem;
  }
`;

const Back = Link.withComponent('div');

const BackArrow = styled.div`
  transition: transform 0.3s;

  ${Back}:hover & {
    transform: translateX(-3px);
  }
`;

const SeeMore = styled.span`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  color: #264dd9;

  &::after {
    margin-left: 10px;
    display: inline-block;
    transition: transform 0.3s;
    content: '→';
  }

  :hover {
    &::after {
      transform: translateX(3px);
    }
  }
`;

const RecentlyActive = ({ limit = Number.MAX_SAFE_INTEGER }) => (
  <React.Fragment>
    <IsLoading>
      <Loader />
    </IsLoading>
    <DiscoveryContext.Consumer>
      {({ latest }) => (
        <div className="columns is-multiline">
          {latest
            .filter(hasValidContext)
            .slice(0, limit)
            .map(({ context, created_at }) => (
              <EntityContainer key={context} to={`/${context}`} className="column is-one-third">
                <LinkedEntityAvatar id={context} size="medium" />
                <EntityInfo>
                  <Link
                    to={`/${context}`}
                    style={{ fontSize: '18px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                  >
                    <EntityName id={context} />
                  </Link>
                  <Timeago>{timeago().format(created_at)}</Timeago>
                </EntityInfo>
              </EntityContainer>
            ))}
        </div>
      )}
    </DiscoveryContext.Consumer>
  </React.Fragment>
);

const RecentlyActivePage = ({ token }) => (
  <React.Fragment>
    <Hero
      primaryColor={token.primaryColor}
      secondaryColor={token.secondaryColor}
      className="is-flex"
      style={{ alignItems: 'center' }}
    >
      <ContentContainer style={{ flex: 1 }}>
        <Link to={`/discover/byToken/${token.symbol}`}>
          <Back className="columns is-mobile" style={{ color: token.secondaryColor, opacity: 0.6 }}>
            <div className="column is-1">
              <BackArrow>
                <H2 className="is-pulled-right">←</H2>
              </BackArrow>
            </div>
            <div className="column">
              <H2>
                <TokenImage token={token} style={{ width: '23px', height: '23px', marginRight: '10px' }} />
                {token.name}
              </H2>
            </div>
          </Back>
        </Link>
        <div className="columns is-mobile">
          <div className="column is-offset-1">
            <H1>Recently active</H1>
          </div>
        </div>
      </ContentContainer>
    </Hero>
    <ContentContainer>
      <FlatContainer>
        <RecentlyActive asset={`${token.network}:${token.address}`} />
      </FlatContainer>
    </ContentContainer>
  </React.Fragment>
);

const Social = ({ social, limit = Number.MAX_SAFE_INTEGER }) => {
  const Icon = socialIcons[social];

  return (
    <React.Fragment>
      <SocialHeader style={{ marginBottom: '15px' }}>
        <Icon style={{ width: '16px', height: '16px', marginRight: '10px' }} />
        {social}
      </SocialHeader>
      <IsLoading>
        <Loader />
      </IsLoading>
      <div className="columns is-multiline">
        <DiscoveryContext.Consumer>
          {(data) =>
            data[social]
              .filter(hasValidContext)
              .slice(0, limit)
              .map(({ context, target }) => (
                <EntityContainer key={context} className="column is-12">
                  <LinkedEntityAvatar id={context} size="medium" />
                  <EntityInfo>
                    <Link to={`/${context}`}>
                      <EntityName id={context} />
                    </Link>
                    <a href={target} target="_blank" rel="noopener">
                      <SocialUsername link={target} />
                    </a>
                  </EntityInfo>
                </EntityContainer>
              ))
          }
        </DiscoveryContext.Consumer>
      </div>
    </React.Fragment>
  );
};
const SocialHeader = styled.p`
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 600;
`;

const SocialPage = ({ token }) => (
  <React.Fragment>
    <Hero
      primaryColor={token.primaryColor}
      secondaryColor={token.secondaryColor}
      className="is-flex"
      style={{ alignItems: 'center' }}
    >
      <ContentContainer style={{ flex: 1 }}>
        <Link to={`/discover/byToken/${token.symbol}`}>
          <Back className="columns is-mobile" style={{ color: token.secondaryColor, opacity: 0.6 }}>
            <div className="column is-1">
              <BackArrow>
                <H2 className="is-pulled-right">←</H2>
              </BackArrow>
            </div>
            <div className="column">
              <H2>
                <TokenImage token={token} style={{ width: '23px', height: '23px', marginRight: '10px' }} />
                {token.name}
              </H2>
            </div>
          </Back>
        </Link>
        <div className="columns is-mobile">
          <div className="column is-offset-1">
            <H1>In Media</H1>
          </div>
        </div>
      </ContentContainer>
    </Hero>
    <ContentContainer>
      <div className="columns">
        <div className="column is-one-fourth">
          <FlatContainer>
            <Social asset={`${token.network}:${token.address}`} social="github" />
          </FlatContainer>
        </div>
        <div className="column is-one-fourth">
          <FlatContainer>
            <Social asset={`${token.network}:${token.address}`} social="twitter" />
          </FlatContainer>
        </div>
        <div className="column is-one-fourth">
          <FlatContainer>
            <Social asset={`${token.network}:${token.address}`} social="instagram" />
          </FlatContainer>
        </div>
        <div className="column is-one-fourth">
          <FlatContainer>
            <Social asset={`${token.network}:${token.address}`} social="facebook" />
          </FlatContainer>
        </div>
      </div>
    </ContentContainer>
  </React.Fragment>
);

const FeedPage = ({ token }) => (
  <React.Fragment>
    <Hero
      primaryColor={token.primaryColor}
      secondaryColor={token.secondaryColor}
      className="is-flex"
      style={{ alignItems: 'center' }}
    >
      <ContentContainer style={{ flex: 1 }}>
        <Link to={`/discover/byToken/${token.symbol}`}>
          <Back className="columns is-mobile" style={{ color: token.secondaryColor, opacity: 0.6 }}>
            <div className="column is-1">
              <BackArrow>
                <H2 className="is-pulled-right">←</H2>
              </BackArrow>
            </div>
            <div className="column">
              <H2>
                <TokenImage token={token} style={{ width: '23px', height: '23px', marginRight: '10px' }} />
                {token.name}
              </H2>
            </div>
          </Back>
        </Link>
        <div className="columns is-mobile">
          <div className="column is-offset-1">
            <H1>Feed</H1>
          </div>
        </div>
      </ContentContainer>
    </Hero>
    <ContentContainer>
      <IfActiveEntityHasToken asset={`${token.network}:${token.address}`} other={<NoTokensWarning token={token} />}>
        {token.is721 ? (
          <IfActiveEntityIs
            asset={`${token.network}:${token.address}`}
            other={<ActiveEntityIsNotFromFamily token={token} />}
          >
            <FormContainer>
              <ConnectedClubForm token={token} Form={CommentForm} />
            </FormContainer>
          </IfActiveEntityIs>
        ) : (
          <FormContainer>
            <ConnectedClubForm token={token} Form={CommentForm} />
          </FormContainer>
        )}
      </IfActiveEntityHasToken>
      <IsActiveEntityFromFamily asset={`${token.network}:${token.address}`}>
        {(isActiveEntityFromFamily) => (
          <DoesActiveEntityHasToken asset={`${token.network}:${token.address}`}>
            {(hasToken) => (
              <FeedForToken
                disabledInteractions={!hasToken || (token.is721 && !isActiveEntityFromFamily)}
                className="feed-for-token"
                style={{ marginTop: '60px' }}
                token={token}
              />
            )}
          </DoesActiveEntityHasToken>
        )}
      </IsActiveEntityFromFamily>
    </ContentContainer>
  </React.Fragment>
);

const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  if (token.indexOf(':') !== -1) {
    const [network, address] = token.split(':');
    return !!find({ network, address })(ercs20);
  }

  return !!find({ symbol: token })(ercs20);
};

const validateTokenParam = validateParams(
  {
    token: isTokenValid,
  },
  '/404',
);

const mapTokenUrlParam = (Cmp) => (props) => {
  const { token } = props.match.params;

  let erc20Token;
  if (token.indexOf(':') === -1) {
    erc20Token = find({ symbol: token })(ercs20);
  } else {
    const [network, address] = token.split(':');
    erc20Token = find({ network, address })(ercs20);
  }

  return <Cmp token={erc20Token} {...props} />;
};

const decoratedByTokenIndex = validateTokenParam(mapTokenUrlParam(ByTokenIndex));

const TokenTile = ({ linkTo, token, ...restProps }) => {
  return (
    <Link to={linkTo} {...restProps}>
      <TokenTileCotainer
        primaryColor={token.primaryColor}
        secondaryColor={token.secondaryColor}
        coverImage={token.coverImage}
        shadowColor={token.shadowColor}
      >
        <TokenTileWrapper>
          <TokenImage token={token} style={{ width: '40px', height: '40px' }} />
          <div>
            <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{token.symbol}</p>
            <H3>{token.name}</H3>
          </div>
        </TokenTileWrapper>
      </TokenTileCotainer>
    </Link>
  );
};

const IsLoading = ({ children }) => (
  <DiscoveryContext.Consumer>{({ loading }) => loading && children}</DiscoveryContext.Consumer>
);

const NoTokensWarning = ({ token }) => (
  <WarningContainer style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
    <ExclamationMark style={{ marginRight: '30px' }} />
    <div>
      <p style={{ fontSize: '21px' }}>You can’t participate</p>
      <p style={{ fontSize: '14px' }}>Acquire {token.name} to join this club</p>
    </div>
  </WarningContainer>
);

const ActiveEntityIsNotFromFamily = ({ token }) => (
  <WarningContainer style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
    <ExclamationMark style={{ marginRight: '30px' }} />
    <div>
      <p style={{ fontSize: '21px' }}>You can’t participate</p>
      <p style={{ fontSize: '14px' }}>Switch your avatar to {token.name}</p>
    </div>
  </WarningContainer>
);

export class FeedForToken extends Component {
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
    const { token } = this.props;
    const asset = `${token.network}:${token.address}`;

    try {
      const { items } = await getRanking([
        {
          algorithm: 'cryptoverse_club_feed',
          params: { id: asset },
        },
        {
          algorithm: token.is721 ? 'experimental_filter_origin' : 'experimental_author_balance',
          params: { asset },
        },
      ]);
      const feedItems = items.filter(isValidFeedItem);
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
    const { className, style, token, disabledInteractions } = this.props;
    const { loading, feedLoadingMore, feedItems, visibleItemsCount } = this.state;
    const asset = `${token.network}:${token.address}`;

    return (
      <AppContext.Consumer>
        {({ feedStore: { temporaryFeedItems, temporaryReplies, temporaryReactions } }) => {
          const filteredTemporaryFeedItems = temporaryFeedItems
            .filter(({ type, about }) => type === 'post_club' && about === asset)
            .map((item) => ({ ...item, type: 'regular' }));

          const allFeedItems = pipe(
            uniqBy('id'),
            sortBy('created_at'),
            reverse,
          )([...feedItems.slice(0, visibleItemsCount), ...filteredTemporaryFeedItems]);

          return (
            <Feed
              disabledInteractions={disabledInteractions}
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
    );
  }
}

const TokenTileCotainer = styled.div`
  background-color: ${({ primaryColor }) => primaryColor};
  background-image: url(${({ coverImage }) => coverImage});
  background-repeat: no-repeat;
  background-size: cover;
  color: ${({ secondaryColor }) => secondaryColor};
  box-shadow: 0 3rem 5rem -2rem ${({ shadowColor }) => shadowColor};
  cursor: pointer;
  position: relative;
  width: 100%;
  padding-top: 105%;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s;
  transition: all 0.15s ease;

  :hover {
    transform: translateY(-3px);
    box-shadow: 0 3rem 6rem -2rem ${({ shadowColor }) => shadowColor};
    transition: all 0.15s ease;
  }

  :active {
    transform:scale(0.98);
    box-shadow: 0 3rem 4rem -2rem ${({ shadowColor }) => shadowColor};
    transitionn: all 0.15s ease;
  }
`;

const TokenTileWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
`;

const FormContainer = styled.div`
  border-radius: 12px;
  padding: 15px;
  background-color: #ffffff;
  border: solid 1px #f0eef6;
`;

const EntityContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EntityInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  overflow: hidden;
`;

const Timeago = styled.p`
  color: rgb(146, 143, 155);
`;
