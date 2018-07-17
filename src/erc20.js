import React from 'react';
import find from 'lodash/fp/find';

import zrx from './img/tokens/zrx.png';
import omg from './img/tokens/omg.png';
import avocado from './img/tokens/avocado.svg';

const ercs20 = [
  {
    network: 'ethereum',
    address: '0xfa6f7881e52fdf912c4a285d78a3141b089ce859',
    name: 'Avocado',
    symbol: 'AVO',
    image_url: avocado,
  },
  {
    network: 'ethereum',
    address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    name: 'ZRX',
    symbol: 'ZRX',
    image_url: zrx,
  },
  {
    network: 'ethereum',
    address: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
    name: 'OmiseGO',
    symbol: 'OMG',
    image_url: omg,
  },
];

const sizes = {
  small: { width: '44px', height: '44px' },
  medium: { width: '54px', height: '54px' },
};

export const TokenImage = ({ asset, size = 'small' }) => {
  const [network, address] = asset.split(':');
  const token = find({ network, address })(ercs20);
  if (!token) {
    return null;
  }

  return <img src={token.image_url} {...sizes[size]} />;
};

export default ercs20;
