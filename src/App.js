import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import Context from './Context';
import IndexPage from './IndexPage';
import ShowPage from './ShowPage';
import { downloadCats, downloadWeb3State, getCatData, sendMessage, reply, react, label, getCatLabels } from './api';
import Header from './Header';

const { REACT_APP_BASENAME: BASENAME } = process.env;

export default class App extends Component {
  state = {
    activeEntity: undefined,
    myEntities: [],
    entityInfo: JSON.parse(localStorage.getItem('entityInfo') || '{}'),
    entityLabels: {},
    feedItems: [],
    shownFeedItemsCount: 10,
    temporaryFeedItems: [],
    temporaryReplies: {},
    temporaryReactions: {},
    from: undefined
  };

  entityInfoRequests = {};
  entityLabelRequests = {};

  componentDidMount() {
    this.refreshWeb3State();
    setInterval(this.refreshWeb3State, 2000);
    this.refreshMyEntities();
    setInterval(this.refreshMyEntities, 15000);
  }

  refreshMyEntities = async () => {
    const myEntities = await downloadCats();
    if (!myEntities || isEqual(myEntities, this.state.myEntities)) return;
    const { activeEntity } = this.state;
    const newActiveEntity =
      (activeEntity && myEntities.find(myEntity => myEntity.token === activeEntity.token)) ||
      (JSON.parse(localStorage.getItem('activeEntity')) &&
        myEntities.find(myEntity => myEntity.token === JSON.parse(localStorage.getItem('activeEntity')).token)) ||
      myEntities[0];
    if (!newActiveEntity) return;
    this.setState({ myEntities });
    this.changeActiveEntityTo(newActiveEntity.token);
  };

  refreshWeb3State = async () => {
    const { from, isListening } = await downloadWeb3State();
    if (this.state.from !== from) {
      this.refreshMyEntities();
    }
    if (this.state.from !== from || this.state.isListening !== isListening) {
      this.setState({ from, isListening });
    }
  };

  getEntityLabels = async entityId => {
    if (this.entityLabelRequests[entityId]) return;
    const entityLabelRequest = getCatLabels(entityId);
    this.entityLabelRequests[entityId] = entityLabelRequest;
    const labelData = await entityLabelRequest;
    const github = labelData.find(({ label }) => label === 'github');
    const twitter = labelData.find(({ label }) => label === 'twitter');
    const facebook = labelData.find(({ label }) => label === 'facebook');
    const instagram = labelData.find(({ label }) => label === 'instagram');
    const labels = { github, twitter, facebook, instagram };
    if ((!github && !twitter && !facebook) || isEqual(this.state.entityLabels[entityId], labels)) return;
    this.setState({ entityLabels: { ...this.state.entityLabels, [entityId]: labels } });
  };

  getEntityInfo = async entityId => {
    if (this.entityInfoRequests[entityId]) return;
    const entityInfoRequest = getCatData(entityId);
    this.entityInfoRequests[entityId] = entityInfoRequest;
    const entityData = await entityInfoRequest;
    this.setState({ entityInfo: { ...this.state.entityInfo, [entityId]: entityData } }, () => {
      localStorage.setItem('entityInfo', JSON.stringify(this.state.entityInfo));
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
    this.addTemporaryFeedItem(temporaryFeedItem);
    return temporaryFeedItem;
  };

  reply = async (message, about) => {
    const temporaryReply = await reply(this.state.activeEntity.token, message, about);
    const itemTemporaryReplies = this.state.temporaryReplies[about] || [];
    const newTemporaryReplies = { ...this.state.temporaryReplies, [about]: [...itemTemporaryReplies, temporaryReply] };
    this.setState({ temporaryReplies: newTemporaryReplies });
  };

  react = async to => {
    const temporaryReaction = await react(this.state.activeEntity.token, to);
    const itemTemporaryReactions = this.state.temporaryReactions[to] || [];
    const newTemporaryReactions = {
      ...this.state.temporaryReactions,
      [to]: [...itemTemporaryReactions, temporaryReaction]
    };
    this.setState({ temporaryReactions: newTemporaryReactions });
  };

  label = async (message, labelType) => {
    const temporaryLabel = await label(this.state.activeEntity.token, message, labelType);
    const newEntityLabels = { ...this.state.entityLabels[this.state.activeEntity.token], [labelType]: temporaryLabel };
    this.setState({ entityLabels: { ...this.state.entityLabels, [this.state.activeEntity.token]: newEntityLabels } });
  };

  addTemporaryFeedItem = feedItem => {
    this.setState({ temporaryFeedItems: [feedItem, ...this.state.temporaryFeedItems] });
  };

  updateFeedItems = (feedItems, purge) => {
    if (feedItems.length === this.state.feedItems.length) return;
    let newState;
    if (purge) {
      newState = { feedItems, shownFeedItemsCount: 10 };
    } else {
      const previousFeedItems = this.state.feedItems.reduce(
        (acc, feedItem) => ({ ...acc, [feedItem.id]: feedItem }),
        {}
      );
      const newFeedItems = feedItems.map(feedItem => ({
        ...feedItem,
        added: this.state.feedItems.length > 0 && !previousFeedItems[feedItem.id]
      }));
      newState = {
        feedItems: newFeedItems
      };
    }
    this.setState(newState);
  };

  showMoreFeedItems = (count = 5) => {
    this.setState({ shownFeedItemsCount: this.state.shownFeedItemsCount + count });
  };

  changeActiveEntityTo = id => {
    const { myEntities } = this.state;
    const newActiveEntity = myEntities.find(myEntity => myEntity.token === id.toString());
    this.setState({ activeEntity: newActiveEntity }, () => {
      localStorage.removeItem('activeEntity');
      if (newActiveEntity) localStorage.setItem('activeEntity', JSON.stringify(newActiveEntity));
    });
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
      allowAddingFeedItem
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
