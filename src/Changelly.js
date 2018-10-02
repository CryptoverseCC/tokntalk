import React from 'react';
import AppContext from './Context';

export const ChangellyFastBuy = () => {
  return (
    <AppContext>
      {({ web3Store }) => (
        <div>
          <link rel="stylesheet" href="https://changelly.com/widget.css" />
          <a
            onClick={(e, a) => {
              e.preventDefault();
              document.getElementById('changellyModal').style.display = 'block';
            }}
            id="changellyButton"
            href={`https://changelly.com/widget/v1?auth=email&from=USD&to=ETH&merchant_id=wqqgw7k9zlo98t0v&address=${
              web3Store.from
            }&amount=1&ref_id=wqqgw7k9zlo98t0v&color=00cf70`}
            target="_blank"
          >
            <img src="https://changelly.com/pay_button_buy_sell.png" />
          </a>
          <div id="changellyModal">
            <div className="changellyModal-content">
              <span
                onClick={() => {
                  document.getElementById('changellyModal').style.display = 'none';
                }}
                className="changellyModal-close"
              >
                x
              </span>
              <iframe
                src={`https://changelly.com/widget/v1?auth=email&from=USD&to=ETH&merchant_id=wqqgw7k9zlo98t0v&address=${
                  web3Store.from
                }&amount=1&ref_id=wqqgw7k9zlo98t0v&color=00cf70`}
                width="600"
                height="500"
                className="changelly"
                scrolling="no"
                style={{ overflowY: 'hidden', border: 'none' }}
              >
                Can't load widget
              </iframe>
            </div>
          </div>
        </div>
      )}
    </AppContext>
  );
};
