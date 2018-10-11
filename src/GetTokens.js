import React from 'react';

import { ChangellyFastBuy } from './Changelly';
import { CoinbaseWidget } from './CoinbaseWidget';

const GetTokens = () => {
  return (
    <div>
      <ChangellyFastBuy />
      <CoinbaseWidget />
    </div>
  );
};

export default GetTokens;
