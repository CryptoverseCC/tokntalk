import bip39 from 'bip39';

let web3Promise;

const onReadyState = () => {
  if (document.readyState === 'complete') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const onReadyState = (event) => {
      if (event.target.readyState === 'complete') {
        document.removeEventListener('readystatechange', onReadyState);
        resolve();
      }
    };
    document.addEventListener('readystatechange', onReadyState);
  });
};

const setupWeb3 = async (storage) => {
  const Web3 = await import('web3');
  await onReadyState();
  try {
    const web3 = new Web3(window.web3.currentProvider);
    return web3;
  } catch (e) {
    if (!storage) {
      throw 'Storage is not a function nor undefined';
    }
    const savedMnemonic = storage.getItem('mnemonic');
    let mnemonic;
    if (!savedMnemonic) {
      mnemonic = bip39.generateMnemonic();
      storage.setItem('mnemonic', mnemonic);
    } else {
      mnemonic = savedMnemonic;
    }
    const { address, privateKey } = extractKeysFromMnemonic(mnemonic);
    storage.setItem('privateKey', privateKey);
    const toknTalkEmbeddedWeb3 = {
      eth: {
        getAccounts: () => new Promise((resolve) => resolve([address])),
        net: {
          isListening: () => new Promise((resolve) => resolve(true)),
          getId: () => new Promise((resolve) => resolve(1)),
        },
        getBlockNumber: () => new Promise((resolve) => resolve(0)),
        personal: {
          sign: (message, from) => new Web3().eth.accounts.sign(message, privateKey).signature,
        },
      },
      currentProvider: {
        isToknTalkEmbedded: true,
      },
    };
    window.web3 = toknTalkEmbeddedWeb3;
    return toknTalkEmbeddedWeb3;
  }
};

const extractKeysFromMnemonic = (mnemonic) => {
  const hdkey = require('hdkey');
  const ethUtil = require('ethereumjs-util');
  const seed = bip39.mnemonicToSeed(mnemonic);
  const root = hdkey.fromMasterSeed(seed);
  const addrNode = root.derive("m/44'/60'/0'/0/0");
  const privateKey = '0x' + addrNode._privateKey.toString('hex');
  const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
  const addr = ethUtil.publicToAddress(pubKey).toString('hex');
  const address = ethUtil.toChecksumAddress(addr);
  return {
    privateKey,
    address,
  };
};

export default (storage) => {
  if (!web3Promise) {
    web3Promise = new Promise((resolve) => resolve(setupWeb3(storage)));
  }

  return web3Promise;
};
