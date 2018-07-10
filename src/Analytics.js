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
