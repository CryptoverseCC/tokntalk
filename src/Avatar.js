import React from 'react';
import LazyLoad from 'react-lazyload';
import { avatarSizes } from "./entityApi";

const IdentityAvatar = ({ size, reaction, style = {}, backgroundColor, src, lazy = true }) => {
  const { containerSize, imgSize, imgTopOffset, imgLeftOffset } = avatarSizes[size];
  return (
    <div style={{ position: 'relative', ...style }}>
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          width: containerSize,
          height: containerSize,
          borderRadius: '50%',
          backgroundColor
        }}
      >
        {lazy ? (
          <LazyLoad height={containerSize} once>
            <img
              style={{
                width: imgSize,
                position: 'absolute',
                left: imgLeftOffset,
                top: imgTopOffset,
                transform: 'translate(-50%, -50%)',
                maxWidth: 'none'
              }}
              alt=""
              src={src}
            />
          </LazyLoad>
        ) : (
          <img
            style={{
              width: imgSize,
              position: 'absolute',
              left: imgLeftOffset,
              top: imgTopOffset,
              transform: 'translate(-50%, -50%)',
              maxWidth: 'none'
            }}
            alt=""
            src={src}
          />
        )}
      </div>
      {reaction && (
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}>
          {reaction}
        </div>
      )}
    </div>
  );
};

export default IdentityAvatar;
