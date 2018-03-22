import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './IndexPage';
import ShowPage from './ShowPage';
import Footer from './Footer';
import Navigation from './Navigation';

export default class App extends Component {
  state = {
    activeCat: undefined,
    myCats: [],
    purrs: [],
  };

  componentDidMount() {
    fetch(
      `https://api-dev.userfeeds.io/ranking/tokens;identity=0x223edbc8166ba1b514729261ff53fb8c73ab4d79;asset=ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d`
    )
      .then(res => res.json())
      .then(myCats => {
        this.setState({ myCats, activeCat: myCats[0] });
      });
  }

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
    const { activeCat, myCats, purrs } = this.state;
    return (
      <Router>
        <React.Fragment>
          <div className="main">
            <Navigation activeCat={activeCat} myCats={myCats} />
            <Switch>
              <Route exact path="/:catId">
                {props => <ShowPage {...props} purrs={purrs} myCats={myCats} />}
              </Route>
              <Route exact path="/">
                {props => (
                  <IndexPage
                    {...props}
                    purrs={purrs}
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
