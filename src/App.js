import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import Context from './Context';
import IndexPage from './IndexPage';
import { downloadCats, downloadWeb3State, getCatData, sendMessage, reply, react } from './api';
import Header from './Header';
import Hero from './Hero';

export default class App extends Component {
  state = {
    activeCat: undefined,
    myCats: [],
    entityInfo: JSON.parse(localStorage.getItem('entityInfo') || '[]'),
    allowPurr: false,
    purrs: [],
    temporaryPurrs: [],
    newPurrs: [],
    temporaryReplies: {},
    temporaryReactions: {},
    from: undefined
  };

  catInfoRequests = {};

  componentDidMount() {
    this.refreshWeb3State();
    setInterval(this.refreshWeb3State, 300);
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
    if (this.state.entityInfo[entityId]) {
      return this.state.entityInfo[entityId];
    } else {
      this.getCatInfo(entityId);
      return { image_url: undefined, color: undefined };
    }
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

  addTemporaryPurr = purr => {
    this.setState({ temporaryPurrs: [purr, ...this.state.temporaryPurrs] });
  };

  updatePurrs = (purrs, purge) => {
    if (isEqual(purrs, this.state.purrs)) return;
    const newState = purge || this.state.purrs.length === 0 ? { purrs } : { newPurrs: purrs };
    this.setState(newState);
  };

  showNewPurrs = () => {
    this.setState({ purrs: this.state.newPurrs });
  };

  changeActiveCatToNext = () => {
    const { myCats, activeCat } = this.state;
    const currentCatIndex = myCats.indexOf(activeCat);
    const nextCat = currentCatIndex === myCats.length - 1 ? myCats[0] : myCats[currentCatIndex + 1];
    this.setState({ activeCat: nextCat });
  };

  changeActiveCatToPrevious = () => {
    const { myCats, activeCat } = this.state;
    const currentCatIndex = myCats.indexOf(activeCat);
    const previousCat = currentCatIndex === 0 ? myCats[myCats.length - 1] : myCats[currentCatIndex - 1];
    this.setState({ activeCat: previousCat });
  };

  renderIndexPage = props => <IndexPage {...props} updatePurrs={this.updatePurrs} />;

  render() {
    const {
      renderIndexPage,
      changeActiveCatToPrevious,
      changeActiveCatToNext,
      getCatInfo,
      sendMessage,
      reply,
      react,
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
          catStore: { myCats, changeActiveCatToNext, changeActiveCatToPrevious, activeCat, catsInfo, getCatInfo },
          purrStore: {
            sendMessage,
            reply,
            react,
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
            <Hero />
            <Switch>
              <Route exact path="/cryptopurr" component={renderIndexPage} />
            </Switch>
          </React.Fragment>
        </Router>{' '}
      </Context.Provider>
    );
  }
}
