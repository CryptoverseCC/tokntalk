import uuidv4 from 'uuid/v4';
import find from 'lodash/fp/find';
import last from 'lodash/fp/last';
import { isAddress } from 'web3-utils';

import { getEntityInfoForAddress, getCurrentProviderName } from './utils';
import getWeb3 from './web3';
import {
  claimContractAddressesForNetworkId,
  claimContractAbi,
  networkNameForNetworkId,
  claimWithValueTransferContractAddressesForNetworkId,
  claimWithValueTransferContractAbi,
} from './contract';
import { getEntityData, getEntityId, getEntityPrefix } from './entityApi';
import clubs from './clubs';
import ercs721 from './erc721';

const {
  REACT_APP_USERFEEDS_API_ADDRESS: USERFEEDS_API_ADDRESS,
  REACT_APP_INTERFACE_VALUE: INTERFACE_VALUE,
  REACT_APP_INTERFACE_BOOST_ADDRESS: INTERFACE_BOOST_ADDRESS,
  REACT_APP_INTERFACE_BOOST_NETWORK: INTERFACE_BOOST_NETWORK,
} = process.env;

export const isValidAndSupportedErc721 = (address) => !!find({ address })(ercs721);

export const hasValidContext = ({ context }) => {
  if (!context) return true;
  const [, address] = context.split(':');
  return isValidAndSupportedErc721(address);
};

export const isValidFeedItem = (feedItem) => {
  if (!['regular', 'like', 'post_to', 'post_about', 'post_club', 'social', 'post_to_simple'].includes(feedItem.type)) {
    return false;
  }
  if (feedItem.type === 'post_club') {
    const [network, address] = feedItem.about.split(':');
    const token = find({ network, address })(clubs);
    if (!token) {
      return false;
    }
  }
  if (!feedItem.context) {
    return true;
  } else if (!hasValidContext(feedItem)) {
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

export const enhanceFeedItem = (feedItem) => {
  if (!!feedItem.context_info && !feedItem.context_info.name) {
    feedItem.context_info.name = `${getEntityPrefix(feedItem.context)}${getEntityId(feedItem.context)}`;
  }

  if (feedItem.type === 'post_to_simple') {
    feedItem.about_info = getEntityInfoForAddress(feedItem.about);
    feedItem.type = 'post_to';
  }

  if (feedItem.likes) {
    feedItem.likes = feedItem.likes.map(enhanceFeedItem);
  }

  if (feedItem.replies) {
    feedItem.replies = feedItem.replies.map(enhanceFeedItem).map((reply) => {
      reply.likes = reply.likes.map(enhanceFeedItem);
      return reply;
    });
  }

  if (typeof feedItem.target === 'object') {
    feedItem.target = enhanceFeedItem(feedItem.target);
  }

  if (!!feedItem.context) {
    return feedItem;
  }

  return { ...feedItem, author_info: getEntityInfoForAddress(feedItem.author), isFromAddress: true };
};

export const getFeedItem = async ({ claimId }) => {
  let { items: feedItems } = await getRanking(
    [{ algorithm: 'cryptoverse_thread_feed', params: { id: claimId } }],
    'api/decorate-with-opensea',
  );

  feedItems = feedItems.filter(isValidFeedItem).map(enhanceFeedItem);

  return feedItems[0];
};

export const getFeedItems = async ({ lastVersion, oldestKnown, size, entityId }) => {
  const versionParam = lastVersion ? `lastVersion=${lastVersion}` : '';
  const oldestParam = oldestKnown ? `oldestKnown=${oldestKnown}` : '';
  const sizeParam = size ? `size=${size}` : '';

  const response = await (entityId
    ? getRanking([{ algorithm: 'cryptoverse_single_feed', params: { id: entityId } }], 'api/decorate-with-opensea')
    : fetch(`${USERFEEDS_API_ADDRESS}/api/cache-cryptoverse-feed?${versionParam}&${oldestParam}&${sizeParam}`).then(
        (r) => r.json(),
      ));

  const { items, total, version } = response;
  const validFeedItems = items.filter(isValidFeedItem).map(enhanceFeedItem);
  const lastItem = last(items);

  return { feedItems: validFeedItems.slice(0, 30), total, version, lastItemId: lastItem ? lastItem.id : undefined };
};

export const getRanking = (flow, path = 'ranking') => {
  return fetch(`${USERFEEDS_API_ADDRESS}/${path}`, {
    method: 'POST',
    body: JSON.stringify({ flow }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
};

export const getMyEntities = async () => {
  const web3 = await getWeb3();
  const [from] = await web3.eth.getAccounts();
  if (!from) return [];

  return [getEntityInfoForAddress(from), ...(await getEntities(from))];
};

export const getEntities = async (from) => {
  try {
    const identities = await getRanking(
      [
        {
          algorithm: 'cryptoverse_tokens',
          params: {
            identity: from.toLowerCase(),
            asset: ercs721.map(({ address: erc721Address }) => `ethereum:${erc721Address.toLowerCase()}`),
          },
        },
      ],
      'api/decorate-with-opensea',
    ).then(({ items }) =>
      items.map(({ context, context_info }) => ({
        id: context,
        ...context_info,
      })),
    );

    return identities;
  } catch (e) {
    return [];
  }
};

export const getLabels = async (entityId) => {
  try {
    const res = await fetch(`${USERFEEDS_API_ADDRESS}/ranking/cryptoverse_profile;id=${entityId}`);
    const labels = await res.json();
    return labels;
  } catch (e) {
    return {};
  }
};

export const getEntityTokens = async (entityId, tokens = clubs) => {
  const entityTokens = await getRanking([
    {
      algorithm: isAddress(entityId) ? 'experimental_assets_balances' : 'experimental_assets_balances_erc721',
      params: {
        context: entityId,
        identity: entityId,
        asset: tokens.map(({ network, address }) => `${network}:${address}`),
      },
    },
  ]);

  return Object.entries(entityTokens).map(([token]) => token);
};

export const getBoosts = async (token) => {
  try {
    const res = await getRanking(
      [
        {
          algorithm: 'cryptoverse_boost',
          params: {
            asset: INTERFACE_BOOST_NETWORK,
            entity: token,
            fee_address: INTERFACE_BOOST_ADDRESS,
          },
        },
      ],
      'api/decorate-with-opensea',
    );

    const { items: boosts } = res;
    const boostsMap = boosts.reduce((acc, boost) => {
      if (isAddress(boost.id)) {
        return { ...acc, [boost.id]: { ...boost, context_info: getEntityInfoForAddress(boost.id) } };
      }
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

export const getSupportings = async (token) => {
  try {
    const res = await getRanking(
      [
        {
          algorithm: 'cryptoverse_supporting',
          params: {
            asset: INTERFACE_BOOST_NETWORK,
            entity: token,
            fee_address: INTERFACE_BOOST_ADDRESS,
          },
        },
      ],
      'api/decorate-with-opensea',
    );

    const { items: supporting } = res;
    const supportersMap = supporting.reduce((acc, superstinger) => {
      if (isAddress(superstinger.id)) {
        return {
          ...acc,
          [superstinger.id]: { ...superstinger, context_info: getEntityInfoForAddress(superstinger.id) },
        };
      }
      const [, address] = superstinger.id.split(':');
      if (!find({ address })(ercs721)) {
        return acc;
      }
      return { ...acc, [superstinger.id]: superstinger };
    }, {});
    return supportersMap;
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
    const provider = getCurrentProviderName();
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
      provider: false,
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
    author: from.toLowerCase(),
    created_at: new Date().getTime(),
    family: http ? 'http' : networkName,
    id,
    sequence: blockNumber + 1,
    ...(!entity.isAddress ? { context: entity.id } : null),
    ...(!entity.isAddress ? { context_info: entity } : { author_info: entity }),
    ...(entity.isAddress ? { isFromAddress: true } : null),
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
    ...(!entity.isAddress ? { context: entity.id } : null),
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
    ...(!entity.isAddress ? { context: entity.id } : null),
    credits: getCreditsData(),
  };
  const id = await sendClaim(data, http);
  const feedItemBase = await createFeedItemBase(id, entity, http);
  return { ...feedItemBase, target: message, likes: [] };
};

export const writeTo = async (entity, message, entityTo, { http } = {}) => {
  const data = {
    type: ['about'],
    claim: { target: message, about: entityTo.id },
    ...(!entity.isAddress ? { context: entity.id } : null),
    credits: getCreditsData(),
  };
  const id = await sendClaim(data, http);
  const feedItemBase = await createFeedItemBase(id, entity, http);
  return {
    ...feedItemBase,
    about: entityTo.id,
    about_info: entityTo,
    target: message,
    type: 'post_to',
  };
};

export const writeAbout = async (entity, message, about, { http } = {}) => {
  const data = {
    type: ['about'],
    claim: { target: message, about: about },
    ...(!entity.isAddress ? { context: entity.id } : null),
    credits: getCreditsData(),
  };
  const id = await sendClaim(data, http);
  const feedItemBase = await createFeedItemBase(id, entity, http);
  return {
    ...feedItemBase,
    about,
    target: message,
    type: 'post_club',
  };
};

export const react = async (entity, to, { http } = {}) => {
  const data = {
    type: ['labels'],
    claim: { target: to, labels: ['like'] },
    ...(!entity.isAddress ? { context: entity.id } : null),
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
    ...(!entity.isAddress ? { context: entity.id } : null),
    credits: getCreditsData(),
  };
  const id = await sendClaim(data, http);
  const feedItemBase = await createFeedItemBase(id, entity, http);
  return {
    ...feedItemBase,
    target: message,
    type: 'social',
    label: labelType,
  };
};

export const boost = async (entity, aboutEntity, value) => {
  const { networkName } = await getWeb3State();
  let ownerAddress;
  if (isAddress(aboutEntity)) {
    ownerAddress = aboutEntity;
  } else {
    ownerAddress = (await getEntityData(aboutEntity)).owner;
  }

  const data = {
    type: ['about'],
    claim: { target: entity.id, about: aboutEntity },
    credits: getCreditsData(),
  };

  const transactionHash = await claimWithValueTransfer(data, value, ownerAddress);
  return { transactionHash, networkName };
};

export const getHttpClaimDetails = async ({ id }) => {
  return fetch(`${USERFEEDS_API_ADDRESS}/api/verify-claim?signatureValue=${id.split(':')[1]}`).then((res) =>
    res.json(),
  );
};
