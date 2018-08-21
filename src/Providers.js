import React from 'react';
import AppContext from './Context';

export const Web3ProviderStatus = ({ children }) => (
  <AppContext.Consumer>
    {({ web3Store: { provider, from } }) => {
      const isProviderAvailable = !(typeof provider === 'undefined' || (typeof provider === 'boolean' && !provider));
      const isEnabled = from != undefined;
      return children(isProviderAvailable && isEnabled);
    }}
  </AppContext.Consumer>
);
