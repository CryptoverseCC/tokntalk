import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import About from './Landing';
import Communities from './Communities';
import NotFound from './NotFound';
import FAQ from './FAQPage';
import { Storage, ScrollTop } from './utils';
import { runInContext, Sentry } from './Sentry';

import registerServiceWorker from './registerServiceWorker';

const storage = Storage();

const TokNTalk = withRouter(
  class extends Component {
    previousLocation = this.props.location;

    componentWillUpdate(nextProps) {
      const { location } = this.props;
      if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
        this.previousLocation = location;
      }
    }

    render() {
      const { location } = this.props;
      const redirect = !storage.getItem('visited') && location.pathname === '/';
      if (redirect) {
        storage.setItem('visited', Date.now());
      }

      const isModal = !!(location.state && location.state.modal && this.previousLocation !== location);

      return (
        <React.Fragment>
          {redirect && <Redirect to="/about" />}
          <ScrollTop />
          <Switch location={isModal ? this.previousLocation : location}>
            <Route exact path="/about" component={About} />
            <Route exact path="/communities" component={Communities} />
            <Route exact exact path="/faq" component={FAQ} />
            <Route exact path="/404" component={NotFound} />

            <Route exact path="/" component={App.Index} />
            <Route path="/discover" component={App.Discover} />
            <Route exact path="/:entityId" component={App.ShowPage} />
            {!isModal ? <Route exact path="/thread/:claimId" component={App.Thread} /> : null}
          </Switch>
          {isModal ? <Route exact path="/thread/:claimId" component={App.ModalThread} /> : null}
        </React.Fragment>
      );
    }
  },
);

const startApp = () => {
  ReactDOM.render(
    <Sentry>
      <App>
        <Router>
          <TokNTalk />
        </Router>
      </App>
    </Sentry>,
    document.getElementById('root'),
  );

  registerServiceWorker();
};

runInContext(startApp);
