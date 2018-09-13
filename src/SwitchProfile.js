import React, { Component } from 'react';
import styled from 'styled-components';
import { ContentContainer, H3, H4 } from './Components';
import { HeaderSpacer } from './Header';
import { Entities, EntityAvatar, WithActiveEntity } from './Entity';

const H1ChooseProfile = styled.h1`
  margin: 40px 0;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;

  @media (max-width: 770px) {
    margin-left: 2%;
  }
`;

const Entity = ({ entity, changeActiveEntityTo, isActive }) => {
  const { id, ...entityInfo } = entity;
  return (
    <PickEntity
      onClick={() => {
        changeActiveEntityTo(entity);
      }}
    >
      <EntityAvatar id={id} entityInfo={entityInfo} size="veryLarge" lazy={false} />
      <b style={{ marginLeft: '5px', fontSize: '0.9rem' }}>{entity.name}</b>
      {isActive && 'selected'}
    </PickEntity>
  );
};

class SwitchProfile extends Component {
  render() {
    const { addressEntity, notAddressEntities } = this;
    const { changeActiveEntityTo, entities } = this.props;

    return (
      <ContentContainer>
        <HeaderSpacer />
        <H1ChooseProfile>Choose your profile</H1ChooseProfile>
        <div className="columns">
          <WithActiveEntity>
            {(activeEntity) =>
              entities.length ? (
                <React.Fragment>
                  <div className="column is-one-fifth">
                    <H3>Act as your address</H3>
                    <Entity
                      entity={addressEntity}
                      isActive={addressEntity.id === activeEntity.id}
                      changeActiveEntityTo={changeActiveEntityTo}
                    />
                  </div>
                  <div className="column">
                    {notAddressEntities.length ? (
                      <React.Fragment>
                        <H3>Act as one of your NFTs ({notAddressEntities.length})</H3>
                        <div className="columns is-multiline is-mobile">
                          {notAddressEntities.map((entity) => (
                            <div key={entity.id} className="column is-one-quarter-tablet is-half-mobile">
                              <Entity
                                entity={entity}
                                isActive={entity.id === activeEntity.id}
                                changeActiveEntityTo={changeActiveEntityTo}
                              />
                            </div>
                          ))}
                        </div>
                      </React.Fragment>
                    ) : null}
                  </div>
                </React.Fragment>
              ) : null
            }
          </WithActiveEntity>
        </div>
      </ContentContainer>
    );
  }

  get addressEntity() {
    return this.props.entities.filter((e) => e.isAddress)[0];
  }

  get notAddressEntities() {
    return this.props.entities.filter((e) => !e.isAddress);
  }
}

const withEntities = (Cmp) => (props) => (
  <Entities>
    {({ entities, changeActiveEntityTo }) => (
      <Cmp {...props} entities={entities} changeActiveEntityTo={changeActiveEntityTo} />
    )}
  </Entities>
);

export default withEntities(SwitchProfile);

const PickEntity = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;
  outline: none;
  margin: 0;
  padding: 0.375rem 0.75rem;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #ebefff;
    color: #2850d9;
  }
`;
