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
    primaryColor: '#9ad14aad',
    secondaryColor: '#ffffff',
  },
  {
    network: 'ethereum',
    address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    name: 'ZRX',
    symbol: 'ZRX',
    image_url: zrx,
    primaryColor: '#404040',
    secondaryColor: '#ffffff',
  },
  {
    network: 'ethereum',
    address: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
    name: 'OmiseGO',
    symbol: 'OMG',
    image_url: omg,
    primaryColor: '#1a52ef',
    secondaryColor: '#ffffff',
  },
];

const sizes = {
  small: { width: '44px', height: '44px' },
  medium: { width: '54px', height: '54px' },
};

export const TokenImage = ({ token, size = 'small', ...restProps }) => {
  if (!token) {
    return null;
  }

  return <img src={token.image_url} {...sizes[size]} {...restProps} />;
};

export default ercs20;
