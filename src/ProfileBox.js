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

  @media (max-width: 770px) {
    padding-top: 30%;
  }
`;

const Avatar = styled(({ children, className, style }) => (
  <div className={className} style={style}>
    {children}
  </div>
))`
  position: absolute;
  top: -32px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px #ffffff solid;
  border-radius: 12px;
  box-shadow: rgba(118, 103, 170, 0.12) 0px 1rem 2rem;
  background-color: ${({ primaryColor }) => primaryColor};
`;

const ProfileBox = ({ avatar, coverImage, coverImageStyle, primaryColor, children }) => (
  <FlatContainer style={{ padding: 0 }}>
    <CoverImage src={coverImage} primaryColor={primaryColor} style={coverImageStyle} />
    <div style={{ padding: '15px', paddingTop: '45px', position: 'relative' }}>
      <Avatar primaryColor={primaryColor}>{avatar}</Avatar>
      {children}
    </div>
  </FlatContainer>
);

export default ProfileBox;
