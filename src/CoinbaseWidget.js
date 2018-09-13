import React, { Component } from 'react';
import AppContext from './Context';

export class CoinbaseWidget extends Component {
  componentDidMount() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    var theUrl = 'https://buy.coinbase.com/static/widget.js';
    s.src = theUrl + (theUrl.indexOf('?') >= 0 ? '&' : '?') + 'ref=' + encodeURIComponent(window.location.href);
    var embedder = document.getElementById('coinbase_widget_loader');
    embedder.parentNode.insertBefore(s, embedder);
  }

  render() {
    return (
      <AppContext>
        {({ web3Store }) => (
          <div>
            <a
              class="coinbase-widget"
              id="coinbase_widget"
              data-address={web3Store.from}
              data-amount="100"
              data-code="{{ code }}"
              data-currency="USD"
              data-crypto_currency="ETH"
              href=""
            >
              Buy eth using Coinbase
            </a>
            <script type="text/javascript" id="coinbase_widget_loader" class="coinbase-widget-async-loader" />
          </div>
        )}
      </AppContext>
    );
  }
}
