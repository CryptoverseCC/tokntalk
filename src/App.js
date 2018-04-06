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
    activeCat: undefined,
    myCats: [],
    entityInfo: JSON.parse(localStorage.getItem('entityInfo') || '{}'),
    entityLabels: {},
    allowPurr: false,
    purrs: [],
    temporaryPurrs: [],
    newPurrs: [],
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
    const { activeCat } = this.state;
    const newActiveCat = (activeCat && myCats.find(myCat => myCat.token === activeCat.token)) || myCats[0];
    this.setState({ myCats, activeCat: newActiveCat });
  };

  refreshWeb3State = async () => {
    const { from, isListening } = await downloadWeb3State();
    if (this.state.from !== from) {
      this.refreshMyCats();
    }
    if (this.state.from !== from || this.state.isListening !== isListening) {
      this.setState({ allowPurr: !!(isListening && from && this.state.activeCat), from, isListening });
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
    const temporaryPurr = await sendMessage(this.state.activeCat.token, message);
    this.addTemporaryPurr(temporaryPurr);
    return temporaryPurr;
  };

  reply = async (message, about) => {
    const temporaryReply = await reply(this.state.activeCat.token, message, about);
    const itemTemporaryReplies = this.state.temporaryReplies[about] || [];
    const newTemporaryReplies = { ...this.state.temporaryReplies, [about]: [...itemTemporaryReplies, temporaryReply] };
    this.setState({ temporaryReplies: newTemporaryReplies });
  };

  react = async to => {
    const temporaryReaction = await react(this.state.activeCat.token, to);
    const itemTemporaryReactions = this.state.temporaryReactions[to] || [];
    const newTemporaryReactions = {
      ...this.state.temporaryReactions,
      [to]: [...itemTemporaryReactions, temporaryReaction]
    };
    this.setState({ temporaryReactions: newTemporaryReactions });
  };

  label = async (message, labelType) => {
    const temporaryLabel = await label(this.state.activeCat.token, message, labelType);
    const newEntityLabels = { ...this.state.entityLabels[this.state.activeCat.token], [labelType]: temporaryLabel };
    this.setState({ entityLabels: { ...this.state.entityLabels, [this.state.activeCat.token]: newEntityLabels } });
  };

  addTemporaryPurr = purr => {
    this.setState({ temporaryPurrs: [purr, ...this.state.temporaryPurrs] });
  };

  updatePurrs = (purrs, purge) => {
    if (purrs.length === this.state.purrs.length) return;
    let newState;
    if (purge) {
      newState = { purrs };
    } else {
      const previousPurrs = this.state.purrs.reduce((acc, purr) => ({ ...acc, [purr.id]: purr }), {});
      newState = {
        purrs: purrs.map(purr => ({ ...purr, added: this.state.purrs.length > 0 && !previousPurrs[purr.id] }))
      };
    }
    this.setState(newState);
  };

  showNewPurrs = () => {
    this.setState({ purrs: this.state.newPurrs });
  };

  changeActiveCatTo = id => {
    const { myCats } = this.state;
    const newActiveCat = myCats.find(myCat => myCat.token === id.toString());
    this.setState({ activeCat: newActiveCat });
  };

  renderIndexPage = props => <IndexPage {...props} updatePurrs={this.updatePurrs} />;

  renderShowPage = props => <ShowPage {...props} updatePurrs={this.updatePurrs} />;

  render() {
    const {
      renderIndexPage,
      renderShowPage,
      changeActiveCatTo,
      getCatInfo,
      sendMessage,
      reply,
      react,
      label,
      showNewPurrs,
      getEntity
    } = this;
    const {
      activeCat,
      myCats,
      purrs,
      catsInfo,
      temporaryPurrs,
      temporaryReplies,
      temporaryReactions,
      newPurrs,
      allowPurr
    } = this.state;
    return (
      <Context.Provider
        value={{
          entityStore: { getEntity },
          catStore: { myCats, changeActiveCatTo, activeCat, catsInfo, getCatInfo },
          purrStore: {
            sendMessage,
            reply,
            react,
            label,
            purrs,
            newPurrs,
            temporaryPurrs,
            temporaryReplies,
            temporaryReactions,
            allowPurr,
            showNewPurrs
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
