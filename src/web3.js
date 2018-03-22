let newWeb3;
let web3Promise;
let web3PromiseResolve;

const updateWeb3 = () => {
  if (typeof window.web3 !== 'undefined') {
    import('web3').then((Web3) => {
      newWeb3 = new Web3(window.web3.currentProvider);
      window.web3 = newWeb3;
      if (web3PromiseResolve) web3PromiseResolve(newWeb3);
    });
  } else {
    setTimeout(updateWeb3, 100);
  }
};

export default () => {
  web3Promise = new Promise(resolve => {
    web3PromiseResolve = resolve;
    if (newWeb3) {
      resolve(newWeb3);
    } else {
      updateWeb3();
    }
  });
  return web3Promise;
};
