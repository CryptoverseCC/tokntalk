import find from 'lodash/fp/find';

import ercs721 from './erc721';

export const defaultAvatarSizes = {
  verySmall: { containerSize: '32px', imgSize: '32px', imgTopOffset: '50%', imgLeftOffset: '50%' },
  small: { containerSize: '44px', imgSize: '44px', imgTopOffset: '50%', imgLeftOffset: '50%' },
  medium: { containerSize: '54px', imgSize: '54px', imgTopOffset: '50%', imgLeftOffset: '50%' },
  large: { containerSize: '64px', imgSize: '64px', imgTopOffset: '50%', imgLeftOffset: '50%' },
};

export const getEntityData = async (entity) => {
  try {
    const [, address, token] = entity.split(':');
    const res = await fetch(`https://opensea-api.herokuapp.com/asset/${address}/${token}/`);
    const data = await res.json();
    data.color = `#${data.background_color}`;
    data.url = data.external_link;
    data.ownerAddress = data.owner.address;
    return data;
  } catch (e) {
    return undefined;
  }
};

export const entityTranslations = {
  commentPlaceholder: 'Write your story',
  replyPlaceholder: 'Write your reply',
  noEntitiesError: 'No tokens found',
  emptyFeed: 'No messages yet',
};

export const getAvatarSizes = (entity) => {
  if (!entity) {
    return defaultAvatarSizes;
  }
  const [, address] = entity.split(':');
  const token = find({ address })(ercs721);

  return token && token.avatarSizes ? token.avatarSizes : defaultAvatarSizes;
};
