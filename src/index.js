import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import About from './Landing';
import Communities from './Communities';
import NotFound from './NotFound';
import FAQ from './FAQPage';
import Owners from './Owners';
import { Storage } from './utils';

import registerServiceWorker from './registerServiceWorker';

const storage = Storage();

const TokNTalk = withRouter(({ location }) => {
  const redirect = !storage.getItem('visited') && location.pathname === '/';
  storage.setItem('visited', Date.now());

  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/communities" component={Communities} />
      <Route path="/owners" component={Owners} />
      <Route exact path="/faq" component={FAQ} />
      <Route path="/404" component={NotFound} />
      {redirect ? <Redirect to="/about" /> : <Route component={App} />}
    </Switch>
  );
});

ReactDOM.render(
  <Router>
    <TokNTalk />
  </Router>,
  document.getElementById('root'),
);

registerServiceWorker();
