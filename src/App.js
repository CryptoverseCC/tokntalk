import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Context from './Context';
import IndexPage from './IndexPage';
import ShowPage from './ShowPage';
import { downloadCats, downloadWeb3State, getCatData, sendMessage } from './api';
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
    from: undefined
  };

  componentDidMount() {
    this.refreshWeb3State();
    setInterval(this.refreshWeb3State, 1000);
    this.refreshMyCats();
    setInterval(this.refreshMyCats, 15000);
  }

  refreshMyCats = async () => {
    const myCats = await downloadCats();
    if (!myCats) return;
    const { activeCat } = this.state;
    const newActiveCat = (activeCat && myCats.find(myCat => myCat.token === activeCat.token)) || myCats[0];
    this.setState({ myCats, activeCat: newActiveCat });
  };

  refreshWeb3State = async () => {
    const { from, isListening } = await downloadWeb3State();
    if (this.state.from !== from) {
      this.refreshMyCats();
    }
    this.setState({ allowPurr: !!(isListening && from && this.state.activeCat), from });
  };

  getCatInfo = async catId => {
    const catData = await getCatData(catId);
    this.setState({ entityInfo: { ...this.state.entityInfo, [catId]: catData } }, () => {
      localStorage.setItem('entityInfo', JSON.stringify(this.state.entityInfo));
    });
  };

  getEntity = entityId => {
    if (this.state.entityInfo[entityId]) {
      return this.state.entityInfo[entityId];
    } else {
      this.getCatInfo(entityId);
      return { image_url: '', color: '' };
    }
  };

  sendMessage = async message => {
    const temporaryPurr = await sendMessage(this.state.activeCat.token, message);
    this.addTemporaryPurr(temporaryPurr);
    return temporaryPurr;
  };

  addTemporaryPurr = purr => {
    this.setState({ temporaryPurrs: [purr, ...this.state.temporaryPurrs] });
  };

  removeTemporaryPurr = purrId => {
    this.setState({ temporaryPurrs: this.state.temporaryPurrs.filter(tempPurr => tempPurr.id !== purrId) });
  };

  updatePurrs = (purrs, purge) => {
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

  render() {
    const {
      changeActiveCatToPrevious,
      changeActiveCatToNext,
      getCatInfo,
      updatePurrs,
      sendMessage,
      showNewPurrs,
      getEntity
    } = this;
    const { activeCat, myCats, purrs, catsInfo, temporaryPurrs, newPurrs, allowPurr } = this.state;
    return (
      <Context.Provider
        value={{
          entityStore: { getEntity },
          catStore: { myCats, changeActiveCatToNext, changeActiveCatToPrevious, activeCat, catsInfo, getCatInfo },
          purrStore: { sendMessage, purrs, newPurrs, temporaryPurrs, allowPurr, showNewPurrs }
        }}
      >
        <Router>
          <React.Fragment>
            <Header />
            <Hero />
            <Switch>
              <Route exact path="/cryptopurr/:catId">
                {props => <ShowPage {...props} updatePurrs={updatePurrs} catsInfo={catsInfo} getCatInfo={getCatInfo} />}
              </Route>
              <Route exact path="/cryptopurr">
                {props => <IndexPage {...props} updatePurrs={updatePurrs} />}
              </Route>
            </Switch>
          </React.Fragment>
        </Router>
      </Context.Provider>
    );
  }
}
