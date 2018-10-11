import React, { Component } from 'react';
import update from 'react-addons-update';
import Async from 'react-code-splitting';

import find from 'lodash/fp/find';
import isEqual from 'lodash/isEqual';
import produce from 'immer';
import { isAddress } from 'web3-utils';

import Context from './Context';
import {
  getMyEntities,
  getWeb3State,
  sendMessage,
  reply,
  react,
  label,
  writeTo,
  writeAbout,
  boost,
  getLabels,
  getEntityTokens,
  getBoosts,
  getSupportings,
  getFeedItem,
} from './api';
import { getEntityData } from './entityApi';
import { Storage, getEntityInfoForAddress } from './utils';
import { UnreadedMessagesProvider } from './UnreadedMessages';
import WalletModal from './WalletModal';
import { metamaskStatusChanged } from './Analytics';

const { REACT_APP_INTERFACE_BOOST_NETWORK: INTERFACE_BOOST_NETWORK } = process.env;

export const produceEntities = (myEntities, previousActiveEntity) => {
  const firstEntity = myEntities[0];
  const refreshedPreviousActiveEntity = myEntities.find(
    ({ id }) =>
      !!previousActiveEntity && typeof previousActiveEntity === 'object' ? id === previousActiveEntity.id : false,
  );

  const activeEntity = refreshedPreviousActiveEntity ? refreshedPreviousActiveEntity : firstEntity;

  return { myEntities, activeEntity: activeEntity };
};

export default class App extends Component {
  entityInfoRequests = {};
  entityLabelRequests = {};
  entityTokensRequests = {};
  storage = Storage();

  state = {
    activeEntity: undefined,
    myEntities: [],
    entityInfo: JSON.parse(this.storage.getItem('entityInfo') || '{}'),
    entityLabels: {},
    entityTokens: {},
    feedItem: null,
    feedItemLoading: false,
    temporaryFeedItems: [],
    temporaryReplies: {},
    temporaryReactions: {},
    boosts: {},
    supportings: {},
    from: undefined,
    provider: undefined,
    waitingForConfirm: 0,
    networkName: undefined,
    http: JSON.parse(this.storage.getItem('http') || 'true'),
  };

  componentDidMount() {
    this.refreshWeb3State();
    setInterval(this.refreshWeb3State, 2000);
    this.refreshMyEntities();
    setInterval(this.refreshMyEntities, 15000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.from !== this.state.from || prevState.provider !== this.state.provider) {
      metamaskStatusChanged(this.state.provider, this.state.from);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState);
  }

  refreshMyEntities = async () => {
    try {
      const newMyEntities = produceEntities(await getMyEntities(), this.previousActiveEntity());
      console.debug('Refreshing Entities');
      await this.refreshEntity(newMyEntities.activeEntity.id);
      this.setState(newMyEntities, this.saveActiveEntity);
    } catch (e) {}
  };

  previousActiveEntity = () => {
    const activeEntity = this.storage.getItem('activeEntity');
    try {
      return JSON.parse(activeEntity) || null;
    } catch (e) {
      return null;
    }
  };

  changeActiveEntityTo = async (newActiveEntity) => {
    if (!this.state.myEntities.find(({ id }) => id === newActiveEntity.id)) {
      return;
    }
    await this.refreshEntity(newActiveEntity.id);

    this.setState({ activeEntity: newActiveEntity }, this.saveActiveEntity);
  };

  saveActiveEntity = () => {
    const { activeEntity } = this.state;
    if (activeEntity) this.storage.setItem('activeEntity', JSON.stringify(activeEntity));
  };

  refreshWeb3State = async () => {
    const { from, isListening, provider, networkName } = await getWeb3State(this.storage);
    if (this.state.from !== from) this.refreshMyEntities();
    this.setState({ from, isListening, provider, networkName });
  };

  getEntityLabels = async (entityId) => {
    const entityLabelRequest = getLabels(entityId);
    this.entityLabelRequests[entityId] = entityLabelRequest;
    const labels = await entityLabelRequest;
    return labels;
  };

  getEntityTokens = async (entityId) => {
    const entityTokensRequests = getEntityTokens(entityId);
    this.entityTokensRequests[entityId] = entityTokensRequests;
    const tokens = await entityTokensRequests;
    return tokens;
  };

  toggleHttpClaims = () => {
    this.setState({ http: !this.state.http }, () => {
      this.storage.setItem('http', this.state.http);
    });
  };

  saveEntities = () => {
    const toSave = Object.entries(this.state.entityInfo)
      .filter(([, value]) => !!value && !value.isAddress)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    this.storage.setItem('entityInfo', JSON.stringify(toSave));
  };

  getEntityInfo = async (entityId) => {
    let entityData;
    if (isAddress(entityId)) {
      entityData = getEntityInfoForAddress(entityId);
    } else {
      const entityInfoRequest = getEntityData(entityId);
      this.entityInfoRequests[entityId] = entityInfoRequest;
      entityData = await entityInfoRequest;
    }

    return entityData;
  };

  refreshEntity = async (entityId) => {
    let entityInfo = this.state.entityInfo[entityId];
    if (!entityInfo) entityInfo = await this.getEntityInfo(entityId);
    let entityLabels = this.state.entityLabels[entityId];
    if (!entityLabels) entityLabels = await this.getEntityLabels(entityId);
    let entityTokens = this.state.entityTokens[entityId];
    if (!entityTokens) entityTokens = await this.getEntityTokens(entityId);

    const newState = update(this.state, {
      entityInfo: { [entityId]: { $set: entityInfo } },
      entityLabels: { [entityId]: { $set: entityLabels } },
      entityTokens: { [entityId]: { $set: entityTokens } },
    });

    this.setState(newState, this.saveEntities);
  };

  getEntity = (entityId) => {
    this.refreshEntity(entityId);
    let entityInfo = this.state.entityInfo[entityId];
    let entityLabels = this.state.entityLabels[entityId];
    let entityTokens = this.state.entityTokens[entityId];
    const boost = this.state.boosts[entityId] || { score: 0 };
    const boostValue = boost.score;
    return {
      id: entityId,
      boostValue,
      tokens: entityTokens || [],
      ...entityInfo,
      ...entityLabels,
    };
  };

  getBoosts = async (tokenId, asset) => {
    const boosts = await getBoosts(tokenId, asset);
    // if (this.state.feedId === tokenId || (this.state.feedId === undefined && tokenId === DEFAULT_TOKEN_ID)) {
    this.setState({ boosts });
    // }
  };

  getSupportings = async (tokenId, asset) => {
    const supportings = await getSupportings(tokenId, asset);
    // if (this.state.feedId === tokenId || (this.state.feedId === undefined && tokenId === DEFAULT_TOKEN_ID)) {
    this.setState({ supportings });
    // }
  };

  get isBoostable() {
    return this.state.from && this.state.networkName === INTERFACE_BOOST_NETWORK;
  }

  addWaitingConfirmation = () =>
    this.setState(({ waitingForConfirm }) => ({
      waitingForConfirm: waitingForConfirm + 1,
    }));

  removeConfirmation = () => this.setState(({ waitingForConfirm }) => ({ waitingForConfirm: waitingForConfirm - 1 }));

  sendMessage = async (message) => {
    this.addWaitingConfirmation();
    const { http } = this.state;
    try {
      const temporaryFeedItem = await sendMessage(this.state.activeEntity, message, { http });
      this.setState({
        temporaryFeedItems: [temporaryFeedItem, ...this.state.temporaryFeedItems],
      });
    } catch (e) {}
    this.removeConfirmation();
  };

  reply = async (message, to) => {
    this.addWaitingConfirmation();
    const { http, activeEntity } = this.state;
    try {
      const temporaryReply = await reply(activeEntity, message, to, { http });
      this.setState(
        produce((draft) => {
          draft.temporaryReplies[to] = [...(draft.temporaryReplies[to] || []), temporaryReply];
        }),
      );
    } catch (e) {}
    this.removeConfirmation();
  };

  writeTo = async (message, tokenTo) => {
    this.addWaitingConfirmation();
    const { http, activeEntity } = this.state;
    try {
      const temporaryFeedItem = await writeTo(activeEntity, message, tokenTo, { http });
      this.setState({
        temporaryFeedItems: [temporaryFeedItem, ...this.state.temporaryFeedItems],
      });
    } catch (e) {}
    this.removeConfirmation();
  };

  writeAbout = async (message, club) => {
    this.addWaitingConfirmation();
    const { http, activeEntity } = this.state;
    try {
      const temporaryFeedItem = await writeAbout(activeEntity, message, club, { http });
      this.setState({
        temporaryFeedItems: [temporaryFeedItem, ...this.state.temporaryFeedItems],
      });
    } catch (e) {}
    this.removeConfirmation();
  };

  react = async (to) => {
    this.addWaitingConfirmation();
    const { http, activeEntity } = this.state;
    try {
      const temporaryReaction = await react(activeEntity, to, { http });
      this.setState(
        produce((draft) => {
          draft.temporaryReactions[to] = [...(draft.temporaryReactions[to] || []), temporaryReaction];
        }),
      );
    } catch (e) {}
    this.removeConfirmation();
  };

  label = async (message, labelType) => {
    this.addWaitingConfirmation();
    const { http, activeEntity } = this.state;
    try {
      const temporaryFeedItem = await label(activeEntity, message, labelType, { http });
      this.setState(
        produce((draft) => {
          draft.entityLabels[activeEntity.id][labelType] = temporaryFeedItem.target;
          draft.temporaryFeedItems = [temporaryFeedItem, ...draft.temporaryFeedItems];
        }),
      );
    } catch (e) {}
    this.removeConfirmation();
  };

  getFeedItem = async (claimId) => {
    const { feedItems } = this.state;
    try {
      const feedItem = find({ id: claimId })(feedItems);
      this.setState({ feedItemLoading: true, feedItemId: claimId, feedItem }, async () => {
        const feedItem = await getFeedItem({ claimId });
        this.setState({ feedItemLoading: false, feedItem });
      });
    } catch (e) {
      console.warn('Failed to download feedItems');
    }
  };

  exportWallet = () => {
    const mnemonic = this.storage.getItem('mnemonic');
    const privateKey = this.storage.getItem('privateKey');
    return { privateKey, mnemonic };
  };

  render() {
    const {
      changeActiveEntityTo,
      getEntityInfo,
      sendMessage,
      reply,
      writeTo,
      writeAbout,
      react,
      label,
      getEntity,
      getFeedItem,
      isBoostable,
      getBoosts,
      getSupportings,
      toggleHttpClaims,
      exportWallet,
    } = this;
    const {
      activeEntity,
      myEntities,
      feedItem,
      feedItemLoading,
      entityInfo,
      temporaryFeedItems,
      temporaryReplies,
      temporaryReactions,
      allowAddingFeedItem,
      provider,
      from,
      networkName,
      boosts,
      supportings,
      http,
      waitingForConfirm,
    } = this.state;

    return (
      <Context.Provider
        value={{
          appStore: {
            toggleHttpClaims,
            http,
          },
          entityStore: {
            getEntity,
            myEntities,
            changeActiveEntityTo,
            activeEntity,
            entityInfo,
            getEntityInfo,
          },
          feedStore: {
            sendMessage,
            reply,
            writeTo,
            writeAbout,
            react,
            label,
            feedItem,
            feedItemLoading,
            getFeedItem,
            temporaryFeedItems,
            temporaryReplies,
            temporaryReactions,
            allowAddingFeedItem,
          },
          boostStore: {
            boost,
            boosts,
            isBoostable,
            getBoosts,
            supportings,
            getSupportings,
          },
          web3Store: {
            provider,
            from,
            networkName,
            waitingForConfirm,
            exportWallet,
          },
        }}
      >
        <WalletModal />
        <UnreadedMessagesProvider>{this.props.children}</UnreadedMessagesProvider>
      </Context.Provider>
    );
  }

  static ShowPage = (props) => <Async load={import('./app/ShowPage')} componentProps={props} />;

  static Discover = (props) => <Async load={import('./app/Discover')} componentProps={props} />;

  static Index = (props) => <Async load={import('./app/Index')} componentProps={props} />;

  static Thread = (props) => <Async load={import('./app/Thread')} componentProps={props} />;

  static ModalThread = (props) => <Async load={import('./app/ModalThread')} componentProps={props} />;
}
