import React from 'react';
import styled from 'styled-components';
import Link, { A } from './Link';
import Context from './Context';
import { LinkedEntityAvatar, EntityName, Entities, EntityAvatar } from './Entity';

const StyledInput = styled.div.attrs({
  children: props => (
    <input
      style={{
        fontSize: '18px',
        fontWeight: 500,
        color: '#623cea',
        width: 'calc(100% - 30px)',
        padding: '15px',
        height: '57px',
        background: 'none',
        outline: 'none',
        border: 'none'
      }}
      {...props}
    />
  )
})`
  width: 100%;
  border-radius: 8px;
  background: #f3f0ff;
  box-shadow: inset 0 1px 3px 0 #d8d4e7;
  font-size: 18px;
  font-weight: 500;
  color: #623cea;
  outline: none;
  border: none;
  position: relative;
  margin-top: 10px;

  &:before {
    content: 'ETH';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    font-weight: 500;
    font-size: 14px;
  }
`;

const Position = styled.div`
  font-size: 14px;
  color: #928f9b;
  margin-top: 6px;
`;

const StyledButton = styled.button`
  height: 60px;
  width: calc(100% + 44px);
  background: linear-gradient(180deg, #9b6ff6 0%, #623cea 100%);
  margin: 18px -22px -22px;
  color: white;
  font-size: 18px;
  font-weight: 500;
  outline: none;
  border: none;
  border-radius: 0 0 12px 12px;
  &:disabled {
    opacity: 0.2;
  }
`;

const CustomCatForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const CustomCatFormButton = styled.button`
  outline: none;
  margin: 0 5px 0 0;
  padding: 0;
  background: linear-gradient(180deg, #9b6ff6 0%, #623cea 100%);
  box-shadow: 0 2px 10px 0 rgba(99, 61, 234, 0.3);
  border: none;
  color: white;
  padding: 10px 12px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:disabled {
    background: #f3f0ff;
    opacity: 0.7;
    color: #9b6ff6;
    box-shadow: none;
  }
`;

const CustomCatFormInput = styled.div`
  width: 100%;
  border-radius: 8px;
  background: #f3f0ff;
  box-shadow: inset 0 1px 3px 0 #d8d4e7;
  font-size: 18px;
  font-weight: 500;
  color: #623cea;
  outline: none;
  border: none;
  position: relative;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const formatCurrency = value => {
  return (value * 10 ** -18).toFixed(3);
};

const CatvertisedTitle = styled.div`
  font-family: Rubik;
  font-size: 1.2rem;
  line-height: 1;
  font-weight: 500;
`;

const AddAKitty = styled.button`
  margin-top: 10px;
  align-self: flex-start;
  border: none;
  outline: none;
  background: none;
  color: #623cea;
  font-weight: 500;
  font-size: 0.8rem;
  padding: 0;
  cursor: pointer;

  @media (max-width: 770px) {
    margin-top: auto;
    margin-left: 10px;
  }
`;

const CatvertisedList = styled.ul`
  margin-top: 20px;

  @media (max-width: 770px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const CatvertisedItem = styled.li`
  height: 54px;
  display: flex;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  & + & {
    margin-top: 20px;
  }

  &:nth-child(3):before,
  &:nth-child(5):before {
    content: '';
    display: block;
    position: absolute;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    pointer-events: none;
  }

  &:nth-child(3):before,
  &:nth-child(4),
  &:nth-child(5) {
    display: none;
  }

  @media (max-width: 770px) {
    overflow: hidden;
    height: auto;
    width: 54px;

    & + & {
      margin-top: 0;
    }

    &:nth-child(3):before {
      display: none;
    }

    &:nth-child(5):before {
      display: block;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    }

    &:nth-child(4),
    &:nth-child(5) {
      display: flex;
    }
  }
`;

const CatvertisedPickCatList = styled(CatvertisedList)`
  @media (max-width: 770px) {
    justify-content: normal;
    overflow-x: scroll;
    
    ${CatvertisedItem} + ${CatvertisedItem} {
      margin-left: 10px;
    }
  }

  ${CatvertisedItem}:before {
    display: none;
  }
`;

const CatvertisedItemLink = styled(Link)`
  display: flex;
  align-items: center;

  @media (max-width: 770px) {
    flex-direction: column;
    align-items: normal;
    text-align: center;
    width: 100%;
  }
`;

const CatvertisedItemButton = styled.button`
  border: none;
  outline: none;
  background: none;
  display: flex;
  align-items: center;
  padding: 0.375rem;
  margin: -0.375rem;
  font-size: 1rem;
  width: 100%;
  border-radius: 33px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #f4f1ff;
    color: #623cea;

    &:before {
      display: block;
      position: absolute;
      top: 50%;
      right: 2rem;
      font-size: 0.8rem;
      font-weight: 500;
      content: 'Add';
      transform: translateY(-50%);
    }
  }
`;

const CatvertisedName = styled.span`
  margin-left: 10px;

  @media (max-width: 770px) {
    margin-left: 0;
    white-space: nowrap;
  }
`;

const CatvertisedScore = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: #928f9b;
  font-weight: 500;

  @media (max-width: 770px) {
    margin-left: 0;
  }
`;

const FeedCatvertisedContainer = styled.div`
  max-width: 300px;

  @media (max-width: 770px) {
    max-width: none;
  }
`;

export const FeedCatvertised = styled(({ className }) => (
  <div className={`${className} column is-3`}>
    <FeedCatvertisedContainer>
      <Catvertised />
    </FeedCatvertisedContainer>
  </div>
))`
  align-self: flex-start;
  position: sticky;
  top: 80px;
  @media (max-width: 770px) {
    position: static;
  }
`;

const createEtherscanUrl = (transactionHash, networkName) => {
  const familyPrefix = networkName === 'ethereum' ? '' : `${networkName}.`;
  return `https://${familyPrefix}etherscan.io/tx/${transactionHash}`;
};

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

export default class Catvertised extends React.Component {
  state = {
    step: 'catvertised',
    value: 0,
    customCatId: undefined
  };

  static Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    box-shadow: 0 4px 10px 0 rgba(98, 60, 234, 0.07);
    border-radius: 12px;
    padding: 20px;
    ${({ showBorder }) => (showBorder ? 'border: 2px solid #cdf5d4' : 'border 2px solid transparent')};
  `;

  calculatePosition = boosts => {
    const scores = Object.entries(boosts)
      .sort(([, { score: a }], [, { score: b }]) => b - a)
      .map(([, { score }]) => score);
    let position = 0;
    while (position < scores.length) {
      if (scores[position] > this.state.value * 10 ** 18) {
        position += 1;
      } else {
        break;
      }
    }
    return position + 1;
  };

  boost = async () => {
    this.setState({ step: 'submitted' });
  };

  render() {
    return (
      <Context.Consumer>
        {({ boostStore: { boosts, boost, isBoostable } }) => (
          <Catvertised.Container showBorder={this.state.step === 'catvertised'} className={this.props.className}>
            {this.state.step === 'catvertised' && (
              <React.Fragment>
                <CatvertisedHeader>
                  <CatvertisedTitle>Purrmoted</CatvertisedTitle>
                  <AddAKitty onClick={() => this.setState({ step: 'pickCat' })}>Add a kittie</AddAKitty>
                </CatvertisedHeader>
                {Object.keys(boosts).length > 0 && (
                  <CatvertisedList>
                    {Object.entries(boosts)
                      .sort(([, { score: a }], [, { score: b }]) => b - a)
                      .slice(0, 5)
                      .map(([id, { score }]) => (
                        <CatvertisedItem key={id}>
                          <CatvertisedItemLink to={`/${id}`}>
                            <EntityAvatar size="medium" id={id} />
                            <EntityDescription>
                              <CatvertisedName>
                                <b>
                                  <EntityName id={id} />
                                </b>
                              </CatvertisedName>
                              <CatvertisedScore>{formatCurrency(score)} ETH</CatvertisedScore>
                            </EntityDescription>
                          </CatvertisedItemLink>
                        </CatvertisedItem>
                      ))}
                  </CatvertisedList>
                )}
              </React.Fragment>
            )}
            {this.state.step === 'pickCat' && (
              <React.Fragment>
                <CatvertisedTitle>Catvertise a kittie</CatvertisedTitle>
                <CustomCatForm>
                  <EntityAvatar size="medium" id={this.state.customCatId} />
                  <CustomCatFormInput>
                    <input
                      style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        color: '#623cea',
                        width: 'calc(100% - 40px)',
                        padding: '15px',
                        height: '57px',
                        background: 'none',
                        outline: 'none',
                        border: 'none'
                      }}
                      type="text"
                      value={this.state.customCatId}
                      onChange={e => {
                        this.setState({ customCatId: e.target.value });
                      }}
                      placeholder="Custom cat id"
                    />
                    <CustomCatFormButton
                      disabled={!this.state.customCatId}
                      onClick={() =>
                        this.setState({
                          step: 'form',
                          entityId: this.state.customCatId
                        })
                      }
                    >
                      ✔
                    </CustomCatFormButton>
                  </CustomCatFormInput>
                </CustomCatForm>
                <Entities>
                  {({ entities }) =>
                    entities.length > 0 && (
                      <CatvertisedPickCatList>
                        {entities.map(entity => (
                          <CatvertisedItem>
                            <CatvertisedItemButton
                              onClick={() =>
                                this.setState({
                                  step: 'form',
                                  entityId: entity.id
                                })
                              }
                            >
                              <EntityAvatar size="medium" id={entity.id} />
                              <CatvertisedName>
                                <b>
                                  <EntityName id={entity.id} />
                                </b>
                              </CatvertisedName>
                            </CatvertisedItemButton>
                          </CatvertisedItem>
                        ))}
                      </CatvertisedPickCatList>
                    )
                  }
                </Entities>
              </React.Fragment>
            )}
            {this.state.step === 'form' && (
              <React.Fragment>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LinkedEntityAvatar size="medium" id={this.state.entityId} />
                  <CatvertisedName>
                    <b>
                      <EntityName id={this.state.entityId} />
                    </b>
                  </CatvertisedName>
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    marginTop: '20px'
                  }}
                >
                  Purrmote with
                </div>
                <StyledInput
                  type="text"
                  value={this.state.value}
                  onChange={e => {
                    this.setState({ value: e.target.value });
                  }}
                />
                <Position>Position: #{this.calculatePosition(boosts)}</Position>
                <Context.Consumer>
                  {({ web3Store: { networkName } }) => (
                    <StyledButton
                      disabled={!isBoostable || this.state.value <= 0}
                      onClick={async () => {
                        const { transactionHash, networkName } = await boost(
                          this.state.entityId,
                          this.state.value * 10 ** 18
                        );
                        this.setState({
                          etherscanUrl: createEtherscanUrl(transactionHash, networkName),
                          step: 'submitted'
                        });
                      }}
                    >
                      Catvertise!
                    </StyledButton>
                  )}
                </Context.Consumer>
              </React.Fragment>
            )}
            {this.state.step === 'submitted' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  alignItems: 'center'
                }}
              >
                <div style={{ color: 'green', fontSize: '24px' }}>✔</div>
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: '32px',
                    color: '#060310'
                  }}
                >
                  Success!
                </div>
                <div style={{ fontSize: '18px' }}>
                  You've catvertised <EntityName id={this.state.entityId} />
                </div>
                <A href={this.state.etherscanUrl}>See it on Etherscan</A>
              </div>
            )}
          </Catvertised.Container>
        )}
      </Context.Consumer>
    );
  }
}
