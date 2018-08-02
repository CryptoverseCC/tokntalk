import React from 'react';

import cryptokitties from './img/tokens/cryptokitties-icon.svg';
import cryptokittiesCover from './img/tokens/cryptokitties.png';

import axie from './img/tokens/axie-icon.png';
import axieCover from './img/tokens/axie.png';

import cryptobots from './img/tokens/cryptobots-icon.svg';
import cryptobotsCover from './img/tokens/cryptobots.png';

import ethmoji from './img/tokens/ethmoji-icon.png';
import ethmojiCover from './img/tokens/ethmoji.jpg';

import dac from './img/tokens/dac-icon.svg';
import dacCover from './img/tokens/dac.jpg';

import bat from './img/tokens/bat-icon.svg';
import batCover from './img/tokens/bat.jpg';

import ben from './img/tokens/bentyn-icon.png';
import benCover from './img/tokens/bentyn.jpg';

import gnt from './img/tokens/golem-icon.svg';
import gntCover from './img/tokens/golem.png';

import snt from './img/tokens/status-icon.svg';
import sntCover from './img/tokens/status.png';

import mkr from './img/tokens/maker-icon.svg';
import mkrCover from './img/tokens/maker.png';

import mana from './img/tokens/decentraland-icon.png';
import manaCover from './img/tokens/decentraland.jpg';

import unicorn from './img/tokens/unicorn-icon.png';
import unicornCover from './img/tokens/unicorn.png';

import zrx from './img/tokens/zrx-icon.svg';
import zrxCover from './img/tokens/zrx.png';

import omg from './img/tokens/omisego-icon.svg';
import omgCover from './img/tokens/omisego.png';

import avocado from './img/tokens/avocado-icon.png';
import avocadoCover from './img/tokens/avocado.jpg';

import knownorigin from './img/tokens/knownorigin-icon.svg';
import knownoriginCover from './img/tokens/knownorigin.jpg';

import cryptostrikers from './img/tokens/cryptostrikers-icon.png';
import cryptostrikersCover from './img/tokens/cryptostrikers.png';

import ethtown from './img/tokens/ethtown-icon.png';
import ethtownCover from './img/tokens/ethtown.png';

import cryptosaga from './img/tokens/cryptosaga-icon.png';
import cryptosagaCover from './img/tokens/cryptosaga.png';

import chibi from './img/tokens/chibi-icon.png';
import chibiCover from './img/tokens/chibi.png';

import cryptofighters from './img/tokens/cryptofighters-icon.svg';
import cryptofightersCover from './img/tokens/cryptofighters.png';

import etheremon from './img/tokens/etheremon-icon.png';
import etheremonCover from './img/tokens/etheremon.png';

import mythereum from './img/tokens/mythereum-icon.png';
import mythereumCover from './img/tokens/mythereum.png';

import pandaearth from './img/tokens/pandaearth-icon.png';
import pandaearthCover from './img/tokens/pandaearth.png';

import sanmaricoin from './img/tokens/sanmaricoin-icon.png';
import sanmaricoinCover from './img/tokens/sanmaricoin.png';

import kiyosalo from './img/tokens/kst-icon.png';
import kiyosaloCover from './img/tokens/kst.jpg';

import percent from './img/tokens/percent-icon.svg';
import percentCover from './img/tokens/percent.png';

const ercs20 = [
  {
    network: 'ethereum',
    address: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
    name: 'Cryptokitties',
    symbol: 'CK',
    logo: cryptokitties,
    coverImage: cryptokittiesCover,
    primaryColor: '#FFD9FF',
    secondaryColor: '#C23DA8',
    shadowColor: 'rgba(194,61,168,0.2)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d',
    name: 'Axies',
    symbol: 'AXIE',
    logo: axie,
    coverImage: axieCover,
    primaryColor: '#2b6a93',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(43,106,147,0.2)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0xf7a6e15dfd5cdd9ef12711bd757a9b6021abf643',
    name: 'Cryptobots',
    symbol: 'CBT',
    logo: cryptobots,
    coverImage: cryptobotsCover,
    primaryColor: '#EFF7B6',
    secondaryColor: '#1D132D',
    shadowColor: 'rgba(193,205,109,0.3)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0xa6d954d08877f8ce1224f6bfb83484c7d3abf8e9',
    name: 'EthMoji',
    symbol: 'MOJI',
    logo: ethmoji,
    coverImage: ethmojiCover,
    primaryColor: '#E051BA',
    secondaryColor: '#FFFFFF',
    shadowColor: 'rgba(224,81,184,0.3)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0x323a3e1693e7a0959f65972f3bf2dfcb93239dfe',
    name: 'DigitalArtChain',
    symbol: 'DAC',
    logo: dac,
    coverImage: dacCover,
    primaryColor: '#DDE1F1',
    secondaryColor: '#F05E40',
    shadowColor: 'rgba(247,165,148,0.3)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0xdde2d979e8d39bb8416eafcfc1758f3cab2c9c72',
    name: 'Known Origin',
    symbol: 'KODA',
    logo: knownorigin,
    coverImage: knownoriginCover,
    primaryColor: '#0418D8',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(200,249,255,0.6)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0xdcaad9fd9a74144d226dbf94ce6162ca9f09ed7e',
    name: 'CryptoStrikers',
    symbol: 'STRK',
    logo: cryptostrikers,
    coverImage: cryptostrikersCover,
    primaryColor: '#BEC4CB',
    secondaryColor: '#2D1F18',
    shadowColor: 'rgba(190,196,203,0.4)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0x4fece400c0d3db0937162ab44bab34445626ecfe',
    name: 'ETH TOWN',
    symbol: 'HERO',
    logo: ethtown,
    coverImage: ethtownCover,
    primaryColor: '#E8EDFB',
    secondaryColor: '#283861',
    shadowColor: 'rgba(118,103,170,0.26)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0x71c118b00759b0851785642541ceb0f4ceea0bd5',
    name: 'Chibi Fighters',
    symbol: 'CBF',
    logo: chibi,
    coverImage: chibiCover,
    primaryColor: '#4881ae',
    secondaryColor: '#FCE478',
    shadowColor: 'rgba(52,58,64,0.2)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0x87d598064c736dd0c712d329afcfaa0ccc1921a1',
    name: 'CryptoFighters',
    symbol: 'FIGHTER',
    logo: cryptofighters,
    coverImage: cryptofightersCover,
    primaryColor: '#BAD2ED',
    secondaryColor: '#030F23',
    shadowColor: 'rgba(186,210,237,0.3)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0xabc7e6c01237e8eef355bba2bf925a730b714d5f',
    name: 'CryptoSaga',
    symbol: 'SAGA',
    logo: cryptosaga,
    coverImage: cryptosagaCover,
    primaryColor: '#D8CECB',
    secondaryColor: '#382320',
    shadowColor: 'rgba(216,206,203,0.6)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0xb2c0782ae4a299f7358758b2d15da9bf29e1dd99',
    name: 'Etheremon',
    symbol: 'MON',
    logo: etheremon,
    coverImage: etheremonCover,
    primaryColor: '#010206',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(1,2,6,0.2)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0xc70be5b7c19529ef642d16c10dfe91c58b5c3bf0',
    name: 'Mythereum',
    symbol: 'MYTH',
    logo: mythereum,
    coverImage: mythereumCover,
    primaryColor: '#4B1E06',
    secondaryColor: '#F7DC8D',
    shadowColor: 'rgba(75,30,6,0.4)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0x663e4229142a27f00bafb5d087e1e730648314c3',
    name: 'PandaEarth',
    symbol: 'PE',
    logo: pandaearth,
    coverImage: pandaearthCover,
    primaryColor: '#EEEEEE',
    secondaryColor: '#332f2c',
    shadowColor: 'rgba(51,47,44,0.1)',
    is721: true,
  },
  {
    network: 'ethereum',
    address: '0xfa6f7881e52fdf912c4a285d78a3141b089ce859',
    name: 'Avocado',
    symbol: 'AVO',
    logo: avocado,
    coverImage: avocadoCover,
    primaryColor: '#CDFA7F',
    secondaryColor: '#3D5000',
    shadowColor: 'rgba(61,80,0,0.2)',
  },
  /*{
    network: 'ethereum',
    address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    name: 'Basic Attention Token',
    symbol: 'BAT',
    logo: bat,
    coverImage: batCover,
    primaryColor: '#818181',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(75,75,75,0.4)',
  },*/
  {
    network: 'ethereum',
    address: '0x108c05cac356d93b351375434101cfd3e14f7e44',
    name: 'Bentyn',
    symbol: 'BEN',
    logo: ben,
    coverImage: benCover,
    primaryColor: '#BEC4CB',
    secondaryColor: '#2D1F18',
    shadowColor: 'rgba(88,66,54,0.25)',
  },
  {
    network: 'ethereum',
    address: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
    name: 'Decentraland MANA',
    symbol: 'MANA',
    logo: mana,
    coverImage: manaCover,
    primaryColor: '#1F1826',
    secondaryColor: '#30D7A9',
    shadowColor: 'rgba(31,24,38,0.3)',
  },
  {
    network: 'ethereum',
    address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    name: 'Maker',
    symbol: 'MKR',
    logo: mkr,
    coverImage: mkrCover,
    primaryColor: '#C6FFF4',
    secondaryColor: '#276C5E',
    shadowColor: 'rgba(82,211,185,0.3)',
  },
  /*{
    network: 'ethereum',
    address: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
    name: 'Golem',
    symbol: 'GNT',
    logo: gnt,
    coverImage: gntCover,
    primaryColor: '#002D64',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(31,54,90,0.5)',
  },*/
  {
    network: 'ethereum',
    address: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
    name: 'OmiseGO',
    symbol: 'OMG',
    logo: omg,
    coverImage: omgCover,
    primaryColor: '#1A52EF',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(26,82,239,0.3)',
  },
  {
    network: 'ethereum',
    address: '0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7',
    name: 'Unicorn',
    symbol: '🦄',
    logo: unicorn,
    coverImage: unicornCover,
    primaryColor: '#C8F9FF',
    secondaryColor: '#5B3D9D',
    shadowColor: 'rgba(200,249,255,0.6)',
  },
  /*{
    network: 'ethereum',
    address: '0x744d70fdbe2ba4cf95131626614a1763df805b9e',
    name: 'Status',
    symbol: 'SNT',
    logo: snt,
    coverImage: sntCover,
    primaryColor: '#5B6CEE',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(91,108,238,0.5)',
  },*/
  /*{
    network: 'ethereum',
    address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    name: 'ZRX',
    symbol: 'ZRX',
    logo: zrx,
    coverImage: zrxCover,
    primaryColor: '#3C3C3C',
    secondaryColor: '#ffffff',
    shadowColor: 'rgba(60,60,60,0.5)',
  },*/
  {
    network: 'ethereum',
    address: '0xc5fdd3e4665b5d7bc4dc9102622d7cb0fe510b65',
    name: 'Sanmaricoin',
    symbol: 'SMC',
    logo: sanmaricoin,
    coverImage: sanmaricoinCover,
    primaryColor: '#C8D5FF',
    secondaryColor: '#1639AA',
    shadowColor: 'rgba(22,57,170,0.2)',
  },
  {
    network: 'ethereum',
    address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    name: 'Kiyosalo',
    symbol: 'KST',
    logo: kiyosalo,
    coverImage: kiyosaloCover,
    primaryColor: '#9AF6E1',
    secondaryColor: '#1F987B',
    shadowColor: 'rgba(31,152,123,0.2)',
  },
  {
    network: 'ethereum',
    address: '0xc93058ca0cc2330b847c001c835fc926fedf5a07',
    name: 'Percent',
    symbol: '％',
    logo: percent,
    coverImage: percentCover,
    primaryColor: '#C8F9FF',
    secondaryColor: '#5B3D9D',
    shadowColor: 'rgba(200,249,255,0.6)',
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
