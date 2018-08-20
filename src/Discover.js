import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import timeago from 'timeago.js';
import pipe from 'lodash/fp/pipe';
import uniqBy from 'lodash/fp/uniqBy';
import find from 'lodash/fp/find';

import { pageView } from './Analytics';
import Link from './Link';
import Feed from './Feed';
import Loader from './Loader';
import AppContext from './Context';
import { HeaderSpacer } from './Header';
import { Storage, validateParams } from './utils';
import clubs, { TokenImage } from './clubs';
import { ConnectedClubForm, CommentForm } from './CommentForm';
import { hasValidContext, getRanking, isValidFeedItem, enhanceFeedItem } from './api';
import AddToken from './AddToken';
import { SwitcherIcon, socialIcons, ExclamationMark } from './Icons';
import { FlatContainer, H1, H2, H3, H4, SocialUsername, ContentContainer } from './Components';
import {
  LinkedEntityAvatar,
  IfActiveEntity,
  IfActiveEntityIs,
  IsActiveEntityFromFamily,
  LinkedActiveEntityAvatar,
  ActiveEntityName,
  Entity,
  IfActiveEntityHasToken,
  DoesActiveEntityHasToken,
} from './Entity';
import exportIcon from './img/export.svg';
import { UnreadedCount, FEED_VERSION_KEY } from './UnreadedMessages';
import FeedTypeSwitcher from './FeedTypeSwitcher';

const H1Discover = styled.h1`
  margin: 60px 0;
  font-size: 4rem;
  font-weight: bold;
  line-height: 1.1;
  @media (max-width: 770px) {
    margin-left: 2%;
  }
`;

const H2Discover = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  @media (max-width: 770px) {
    margin-left: 2%;
  }
`;

const H3Discover = styled.h3`
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 1.5rem;
  font-weight: 600;
  @media (max-width: 770px) {
    margin-left: 2%;
  }
`;

const WarningContainerColored = styled.div`
  background: ${({ primaryColor }) => primaryColor};
  color: ${({ secondaryColor }) => secondaryColor};
  display: flex;
  align-items: center;
  font-weight: 600;
  border-radius: 12px;
  padding: 30px;
  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
  }
`;

const DiscoveryContext = React.createContext();

export default class Discover extends Component {
  componentDidMount() {
    pageView();
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      pageView();
      window.scrollTo(0, 0);
    }
  }

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
  state = {
    loading: true,
    score: [],
  };

  async componentDidMount() {
    try {
      const { items } = await getRanking([
        {
          algorithm: 'cryptoverse_clubs_sorted',
        },
      ]);
      this.setState({ loading: false, score: items });
    } catch (e) {
      console.warn(e);
      this.setState({ loading: false });
    }
  }

  renderEntityTokens = (entity) => (
    <div className="columns is-multiline">
      {this.renderTiles(
        entity.tokens.map((asset) => {
          const [network, address] = asset.split(':');
          return find({ network, address })(clubs);
        }),
      )}
    </div>
  );

  renderOthersTokens = () => (
    <div className="columns is-multiline">
      <AddToken className="column is-one-quarter" />
      {this.renderTiles(this.state.loading ? [] : this.sortByScore())}
    </div>
  );

  sortByScore = () => {
    const tokensMap = clubs.reduce((acc, item) => ({ ...acc, [`${item.network}:${item.address}`]: item }), {});
    return this.state.score.filter((item) => tokensMap[item.id]).map((item) => tokensMap[item.id]);
  };

  renderTiles = (tokens) => {
    const { match } = this.props;
    return (
      <React.Fragment>
        {tokens.map((token) => (
          <TokenTile
            linkTo={`${match.url}/byToken/${token.symbol}`}
            key={token.address}
            token={token}
            className="column is-one-quarter"
          />
        ))}
      </React.Fragment>
    );
  };

  render() {
    return (
      <ContentContainer>
        <HeaderSpacer />
        <H1Discover>
          Token
          <br />
          Communities
        </H1Discover>
        <div className="columns">
          <div className="column is-12">
            <IfActiveEntity
              then={(entityId) => (
                <Entity id={entityId}>
                  {(entity) => (
                    <React.Fragment>
                      <H3Discover>Yours</H3Discover>
                      {this.renderEntityTokens(entity)}
                      <H3Discover>Most active</H3Discover>
                      {this.renderOthersTokens()}
                    </React.Fragment>
                  )}
                </Entity>
              )}
              other={
                <React.Fragment>
                  <H3Discover>Most active</H3Discover> {this.renderOthersTokens()}
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
            <div className="column is-1" style={{ width: '60px', marginLeft: '20px' }}>
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
          <div className="column is-1" style={{ width: '60px', marginLeft: '20px' }}>
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
        <DiscoveryContext.Consumer>
          {({ latest }) => (
            <div className="column is-8">
              {latest > 0 && (
                <FlatContainer>
                  <H4>Recently active</H4>
                  <Link to={`${match.url}/recentlyActive`}>
                    <SeeMore style={{ marginBottom: '30px', fontWeight: '600' }}>See more</SeeMore>
                  </Link>
                  <RecentlyActive asset={`${token.network}:${token.address}`} limit={9} />
                </FlatContainer>
              )}
              <H3Discover style={{ marginTop: '60px', marginBottom: '30px' }}>
                Messages in this community
                {latest > 0 && (
                  <Link to={`${match.url}/feed`}>
                    <SeeMore>See more</SeeMore>
                  </Link>
                )}
              </H3Discover>
              <IfActiveEntityHasToken
                asset={`${token.network}:${token.address}`}
                other={<NoTokensWarning token={token} />}
              >
                {token.is721 ? (
                  <IfActiveEntityIs
                    asset={`${token.network}:${token.address}`}
                    other={<ActiveEntityIsNotFromFamily token={token} />}
                  >
                    <ClubForm token={token} />
                  </IfActiveEntityIs>
                ) : (
                  <ClubForm token={token} />
                )}
              </IfActiveEntityHasToken>
              <IsActiveEntityFromFamily asset={`${token.network}:${token.address}`}>
                {(isActiveEntityFromFamily) => (
                  <DoesActiveEntityHasToken asset={`${token.network}:${token.address}`}>
                    {(hasToken) => (
                      <FeedForToken
                        disabledInteractions={!hasToken || (token.is721 && !isActiveEntityFromFamily)}
                        className="feed-for-token"
                        token={token}
                      />
                    )}
                  </DoesActiveEntityHasToken>
                )}
              </IsActiveEntityFromFamily>
            </div>
          )}
        </DiscoveryContext.Consumer>
        <div className="column is-3 is-offset-1">
          <FlatContainer style={{ marginBottom: '4rem' }}>
            <H4 style={{ marginBottom: '30px' }}>External links</H4>
            <ul style={{ fontWeight: '600' }}>
              <li style={{ marginBottom: '7px' }}>
                <a href={`https://etherscan.io/address/${token.address}`}>Etherscan.io</a>
              </li>
              {token.externalLinks.map((entry) => {
                return (
                  <li key={entry.name} style={{ marginBottom: '7px' }}>
                    <a href={entry.url}>{entry.name}</a>
                  </li>
                );
              })}
            </ul>
          </FlatContainer>
          <FlatContainer>
            <H4>In social</H4>
            <Link to={`${match.url}/social`}>
              <SeeMore style={{ marginBottom: '30px' }}>See more</SeeMore>
            </Link>
            <Social asset={`${token.network}:${token.address}`} social="github" limit={2} />
            <Social asset={`${token.network}:${token.address}`} social="twitter" limit={2} />
            <Social asset={`${token.network}:${token.address}`} social="instagram" limit={2} />
            <Social asset={`${token.network}:${token.address}`} social="facebook" limit={2} />
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
    height: calc(20rem + 65px);
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
  display: block;
  font-size: 1rem;
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
            .map(enhanceFeedItem)
            .slice(0, limit)
            .map(({ context, context_info, isFromAddress, author, author_info, created_at }) => (
              <EntityContainer
                key={isFromAddress ? author : context}
                to={`/${isFromAddress ? author : context}`}
                className="column is-one-third"
              >
                <LinkedEntityAvatar
                  id={isFromAddress ? author : context}
                  entityInfo={isFromAddress ? author_info : context_info}
                  size="medium"
                />
                <EntityInfo>
                  <Link
                    to={`/${isFromAddress ? author : context}`}
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {isFromAddress ? author_info.name : context_info.name}
                  </Link>
                  <Timeago style={{ fontSize: '0.8rem' }}>{timeago().format(created_at)}</Timeago>
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
            <div className="column is-1" style={{ width: '60px', marginLeft: '20px' }}>
              <BackArrow>
                <H2 className="is-pulled-right">←</H2>
              </BackArrow>
            </div>
            <div className="column">
              <H2>
                <TokenImage
                  token={token}
                  style={{
                    width: '23px',
                    height: '23px',
                    marginRight: '10px',
                    marginBottom: '-3px',
                  }}
                />
                {token.name}
              </H2>
            </div>
          </Back>
        </Link>
        <div className="columns is-mobile">
          <div className="column" style={{ marginLeft: '80px' }}>
            <H1 style={{ lineHeight: '1.1' }}>Recently active</H1>
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
      <SocialHeader style={{ marginBottom: '15px', marginTop: '15px' }}>
        <Icon style={{ width: '16px', height: '16px', marginRight: '10px', marginBottom: '-2px' }} />
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
              .map(enhanceFeedItem)
              .slice(0, limit)
              .map(({ context, context_info, target, isFromAddress, author, author_info }) => (
                <EntityContainer key={isFromAddress ? author : context} className="column is-12">
                  <LinkedEntityAvatar
                    id={isFromAddress ? author : context}
                    entityInfo={isFromAddress ? author_info : context_info}
                    size="medium"
                  />
                  <EntityInfo>
                    <Link to={`/${isFromAddress ? author : context}`}>
                      {isFromAddress ? author_info.name : context_info.name}
                    </Link>
                    <a href={target} target="_blank" rel="noopener">
                      <img alt="" src={exportIcon} style={{ marginRight: '5px' }} />
                      <SocialUsername
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: '#1b2437',
                        }}
                        link={target}
                      />
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
  font-size: 1rem;
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
            <div className="column is-1" style={{ width: '60px', marginLeft: '20px' }}>
              <BackArrow>
                <H2 className="is-pulled-right">←</H2>
              </BackArrow>
            </div>
            <div className="column">
              <H2>
                <TokenImage
                  token={token}
                  style={{
                    width: '23px',
                    height: '23px',
                    marginRight: '10px',
                    marginBottom: '-3px',
                  }}
                />
                {token.name}
              </H2>
            </div>
          </Back>
        </Link>
        <div className="columns is-mobile">
          <div className="column" style={{ marginLeft: '80px' }}>
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

const ClubForm = ({ token }) => (
  <IfActiveEntity>
    {({ entityId }) => (
      <FormContainer>
        <article className="media">
          <div className="media-left">
            <LinkedActiveEntityAvatar size="large" />
          </div>
          <div className="media-content">
            <div className="content">
              <Link
                to={`/${entityId}`}
                style={{
                  fontFamily: 'AvenirNext',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '20px',
                  marginTop: '10px',
                }}
              >
                <ActiveEntityName />
              </Link>
              <ConnectedClubForm token={token} Form={CommentForm} />
            </div>
          </div>
        </article>
      </FormContainer>
    )}
  </IfActiveEntity>
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
            <div className="column is-1" style={{ width: '60px', marginLeft: '20px' }}>
              <BackArrow>
                <H2 className="is-pulled-right">←</H2>
              </BackArrow>
            </div>
            <div className="column">
              <H2>
                <TokenImage
                  token={token}
                  style={{
                    width: '23px',
                    height: '23px',
                    marginRight: '10px',
                    marginBottom: '-3px',
                  }}
                />
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
            <ClubForm token={token} />
          </IfActiveEntityIs>
        ) : (
          <ClubForm token={token} />
        )}
      </IfActiveEntityHasToken>
      <IsActiveEntityFromFamily asset={`${token.network}:${token.address}`}>
        {(isActiveEntityFromFamily) => (
          <DoesActiveEntityHasToken asset={`${token.network}:${token.address}`}>
            {(hasToken) => (
              <FeedForToken
                disabledInteractions={!hasToken || (token.is721 && !isActiveEntityFromFamily)}
                className="feed-for-token"
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
    return !!find({ network, address })(clubs);
  }

  return !!find({ symbol: token })(clubs);
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
    erc20Token = find({ symbol: token })(clubs);
  } else {
    const [network, address] = token.split(':');
    erc20Token = find({ network, address })(clubs);
  }

  return <Cmp token={erc20Token} {...props} />;
};

const decoratedByTokenIndex = validateTokenParam(mapTokenUrlParam(ByTokenIndex));

export const TokenTile = ({ linkTo, token, small, ...restProps }) => {
  return (
    <Link to={linkTo} {...restProps}>
      <TokenTileCotainer
        small={small}
        primaryColor={token.primaryColor}
        secondaryColor={token.secondaryColor}
        coverImage={token.coverImage}
        shadowColor={token.shadowColor}
      >
        <TokenTileWrapper>
          <div className="is-flex">
            <TokenImage token={token} style={{ width: '40px', height: '40px' }} />
            {!small && <UnreadedCount token={token} />}
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{token.symbol}</p>
            {!small && <H3>{token.name}</H3>}
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
  <WarningContainerColored
    primaryColor={token.primaryColor}
    secondaryColor={token.secondaryColor}
    className="is-flex"
    style={{ alignItems: 'center' }}
  >
    <ExclamationMark style={{ marginRight: '30px', fill: token.secondaryColor }} />
    <div>
      <p style={{ fontSize: '1.5rem', color: token.secondaryColor, lineHeight: '1.2' }}>
        Acquire {token.name} to participate!
      </p>
      <p style={{ fontSize: '1rem', color: token.secondaryColor, opacity: '0.6' }}>
        Then you'll be able to join the conversation.
      </p>
    </div>
  </WarningContainerColored>
);

const ActiveEntityIsNotFromFamily = ({ token }) => (
  <WarningContainerColored
    primaryColor={token.primaryColor}
    secondaryColor={token.secondaryColor}
    className="is-flex"
    style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
  >
    <SwitcherIcon style={{ marginRight: '30px', fill: token.secondaryColor }} />
    <div>
      <p style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>Switch your avatar!</p>
      <p style={{ fontSize: '14px' }}>Change your character to {token.name} in the upper right corner</p>
    </div>
  </WarningContainerColored>
);

export class FeedForToken extends Component {
  storage = Storage();
  state = {
    feedType: 'new',
    loading: false,
    feedLoadingMore: false,
    feedItems: [],
    visibleItemsCount: 0,
  };

  componentDidMount() {
    this.fetchFeed();
  }

  setFeedVersion = async (version) => {
    const { token } = this.props;
    const latestVersions = JSON.parse(this.storage.getItem(FEED_VERSION_KEY));

    this.storage.setItem(
      FEED_VERSION_KEY,
      JSON.stringify({
        ...latestVersions,
        [`${token.network}:${token.address}`]: version,
      }),
    );
  };

  fetchFeed = async () => {
    this.setState({ loading: true });
    const { token } = this.props;
    const { feedType } = this.state;
    const asset = `${token.network}:${token.address}`;
    const version = Date.now();

    try {
      const { items } = await getRanking(
        [
          {
            algorithm: feedType === 'popular' ? 'cryptoverse_club_last_week_popular_feed' : 'cryptoverse_club_feed',
            params: { id: asset },
          },
          {
            algorithm: token.is721 ? 'experimental_filter_origin' : 'experimental_author_balance',
            params: { asset },
          },
        ],
        'api/decorate-with-opensea',
      );
      let feedItems = items.filter(isValidFeedItem).map(enhanceFeedItem);
      if (feedType === 'new') {
        feedItems = feedItems.sort((a, b) => b.created_at - a.created_at);
      }

      this.setState({ loading: false, feedItems, visibleItemsCount: feedItems.length > 10 ? 10 : feedItems.length });
      this.setFeedVersion(version);
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

  changeFeedType = (feedType) => {
    this.setState({ feedType }, this.fetchFeed);
  };

  render() {
    const { className, style, token, disabledInteractions } = this.props;
    const { loading, feedLoadingMore, feedItems, visibleItemsCount, feedType } = this.state;
    const asset = `${token.network}:${token.address}`;

    return (
      <React.Fragment>
        <FeedTypeSwitcher type={feedType} onChange={this.changeFeedType} style={{ margin: '2em 0' }} />
        <AppContext.Consumer>
          {({ feedStore: { temporaryFeedItems, temporaryReplies, temporaryReactions } }) => {
            const filteredTemporaryFeedItems = temporaryFeedItems
              .filter(({ type, about }) => type === 'post_club' && about === asset)
              .map((item) => ({ ...item, type: 'regular' }));

            // ToDo insert temporary between feedItems if needed
            const allFeedItems = pipe(uniqBy('id'))([
              ...(feedType === 'popular' ? [] : filteredTemporaryFeedItems),
              ...feedItems.slice(0, visibleItemsCount),
            ]);

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
      </React.Fragment>
    );
  }
}

const TokenTileCotainer = styled.div`
  background-color: ${({ primaryColor }) => primaryColor};
  background-image: ${({ coverImage, small }) => !small && `url(${coverImage})`};
  background-repeat: no-repeat;
  background-size: cover;
  color: ${({ secondaryColor }) => secondaryColor};
  box-shadow: ${({ shadowColor, small }) => !small && `0 3rem 5rem -2rem ${shadowColor}`};
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
    box-shadow: ${({ shadowColor, small }) => !small && `0 3rem 6rem -2rem  ${shadowColor}`};
    transition: all 0.15s ease;
  }

  :active {
    transform: scale(0.98);
    box-shadow: ${({ shadowColor, small }) => !small && `0 3rem 4rem -2rem  ${shadowColor}`};
    transitionn: all 0.15s ease;
  }

  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
    padding-top: ${({ small }) => !small && '50%'};

    background-size: 50%;
    background-position: 100% 50%;
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
  box-shadow: rgba(118, 103, 170, 0.12) 0px 2rem 3rem -1.5rem;
  border-radius: 12px;
  display: block;
  padding: 1.25rem;
  background-color: white;
  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
  }
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
  margin-top: 2px;
  max-width: 250px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Timeago = styled.p`
  color: rgb(146, 143, 155);
`;
