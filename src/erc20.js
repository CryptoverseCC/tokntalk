import React from 'react';
import find from 'lodash/fp/find';

const ercs20 = [
  {
    network: 'ethereum',
    address: '0xfa6f7881e52fdf912c4a285d78a3141b089ce859',
    name: 'Avocado',
    symbol: 'AVO',
    image_url: 'https://www.svgrepo.com/show/48219/avocado.svg',
  },
  {
    network: 'ethereum',
    address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    name: 'ZRX',
    symbol: 'ZRX',
    image_url: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1896.png',
  },
  {
    network: 'ethereum',
    address: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
    name: 'OmiseGO',
    symbol: 'OMG',
    image_url: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1808.png',
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
