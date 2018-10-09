import React from 'react';
import styled, { css } from 'styled-components';
import placeholder from './img/anonkitty.svg';
import find from 'lodash/fp/find';
import ercs721 from './erc721';

export const getAvatarScale = (id) => {
  const defaultAvatarSettings = {
    scale: 1.8,
    translate: '0%, 10%',
  };

  const addressAvatarSettings = {
    scale: 1,
    translate: '0%, 0%',
  };

  if (!id) {
    return 1;
  }
  const [, address] = id.split(':');
  const token = find({ address })(ercs721);
  const avatarSettings = token ? token.avatar || defaultAvatarSettings : addressAvatarSettings;

  return avatarSettings;
};

const BaseContainer = styled.div`
  position: relative;
`;

const AvatarContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  font-family: 'AvenirNext';
  border-radius: 16%;
  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor ? `#${backgroundColor}` : '#f5f8fd'};
  `};
`;

const Avatar = styled.img`
  transform: scale(${({ scale }) => scale}) translate(${({ translate }) => translate});

  height: 100%;
`;

const ReactionContainer = styled.div`
  position: absolute;
  bottom: -10px;
  left: -15px;
`;

const IdentityAvatar = ({ id, reaction, style = {}, backgroundColor, src, lazy = true, ...restProps }) => {
  const { scale, translate } = getAvatarScale(id);
  return (
    <BaseContainer style={{ ...style }} {...restProps}>
      <AvatarContainer backgroundColor={backgroundColor}>
        <Avatar src={src} scale={scale} translate={translate} />
      </AvatarContainer>
      {reaction && <ReactionContainer>{reaction}</ReactionContainer>}
    </BaseContainer>
  );
};

export const AvatarPlaceholder = ({ id }) => {
  const { scale, translate } = getAvatarScale(id);
  return (
    <AvatarContainer backgroundColor="#DED5FF">
      <Avatar src={placeholder} scale={scale} translate={translate} />
    </AvatarContainer>
  );
};

export default IdentityAvatar;
