import find from 'lodash/fp/find';

import ercs721 from './erc721';
import { getRanking } from './api';

export const getEntityData = async (entity) => {
  try {
    const response = await getRanking(
      [{ algorithm: 'experimental_owner_of_erc721', params: { context: entity } }],
      'api/decorate-with-opensea',
    );
    const [{ context_info, ...item }] = response.items;

    const entityInfo = {
      owner: item.owner,
      name: context_info.name || `${getEntityPrefix(entity)}${getEntityId(entity)}`,
      external_link: context_info.external_link,
      background_color: context_info.background_color,
      image_preview_url: context_info.image_preview_url,
    };

    return entityInfo;
  } catch (e) {
    return undefined;
  }
};

export const getEntityId = (entity) => {
  const [, , id] = entity.split(':');
  return id;
};

export const getEntityPrefix = (entity) => {
  const [, address] = entity.split(':');
  if (!address) {
    return '';
  }
  const { entityPrefix } = find({ address })(ercs721);
  return entityPrefix;
};

export const entityTranslations = {
  commentPlaceholder: 'Ask your question',
  replyPlaceholder: 'Write your reply',
  noEntitiesError: 'No tokens found',
  emptyFeed: 'No messages yet. Be the first one!',
};
