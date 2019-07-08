import React from 'react';
import ReactGA from 'react-ga';
import Router from 'next/router';

function initGA() {
  if (process.env.GA) {
    ReactGA.initialize(process.env.GA);
  }
}

function logPageView() {
  if (process.env.GA) {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  }
}

export const Analytics: React.FC<{}> = () => {
  React.useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
      logPageView();
    }

    Router.events.on('routeChangeComplete', logPageView);

    return () => Router.events.off('routeChangeComplete', logPageView);
  }, []);

  return null;
};
