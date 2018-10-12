import React, { Component } from 'react';
import styled from 'styled-components';

import getWeb3 from './web3';
import { fromWeiToString } from './balance';
import { niceScroll } from './cssUtils';
import { LinkedEntityAvatar } from './Entity';
import Link from './Link';

let OpenSeaLib;

const getOpenSeaLib = () => {
  if (!OpenSeaLib) {
    OpenSeaLib = import('opensea-js');
  }
  return OpenSeaLib;
};

export default class OpenSea extends Component {
  state = {
    items: [],
    loading: true,
  };

  OpenSeaLib = undefined;

  async componentDidMount() {
    getOpenSeaLib();
    const { token } = this.props;
    const { items } = await fetch(`https://api.userfeeds.io/api/cheap-tokens?id=${token.network}:${token.address}`)
      .then((res) => res.json())
      .catch((err) => []);
    this.setState({ items, loading: false });
  }

  buy = async (item) => {
    const [web3, OpenSeaJs] = await Promise.all([getWeb3(), getOpenSeaLib()]);
    const { OpenSeaPort, Network, orderFromJSON } = OpenSeaJs;
    const [accountAddress] = await web3.eth.getAccounts();

    const seaport = new OpenSeaPort(web3.currentProvider, { networkName: Network.Main });
    await seaport.fulfillOrder({
      order: orderFromJSON(item.sell_order),
      accountAddress: accountAddress.toLowerCase(),
    });
  };

  render() {
    const { token, style } = this.props;
    const { items, loading } = this.state;

    return (
      <ScrollableContainer style={style}>
        {loading && <span>Loading offers from OpenSea...</span>}
        {!loading && !items && <span>No offers found or loading error occured</span>}
        {items.map((offer) => (
          <div key={offer.context}>
            <Offer
              offer={offer}
              onBuy={this.buy}
              primaryColor={token.primaryColor}
              secondaryColor={token.secondaryColor}
            />
          </div>
        ))}
      </ScrollableContainer>
    );
  }
}

const ScrollableContainer = styled.div`
  overflow-x: scroll;
  ${niceScroll};

  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  > div {
    margin-bottom: 5px;
  }
`;

const Avatar = styled(LinkedEntityAvatar)`
  width: 48px;
  height: 48px;
`;

const Offer = styled(
  class extends Component {
    state = {
      buyState: undefined,
      loading: true,
    };

    onBuy = async () => {
      try {
        this.setState({ buyState: 'waiting' });
        await this.props.onBuy(this.props.offer);
        this.setState({ buyState: 'success' });
      } catch (e) {
        console.log(e);
        this.setState({ buyState: 'failure' });
      }
    };

    verifyOrder = async (item) => {
      const [web3, OpenSeaJs] = await Promise.all([getWeb3(), getOpenSeaLib()]);
      const { OpenSeaPort, Network, orderFromJSON } = OpenSeaJs;
      const [accountAddress] = await web3.eth.getAccounts();

      const seaport = new OpenSeaPort(web3.currentProvider, { networkName: Network.Main });
      let valid = await seaport.isOrderFulfillable({
        order: orderFromJSON(item.sell_order),
        accountAddress: accountAddress.toLowerCase(),
      });

      this.setState({ loading: false, buyState: valid ? null : 'failure' });
    };

    componentDidMount = async () => {
      await this.verifyOrder(this.props.offer);
    };

    static Details = styled.div`
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 0 10px;
    `;

    render() {
      const { offer, primaryColor, secondaryColor, className, style } = this.props;
      const { buyState } = this.state;

      return (
        <div className={className} style={style}>
          <Avatar id={offer.context} entityInfo={offer.context_info} />
          <Offer.Details>
            <Link
              to={`/${offer.context}`}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {offer.context_info.name}
            </Link>
            <span style={{ color: '#918f9b', fontSize: '0.8rem' }}>{fromWeiToString(offer.price, 18)} ETH</span>
          </Offer.Details>
          {this.state.loading ? (
            <ButtonLoader />
          ) : (
            <BuyButton
              disabled={!!buyState}
              onClick={this.onBuy}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              state={buyState}
            />
          )}
        </div>
      );
    }
  },
)`
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  padding: 10px;
`;

const ButtonLoader = styled.button.attrs({
  children: ({ state }) => {
    return '⏳';
  },
  disabled: true,
})`
  cursor: not-allowed;
  flex-shrink: 0;
  margin-left: auto;
  outline: unset;
  font-weight: bold;
  padding: 5px;
  border: none;
  border-radius: 5px;
  align-self: center;
`;

const BuyButton = styled.button.attrs({
  children: ({ state }) => {
    if (!state) {
      return 'Buy';
    }
    if (state === 'waiting') {
      return '⏳';
    }
    if (state === 'failure') {
      return '😞';
    }
    if (state === 'success') {
      return '🚀';
    }
  },
})`
  cursor: pointer;
  flex-shrink: 0;
  margin-left: auto;
  outline: unset;
  font-weight: bold;
  padding: 5px;
  background: ${({ primaryColor, state }) => (state === 'failure' ? '#fc0035' : primaryColor)};
  color: ${({ secondaryColor }) => secondaryColor};
  border: none;
  border-radius: 5px;
  align-self: center;

  &:disabled {
    cursor: not-allowed;
  }
`;
