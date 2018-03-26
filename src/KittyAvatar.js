import React from 'react';
import KittyImg from './KittyImg';
import colors from './colors';

const KittyAvatar = ({ catId, catsInfo, getCatInfo }) => {
  const backgroundColor = catsInfo[catId] ? colors[catsInfo[catId].color] : '';
  return (
    <div className="kitten--img-container" style={{background: backgroundColor}}>
      <KittyImg catId={catId} catsInfo={catsInfo} getCatInfo={getCatInfo} />
    </div>
  );
};

export default KittyAvatar;
