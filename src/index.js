import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import App from './App';
import Landing from './Landing';
import Communities from './Communities';
import NotFound from './NotFound';
import FAQ from './FAQPage';
import Owners from './Owners';

import registerServiceWorker from './registerServiceWorker';

const TokNTalk = () => (
  <Router>
    <Switch>
      <Route path="/landing" component={Landing} />
      <Route path="/communities" component={Communities} />
      <Route path="/owners" component={Owners} />
      <Route exact path="/faq" component={FAQ} />
      <Route path="/404" component={NotFound} />
      <Route component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(<TokNTalk />, document.getElementById('root'));

registerServiceWorker();
