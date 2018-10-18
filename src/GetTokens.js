import React from 'react';

import { ChangellyFastBuy } from './Changelly';
import { CoinbaseWidget } from './CoinbaseWidget';
import { FlatContainer } from './Components';

const GetTokens = () => {
  return (
    <React.Fragment>
      <div className="columns ordered-mobile">
        <div className="column is-8 fl-1 is-offset-1">
          <ChangellyFastBuy />
          {/*<CoinbaseWidget />*/}
        </div>
        <div className="column is-3">
          <FlatContainer>
            You can buy tokens from one of companies presented here.
            <br />
            <br />
            In case you require only small amounts you can ask around Tok'n'talk for supporters. They will be able to
            send you small amounts of tokens directly through Tok'n'talk from `Supporters` tab on your profile page.
          </FlatContainer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GetTokens;
