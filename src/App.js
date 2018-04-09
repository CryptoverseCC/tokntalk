import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import Context from './Context';
import IndexPage from './IndexPage';
import ShowPage from './ShowPage';
import { downloadCats, downloadWeb3State, getCatData, sendMessage, reply, react, label, getCatLabels } from './api';
import Header from './Header';

export default class App extends Component {
  state = {
    activeEntity: undefined,
    myCats: [],
    entityInfo: JSON.parse(localStorage.getItem('entityInfo') || '{}'),
    entityLabels: {},
    allowPurr: false,
    purrs: [],
    shownPurrsCount: 10,
    temporaryPurrs: [],
    temporaryReplies: {},
    temporaryReactions: {},
    from: undefined
  };

  catInfoRequests = {};
  entityLabelRequests = {};

  componentDidMount() {
    this.refreshWeb3State();
    setInterval(this.refreshWeb3State, 2000);
    this.refreshMyCats();
    setInterval(this.refreshMyCats, 15000);
  }

  refreshMyCats = async () => {
    const myCats = await downloadCats();
    if (!myCats || isEqual(myCats, this.state.myCats)) return;
    const { activeEntity } = this.state;
    const newActiveEntity =
      (activeEntity && myCats.find(myCat => myCat.token === activeEntity.token)) ||
      (JSON.parse(localStorage.getItem('activeEntity')) &&
        myCats.find(myCat => myCat.token === JSON.parse(localStorage.getItem('activeEntity')).token)) ||
      myCats[0];
    if(!newActiveEntity) return;
    this.setState({ myCats });
    this.changeActiveEntityTo(newActiveEntity.token);
  };

  refreshWeb3State = async () => {
    const { from, isListening } = await downloadWeb3State();
    if (this.state.from !== from) {
      this.refreshMyCats();
    }
    if (this.state.from !== from || this.state.isListening !== isListening) {
      this.setState({ allowPurr: !!(isListening && from && this.state.activeEntity), from, isListening });
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

  getCatInfo = async catId => {
    if (this.catInfoRequests[catId]) return;
    const catInfoRequest = getCatData(catId);
    this.catInfoRequests[catId] = catInfoRequest;
    const catData = await catInfoRequest;
    this.setState({ entityInfo: { ...this.state.entityInfo, [catId]: catData } }, () => {
      localStorage.setItem('entityInfo', JSON.stringify(this.state.entityInfo));
    });
  };

  getEntity = entityId => {
    const entityInfo = this.state.entityInfo[entityId];
    if (!entityInfo) this.getCatInfo(entityId);
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
    const temporaryPurr = await sendMessage(this.state.activeEntity.token, message);
    this.addTemporaryPurr(temporaryPurr);
    return temporaryPurr;
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

  addTemporaryPurr = purr => {
    this.setState({ temporaryPurrs: [purr, ...this.state.temporaryPurrs] });
  };

  updatePurrs = (purrs, purge) => {
    if (purrs.length === this.state.purrs.length) return;
    let newState;
    if (purge) {
      newState = { purrs, shownPurrsCount: 10 };
    } else {
      const previousPurrs = this.state.purrs.reduce((acc, purr) => ({ ...acc, [purr.id]: purr }), {});
      const newPurrs = purrs.map(purr => ({ ...purr, added: this.state.purrs.length > 0 && !previousPurrs[purr.id] }));
      newState = {
        purrs: newPurrs
      };
    }
    this.setState(newState);
  };

  showMorePurrs = (count = 5) => {
    this.setState({ shownPurrsCount: this.state.shownPurrsCount + count });
  };

  changeActiveEntityTo = id => {
    const { myCats } = this.state;
    const newActiveEntity = myCats.find(myCat => myCat.token === id.toString());
    this.setState({ activeEntity: newActiveEntity }, () => {
      localStorage.removeItem('activeEntity');
      if (newActiveEntity) localStorage.setItem('activeEntity', JSON.stringify(newActiveEntity));
    });
  };

  renderIndexPage = props => <IndexPage {...props} updatePurrs={this.updatePurrs} />;

  renderShowPage = props => <ShowPage {...props} updatePurrs={this.updatePurrs} getCatInfo={this.getCatInfo} />;

  render() {
    const {
      renderIndexPage,
      renderShowPage,
      changeActiveEntityTo,
      getCatInfo,
      sendMessage,
      reply,
      react,
      label,
      getEntity,
      showMorePurrs
    } = this;
    const {
      activeEntity,
      myCats,
      purrs,
      shownPurrsCount,
      catsInfo,
      temporaryPurrs,
      temporaryReplies,
      temporaryReactions,
      allowPurr
    } = this.state;
    return (
      <Context.Provider
        value={{
          entityStore: { getEntity },
          catStore: { myCats, changeActiveEntityTo, activeEntity, catsInfo, getCatInfo },
          purrStore: {
            sendMessage,
            reply,
            react,
            label,
            purrs,
            shownPurrsCount,
            showMorePurrs,
            temporaryPurrs,
            temporaryReplies,
            temporaryReactions,
            allowPurr
          }
        }}
      >
        <Router>
          <React.Fragment>
            <Header />
            <Switch>
              <Route exact path="/cryptopurr/:entityId" component={renderShowPage} />
              <Route exact path="/cryptopurr" component={renderIndexPage} />
            </Switch>
          </React.Fragment>
        </Router>
      </Context.Provider>
    );
  }
}
