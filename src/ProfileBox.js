import React from 'react';
import styled from 'styled-components';

import { FlatContainer } from './Components';

const CoverImage = styled.div`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-image: ${({ src }) => `url(${src})`};
  background-color: ${({ primaryColor }) => primaryColor};
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 50%;
  width: 100%;
`;

const Avatar = styled(({ src, className, style }) => (
  <div className={className} style={style}>
    <img src={src} />
  </div>
))`
  position: absolute;
  top: -32px;
  left: 10px;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px #ffffff solid;
  border-radius: 12px;
  box-shadow: rgba(118, 103, 170, 0.12) 0px 1rem 2rem;
  background-color: ${({ primaryColor }) => primaryColor};
  background-repeat: no-repeat;
  background-size: contain;

  & > img {
    max-width: 44px;
    max-height: 44px;
  }
`;

const ProfileBox = ({ avatar, coverImage, coverImageStyle, primaryColor, children }) => (
  <FlatContainer style={{ padding: 0 }}>
    <CoverImage src={coverImage} primaryColor={primaryColor} style={coverImageStyle} />
    <div style={{ padding: '30px', paddingTop: '45px', position: 'relative' }}>
      <Avatar src={avatar} primaryColor={primaryColor} />
      {children}
    </div>
  </FlatContainer>
);

export default ProfileBox;
