import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Context from './Context';
import IndexPage from './IndexPage';
import ShowPage from './ShowPage';
import Footer from './Footer';
import Navigation from './Navigation';
import { downloadCats, downloadWeb3State, getCatData, purr } from './api';

export default class App extends Component {
  state = {
    activeCat: undefined,
    myCats: [],
    catsInfo: JSON.parse(localStorage.getItem('catsInfo') || '[]'),
    allowPurr: false,
    purrs: [],
    temporaryPurrs: [],
    newPurrs: []
  };

  componentDidMount() {
    this.refreshWeb3State();
    setInterval(this.refreshWeb3State, 1000);
    this.refreshMyCats();
    setInterval(this.refreshMyCats, 15000);
  }

  refreshMyCats = async () => {
    const myCats = await downloadCats();
    const { activeCat } = this.state;
    const newActiveCat = (activeCat && myCats.find(myCat => myCat.token === activeCat.token)) || myCats[0];
    this.setState({ myCats, activeCat: newActiveCat });
  };

  refreshWeb3State = async () => {
    const { from, isListening } = await downloadWeb3State();
    this.setState({ allowPurr: !!(isListening && from && this.state.activeCat) });
  };

  getCatInfo = async catId => {
    if (this.state.catsInfo[catId]) return;
    const catData = await getCatData(catId);
    this.setState({ catsInfo: { ...this.state.catsInfo, [catId]: catData } }, () => {
      localStorage.setItem('catsInfo', JSON.stringify(this.state.catsInfo));
    });
  };

  purr = async message => {
    const temporaryPurr = await purr(this.state.activeCat.token, message);
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
    const { changeActiveCatToPrevious, changeActiveCatToNext, getCatInfo, updatePurrs, purr, showNewPurrs } = this;
    const { activeCat, myCats, purrs, catsInfo, temporaryPurrs, newPurrs, allowPurr } = this.state;
    return (
      <Context.Provider
        value={{
          catStore: { myCats, changeActiveCatToNext, changeActiveCatToPrevious, activeCat, catsInfo, getCatInfo },
          purrStore: { purr, purrs, newPurrs, temporaryPurrs, allowPurr, showNewPurrs }
        }}
      >
        <Router>
          <React.Fragment>
            <div className="main">
              <Navigation myCats={myCats} />
              <Switch>
                <Route exact path="/cryptopurr/:catId">
                  {props => <ShowPage {...props} updatePurrs={updatePurrs} catsInfo={catsInfo} getCatInfo={getCatInfo} />}
                </Route>
                <Route exact path="/cryptopurr">
                  {props => <IndexPage {...props} updatePurrs={updatePurrs} />}
                </Route>
              </Switch>
            </div>
            <Footer />
          </React.Fragment>
        </Router>
      </Context.Provider>
    );
  }
}
