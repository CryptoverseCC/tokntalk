import React from 'react';
import styled from 'styled-components';
import { EntityName, EntityAvatar } from '../Entity';
import Link from '../Link';
import { EntityDescription, EntityNameWrapper, CatvertisedScore, CatvertisedName } from './Styles';

const CatvertisedHeader = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 770px) {
    flex-direction: row;
    align-items: baseline;
  }
`;

const PurrmoterDiv = styled(({ hiddenOnMobile, ...restProps }) => <Link {...restProps} />)`
  overflow: hidden;
  display: flex;

  @media (max-width: 770px) {
    ${({ hiddenOnMobile }) => (hiddenOnMobile ? `display: none;` : '')};
  }
`;

const Avatar = styled(EntityAvatar)`
  width: 40px;
  height: 40px;

  flex-shrink: 0;
`;

export const Purrmoter = ({ hiddenOnMobile, token }) => {
  return (
    <CatvertisedHeader>
      <PurrmoterDiv to={`/${token}`} hiddenOnMobile={hiddenOnMobile}>
        <Avatar id={token} />
        <EntityDescription>
          <CatvertisedName>
            <EntityNameWrapper>
              <EntityName id={token} />
            </EntityNameWrapper>
          </CatvertisedName>
          <CatvertisedScore>Space Owner</CatvertisedScore>
        </EntityDescription>
      </PurrmoterDiv>
    </CatvertisedHeader>
  );
};
