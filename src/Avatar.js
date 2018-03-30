import React from 'react';
import Context from './Context';
import colors from "./colors";

const IdentityAvatar = ({ size, reaction, style = {}, catId }) => {
  return (
    <Context.Consumer>
      {({entityStore: { getEntity }}) => {
        const { containerSize, imgSize, imgTopOffset } = {
          verySmall: { containerSize: '32px', imgSize: '70px', imgTopOffset: '85%' },
          small: { containerSize: '44px', imgSize: '110px', imgTopOffset: '85%' },
          medium: { containerSize: '54px', imgSize: '120px', imgTopOffset: '77%' },
          large: { containerSize: '64px', imgSize: '130px', imgTopOffset: '70%' }
        }[size];
        return (
          <div style={{ position: 'relative', ...style }}>
            <div
              style={{
                overflow: 'hidden',
                position: 'relative',
                width: containerSize,
                height: containerSize,
                borderRadius: '50%',
                backgroundColor: colors[getEntity(catId).color]
              }}
            >
              <img
                style={{
                  width: imgSize,
                  position: 'absolute',
                  left: '55%',
                  top: imgTopOffset,
                  transform: 'translate(-50%, -50%)',
                  maxWidth: 'none'
                }}
                alt=""
                src={getEntity(catId).image_url}
              />
            </div>
            {reaction && (
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}>
                {reaction}
              </div>
            )}
          </div>
        );
      }}
    </Context.Consumer>
  );
};

export const ActiveCatAvatar = (props) => (
  <Context.Consumer>
    {({catStore: { activeCat }}) => (<IdentityAvatar catId={activeCat && activeCat.token} {...props} />)}
  </Context.Consumer>
)

export default IdentityAvatar;
