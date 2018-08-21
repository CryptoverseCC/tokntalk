import React, { Component } from 'react';
import Raven from 'raven-js';

const { NODE_ENV, REACT_APP_SENTRY_URL: SENTRY_URL } = process.env;

export class Sentry extends Component {
  componentDidCatch(error, info) {
    Raven.captureException(error);
  }

  render() {
    return this.props.children;
  }
}

export const runInContext = (fn) => {
  if (NODE_ENV === 'production' && SENTRY_URL) {
    Raven.config(SENTRY_URL).install();
    Raven.context(() => fn());
  } else {
    fn();
  }
};
