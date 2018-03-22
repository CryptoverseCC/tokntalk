import React from 'react';

const KittyAvatar = ({ catId }) => {
  return (
    <div className="kitten--img-container">
      <KittyImg catId={catId} />
    </div>
  );
};

export const KittyImg = ({ catId, ...restProps }) => {
  return (
    <img
      src={`https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/${catId}.svg`}
      alt={catId}
      {...restProps}
    />
  );
};

export default KittyAvatar;
