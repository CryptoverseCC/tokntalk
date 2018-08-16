import React from 'react';
import styled from 'styled-components';
import { EntityName, EntityAvatar } from '../Entity';
import Link from '../Link';

const CatvertisedTitle = styled.div`
  font-family: 'AvenirNext';
  font-size: 1rem;
  line-height: 1;
  font-weight: 600;
  margin-bottom: 30px;

  ${({ hiddenOnMobile }) =>
    hiddenOnMobile
      ? `
    @media (max-width: 770px) {
      margin-top: 0
    }`
      : `@media (max-width: 770px) {
        margin-top: 10px;
      }`};
`;

const CatvertisedHeader = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 770px) {
    flex-direction: row;
    align-items: baseline;
  }
`;

const EntityDescription = styled.div`
  @media (max-width: 770px) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CatvertisedName = styled.span`
  margin-left: 10px;

  @media (max-width: 770px) {
    margin-left: 10px;
    white-space: nowrap;
  }
`;

const EntityNameWrapper = styled.b`
  white-space: nowrap;
`;

const CatvertisedScore = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: #928f9b;
  font-weight: 500;
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
      <CatvertisedTitle hiddenOnMobile>Promotion box</CatvertisedTitle>
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
