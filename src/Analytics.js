const { NODE_ENV, REACT_APP_GOOGLE_ANALYTICS_ID } = process.env;

if (NODE_ENV === 'production' && REACT_APP_GOOGLE_ANALYTICS_ID) {
  import('react-ga').then(({ default: ReactGA }) => ReactGA.initialize(REACT_APP_GOOGLE_ANALYTICS_ID));
}

export const pageView = () => {
  if (NODE_ENV === 'production' && REACT_APP_GOOGLE_ANALYTICS_ID) {
    import('react-ga').then(({ default: ReactGA }) =>
      ReactGA.pageview(window.location.pathname + window.location.search),
    );
  }
};

export const metamaskStatusChanged = (providerName, accounts) => {
  if (NODE_ENV === 'production' && REACT_APP_GOOGLE_ANALYTICS_ID) {
    import('react-ga').then(({ default: ReactGA }) =>
      ReactGA.event({
        category: 'web3provider',
        action: 'statusChanged',
        label: providerName,
        value: accounts ? 1 : 0,
      }),
    );
  }
};
