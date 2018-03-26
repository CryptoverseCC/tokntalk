import React from 'react';
import { Link } from 'react-router-dom';
import KittyImg from './KittyImg';
import colors from './colors';

const KittyAvatar = ({ catId, catsInfo, getCatInfo }) => {
  const backgroundColor = catsInfo[catId] ? colors[catsInfo[catId].color] : '';
  return (
    <div className="kitten--img-container" style={{ background: backgroundColor }}>
      <KittyImg catId={catId} catsInfo={catsInfo} getCatInfo={getCatInfo} />
    </div>
  );
};

export const StaticAvatar = ({ catId, catsInfo, getCatInfo }) => (
  <Link to={`/cryptopurr/${catId}`}>
    <KittyAvatar catId={catId} catsInfo={catsInfo} getCatInfo={getCatInfo} />
    <p>{(catsInfo[catId] && catsInfo[catId].name) || `Kitty #${catId}`}</p>
  </Link>
);

export default KittyAvatar;
