import React from 'react';
import { Link } from 'react-router-dom';
import Context from './Context';
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

export const StaticAvatar = ({ catId }) => (
  <Context.Consumer>
    {({ catStore: { catsInfo, getCatInfo } }) => (
      <Link to={`/cryptopurr/${catId}`}>
        <KittyAvatar catId={catId} catsInfo={catsInfo} getCatInfo={getCatInfo} />
        <p>{(catsInfo[catId] && catsInfo[catId].name) || `Kitty #${catId}`}</p>
      </Link>
    )}
  </Context.Consumer>
);

export const ChangableAvatar = () => {
  return (
    <Context.Consumer>
      {({
        catStore: { myCats, changeActiveCatToNext, changeActiveCatToPrevious, activeCat, catsInfo, getCatInfo }
      }) => (
        <Link to={`/cryptopurr/${activeCat.token}`}>
          <div style={{ position: 'relative' }}>
            <KittyAvatar catId={activeCat.token} catsInfo={catsInfo} getCatInfo={getCatInfo} />
            {myCats.length > 1 && (
              <React.Fragment>
                <ArrowButton direction="back" onClick={changeActiveCatToPrevious} />
                <ArrowButton direction="forward" onClick={changeActiveCatToNext} />
              </React.Fragment>
            )}
          </div>
          <p>{catsInfo[activeCat.token].name || `Kitty #${activeCat.token}`}</p>
        </Link>
      )}
    </Context.Consumer>
  );
};

const ArrowButton = ({ direction, onClick }) => (
  <button
    className={`changeCat--button changeCat--button-${direction}`}
    style={{
      ...(direction === 'back' ? { left: 'calc(50% - 60px)' } : { right: 'calc(50% - 60px)' })
    }}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <svg className="changeCat--arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <path
        fill="currentColor"
        d="M8,12c-0.232,0-0.463-0.08-0.651-0.241l-7.759-6.65L0.892,3.59L8,9.683l7.108-6.093l1.302,1.519l-7.759,6.65 C8.463,11.92,8.232,12,8,12z"
      />
    </svg>
  </button>
);

export default KittyAvatar;
