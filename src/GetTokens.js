import React from 'react';

import Link from './Link';
import { ChangellyFastBuy } from './Changelly';
import { CoinbaseWidget } from './CoinbaseWidget';
import { FlatContainer, H4 } from './Components';
import { IfActiveEntity } from './Entity';

const GetTokens = () => {
  return (
    <React.Fragment>
      <div className="columns ordered-mobile">
        <div className="column is-8 fl-1 is-offset-1">
          <div>
            <H4>Tok'n'talk Supporters</H4>
            <div>
              <p>
                You can ask on Tok'n'talk for people to support you or your idea. There is dedicated "Supporters" page
                on each address profile page that enables anyone to send ETH directly to that address.
              </p>

              <IfActiveEntity>
                {(entityId) => (
                  <React.Fragment>
                    <br />
                    <p>
                      Your <b>supporters</b> page is <Link to={`${entityId}/supporters`}>here</Link>.
                    </p>
                  </React.Fragment>
                )}
              </IfActiveEntity>
            </div>
            <br />
            <H4>Ramp.network</H4>
            <div>Work in progress</div>
            <br />
            <H4>Changelly</H4>
            <ChangellyFastBuy />
            <br />
            <H4>Other</H4>
            <div>
              <p>Let us know what other solutions are there at info@cryptoverse.cc or directly on Tok'n'talk</p>
            </div>
          </div>

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
