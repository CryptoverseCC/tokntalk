import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './IndexPage';
import ShowPage from './ShowPage';
import Footer from './Footer';
import Navigation from './Navigation';
import { myCats } from './db.json';

export default class App extends Component {
  state = {
    activeCat: myCats[0],
    myCats
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
    const { changeActiveCatToPrevious, changeActiveCatToNext } = this;
    const { activeCat, myCats } = this.state;
    return (
      <Router>
        <React.Fragment>
          <div className="main">
            <Navigation activeCat={activeCat} myCats={myCats} />
            <Switch>
              <Route exact path="/:catId">
                {props => <ShowPage {...props} activeCat={activeCat} />}
              </Route>
              <Route exact path="/">
                {props => (
                  <IndexPage
                    {...props}
                    activeCat={activeCat}
                    changeActiveCatToPrevious={changeActiveCatToPrevious}
                    changeActiveCatToNext={changeActiveCatToNext}
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
