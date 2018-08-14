import React from 'react';
import styled from 'styled-components';
import { EntityName, EntityAvatar } from './Entity';
import Link from './Link';

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

const AddAKitty = styled.button`
  margin-top: 30px;
  margin-bottom: 30px;
  align-self: flex-start;
  border: none;
  outline: none;
  background: none;
  color: #264dd9;
  font-size: 1rem;
  padding: 0;
  cursor: pointer;

  @media (max-width: 770px) {
    margin-top: -3px;
    margin-left: 10px;
  }
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

const CatvertisedBack = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0;
  position: absolute;
  top: 50px;
  right: 10px;
  align-self: flex-start;
  outline: none;
  font-size: 30px;
  line-height: 30px;
  cursor: pointer;
`;

export class Purrmoter extends React.Component {
  render = () => {
    return (
      <CatvertisedHeader>
        <CatvertisedTitle hiddenOnMobile>Promotion box</CatvertisedTitle>
        <PurrmoterDiv to={`/${this.props.token}`}>
          <EntityAvatar size="medium" id={this.props.token} />
          <EntityDescription>
            <CatvertisedName>
              <EntityNameWrapper>
                <EntityName id={this.props.token} />
              </EntityNameWrapper>
            </CatvertisedName>
            <CatvertisedScore>Space Owner</CatvertisedScore>
          </EntityDescription>
        </PurrmoterDiv>
        {this.props.onBackClick && <CatvertisedBack onClick={() => this.props.onBackClick()}>←</CatvertisedBack>}
        {this.props.onAddKittyClick && (
          <AddAKitty onClick={() => this.props.onAddKittyClick()}>Promote yourself</AddAKitty>
        )}
        {!this.props.onAddKittyClick && (
          <CatvertisedTitle style={{ marginTop: '30px' }}>Promote yourself</CatvertisedTitle>
        )}
      </CatvertisedHeader>
    );
  };
}
