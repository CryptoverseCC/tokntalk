import React, { Component } from 'react';
import styled from 'styled-components';

import getWeb3 from './web3';
import { fromWeiToString } from './balance';
import { niceScroll } from './cssUtils';
import { LinkedEntityAvatar } from './Entity';
import Link from './Link';

export default class OpenSea extends Component {
  state = {
    items: [],
    loading: true,
  };

  OpenSeaLib = undefined;

  async componentDidMount() {
    this.getOpenSeaLib();
    const { token } = this.props;
    const { items } = await fetch(
      `https://api.userfeeds.io/api/cheap-tokens?id=${token.network}:${token.address}`,
    ).then((res) => res.json());
    this.setState({ items });
  }

  getOpenSeaLib = () => {
    if (!this.OpenSeaLib) {
      this.OpenSeaLib = import('opensea-js');
    }
    return this.OpenSeaLib;
  };

  buy = async (item) => {
    const [web3, OpenSeaJs] = await Promise.all([getWeb3(), this.getOpenSeaLib()]);
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
    const { items } = this.state;

    return (
      <ScrollableContainer style={style}>
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
    state = { buyState: undefined };

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
          <BuyButton
            disabled={!!buyState}
            onClick={this.onBuy}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            state={buyState}
          />
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
