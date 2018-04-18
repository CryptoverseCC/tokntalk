import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import find from 'lodash/fp/find';
import keyBy from 'lodash/fp/keyBy';
import produce from 'immer';
import Context from './Context';
import IndexPage from './IndexPage';
import ShowPage from './ShowPage';
import { getMyEntities, getWeb3State, sendMessage, reply, react, label, getLabels } from './api';
import { getEntityData } from './entityApi';
import Header from './Header';

const { REACT_APP_NAME: APP_NAME, REACT_APP_BASENAME: BASENAME } = process.env;

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
    temporaryFeedItems: [],
    temporaryReplies: {},
    temporaryReactions: {},
    from: undefined,
    provider: undefined
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
    this.setState({ activeEntity: newActiveEntity }, this.saveActiveEntity);
  };

  saveActiveEntity = () => {
    const { activeEntity } = this.state;
    if (activeEntity) this.storage.setItem('activeEntity', JSON.stringify(activeEntity));
  };

  refreshWeb3State = async () => {
    const { from, isListening, provider } = await getWeb3State();
    if (this.state.from !== from) this.refreshMyEntities();
    this.setState({ from, isListening, provider });
  };

  getEntityLabels = async entityId => {
    if (this.entityLabelRequests[entityId]) return;
    const entityLabelRequest = getLabels(entityId);
    this.entityLabelRequests[entityId] = entityLabelRequest;
    const labels = await entityLabelRequest;
    this.setState({ entityLabels: { ...this.state.entityLabels, [entityId]: labels } });
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
    return {
      image_url: undefined,
      color: undefined,
      id: entityId,
      name: undefined,
      ...entityInfo,
      ...entityLabels
    };
  };

  sendMessage = async message => {
    const temporaryFeedItem = await sendMessage(this.state.activeEntity.token, message);
    this.setState({ temporaryFeedItems: [temporaryFeedItem, ...this.state.temporaryFeedItems] });
  };

  reply = async (message, about) => {
    const { token } = this.state.activeEntity;
    const temporaryReply = await reply(token, message, about);
    this.setState(
      produce(draft => {
        draft.temporaryReplies[about] = [...(draft.temporaryReplies[about] || []), temporaryReply];
      })
    );
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
    const temporaryLabel = await label(token, message, labelType);
    this.setState(
      produce(draft => {
        draft.entityLabels[token][labelType] = temporaryLabel;
      })
    );
  };

  updateFeedItems = (feedItems, purge) => {
    this.setState(
      produce(draft => {
        if (purge) {
          draft.feedItems = feedItems;
          draft.shownFeedItemsCount = 10;
        } else {
          const previousFeedItems = keyBy('id')(draft.feedItems);
          const previousFeedItemsLength = draft.feedItems.length;
          draft.feedItems = feedItems.map(feedItem => ({
            ...feedItem,
            added: previousFeedItemsLength > 0 && !previousFeedItems[feedItem.id]
          }));
        }
      })
    );
  };

  showMoreFeedItems = (count = 5) => {
    this.setState({ shownFeedItemsCount: this.state.shownFeedItemsCount + count });
  };

  renderIndexPage = props => <IndexPage {...props} updateFeedItems={this.updateFeedItems} />;

  renderShowPage = props => (
    <ShowPage {...props} updateFeedItems={this.updateFeedItems} getEntityInfo={this.getEntityInfo} />
  );

  render() {
    const {
      renderIndexPage,
      renderShowPage,
      changeActiveEntityTo,
      getEntityInfo,
      sendMessage,
      reply,
      react,
      label,
      getEntity,
      showMoreFeedItems
    } = this;
    const {
      activeEntity,
      myEntities,
      feedItems,
      shownFeedItemsCount,
      entityInfo,
      temporaryFeedItems,
      temporaryReplies,
      temporaryReactions,
      allowAddingFeedItem,
      provider,
      from
    } = this.state;
    return (
      <Context.Provider
        value={{
          entityStore: { getEntity, myEntities, changeActiveEntityTo, activeEntity, entityInfo, getEntityInfo },
          feedStore: {
            sendMessage,
            reply,
            react,
            label,
            feedItems,
            shownFeedItemsCount,
            showMoreFeedItems,
            temporaryFeedItems,
            temporaryReplies,
            temporaryReactions,
            allowAddingFeedItem
          },
          web3Store: {
            provider,
            from
          }
        }}
      >
        <Router basename={BASENAME}>
          <React.Fragment>
            <Header />
            <Switch>
              <Route exact path="/:entityId" component={renderShowPage} />
              <Route exact path="/" component={renderIndexPage} />
            </Switch>
          </React.Fragment>
        </Router>
      </Context.Provider>
    );
  }
}
