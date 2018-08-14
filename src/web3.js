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
  const web3 = new Web3(window.web3.currentProvider);
  return web3;
};

export default () => {
  if (!web3Promise) {
    web3Promise = new Promise((resolve) => resolve(setupWeb3()));
  }

  return web3Promise;
};
