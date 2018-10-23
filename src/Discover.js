import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import timeago from 'timeago.js';
import { isAddress } from 'web3-utils';
import flow from 'lodash/flowRight';
import uniqBy from 'lodash/fp/uniqBy';
import find from 'lodash/fp/find';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { pageView } from './Analytics';
import Link, { A, defaultLinkCss } from './Link';
import Feed from './Feed';
import Loader from './Loader';
import AppContext from './Context';
import { Storage, validateParams, rewriteCmp, enhanceCustomClubProp } from './utils';
import clubs, { TokenImage, findClub } from './clubs';
import { ConnectedClubForm, CommentForm } from './CommentForm';
import { hasValidContext, getRanking, isValidFeedItem, enhanceFeedItem } from './api';
import { socialIcons } from './Icons';
import { FlatContainer, H1, H2, H3, H4, SocialUsername } from './Components';
import {
  LinkedEntityAvatar,
  IfActiveEntity,
  IsActiveEntityFromFamily,
  LinkedActiveEntityAvatar,
  DoesActiveEntityHasToken,
  EntityName,
} from './Entity';
import exportIcon from './img/export.svg';
import { FEED_VERSION_KEY } from './UnreadedMessages';
import FeedTypeSwitcher, { FeedTypeButton } from './FeedTypeSwitcher';
import { PromotionBox } from './promotion/PromotionBox';
import ProfileBox from './ProfileBox';
import { TokenTile, SmallTokenTile } from './TokenTile';
import { Intercom } from './Intercom';
import { CopyButton } from './Components';

import StatusBox from './StatusBox';

const WelcomeMessage = styled.div`
  border-radius: 12px;
  padding: 30px;
  background-color: #ecf1f9;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
  }
`;

const DisoveryTab = FeedTypeButton;

const DiscoveryContext = React.createContext();

export default class Discover extends Component {
  componentDidMount() {
    pageView();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      pageView();
    }
  }

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={IndexWithActiveEntity} />
        <Route path={`${match.url}/byToken/:token`} component={rewriteCmp('/byToken', '')} />
        <Route path={`${match.url}/:token`} component={decoratedByTokenIndex} />
      </Switch>
    );
  }
}

const IndexWithActiveEntity = ({ ...props }) => <Index {...props} />;

const Title = styled.div`
  margin: 30 0 15 0;

  @media (max-width: 770px) {
    margin: 3 0 2 0;
  }
`;

class Index extends Component {
  static TAB = {
    MOST_ACTIVE: 1,
    NEWEST: 2,
  };

  state = {
    currentTab: Index.TAB.MOST_ACTIVE,
  };

  render() {
    return (
      <React.Fragment>
        <div className="columns">
          <div className="column is-6">
            <Title>
              <H2>Token Clubs</H2>
            </Title>
            <p>Everything to keep up what’s happening around your tokens and to explore new opportunities.</p>
          </div>
          <div className="column is-3">
            <Title>
              <H4>Go to club</H4>
            </Title>
            <p style={{ fontSize: '0.8rem' }}>
              Talk in any ERC20 token club. We support them all!
              <br />
              Paste ERC20 contract address:
            </p>
            <GenerateClub />
          </div>
          <div className="column is-3">
            <Title>
              <H4>Make your token more visible</H4>
            </Title>
            <p style={{ fontSize: '0.8rem' }}>Add custom artwork to distinguish your token from the rest.</p>
            <Intercom>
              <AddToken>Add custom artwork</AddToken>
            </Intercom>
          </div>
        </div>
        <div style={{ margin: '15px 0' }}>
          <DisoveryTab
            selected={this.state.currentTab === Index.TAB.MOST_ACTIVE}
            onClick={() => this.setState({ currentTab: Index.TAB.MOST_ACTIVE })}
          >
            Most active
          </DisoveryTab>
          <DisoveryTab
            selected={this.state.currentTab === Index.TAB.NEWEST}
            onClick={() => this.setState({ currentTab: Index.TAB.NEWEST })}
          >
            Newest
          </DisoveryTab>
        </div>
        <div className="columns">
          <div className="column is-12">
            <DiscoveryTabContent
              {...this.props}
              getSortedClubs={discoveryMostActive}
              isActive={this.state.currentTab === Index.TAB.MOST_ACTIVE}
            />
            <DiscoveryTabContent
              {...this.props}
              getSortedClubs={discoveryNewest}
              isActive={this.state.currentTab === Index.TAB.NEWEST}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class DiscoveryTabContent extends Component {
  state = {
    loading: true,
    initialized: false,
    score: [],
  };

  async componentDidMount() {
    await this.updateItems(this.props.entity);
  }

  async componentWillReceiveProps(newProps) {
    const entityHasChanged = this.props.entity !== newProps.entity;
    if ((!this.state.initialized || entityHasChanged) && newProps.isActive) {
      await this.updateItems(newProps.entity);
    }
  }

  updateItems = async (entity) => {
    try {
      const items = await this.props.getSortedClubs(entity);
      this.setState({ loading: false, score: items, initialized: true });
    } catch (e) {
      console.warn(e);
      this.setState({ loading: false });
    }
  };

  render() {
    return this.props.isActive ? (
      this.state.loading ? (
        <Loader />
      ) : (
        <div className="columns is-multiline is-mobile">
          {this.renderTiles(this.state.loading ? [] : this.state.score)}
        </div>
      )
    ) : null;
  }

  renderTiles = (tokens) => {
    const { match } = this.props;
    return (
      <React.Fragment>
        {tokens.map((token, index) => (
          <EnhancedTokenTile club={token} index={index} match={match} key={token.address} />
        ))}
      </React.Fragment>
    );
  };
}

const EnhancedTokenTile = enhanceCustomClubProp('club', 'club')(
  ({ club, index, match }) =>
    index < 4 ? (
      <TokenTile
        linkTo={club.isCustom ? `${match.url}/${club.network}:${club.address}` : `${match.url}/${club.symbol}`}
        token={club}
        className="column is-one-quarter-tablet is-12-mobile"
      />
    ) : (
      <SmallTokenTile
        linkTo={club.isCustom ? `${match.url}/${club.network}:${club.address}` : `${match.url}/${club.symbol}`}
        token={club}
        className="column is-one-fifth-tablet is-half-mobile"
      />
    ),
);

const discoveryMostActive = async () => {
  let assets = clubs.map((club) => club.asset);
  const { items } = await getRanking([
    {
      algorithm: 'cryptoverse_clubs_sorted',
      params: { clubs: assets },
    },
  ]);
  return sortByScore(items);
};

const discoveryNewest = async () => {
  let assets = clubs.map((club) => club.asset);
  const { items } = await getRanking([
    {
      algorithm: 'cryptoverse_clubs_sorted_newest',
      params: { clubs: assets },
    },
  ]);
  return sortByScore(items);
};

const sortByScore = (score) => {
  return score.map((item) => findClub(item.id.split(':')[0], item.id.split(':')[1]));
};

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

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      this.fetchRanking();
    }
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
          <Route exact path={`${match.url}/recentlyActive`} component={rewriteCmp('/recentlyActive', '')} />
          <Route exact path={`${match.url}/social/:type`} render={(props) => <SocialPage {...props} token={token} />} />
          <Route exact path={`${match.url}/feed`} component={rewriteCmp('/feed', '')} />
        </Switch>
      </DiscoveryContext.Provider>
    );
  }
}

const ByToken = ({ token }) => (
  <React.Fragment>
    <div className="columns ordered-mobile">
      <div className="column is-3">
        <ProfileBox
          primaryColor={token.primaryColor}
          avatar={<TokenImage token={token} style={{ margin: '5px', width: '44px', height: '44px' }} />}
          coverImage={token.coverImage}
          coverImageStyle={{
            backgroundSize: '50%',
            backgroundPosition: '100% 50%',
          }}
        >
          <H2 style={{ overflow: 'hidden' }}>{token.name}</H2>
          <CopyButton value={token.address} name="address" />
          <ul style={{ fontWeight: '600', marginTop: '10px' }}>
            <li style={{ marginBottom: '7px' }}>
              <a href={`https://trivial.co/t/${token.address}`}>Research with Trivial.co</a>
            </li>
            <li style={{ marginBottom: '7px' }}>
              <a href={`https://etherscan.io/address/${token.address}`}>Etherscan.io</a>
            </li>
            {token.externalLinks.map((entry) => (
              <li key={entry.name} style={{ marginBottom: '7px' }}>
                <a href={entry.url}>{entry.name}</a>
              </li>
            ))}
          </ul>
        </ProfileBox>
        {token.promotionBox && (
          <FlatContainer style={{ marginTop: '30px' }}>
            <AppContext.Consumer>
              {({ boostStore: { getBoosts, getSupportings } }) => (
                <PromotionBox
                  getBoosts={getBoosts}
                  getSupportings={getSupportings}
                  asset={token.promotionBox.asset}
                  assetInfo={token.promotionBox.assetInfo}
                  token={token.promotionBox.recipient}
                  showPurrmoter={true}
                />
              )}
            </AppContext.Consumer>
          </FlatContainer>
        )}
      </div>
      <div className="column is-6 fl-1">
        {token.isCustom && <CustomClubInfo style={{ marginBottom: '-20px' }} />}
        <StatusBox check={token.is721 ? StatusBox.IsFromFamily(token) : StatusBox.HasToken(token)}>
          <ClubForm token={token} />
        </StatusBox>
        <IsActiveEntityFromFamily asset={`${token.network}:${token.address}`}>
          {(isActiveEntityFromFamily) => (
            <DoesActiveEntityHasToken token={token}>
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
      <div className="column is-3 is-hidden-mobile">
        <FlatContainer>
          <Members token={token} />
        </FlatContainer>
      </div>
    </div>
  </React.Fragment>
);

const tabCss = css`
  border-bottom: 2px #f0f1f6 solid;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  font-weight: 600;
  padding-left: 0;
  text-align: center;
`;

const selectedTabCss = css`
  cursor: unset;
  color: #264dd9;
  border-bottom: 2px #264dd9 solid;
`;

const MembersTab = styled.div`
  ${tabCss};

  .react-tabs__tab--selected > & {
    ${selectedTabCss};
  }
`;

const Members = ({ token }) => (
  <DiscoveryContext>
    {({ loading, latest, facebook, instagram, github, twitter }) => (
      <React.Fragment>
        <H4 style={{ marginBottom: '30px' }}>Members</H4>
        <IsLoading>
          <Loader />
        </IsLoading>
        <Tabs>
          <TabList className="columns is-mobile is-marginless" style={{ marginBottom: '15px' }}>
            <Tab className="column is-half is-paddingless">
              <MembersTab>Active</MembersTab>
            </Tab>
            <Tab className="column is-half is-paddingless">
              <MembersTab>In media</MembersTab>
            </Tab>
          </TabList>
          <TabPanel>
            <RecentlyActive limit={9} />
            {!loading && !latest.length && <NoActiveMembers />}
          </TabPanel>
          <TabPanel>
            {!loading &&
              !facebook.length &&
              !instagram.length &&
              !github.length &&
              !twitter.length && <NoActiveMembers />}
            <Social social="github" limit={2} token={token} />
            <Social social="twitter" limit={2} token={token} />
            <Social social="instagram" limit={2} token={token} />
            <Social social="facebook" limit={2} token={token} />
          </TabPanel>
        </Tabs>
      </React.Fragment>
    )}
  </DiscoveryContext>
);

const NoActiveMembers = styled.div.attrs({ children: () => 'No Active Members' })`
  margin-top: 15px;
  font-weight: 600;
`;

const ActiveAvatar = styled(LinkedEntityAvatar)`
  width: 40px;
  height: 40px;
`;

const RecentlyActive = ({ limit = Number.MAX_SAFE_INTEGER }) => (
  <div style={{ marginTop: '15px' }}>
    <DiscoveryContext.Consumer>
      {({ latest }) => (
        <div className="columns is-multiline is-mobile">
          {latest
            .filter(hasValidContext)
            .map(enhanceFeedItem)
            .slice(0, limit)
            .map(({ context, context_info, isFromAddress, author, author_info, created_at }) => (
              <EntityContainer
                key={isFromAddress ? author : context}
                to={`/${isFromAddress ? author : context}`}
                className="column is-12"
              >
                <ActiveAvatar
                  id={isFromAddress ? author : context}
                  entityInfo={isFromAddress ? author_info : context_info}
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
  </div>
);

const SocialAvatar = styled(LinkedEntityAvatar)`
  width: 40px;
  height: 40px;
`;

const Social = ({ token, social, limit = Number.MAX_SAFE_INTEGER }) => {
  const Icon = socialIcons[social];

  return (
    <DiscoveryContext.Consumer>
      {(data) => {
        const items = data[social]
          .filter(hasValidContext)
          .map(enhanceFeedItem)
          .slice(0, limit);

        return (
          <React.Fragment>
            {!data.loading && items.length ? (
              <SocialHeader style={{ marginBottom: '15px', marginTop: '25px', borderBottom: '1px solid #DDD' }}>
                {limit !== Number.MAX_SAFE_INTEGER ? (
                  <Link to={`${token.isCustom ? token.asset : token.symbol}/social/${social}`}>
                    <Icon style={{ width: '16px', height: '16px', marginRight: '10px', marginBottom: '-2px' }} />
                    {social}
                  </Link>
                ) : (
                  <React.Fragment>
                    <Icon style={{ width: '16px', height: '16px', marginRight: '10px', marginBottom: '-2px' }} />
                    {social}
                  </React.Fragment>
                )}
              </SocialHeader>
            ) : null}
            <div className="columns is-multiline">
              {items.map(({ context, context_info, target, isFromAddress, author, author_info }) => (
                <EntityContainer key={isFromAddress ? author : context} className="column is-12">
                  <SocialAvatar
                    id={isFromAddress ? author : context}
                    entityInfo={isFromAddress ? author_info : context_info}
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
              ))}
              {limit !== Number.MAX_SAFE_INTEGER && (
                <div className="column is-12">
                  <Link to={`${token.isCustom ? token.asset : token.symbol}/social/${social}`}>More ...</Link>
                </div>
              )}
            </div>
          </React.Fragment>
        );
      }}
    </DiscoveryContext.Consumer>
  );
};

const SocialPage = ({ token, match }) => {
  const socialType = match.params.type;

  return (
    <div className="columns">
      <div className="column is-3">
        <ProfileBox
          primaryColor={token.primaryColor}
          avatar={<TokenImage token={token} style={{ margin: '5px', width: '44px', height: '44px' }} />}
          coverImage={token.coverImage}
          coverImageStyle={{
            backgroundSize: '50%',
            backgroundPosition: '100% 50%',
          }}
        >
          <H2>{token.name}</H2>
          <ul style={{ fontWeight: '600', marginTop: '10px' }}>
            <li style={{ marginBottom: '7px' }}>
              <a href={`https://trivial.co/t/${token.address}`}>Research with Trivial.co</a>
            </li>
            <li style={{ marginBottom: '7px' }}>
              <a href={`https://etherscan.io/address/${token.address}`}>Etherscan.io</a>
            </li>
            {token.externalLinks.map((entry) => (
              <li key={entry.name} style={{ marginBottom: '7px' }}>
                <a href={entry.url}>{entry.name}</a>
              </li>
            ))}
          </ul>
        </ProfileBox>
        {token.promotionBox && (
          <FlatContainer style={{ marginTop: '30px' }}>
            <AppContext.Consumer>
              {({ boostStore: { getBoosts, getSupportings } }) => (
                <PromotionBox
                  getBoosts={getBoosts}
                  getSupportings={getSupportings}
                  asset={token.promotionBox.asset}
                  assetInfo={token.promotionBox.assetInfo}
                  token={token.promotionBox.recipient}
                  showPurrmoter={true}
                />
              )}
            </AppContext.Consumer>
          </FlatContainer>
        )}
      </div>
      <div className="column is-6">
        <FlatContainer style={{ maxWidth: 'unset' }}>
          <Social social={socialType} token={token} />
        </FlatContainer>
      </div>
    </div>
  );
};

const SocialHeader = styled.p`
  font-size: 1rem;
  text-transform: capitalize;
  font-weight: 600;
`;

const ClubFormAvatar = styled(LinkedActiveEntityAvatar)`
  width: 48px;
  height: 48px;
  margin-right: 15px;

  @media (max-width: 770px) {
    width: 32px;
    height: 32px;
    margin-right: 5px;
  }
`;

const ClubForm = ({ token }) => (
  <IfActiveEntity>
    {(entityId) => (
      <FormContainer>
        <article className="media">
          <ClubFormAvatar size="large" />
          <ConnectedClubForm token={token} Form={CommentForm} />
        </article>
      </FormContainer>
    )}
  </IfActiveEntity>
);

const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  if (token.indexOf(':') !== -1) {
    const [network, address] = token.split(':');
    return ['ethereum', 'kovan', 'rinkeby', 'ropsten'].indexOf(network) !== -1 && isAddress(address);
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
  let club;
  if (token.indexOf(':') === -1) {
    club = find({ symbol: token })(clubs);
  } else {
    const [network, address] = token.split(':');
    club = findClub(network, address);
  }

  return <Cmp token={club} {...props} />;
};

const decoratedByTokenIndex = flow(
  validateTokenParam,
  mapTokenUrlParam,
  enhanceCustomClubProp('token', 'token'),
)(ByTokenIndex);

const IsLoading = ({ children }) => (
  <DiscoveryContext.Consumer>{({ loading }) => loading && children}</DiscoveryContext.Consumer>
);

class CustomClubInfo extends Component {
  state = { open: false };

  static Button = styled.button`
    font-family: 'AvenirNext';
    font-weight: 600;
    border: none;
    outline: none;
    color: white;
    background-color: #264dd9;
    font-size: 1rem;
    padding: 0.5em;
    border-radius: 12px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    bottom: 10px;

    @media (max-width: 770px) {
      padding: 0.1em 0.5rem 0.1em 0.5rem;
    }
  `;

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render(props) {
    const { open } = this.state;

    return (
      <WelcomeMessage {...props}>
        <H1 style={{ fontSize: '3rem' }}>
          <span role="img">🎨</span>
        </H1>
        <div style={{ marginLeft: '30px' }}>
          <H3>Make this token more visible!</H3>
          {!open && <CustomClubInfo.Button onClick={this.toggle.bind(this)}>Show More</CustomClubInfo.Button>}
          {open && (
            <div>
              <p style={{ fontSize: '1rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                Help to list it officially on Tokntalk: send us relevant links and artworks.
                <br />
                <br />
                We would love to know: <b>Reddit</b>, <b>Twitter</b>, <b>Discord</b>, <b>Telegram</b>, etc., and artwork
                we should use to list this club in our `Newest clubs` tab and any other information that you think
                relevant.
              </p>
              <p>
                You can always contact us at{' '}
                <Link to="/thread/claim:0x35df61fa026498b5254b9dcf669b1f7baef9e09767de2f10c347f3e83e910b7869dae53cd906ee6e78b179053b2e9797eb2bc64fe1f1d0841a27aef222ade2681c">
                  Tokntalk
                </Link>{' '}
                or on <A href="https://t.me/joinchat/Ff2fyUYwRF7m3Vxew5UxnA">Telegram</A> if you have any questions.
              </p>
              <br />
              <br />
              You are <b>The Hero</b> this community deserves. <b>It's your time!</b>
              <CustomClubInfo.Button onClick={this.toggle.bind(this)}>Hide</CustomClubInfo.Button>
            </div>
          )}
        </div>
      </WelcomeMessage>
    );
  }
}

const RedditFeed = (props) => {
  const url = props.url + '.embed';

  return (
    <iframe
      title="reddit"
      style={{ width: '100%', height: 1500 }}
      srcDoc={`<html><body><script src=${url}></script></body></html>`}
    />
  );
};

class TwitterFeed extends Component {
  state = {
    Timeline: () => <span>Loading...</span>,
  };

  componentDidMount() {
    import('react-twitter-embed')
      .then((module) => this.setState({ Timeline: module.TwitterTimelineEmbed }))
      .catch(() => {});
  }

  render() {
    const profile = this.props.url.replace(/https:\/\/twitter.com\//, '');
    const { Timeline } = this.state;
    return <Timeline sourceType="profile" screenName={profile} options={{ height: 1500 }} />;
  }
}

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

  componentDidUpdate(oldProps) {
    if (oldProps.token !== this.props.token) {
      this.fetchFeed();
    }
  }

  setFeedVersion = async (version) => {
    const { token } = this.props;
    const latestVersions = JSON.parse(this.storage.getItem(FEED_VERSION_KEY));

    this.storage.setItem(
      FEED_VERSION_KEY,
      JSON.stringify({
        ...latestVersions,
        [token.asset]: version,
      }),
    );
  };

  fetchFeed = async () => {
    this.setState({ loading: true });
    const { token } = this.props;
    const { feedType } = this.state;
    const version = Date.now();

    try {
      const { items } = await getRanking(
        [
          {
            algorithm: feedType === 'popular' ? 'cryptoverse_club_last_week_popular_feed' : 'cryptoverse_club_feed',
            params: { id: token.asset },
          },
          {
            algorithm: token.is721 ? 'experimental_filter_origin' : 'experimental_author_balance',
            params: { asset: token.asset },
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

    const switcherOptions = [FeedTypeSwitcher.NEW, FeedTypeSwitcher.POPULAR];
    const redditURL = (token.externalLinks.find((item) => item.name === 'Reddit') || {}).url;
    const twitterURL = (token.externalLinks.find((item) => item.name === 'Twitter') || {}).url;

    if (redditURL) {
      switcherOptions.push(FeedTypeSwitcher.REDDIT);
    }
    if (twitterURL) {
      switcherOptions.push(FeedTypeSwitcher.TWITTER);
    }

    return (
      <React.Fragment>
        <FeedTypeSwitcher
          type={feedType}
          onChange={this.changeFeedType}
          options={switcherOptions}
          style={{ margin: '2em 0' }}
        />
        {feedType === FeedTypeSwitcher.REDDIT && <RedditFeed url={redditURL} />}
        {feedType === FeedTypeSwitcher.TWITTER && <TwitterFeed url={twitterURL} />}
        {feedType !== FeedTypeSwitcher.REDDIT &&
          feedType !== FeedTypeSwitcher.TWITTER && (
            <AppContext.Consumer>
              {({ feedStore: { temporaryFeedItems, temporaryReplies, temporaryReactions } }) => {
                const filteredTemporaryFeedItems = temporaryFeedItems
                  .filter(({ type, about }) => type === 'post_club' && about === asset)
                  .map((item) => ({ ...item, type: 'regular' }));

                // ToDo insert temporary between feedItems if needed
                const allFeedItems = uniqBy('id')([
                  ...(feedType === 'popular' ? [] : filteredTemporaryFeedItems),
                  ...feedItems.slice(0, visibleItemsCount),
                ]);

                return (
                  <Feed
                    isClubFeed
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
          )}
      </React.Fragment>
    );
  }
}

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
  padding: 5px 15px;
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

const AddToken = styled.div`
  ${defaultLinkCss};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 1.2rem 3rem -0.8rem rgba(132, 128, 173, 0.2);
  transition: all 0.2s cubic-bezier(0.5, 0, 0.1, 1), left 0s linear;
  :hover {
    box-shadow: 0 1.2rem 4rem -0.8rem rgba(132, 128, 173, 0.25);
    transform: translateY(-2px);
    transition: all 0.2s cubic-bezier(0.5, 0, 0.1, 1), left 0s linear;
  }
  :active {
    transform: scale(0.98);
    transition: all 0.2s cubic-bezier(0.5, 0, 0.1, 1), left 0s linear;
  }

  margin-top: 10px;
  height: 60px;

  @media (max-width: 770px) {
    height: 40px;
  }
`;

const GenerateContainer = styled.div`
  max-width: 440px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 10px;
  height: 64px;

  @media (max-width: 770px) {
    height: 44px;
  }
`;

const GenerateInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 6px;
  font-family: 'AvenirNext';
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 1.2rem 3rem -0.8rem rgba(132, 128, 173, 0.2);
  border-radius: 8px;
  height: 100%;
  outline: none;
  border: 1px solid #e4e6ea;
  padding-left: 15px;
  padding-bottom: calc(0.375em - 10px);
  transition: all 0.2s cubic-bezier(0.5, 0, 0.1, 1), left 0s linear;
  :focus {
    box-shadow: 0 1.2rem 4rem -0.8rem rgba(132, 128, 173, 0.25);
    border: 1px solid #a37fff;
    transition: all 0.2s cubic-bezier(0.5, 0, 0.1, 1), left 0s linear;
  }
`;

const GenerateInputContainer = styled.div`
  height: 60px;
  position: relative;
  @media (max-width: 770px) {
    width: 100%;
    height: 40px;
  }
`;

const GenerateButton = styled.button`
  cursor: pointer;
  background-color: #264dd9;
  padding: 16px 10px 15px 10px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  outline: none;
  border: none;
  border-radius: 6px;
  transition: all 0.2s ease;
  width: 'unset';

  &:disabled {
    cursor: not-allowed;
    background: #e4dcfb;
    transition: all 0.2s ease;
  }

  @media (max-width: 770px) {
    padding: 6px 10px 5px 10px;
  }
`;

const GenerateClub = withRouter(
  class extends Component {
    state = { isValid: false, contractAddress: '' };

    onChange = (e) => {
      const contractAddress = e.target.value;
      this.setState({ isValid: isAddress(contractAddress), contractAddress });
    };

    onGenerate = () => {
      this.props.history.push(`/clubs/ethereum:${this.state.contractAddress}`);
    };

    render() {
      const { style } = this.props;
      const { isValid, contractAddress } = this.state;

      return (
        <GenerateContainer style={style}>
          <GenerateInputContainer>
            <GenerateInput placeholder="0xAddress" value={contractAddress} onChange={this.onChange} />
            <GenerateButton
              disabled={!isValid}
              onClick={this.onGenerate}
              style={{
                position: 'absolute',
                right: '7px',
                top: '7px',
              }}
            >
              Go
            </GenerateButton>
          </GenerateInputContainer>
        </GenerateContainer>
      );
    }
  },
);
