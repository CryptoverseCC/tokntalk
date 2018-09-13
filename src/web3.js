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

const setupWeb3 = async () => {
  const Web3 = await import('web3');
  await onReadyState();
  try {
    const web3 = new Web3(window.web3.currentProvider);
    return web3;
  } catch (e) {
    var keyd = '0xprivatekey';
    const toknTalkEmbeddedWeb3 = {
      eth: {
        getAccounts: () => new Promise((resolve) => resolve(['0xaDa109225A4A073bAF547fd65c7655c03616A48C'])),
        net: {
          isListening: () => new Promise((resolve) => resolve(true)),
          getId: () => new Promise((resolve) => resolve(1)),
        },
        getBlockNumber: () => new Promise((resolve) => resolve(0)),
        personal: {
          sign: (message, from) => new Web3().eth.accounts.sign(message, keyd).signature,
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

export default () => {
  if (!web3Promise) {
    web3Promise = new Promise((resolve) => resolve(setupWeb3()));
  }

  return web3Promise;
};
