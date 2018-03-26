import getWeb3 from './web3';
import { contractAddressesForNetworkId, contractAbi } from './contract';
export const downloadCats = async () => {
  const web3 = await getWeb3();
  const [from] = await web3.eth.getAccounts();
  if (!from) return;
  const response = await fetch(
    `https://api-dev.userfeeds.io/ranking/tokens;identity=${from.toLowerCase()};asset=ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d`
  );
  const { items: myCats } = await response.json();
  return myCats;
};

export const downloadWeb3State = async () => {
  const web3 = await getWeb3();
  const [[from], isListening, networkId] = await Promise.all([
    web3.eth.getAccounts(),
    web3.eth.net.isListening(),
    web3.eth.net.getId()
  ]);
  return { from, isListening, networkId };
};

const catInfoRequests = {};

export const getCatData = catId => {
  if (!catInfoRequests[catId]) {
    catInfoRequests[catId] = new Promise((resolve, reject) => {
      catInfoRequests[catId] = fetch(`https://api.cryptokitties.co/kitties/${catId}`)
        .then(res => res.json())
        .then(catData => {
          resolve(catData);
        });
    });
  }
  return catInfoRequests[catId];
};

export const purr = async (token, message) => {
  const web3 = await getWeb3();
  const { from, networkId } = await downloadWeb3State();
  const contractAddress = contractAddressesForNetworkId[networkId];
  const contract = new web3.eth.Contract(contractAbi, contractAddress);
  contract.setProvider(web3.currentProvider);
  const data = {
    claim: {
      target: message
    },
    context: `ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:${token}`
  };
  return new Promise((resolve, reject) => {
    contract.methods
      .post(JSON.stringify(data))
      .send({ from })
      .on('transactionHash', async transactionHash => {
        resolve({
          author: from,
          created_at: new Date().getTime(),
          id: `claim:${transactionHash}:0`,
          message,
          sequence: (await web3.eth.getBlockNumber()) + 1,
          token_id: token
        });
      })
      .on('error', error => {
        reject(error);
      });
  });
};
