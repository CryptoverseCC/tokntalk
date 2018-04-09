const colors = {
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

export const getEntityData = async catId => {
  try {
    const res = await fetch(`https://api.cryptokitties.co/kitties/${catId}`);
    const data = await res.json();
    data.color = colors[data.color];
    return data;
  } catch (e) {
    return undefined;
  }
};
