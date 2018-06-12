import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import find from 'lodash/fp/find';
import produce from 'immer';
import Context from './Context';
import IndexPage from './IndexPage';
import ShowPage from './ShowPage';
import {
  getMyEntities,
  getWeb3State,
  sendMessage,
  reply,
  react,
  label,
  writeTo,
  getLabels,
  getBoosts,
  boost,
  getFeedItems
} from './api';
import { getEntityData } from './entityApi';
import Header from './Header';
import { PositionedFooter } from './Footer';
import NetworkWarning from './NetworkWarning';
import FAQPage from './FAQPage';

const {
  REACT_APP_NAME: APP_NAME,
  REACT_APP_BASENAME: BASENAME,
  REACT_APP_INTERFACE_BOOST_NETWORK: INTERFACE_BOOST_NETWORK,
  REACT_APP_DEFAULT_TOKEN_ID: DEFAULT_TOKEN_ID
} = process.env;

const Storage = (storage = localStorage) => ({
  getItem(key) {
    return localStorage.getItem(`${APP_NAME}_${key}`);
  },
  setItem(key, value) {
    return localStorage.setItem(`${APP_NAME}_${key}`, value);
  }
});

export const produceEntities = (myEntities, previousActiveEntity) => {
  const activeEntity = find(previousActiveEntity)(myEntities) || myEntities[0];
  return { myEntities, activeEntity };
};

export default class App extends Component {
  entityInfoRequests = {};
  entityLabelRequests = {};
  storage = Storage();

  state = {
    activeEntity: undefined,
    myEntities: [],
    entityInfo: JSON.parse(this.storage.getItem('entityInfo') || '{}'),
    entityLabels: {},
    feedItems: [],
    shownFeedItemsCount: 10,
    feedLoading: false,
    feedLoadingMore: false,
    feedId: undefined,
    temporaryFeedItems: [],
    temporaryReplies: {},
    temporaryReactions: {},
    boosts: {},
    from: undefined,
    provider: undefined,
    networkName: undefined
  };

  componentDidMount() {
    this.refreshWeb3State();
    setInterval(this.refreshWeb3State, 2000);
    this.refreshMyEntities();
    setInterval(this.refreshMyEntities, 15000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState);
  }

  refreshMyEntities = async () => {
    this.setState(produceEntities(await getMyEntities(), this.previousActiveEntity()), this.saveActiveEntity);
  };

  previousActiveEntity = () => {
    return JSON.parse(this.storage.getItem('activeEntity') || 'null');
  };

  changeActiveEntityTo = newActiveEntity => {
    const activeEntity = find({ token: newActiveEntity.id.toString() })(this.state.myEntities);
    this.setState({ activeEntity }, this.saveActiveEntity);
  };

  saveActiveEntity = () => {
    const { activeEntity } = this.state;
    if (activeEntity) this.storage.setItem('activeEntity', JSON.stringify(activeEntity));
  };

  refreshWeb3State = async () => {
    const { from, isListening, provider, networkName } = await getWeb3State();
    if (this.state.from !== from) this.refreshMyEntities();
    this.setState({ from, isListening, provider, networkName });
  };

  getEntityLabels = async entityId => {
    if (this.entityLabelRequests[entityId]) return;
    const entityLabelRequest = getLabels(entityId);
    this.entityLabelRequests[entityId] = entityLabelRequest;
    const labels = await entityLabelRequest;
    this.setState({
      entityLabels: { ...this.state.entityLabels, [entityId]: labels }
    });
  };

  getEntityInfo = async entityId => {
    if (this.entityInfoRequests[entityId]) return;
    const entityInfoRequest = getEntityData(entityId);
    this.entityInfoRequests[entityId] = entityInfoRequest;
    const entityData = await entityInfoRequest;
    this.setState({ entityInfo: { ...this.state.entityInfo, [entityId]: entityData } }, () => {
      this.storage.setItem('entityInfo', JSON.stringify(this.state.entityInfo));
    });
  };

  getEntity = entityId => {
    const entityInfo = this.state.entityInfo[entityId];
    if (!entityInfo) this.getEntityInfo(entityId);
    const entityLabels = this.state.entityLabels[entityId];
    if (!entityLabels) this.getEntityLabels(entityId);
    const boost = this.state.boosts[entityId] || { score: 0 };
    const boostValue = boost.score;
    return {
      image_url: undefined,
      color: undefined,
      id: entityId,
      name: undefined,
      boostValue,
      ...entityInfo,
      ...entityLabels
    };
  };

  getBoosts = async tokenId => {
    const boosts = await getBoosts(tokenId);
    if (this.state.feedId === tokenId || (this.state.feedId === undefined && tokenId === DEFAULT_TOKEN_ID)) {
      this.setState({ boosts });
    }
  };

  get isBoostable() {
    return this.state.from && this.state.networkName === INTERFACE_BOOST_NETWORK;
  }

  sendMessage = async message => {
    const temporaryFeedItem = await sendMessage(this.state.activeEntity.token, message);
    this.setState({
      temporaryFeedItems: [temporaryFeedItem, ...this.state.temporaryFeedItems]
    });
  };

  reply = async (message, to) => {
    const { token } = this.state.activeEntity;
    const temporaryReply = await reply(token, message, to);
    this.setState(
      produce(draft => {
        draft.temporaryReplies[to] = [...(draft.temporaryReplies[to] || []), temporaryReply];
      })
    );
  };

  writeTo = async (message, tokenTo) => {
    const { token } = this.state.activeEntity;
    const temporaryFeedItem = await writeTo(token, message, tokenTo);
    this.setState({
      temporaryFeedItems: [temporaryFeedItem, ...this.state.temporaryFeedItems]
    });
  };

  react = async to => {
    const { token } = this.state.activeEntity;
    const temporaryReaction = await react(token, to);
    this.setState(
      produce(draft => {
        draft.temporaryReactions[to] = [...(draft.temporaryReactions[to] || []), temporaryReaction];
      })
    );
  };

  label = async (message, labelType) => {
    const { token } = this.state.activeEntity;
    const temporaryFeedItem = await label(token, message, labelType);
    this.setState(
      produce(draft => {
        draft.entityLabels[token][labelType] = temporaryFeedItem.target.id;
        draft.temporaryFeedItems = [temporaryFeedItem, ...draft.temporaryFeedItems];
      })
    );
  };

  getFeedItems = async catId => {
    try {
      this.setState({ feedLoading: true, feedId: catId }, async () => {
        const { feedItems, total: feedItemsCount } = await getFeedItems({ size: 10, catId });
        if (this.state.feedId !== catId) return;
        this.setState({ feedLoading: false, feedItems, feedItemsCount });
      });
    } catch (e) {
      console.warn('Failed to download feedItems');
    }
  };

  getNewFeedItems = async catId => {
    try {
      const before = this.state.feedItems[0] ? this.state.feedItems[0].id : undefined;
      const { feedItems: newFeedItems, total: feedItemsCount } = await getFeedItems({ before, catId, size: 10 });
      const addedFeedItems = newFeedItems.map(item => ({ ...item, added: true }));
      if (this.state.feedId !== catId) return;
      this.setState(({ feedItems }) => ({ feedItems: [...addedFeedItems, ...feedItems], feedItemsCount }));
    } catch (e) {
      console.warn('Failed to download feedItems');
    }
  };

  getMoreFeedItems = async catId => {
    if (this.state.feedLoadingMore || this.state.feedItemsCount <= this.state.feedItems.length) return;
    try {
      this.setState({ feedLoadingMore: true }, async () => {
        const after = this.state.feedItems[this.state.feedItems.length - 1].id;
        const { feedItems: moreFeedItems, total: feedItemsCount } = await getFeedItems({ size: 10, after, catId });
        if (this.state.feedId !== catId) return;
        this.setState(({ feedItems }) => ({
          feedLoadingMore: false,
          feedItems: [...feedItems, ...moreFeedItems],
          feedItemsCount
        }));
      });
    } catch (e) {
      console.warn('Failed to download more feedItems');
    }
  };

  renderIndexPage = props => (
    <IndexPage {...props} getFeedItems={this.getFeedItems} getNewFeedItems={this.getNewFeedItems} />
  );

  renderFaqPage = props => <FAQPage />;

  renderShowPage = props => (
    <ShowPage
      {...props}
      getFeedItems={this.getFeedItems}
      getNewFeedItems={this.getNewFeedItems}
      getEntityInfo={this.getEntityInfo}
    />
  );

  render() {
    const {
      renderIndexPage,
      renderShowPage,
      renderFaqPage,
      changeActiveEntityTo,
      getEntityInfo,
      sendMessage,
      reply,
      writeTo,
      react,
      label,
      getEntity,
      getMoreFeedItems,
      isBoostable,
      getBoosts
    } = this;
    const {
      activeEntity,
      myEntities,
      feedItems,
      isGettingMoreFeedItems,
      feedLoading,
      entityInfo,
      temporaryFeedItems,
      temporaryReplies,
      temporaryReactions,
      allowAddingFeedItem,
      provider,
      from,
      networkName,
      boosts
    } = this.state;
    return (
      <Context.Provider
        value={{
          entityStore: {
            getEntity,
            myEntities,
            changeActiveEntityTo,
            activeEntity,
            entityInfo,
            getEntityInfo
          },
          feedStore: {
            sendMessage,
            reply,
            writeTo,
            react,
            label,
            feedItems,
            feedLoading,
            isGettingMoreFeedItems,
            getMoreFeedItems,
            temporaryFeedItems,
            temporaryReplies,
            temporaryReactions,
            allowAddingFeedItem
          },
          boostStore: {
            boost,
            boosts,
            isBoostable,
            getBoosts
          },
          web3Store: {
            provider,
            from,
            networkName
          }
        }}
      >
        <Router basename={BASENAME}>
          <React.Fragment>
            <NetworkWarning />
            <Header />
            <Switch>
              <Route exact path="/faq" component={renderFaqPage} />
              <Route exact path="/:entityId" component={renderShowPage} />
              <Route exact path="/" component={renderIndexPage} />
            </Switch>
            <PositionedFooter />
          </React.Fragment>
        </Router>
      </Context.Provider>
    );
  }
}
