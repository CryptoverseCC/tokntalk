import React from 'react';
import styled from 'styled-components';
import { EntityName, EntityAvatar } from '../Entity';
import Link from '../Link';
import { EntityDescription, EntityNameWrapper, CatvertisedScore, CatvertisedName } from './Styles';

const PurrmoterHeader = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 770px) {
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 10px;
  }
`;

const PurrmoterDiv = styled(Link)`
  overflow: hidden;
  display: flex;

  @media (max-width: 770px) {
    display: none;
  }
`;

const PurrmoterDivMobile = styled(Link)`
  overflow: hidden;
  display: none;

  @media (max-width: 770px) {
    display: flex;
  }
`;

const Avatar = styled(EntityAvatar)`
  width: 40px;
  height: 40px;

  flex-shrink: 0;
`;

export const Purrmoter = ({ hiddenOnMobile, token }) => {
  return (
    <PurrmoterHeader>
      <PurrmoterDiv to={`/${token}`}>
        <Avatar id={token} />
        <EntityDescription>
          <CatvertisedName>
            <EntityNameWrapper>
              <EntityName id={token} />
            </EntityNameWrapper>
          </CatvertisedName>
          <CatvertisedScore>Page Owner</CatvertisedScore>
        </EntityDescription>
      </PurrmoterDiv>
      <PurrmoterDivMobile to={`/${token}`}>
        <EntityDescription>
          <CatvertisedName>
            <EntityNameWrapper>
              Supporters of <EntityName id={token} />
            </EntityNameWrapper>
          </CatvertisedName>
        </EntityDescription>
      </PurrmoterDivMobile>
    </PurrmoterHeader>
  );
};
