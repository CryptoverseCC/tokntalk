import React from 'react';
import etherDiamond from './img/ether-diamond.gif';

export const colors = {
  babypuke: '#eff1e0',
  bubblegum: '#fadff4',
  chestnut: '#efe1da',
  coralsunrise: '#fde9e4',
  cyan: '#c5eefa',
  doridnudibranch: '#faeefa',
  eclipse: '#e5e7ef',
  forgetmenot: '#dcebfc',
  gold: '#faf4cf',
  limegreen: '#d9f5cb',
  mintgreen: '#cdf5d4',
  parakeet: '#e5f3e2',
  pumpkin: '#fae1ca',
  sapphire: '#d3e8ff',
  sizzurp: '#dfdffa',
  strawberry: '#ffe0e5',
  thundergrey: '#eee9e8',
  topaz: '#d1eeeb',
  twilightsparkle: '#ede2f5'
};

export const getEntityData = async entityId => {
  try {
    const res = await fetch(`https://api.cryptokitties.co/kitties/${entityId}`);
    const data = await res.json();
    data.name = data.name || `${entityTranslations.entityName} #${entityId}`;
    data.color = colors[data.color];
    data.url = `https://cryptokitties.co/kitty/${entityId}`;
    data.ownerAddress = data.owner.address;
    return data;
  } catch (e) {
    return undefined;
  }
};

export const EntityIcon = () => {
  return <img src={etherDiamond} style={{ height: '70%' }} alt={entityTranslations.entityName} />;
};

export const entityTranslations = {
  commentPlaceholder: 'Purr your story',
  replyPlaceholder: 'Purr your reply',
  noEntitiesError: 'No cats found',
  entityName: 'Kitty',
  emptyFeed: 'No purrs yet'
};

export const avatarSizes = {
  verySmall: { containerSize: '32px', imgSize: '70px', imgTopOffset: '85%', imgLeftOffset: '55%' },
  small: { containerSize: '44px', imgSize: '110px', imgTopOffset: '85%', imgLeftOffset: '55%' },
  medium: { containerSize: '54px', imgSize: '120px', imgTopOffset: '77%', imgLeftOffset: '55%' },
  large: { containerSize: '64px', imgSize: '130px', imgTopOffset: '70%', imgLeftOffset: '55%' }
};
