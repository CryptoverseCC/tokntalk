import React from 'react';
import { getAvatarSizes } from './entityApi';
import styled, { css } from 'styled-components';
import placeholder from './img/anonkitty.svg';

const AvatarContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  font-family: 'AvenirNext';
  border-radius: 16%;
  ${({ backgroundColor, containerSize }) => css`
    background-color: ${backgroundColor ? `#${backgroundColor}` : '#f5f8fd'};
    width: ${containerSize};
    height: ${containerSize};
  `};
`;

const Avatar = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  max-width: none;
  ${({ imgSize, imgLeftOffset, imgTopOffset }) => css`
    left: ${imgLeftOffset};
    top: ${imgTopOffset};
    width: ${imgSize};
  `};
`;

const ReactionContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 38%;
  transform: translate(-38%, 50%);
`;

const IdentityAvatar = ({ entity, size, reaction, style = {}, backgroundColor, src, lazy = true, ...restProps }) => {
  const { containerSize, imgSize, imgTopOffset, imgLeftOffset } = getAvatarSizes(entity)[size];
  return (
    <div style={{ position: 'relative', ...style }} {...restProps}>
      <AvatarContainer backgroundColor={backgroundColor} containerSize={containerSize}>
        <Avatar src={src} imgSize={imgSize} imgTopOffset={imgTopOffset} imgLeftOffset={imgLeftOffset} />
      </AvatarContainer>
      {reaction && <ReactionContainer>{reaction}</ReactionContainer>}
    </div>
  );
};

export const AvatarPlaceholder = ({ entity, size }) => {
  const { containerSize } = getAvatarSizes(entity)[size];
  return (
    <AvatarContainer backgroundColor="#DED5FF" containerSize={containerSize}>
      <Avatar src={placeholder} imgSize="75%" imgLeftOffset="50%" imgTopOffset="65%" />
    </AvatarContainer>
  );
};

export default IdentityAvatar;
