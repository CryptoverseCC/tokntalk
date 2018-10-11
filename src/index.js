import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { isAddress } from 'web3-utils';
import Async from 'react-code-splitting';

import './index.css';
import App from './App';
import { Storage, ScrollTop, rewriteCmp, validateParams } from './utils';
import { runInContext, Sentry } from './Sentry';

import registerServiceWorker from './registerServiceWorker';

const About = (props) => <Async load={import('./Landing')} componentProps={props} />;
const Communities = (props) => <Async load={import('./Communities')} componentProps={props} />;
const Threads = (props) => <Async load={import('./Threads')} componentProps={props} />;
const NotFound = (props) => <Async load={import('./NotFound')} componentProps={props} />;
const FAQ = (props) => <Async load={import('./FAQPage')} componentProps={props} />;
const GetTokens = (props) => <Async load={import('./GetTokens')} componentProps={props} />;

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
          !isNaN(parseInt(id, 10))
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
            <Route exact path="/threads" component={Threads} />
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/404" component={NotFound} />
            <Route exact path="/how-to-get-tokens" component={GetTokens} />

            <Route exact path="/" component={App.Index} />
            <Route exact path="/personal" component={App.Index} />
            <Route exact path="/notifications" component={App.Index} />
            <Route path="/clubs" component={App.Discover} />
            <Route path="/discover" component={rewriteCmp('/discover', '/clubs')} />
            <Route
              sensitive
              path="/:slug1*:slug2([A-Z]):slug3*/"
              render={(props) => <Redirect to={`${props.location.pathname.toLowerCase()}`} />}
            />
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
  render(
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
