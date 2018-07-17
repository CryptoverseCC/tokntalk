import uuidv4 from 'uuid/v4';
import find from 'lodash/fp/find';
import last from 'lodash/fp/last';

import getWeb3 from './web3';
import {
  claimContractAddressesForNetworkId,
  claimContractAbi,
  networkNameForNetworkId,
  claimWithValueTransferContractAddressesForNetworkId,
  claimWithValueTransferContractAbi,
} from './contract';
import { getEntityData } from './entityApi';
import erc20 from './erc20';
import ercs721 from './erc721';

const {
  REACT_APP_USERFEEDS_API_ADDRESS: USERFEEDS_API_ADDRESS,
  REACT_APP_INTERFACE_VALUE: INTERFACE_VALUE,
  REACT_APP_INTERFACE_BOOST_ADDRESS: INTERFACE_BOOST_ADDRESS,
  REACT_APP_INTERFACE_BOOST_NETWORK: INTERFACE_BOOST_NETWORK,
} = process.env;

export const isValidAndSupportedErc721 = (address) => !!find({ address })(ercs721);

export const hasValidContext = ({ context }) => {
  if (!context) return false;
  const [, address] = context.split(':');
  return isValidAndSupportedErc721(address);
};

const isValidFeedItem = (feedItem) => {
  if (!['regular', 'like', 'post_to', 'post_about'].includes(feedItem.type)) {
    return false;
  }
  if (!hasValidContext(feedItem)) {
    return false;
  }

  if (typeof feedItem.target === 'object' && !hasValidContext(feedItem.target)) {
    return false;
  }

  feedItem.likes = feedItem.likes.filter(hasValidContext);
  feedItem.replies = feedItem.replies.filter(hasValidContext).map((reply) => {
    reply.likes = reply.likes.filter(hasValidContext);
    return reply;
  });

  return true;
};

export const getFeedItem = async ({ claimId }) => {
  let { items: feedItems } = await fetch(`${USERFEEDS_API_ADDRESS}/ranking/cryptoverse_thread_feed;id=${claimId}`).then(
    (res) => res.json(),
  );

  feedItems = feedItems.filter(isValidFeedItem);

  return feedItems[0];
};

export const getFeedItems = async ({ lastVersion, oldestKnown, size, catId }) => {
  const versionParam = lastVersion ? `lastVersion=${lastVersion}` : '';
  const oldestParam = oldestKnown ? `oldestKnown=${oldestKnown}` : '';
  const sizeParam = size ? `size=${size}` : '';

  const response = await fetch(
    catId
      ? `${USERFEEDS_API_ADDRESS}/ranking/cryptoverse_single_feed;id=${catId}`
      : `${USERFEEDS_API_ADDRESS}/api/cache-cryptoverse-feed?${versionParam}&${oldestParam}&${sizeParam}`,
  );

  const { items, total, version } = await response.json();
  const validFeedItems = items.filter(isValidFeedItem);
  const lastItem = last(items);

  return { feedItems: validFeedItems.slice(0, 30), total, version, lastItemId: lastItem ? lastItem.id : undefined };
};

export const getRanking = (flow) => {
  return fetch(`${USERFEEDS_API_ADDRESS}/ranking`, {
    method: 'POST',
    body: JSON.stringify({ flow }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
};

export const getMyEntities = async () => {
  try {
    const web3 = await getWeb3();
    const [from] = await web3.eth.getAccounts();
    if (!from) return [];

    const identities = await fetch('https://api.userfeeds.io/ranking', {
      body: JSON.stringify({
        flow: [
          {
            algorithm: 'experimental_tokens',
            params: {
              identity: from.toLowerCase(),
              asset: ercs721.map(({ address: erc721Address }) => `ethereum:${erc721Address.toLowerCase()}`),
            },
          },
        ],
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ items }) => items.map(({ asset, token }) => `${asset}:${token}`));
    return identities;
  } catch (e) {
    return [];
  }
};

export const getLabels = async (entityId) => {
  try {
    const res = await fetch(`${USERFEEDS_API_ADDRESS}/ranking/cryptopurr_profile;context=${entityId}`);
    const labels = await res.json();
    return labels;
  } catch (e) {
    return {};
  }
};

export const getEntityTokens = async (entityId) => {
  const tokens = await getRanking([
    {
      algorithm: 'experimental_assets_balances_erc721',
      params: {
        context: entityId,
        asset: erc20.map(({ network, address }) => `${network}:${address}`),
      },
    },
  ]);

  return Object.entries(tokens).map(([token]) => token);
};

export const getBoosts = async (token) => {
  try {
    const res = await fetch(
      `${USERFEEDS_API_ADDRESS}/ranking/experimental_boost_721;asset=${INTERFACE_BOOST_NETWORK};entity=${token};fee_address=${INTERFACE_BOOST_ADDRESS}`,
    );
    const { items: boosts } = await res.json();
    const boostsMap = boosts.reduce((acc, boost) => {
      const [, address] = boost.id.split(':');
      if (!find({ address })(ercs721)) {
        return acc;
      }
      return { ...acc, [boost.id]: boost };
    }, {});
    return boostsMap;
  } catch (e) {
    return {};
  }
};

export const getWeb3State = async () => {
  try {
    const web3 = await getWeb3();
    const [[from], isListening, networkId, blockNumber] = await Promise.all([
      web3.eth.getAccounts(),
      web3.eth.net.isListening(),
      web3.eth.net.getId(),
      web3.eth.getBlockNumber(),
    ]);
    const networkName = networkNameForNetworkId[networkId];
    const provider = web3.currentProvider;
    return {
      from,
      isListening,
      networkId,
      blockNumber,
      web3,
      networkName,
      provider,
    };
  } catch (e) {
    return {
      from: undefined,
      isListening: false,
      networkId: undefined,
      blockNumber: undefined,
      web3: undefined,
      networkName: undefined,
      provider: undefined,
    };
  }
};

const getCreditsData = () => [{ type: 'interface', value: INTERFACE_VALUE }];

const getClaimContract = async () => {
  const web3 = await getWeb3();
  const { networkId } = await getWeb3State();
  const contractAddress = claimContractAddressesForNetworkId[networkId];
  const contract = new web3.eth.Contract(claimContractAbi, contractAddress);
  contract.setProvider(web3.currentProvider);
  return contract;
};

const getClaimWithValueTransferContract = async () => {
  const web3 = await getWeb3();
  const { networkId } = await getWeb3State();
  const contractAddress = claimWithValueTransferContractAddressesForNetworkId[networkId];
  const contract = new web3.eth.Contract(claimWithValueTransferContractAbi, contractAddress);
  contract.setProvider(web3.currentProvider);
  return contract;
};

const createFeedItemBase = async (id, entity, http) => {
  const { from, blockNumber, networkName } = await getWeb3State();
  return {
    author: from,
    created_at: new Date().getTime(),
    family: http ? 'http' : networkName,
    id,
    sequence: blockNumber + 1,
    context: entity,
  };
};

const sendClaim = (data, http) => (http ? httpClaim(data) : claim(data));

const httpClaim = async (data) => {
  const { web3, from } = await getWeb3State();
  const wrappedClaim = JSON.stringify({ data, creator: from.toLowerCase(), nonce: uuidv4() });
  const signatureValue = await web3.eth.personal.sign(wrappedClaim, from);
  const body = JSON.stringify({ data: wrappedClaim, signatureValue, signatureType: 'ethereum:personal:sign' });
  const response = await fetch(`${USERFEEDS_API_ADDRESS}/api/create-claim`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const id = await response.text();
  return id;
};

const claim = async (data) => {
  const { from } = await getWeb3State();
  const contract = await getClaimContract();
  return new Promise((resolve) => {
    contract.methods
      .post(JSON.stringify(data))
      .send({ from })
      .on('transactionHash', (transactionHash) => resolve(`claim:${transactionHash}:0`));
  });
};

const claimWithValueTransfer = async (data, value, ownerAddress) => {
  const { from } = await getWeb3State();
  const contract = await getClaimWithValueTransferContract();
  return new Promise((resolve) => {
    contract.methods
      .post(
        JSON.stringify(data),
        [ownerAddress.toLowerCase(), INTERFACE_BOOST_ADDRESS.toLowerCase()],
        [value - value / 10, value / 10],
      )
      .send({ from, value })
      .on('transactionHash', (transactionHash) => resolve(transactionHash));
  });
};

export const sendMessage = async (entity, message, { http } = {}) => {
  const data = {
    claim: { target: message },
    context: entity,
    credits: getCreditsData(),
  };
  const id = await sendClaim(data, http);
  const feedItemBase = await createFeedItemBase(id, entity, http);

  return {
    ...feedItemBase,
    target: message,
    type: 'regular',
    likes: [],
    replies: [],
  };
};

export const reply = async (entity, message, to, { http } = {}) => {
  const data = {
    type: ['about'],
    claim: { target: message, about: to },
    context: entity,
    credits: getCreditsData(),
  };
  const id = await sendClaim(data, http);
  const feedItemBase = await createFeedItemBase(id, entity, http);
  return { ...feedItemBase, target: message };
};

export const writeTo = async (entity, message, entityTo, { http } = {}) => {
  const data = {
    type: ['about'],
    claim: { target: message, about: entityTo },
    context: entity,
    credits: getCreditsData(),
  };
  const id = await sendClaim(data, http);
  const feedItemBase = await createFeedItemBase(id, entity, http);
  return {
    ...feedItemBase,
    about: { id: entityTo },
    abouted: [],
    target: { id: message },
    targeted: [],
    type: 'post_to',
  };
};

export const react = async (entity, to, { http } = {}) => {
  const data = {
    type: ['labels'],
    claim: { target: to, labels: ['like'] },
    context: entity,
    credits: getCreditsData(),
  };
  const id = await sendClaim(data, http);
  const feedItemBase = await createFeedItemBase(id, entity, http);
  return { ...feedItemBase, target: { id: to } };
};

export const label = async (entity, message, labelType, { http } = {}) => {
  const data = {
    type: ['labels'],
    claim: { target: message, labels: [labelType] },
    context: entity,
    credits: getCreditsData(),
  };
  const id = await sendClaim(data, http);
  const feedItemBase = await createFeedItemBase(id, entity, http);
  return {
    ...feedItemBase,
    about: null,
    abouted: [],
    target: { id: message },
    targeted: [],
    type: 'labels',
    labels: [labelType],
  };
};

export const boost = async (entity, aboutEntity, value) => {
  const { networkName } = await getWeb3State();
  const { ownerAddress } = await getEntityData(aboutEntity);
  const data = {
    type: ['about'],
    claim: { target: entity, about: aboutEntity },
    credits: getCreditsData(),
  };
  const transactionHash = await claimWithValueTransfer(data, value, ownerAddress);
  return { transactionHash, networkName };
};
