import React from 'react';
import AppContext from './Context';
import { FlatContainer, H4 } from './Components';

export const ChangellyFastBuy = () => {
  return (
    <AppContext>
      {({ web3Store }) => (
        <div>
          <H4>Ramp.network</H4>
          <div>Work in progress</div>
          <br />
          <H4>Changelly</H4>
          <div>
            <span
              onClick={() =>
                window.open(
                  `https://changelly.com/widget/v1?auth=email&from=USD&to=ETH&merchant_id=nsbvzyjs8u57k1lk&address=${
                    web3Store.from
                  }&amount=50&ref_id=nsbvzyjs8u57k1lk&color=3a4c44`,
                  'Changelly',
                  'width=600,height=470,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=0,left=0,top=0',
                )
              }
            >
              <img src="https://changelly.com/pay_button.png" alt="Changelly" />
            </span>
          </div>
          <br />
          <H4>Other</H4>
          <div>Let us know what other solutions are there at info@cryptoverse.cc or directly on Tok'n'talk</div>
        </div>
      )}
    </AppContext>
  );
};
