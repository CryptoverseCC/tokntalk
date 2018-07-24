import React from 'react';
import find from 'lodash/fp/find';

import zrx from './img/tokens/zrx.png';
import zrxCover from './img/tokens/zrx_cover.png';

import omg from './img/tokens/omg.png';
import omgCover from './img/tokens/omg_cover.png';

import avocado from './img/tokens/avocado.svg';
import avocadoCover from './img/tokens/avocado_cover.jpg';

const ercs20 = [
  {
    network: 'ethereum',
    address: '0xfa6f7881e52fdf912c4a285d78a3141b089ce859',
    name: 'Avocado',
    symbol: 'AVO',
    logo: avocado,
    coverImage: avocadoCover,
    primaryColor: '#ffffff',
    secondaryColor: '#3D5000',
    shadowColor: 'rgba(30,59,11,0.2)',
  },
  {
    network: 'ethereum',
    address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    name: 'ZRX',
    symbol: 'ZRX',
    logo: zrx,
    coverImage: zrxCover,
    primaryColor: '#3C3C3C',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(60,60,60,0.5)',
  },
  {
    network: 'ethereum',
    address: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
    name: 'OmiseGO',
    symbol: 'OMG',
    logo: omg,
    coverImage: omgCover,
    primaryColor: '#1A52EF',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(26,82,239,0.5)',
  },
];

const newSupportedTokens = [
  {
    name: 'Avocado',
    symbol: 'AVO',
    icon: 'avcado-icon.png',
    image: 'avocado.jpg',
    primaryColor: '#ffffff',
    secondaryColor: '#3D5000',
    shadowColor: '(30,59,11,0.2)',
  },
  {
    name: 'Basic Attention Token',
    symbol: 'BAT',
    icon: 'bat-icon.svg',
    image: 'bat.jpg',
    primaryColor: '#818181',
    secondaryColor: '#ffffff',
    shadowColor: '(75,75,75,0.4)',
  },
  {
    name: 'Bentyn',
    symbol: 'BEN',
    icon: 'bentyn-icon.png',
    image: 'bentyn.jpg',
    primaryColor: '#BEC4CB',
    secondaryColor: '#2D1F18',
    shadowColor: '(88,66,54,0.3)',
  },

  {
    name: 'Cryptobots',
    symbol: '',
    icon: 'cryptobots-icon.svg',
    image: 'cryptobots.png',
    primaryColor: '#EFF7B6',
    secondaryColor: '#1D132D',
    shadowColor: '(239,247,182,0.4)',
  },

  {
    name: 'Cryptokitties',
    symbol: '',
    icon: 'cryptokitties-icon.svg',
    image: 'cryptokitties.png',
    primaryColor: '#E7E8FA',
    secondaryColor: '#342F8F',
    shadowColor: '(118,103,170,0.2)',
  },

  {
    name: 'Cryptosaga',
    symbol: '',
    icon: '',
    image: 'cryptosaga.png',
    primaryColor: '#D8CECB',
    secondaryColor: '#382320',
    shadowColor: '(216,206,203,0.7)',
  },

  {
    name: 'Cryptostrikers',
    symbol: '',
    icon: 'cryptostrikers-icon.png',
    image: 'cryptostrikers.png',
    primaryColor: '#C9EEFE',
    secondaryColor: '#0E1D4A',
    shadowColor: '(201,238,254,0.5)',
  },

  {
    name: 'Digital Art Chain',
    symbol: '',
    icon: 'dac-icon.svg',
    image: 'dac.jpg',
    primaryColor: '#ffffff',
    secondaryColor: '#F05E40',
    shadowColor: '(247,165,148,0.3)',
  },

  {
    name: 'Decentraland',
    symbol: 'LAND',
    icon: 'decentraland-icon.png',
    image: 'decentraland.jpg',
    primaryColor: '#121212',
    secondaryColor: '#ffffff',
    shadowColor: '(11,63,75,0.4)',
  },

  {
    name: 'Ethmoji',
    symbol: '',
    icon: 'ethmoji-icon.png',
    image: 'ethmoji.jpg',
    primaryColor: '#E051B8',
    secondaryColor: '#ffffff',
    shadowColor: '(224,81,184,0.45)',
  },
  {
    name: 'EthTown',
    symbol: '',
    icon: 'ethtown-icon.png',
    image: 'ethtown.jpg',
    primaryColor: '#E8EDFB',
    secondaryColor: '#283861',
    shadowColor: '(118,103,170,0.26)',
  },

  {
    name: 'Golem',
    symbol: 'GNT',
    icon: 'golem-icon.svg',
    image: 'golem.png',
    primaryColor: '#002D64',
    secondaryColor: '#ffffff',
    shadowColor: '(31,54,90,0.5)',
  },

  {
    name: 'Known Origin',
    symbol: '',
    icon: 'knownorigin-icon.svg',
    image: 'knownorigin.jpg',
    primaryColor: '#490FE2',
    secondaryColor: '#ffffff',
    shadowColor: '(3,26,223,0.3)',
  },

  {
    name: 'Maker',
    symbol: 'MKR',
    icon: 'maker-icon.svg',
    image: 'maker.png',
    primaryColor: '#C6FFF4',
    secondaryColor: '#276C5E',
    shadowColor: '(82,211,185,0.5)',
  },

  {
    name: 'Mythereum',
    symbol: '',
    icon: '',
    image: 'mythereum.png',
    primaryColor: '#4B1E06',
    secondaryColor: '#F7DC8D',
    shadowColor: '(75,30,6,0.4)',
  },

  {
    name: 'OmiseGo',
    symbol: 'OMG',
    icon: 'omisego-icon.svg',
    image: 'omisego.png',
    primaryColor: '#1A52EF',
    secondaryColor: '#ffffff',
    shadowColor: '(26,82,239,0.5)',
  },

  {
    name: 'Status',
    symbol: 'SNT',
    icon: 'status-icon.svg',
    image: 'status.png',
    primaryColor: '#5B6CEE',
    secondaryColor: '#ffffff',
    shadowColor: '(91,108,238,0.5)',
  },

  {
    name: 'Unicorn',
    symbol: '',
    icon: 'unicorn-icon.png',
    image: 'unicorn.png',
    primaryColor: '#C8F9FF',
    secondaryColor: '#5B3D9D',
    shadowColor: '(200,249,255,0.6)',
  },

  {
    name: 'UnicornGO',
    symbol: 'CANDY',
    icon: 'unicorngo-icon.png',
    image: 'unicorngo.png',
    primaryColor: '#ffffff',
    secondaryColor: '#2F2E56',
    shadowColor: '(235,176,177,0.5)',
  },

  {
    name: 'ZRX',
    symbol: '0x',
    icon: 'zrx-icon.svg',
    image: 'zrx.png',
    primaryColor: '#3C3C3C',
    secondaryColor: '#ffffff',
    shadowColor: '(60,60,60,0.5)',
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

  return <img src={token.logo} {...sizes[size]} {...restProps} />;
};

export default ercs20;
