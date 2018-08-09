import * as mapping from 'contract-mapping/mapping.json';

export default [
  {
    ...mapping.CRYPTOKITTIES,
    image_url: 'https://storage.googleapis.com/opensea-static/cryptokitties-logo.png',
    entityPrefix: 'CryptoKitty #',
    avatarSizes: {
      verySmall: { containerSize: '32px', imgSize: '70px', imgTopOffset: '85%', imgLeftOffset: '55%' },
      small: { containerSize: '44px', imgSize: '110px', imgTopOffset: '85%', imgLeftOffset: '55%' },
      medium: { containerSize: '54px', imgSize: '120px', imgTopOffset: '77%', imgLeftOffset: '55%' },
      large: { containerSize: '64px', imgSize: '130px', imgTopOffset: '70%', imgLeftOffset: '55%' },
    },
  },
  {
    ...mapping.AXIES,
    image_url: 'https://storage.googleapis.com/opensea-static/axie-logo.png',
    entityPrefix: 'Axie #',
  },
  {
    ...mapping.CRYPTOBOTS,
    image_url: 'https://storage.googleapis.com/opensea-static/cryptobots-logo.png',
    entityPrefix: 'CryptoBot #',
  },
  {
    ...mapping.ETH_MOJI,
    image_url: 'https://storage.googleapis.com/opensea-static/ethmoji-logo.png',
    entityPrefix: 'Ethmoji #',
  },
  {
    ...mapping.DIGITAL_ART_CHAIN,
    image_url: 'https://storage.googleapis.com/opensea-static/digitalartchain-logo.png',
    entityPrefix: 'Digital Art ',
  },
  {
    ...mapping.KNOWN_ORIGIN,
    image_url: 'https://storage.googleapis.com/opensea-static/known-origin-logo.png',
    entityPrefix: 'KO Art #',
  },
  {
    ...mapping.CRYPTO_STRIKERS,
    image_url: 'https://storage.googleapis.com/opensea-static/cryptostrikers-logo.png',
    entityPrefix: 'CryptoStriker #',
  },
  {
    ...mapping.ETH_TOWN,
    image_url: 'https://storage.googleapis.com/opensea-static/eth-town-logo.png',
    entityPrefix: 'Hero #',
  },
  {
    ...mapping.CHIBI_FIGHTERS,
    image_url: 'https://storage.googleapis.com/opensea-static/chibi-logo.png',
    entityPrefix: 'Fighter #',
  },
  {
    ...mapping.CRYPTO_FIGHTERS,
    image_url: 'https://storage.googleapis.com/opensea-static/cryptofighters-logo.png',
    entityPrefix: 'Fighter #',
  },
  {
    ...mapping.CRYPTO_SAGA,
    image_url: 'https://cdn-images-1.medium.com/fit/c/200/200/1*9FWNQRTi1eIfogVJyAwHXg.png',
    entityPrefix: 'Hero #',
  },
  {
    ...mapping.ETHEREMON,
    image_url: 'https://storage.googleapis.com/opensea-static/etheremon-logo.png',
    entityPrefix: 'Etheremon #',
  },
  {
    ...mapping.MYTHEREUM,
    image_url: 'https://storage.googleapis.com/opensea-prod.appspot.com/0xc70be5b7c19529ef642d16c10dfe91c58b5c3bf0.png',
    entityPrefix: 'Card #',
  },
  {
    ...mapping.PANDA_EARTH,
    image_url: 'https://storage.googleapis.com/opensea-static/panda-earth-logo.png',
    entityPrefix: 'Panda #',
  },
  {
    ...mapping.CRYPTO_COWS,
    image_url: 'https://storage.googleapis.com/opensea-prod.appspot.com/0xd4202b234c15255bf0511d3380e83bda9172a72b.a',
    entityPrefix: 'Cow #',
  },
  {
    ...mapping.CRYPTO_VOXELS,
    image_url: 'https://storage.googleapis.com/opensea-static/cryptovoxels-logo.jpg',
    entityPrefix: 'Voxel #',
  },
  {
    ...mapping.CRYPTO_CRYSTALS,
    image_url: 'https://storage.googleapis.com/opensea-static/cryptocrystal-logo.png',
    entityPrefix: 'Crystal #',
  },
  {
    ...mapping.BLOCKCHAIN_CUTIES,
    image_url: 'https://storage.googleapis.com/opensea-static/blockchaincuties-logo.png',
    entityPrefix: 'Cuties #',
  },
].map(({ address, ...rest }) => ({ ...rest, address: address.toLowerCase() }));
