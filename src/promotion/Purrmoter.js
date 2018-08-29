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
  ${({ hiddenOnMobile }) =>
    hiddenOnMobile
      ? `
    @media (max-width: 770px) {
      display: none;
    }`
      : ''};
`;

export const Purrmoter = ({ token }) => {
  return (
    <CatvertisedHeader>
      <PurrmoterDiv to={`/${token}`}>
        <EntityAvatar size="medium" id={token} />
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
