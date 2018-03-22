import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './IndexPage';
import ShowPage from './ShowPage';
import Footer from './Footer';
import Navigation from './Navigation';
import getWeb3 from './web3';

export default class App extends Component {
  state = {
    activeCat: undefined,
    myCats: [],
    catsInfo: JSON.parse(localStorage.getItem('catsInfo') || '[]')
  };

  catInfoRequests = {};

  componentDidMount() {
    getWeb3()
      .then(web3 => {
        return web3.eth.getAccounts();
      })
      .then(([from]) => {
        fetch(
          `https://api-dev.userfeeds.io/ranking/tokens;identity=${from.toLowerCase()};asset=ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d`
        )
          .then(res => res.json())
          .then(({ items: myCats }) => {
            this.setState({ myCats, activeCat: myCats[0] });
          });
      });
  }

  getCatInfo = catId => {
    if (this.state.catsInfo[catId] || this.catInfoRequests[catId]) return;
    this.catInfoRequests[catId] = fetch(`https://api.cryptokitties.co/kitties/${catId}`)
      .then(res => res.json())
      .then(catData => {
        this.setState({ catsInfo: { ...this.state.catsInfo, [catId]: catData } }, () => {
          delete this.catInfoRequests[catId];
          localStorage.setItem('catsInfo', JSON.stringify(this.state.catsInfo));
        });
      });
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
    const { changeActiveCatToPrevious, changeActiveCatToNext, getCatInfo } = this;
    const { activeCat, myCats, purrs, catsInfo } = this.state;
    return (
      <Router>
        <React.Fragment>
          <div className="main">
            <Navigation activeCat={activeCat} myCats={myCats} />
            <Switch>
              <Route exact path="/:catId">
                {props => (
                  <ShowPage {...props} purrs={purrs} myCats={myCats} catsInfo={catsInfo} getCatInfo={getCatInfo} />
                )}
              </Route>
              <Route exact path="/">
                {props => (
                  <IndexPage
                    {...props}
                    purrs={purrs}
                    activeCat={activeCat}
                    changeActiveCatToPrevious={changeActiveCatToPrevious}
                    changeActiveCatToNext={changeActiveCatToNext}
                    catsInfo={catsInfo}
                    getCatInfo={getCatInfo}
                  />
                )}
              </Route>
            </Switch>
          </div>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}
