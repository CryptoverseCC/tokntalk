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
    const toknTalkEmbeddedWeb3 = {
      eth: {
        getAccounts: () => new Promise((resolve) => resolve(['0x2823E7756315B3E4FdAac27F5Fe8512294aB4F7f'])),
        net: {
          isListening: () => new Promise((resolve) => resolve(true)),
          getId: () => new Promise((resolve) => resolve(1)),
        },
        getBlockNumber: () => new Promise((resolve) => resolve(0)),
        personal: {
          sign: () =>
            new Promise((resolve) =>
              resolve(
                '0x2f9547b73c9d644159fcbe7af7f5ae19f30f607976e08245f44578a912f4e9c76a5742f7fde3ec7ce7cb17cbc9f210c6789172ece7d2ffe2ad637ea735ed0a131b',
              ),
            ),
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
