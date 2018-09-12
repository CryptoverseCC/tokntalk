import React, { Component } from 'react';
import { findClub } from './clubs';
import groupBy from 'lodash/fp/groupBy';
import styled from 'styled-components';
import { ContentContainer, H3, H4 } from './Components';
import { HeaderSpacer } from './Header';
import { Entities, EntityAvatar, WithActiveEntity } from './Entity';

const H1ChooseProfile = styled.h1`
  margin: 60px 0;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
  @media (max-width: 770px) {
    margin-left: 2%;
  }
`;

export class SwitchProfile extends Component {
  render() {
    return (
      <ContentContainer>
        <HeaderSpacer />
        <H1ChooseProfile>Choose your profile</H1ChooseProfile>
        <Entities>
          {({ entities, changeActiveEntityTo }) => (
            <WithActiveEntity>
              {(activeEntity) =>
                entities.length ? (
                  <div>
                    <H3>Be yourself</H3>
                    <ul>
                      {this.renderEntity(
                        entities.filter((e) => e.isAddress)[0],
                        changeActiveEntityTo,
                        entities.filter((e) => e.isAddress)[0].id === activeEntity.id,
                      )}
                    </ul>
                    <H3>or use one of your NFTs ({entities.length})</H3>
                    {this.renderEntitiesWithClubs(entities, changeActiveEntityTo, activeEntity)}
                  </div>
                ) : null
              }
            </WithActiveEntity>
          )}
        </Entities>
      </ContentContainer>
    );
  }

  renderEntitiesWithClubs = (entities, changeActiveEntityTo, activeEntity) => {
    const tokensInThaClubs = groupBy((e) => {
      const [network, address] = e.id.split(':');
      return network + ':' + address;
    }, entities.filter((e) => !e.isAddress));
    return Object.keys(tokensInThaClubs).map((e) => {
      const [network, address] = e.split(':');
      const clubTokens = tokensInThaClubs[e];
      const club = findClub(network, address);
      return this.renderEntitiesWithinClub(club, clubTokens, changeActiveEntityTo, activeEntity);
    });
  };

  renderEntitiesWithinClub = (club, clubTokens, changeActiveEntityTo, activeEntity) => {
    return (
      <div key={club.address}>
        <H4>{club.name}</H4>
        <p>{this.shortAddress(club.address)}</p>
        <p>
          <ul>{clubTokens.map((e) => this.renderEntity(e, changeActiveEntityTo, activeEntity.id === e.id))}</ul>
        </p>
      </div>
    );
  };

  renderEntity = (entity, changeActiveEntityTo, isActive) => {
    const { id, ...entityInfo } = entity;
    return (
      <li key={entity.id} style={{ display: 'inline-block' }}>
        <PickEntity
          onClick={() => {
            changeActiveEntityTo(entity);
          }}
        >
          <EntityAvatar id={id} entityInfo={entityInfo} size="veryLarge" lazy={false} />
          <p>
            <b style={{ marginLeft: '5px', fontSize: '0.9rem' }}>{entity.name}</b>
            {isActive && 'selected'}
          </p>
        </PickEntity>
      </li>
    );
  };

  shortAddress = (address) => {
    return address.slice(0, 8) + '...' + address.slice(address.length - 8, address.length);
  };
}

const PickEntity = styled.button`
  border: none;
  background: none;
  outline: none;
  margin: 0;
  padding: 0.375rem 0.75rem;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  align-items: center;

  &:hover {
    background-color: #ebefff;
    color: #2850d9;
  }
`;
