import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { isAddress } from 'web3-utils';

import './index.css';
import App from './App';
import About from './Landing';
import Communities from './Communities';
import NotFound from './NotFound';
import FAQ from './FAQPage';
import { Storage, ScrollTop, rewriteCmp, validateParams } from './utils';
import { runInContext, Sentry } from './Sentry';

import registerServiceWorker from './registerServiceWorker';

const runMigrations = (storage) => {
  let version = parseInt(storage.getItem('version'), 10);
  if (isNaN(version)) {
    storage.setItem('entityInfo', '');
    storage.setItem('version', 1);
    version = 1;
  }

  if (version === 1) {
    storage.removeItem('entityInfo');
    storage.setItem('version', 2);
  }
};

const storage = Storage();
runMigrations(storage);

const validateEntityId = validateParams(
  {
    entityId: (entityId) => {
      if (entityId.indexOf(':') > -1) {
        const [network, address, id] = entityId.split(':');
        return (
          ['ethereum', 'kovan', 'rinkeby', 'ropsten'].indexOf(network) !== -1 &&
          isAddress(address) &&
          !isNaN(parseInt(id))
        );
      }

      return isAddress(entityId);
    },
  },
  '/404',
);

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
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/404" component={NotFound} />

            <Route exact path="/" component={App.Index} />
            <Route path="/clubs" component={App.Discover} />
            <Route path="/discover" component={rewriteCmp('/discover', '/clubs')} />
            <Route exact path="/:entityId" component={validateEntityId(App.ShowPage)} />
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
