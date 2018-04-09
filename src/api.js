import getWeb3 from './web3';
import { contractAddressesForNetworkId, contractAbi, networkNameForNetworkId } from './contract';
const {
  REACT_APP_ERC_721_ADDRESS: ERC_721_ADDRESS,
  REACT_APP_USERFEEDS_API_ADDRESS: USERFEEDS_API_ADDRESS,
  REACT_APP_ERC_721_NETWORK: ERC_721_NETWORK
} = process.env;

export const getFeedItems = async entityId => {
  try {
    const entitySuffix = entityId ? `:${entityId}` : '';
    const response = await fetch(
      `${USERFEEDS_API_ADDRESS}/feed;context=${ERC_721_NETWORK}:${ERC_721_ADDRESS}${entitySuffix}`
    );
    let { items: feedItems } = await response.json();
    feedItems = feedItems.filter(feedItem =>
      ['regular', 'like', 'post_to', 'response', 'post_about'].includes(feedItem.type)
    );
    return feedItems;
  } catch (e) {
    return [];
  }
};

export const getMyEntities = async () => {
  try {
    const web3 = await getWeb3();
    const [from] = await web3.eth.getAccounts();
    if (!from) return;
    const response = await fetch(
      `${USERFEEDS_API_ADDRESS}/tokens;identity=${from.toLowerCase()};asset=${ERC_721_NETWORK}:${ERC_721_ADDRESS}/`
    );
    const { items: myEntities } = await response.json();
    return myEntities;
  } catch (e) {
    return [];
  }
};

export const getWeb3State = async () => {
  try {
    const web3 = await getWeb3();
    const [[from], isListening, networkId, blockNumber] = await Promise.all([
      web3.eth.getAccounts(),
      web3.eth.net.isListening(),
      web3.eth.net.getId(),
      web3.eth.getBlockNumber()
    ]);
    const networkName = networkNameForNetworkId[networkId];
    return { from, isListening, networkId, blockNumber, web3, networkName };
  } catch (e) {
    return {
      from: undefined,
      isListening: false,
      networkId: undefined,
      blockNumber: undefined,
      web3: undefined,
      networkName: undefined
    };
  }
};

export const getCatData = async catId => {
  try {
    const res = await fetch(`https://api.cryptokitties.co/kitties/${catId}`);
    const data = await res.json();
    return data;
  } catch (e) {
    return undefined;
  }
};

export const getLabels = async entityId => {
  try {
    const res = await fetch(
      `${USERFEEDS_API_ADDRESS}/labels721;context=${ERC_721_NETWORK}:${ERC_721_ADDRESS}:${entityId};labels=github;labels=facebook;labels=twitter;labels=instagram/`
    );
    const { items: labels } = await res.json();
    return labels;
  } catch (e) {
    return [];
  }
};

const getCreditsData = () => [{ type: 'interface', value: 'cryptopurr.co' }];

const getContract = async () => {
  const web3 = await getWeb3();
  const { networkId } = await getWeb3State();
  const contractAddress = contractAddressesForNetworkId[networkId];
  const contract = new web3.eth.Contract(contractAbi, contractAddress);
  contract.setProvider(web3.currentProvider);
  return contract;
};

const createFeedItemBase = async (transactionHash, token) => {
  const { from, blockNumber, networkName } = await getWeb3State();
  return {
    author: from,
    created_at: new Date().getTime(),
    family: networkName,
    id: `claim:${transactionHash}:0`,
    sequence: blockNumber + 1,
    context: `${ERC_721_NETWORK}:${ERC_721_ADDRESS}:${token}`
  };
};

const claim = async data => {
  const { from } = await getWeb3State();
  const contract = await getContract();
  return new Promise(resolve => {
    contract.methods
      .post(JSON.stringify(data))
      .send({ from })
      .on('transactionHash', transactionHash => resolve(transactionHash));
  });
};

export const sendMessage = async (token, message) => {
  const data = {
    claim: { target: message },
    context: `${ERC_721_NETWORK}:${ERC_721_ADDRESS}:${token}`,
    credits: getCreditsData()
  };
  const transactionHash = await claim(data);
  const feedItemBase = await createFeedItemBase(transactionHash, token);
  return {
    ...feedItemBase,
    about: null,
    abouted: [],
    target: { id: message },
    targeted: [],
    type: 'regular'
  };
};

export const reply = async (token, message, about) => {
  const data = {
    type: ['about'],
    claim: { target: message, about },
    context: `${ERC_721_NETWORK}:${ERC_721_ADDRESS}:${token}`,
    credits: getCreditsData()
  };
  const transactionHash = await claim(data);
  const feedItemBase = await createFeedItemBase(transactionHash, token);
  return { ...feedItemBase(transactionHash, token), target: { id: message } };
};

export const react = async (token, to) => {
  const data = {
    type: ['labels'],
    claim: { target: to, labels: ['like'] },
    context: `${ERC_721_NETWORK}:${ERC_721_ADDRESS}:${token}`,
    credits: getCreditsData()
  };
  const transactionHash = await claim(data);
  const feedItemBase = await createFeedItemBase(transactionHash, token);
  return { ...feedItemBase(transactionHash, token), target: { id: to } };
};

export const label = async (token, message, labelType) => {
  const data = {
    type: ['labels'],
    claim: { target: message, labels: [labelType] },
    context: `${ERC_721_NETWORK}:${ERC_721_ADDRESS}:${token}`,
    credits: getCreditsData()
  };
  const transactionHash = await claim(data);
  const feedItemBase = await createFeedItemBase(transactionHash, token);
  return { ...feedItemBase(transactionHash, token), label: labelType, target: message };
};
