import React from 'react';
import styled from 'styled-components';
import { A } from '../Link';
import Context from '../Context';
import { LinkedEntityAvatar, EntityName, Entities, EntityAvatar } from '../Entity';
import checkmarkIcon from '../img/checkmark.svg';
import { EntityNameWrapper, CatvertisedName, CatvertisedList, CatvertisedItem } from './Styles';

const StyledInput = styled.div.attrs({
  children: (props) => (
    <input
      style={{
        fontSize: '18px',
        fontWeight: 500,
        color: '#264dd9',
        width: 'calc(100% - 30px)',
        padding: '15px',
        height: '57px',
        background: 'none',
        outline: 'none',
        border: 'none',
      }}
      {...props}
    />
  ),
})`
  width: 100%;
  border-radius: 8px;
  background: #f3f0ff;
  box-shadow: inset 0 1px 3px 0 #d8d4e7;
  font-size: 18px;
  font-weight: 500;
  color: #264dd9;
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
    font-size: 0.8em;
  }
`;

const Position = styled.div`
  font-size: 0.8em;
  color: #928f9b;
  margin-top: 6px;
`;

const StyledButton = styled.button`
  height: 60px;
  width: calc(100% + 44px);
  background-color: #264dd9;
  margin: 18px -22px -22px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  outline: none;
  border: none;
  border-radius: 12px;
  transition: all 0.2s ease;
  &:disabled {
    background: #e4dcfb;
    transition: all 0.2s ease;
  }
`;

const CatvertisedPickCatList = styled(CatvertisedList)`
  padding: 7px 0 0 7px;
  margin-left: -7px;

  @media (max-width: 770px) {
    max-height: none;
    padding: 0;
    margin-left: 0;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  ${CatvertisedItem}:before {
    display: none;
  }
`;
const CatvertisedItemButton = styled.button`
  border: none;
  outline: none;
  background: none;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin: -0.5rem;
  font-size: 1rem;
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #f4f1ff;
    color: #264dd9;

    &:before {
      display: block;
      position: absolute;
      top: 50%;
      right: 0;
      padding: 8px 10px;
      border-radius: 12px 0px 0px 12px;
      font-size: 0.8rem;
      font-weight: 600;
      color: white;
      content: 'Add';
      background: #264dd9;
      transform: translateY(-50%);
    }
  }

  @media (max-width: 770px) {
    margin: 0;
    padding: 0;
  }
`;

const createEtherscanUrl = (transactionHash, networkName) => {
  const familyPrefix = networkName === 'ethereum' ? '' : `${networkName}.`;
  return `https://${familyPrefix}etherscan.io/tx/${transactionHash}`;
};

const CatvertisedClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  outline: none;
  background: none;
  border: none;
  font-size: 20px;
  padding: 0;
  cursor: pointer;
`;

const CatvertisedBack = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0;
  right: 10px;
  align-self: flex-start;
  outline: none;
  font-size: 30px;
  line-height: 30px;
  cursor: pointer;
`;

export default class Catvertised extends React.Component {
  state = {
    step: 'pickCat',
    value: 0,
    customCatId: undefined,
    entity: undefined,
  };

  componentDidMount() {
    this.props.getBoosts(this.props.token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token !== this.props.token) {
      this.props.getBoosts(nextProps.token);
    }
  }

  static Container = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    flex-direction: column;
  `;

  calculatePosition = (boosts) => {
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

  renderPosition = (position) =>
    position <= 5 ? <span style={{ color: '#40bf57' }}>#{position}</span> : `#${position}`;

  boost = async () => {
    this.setState({ step: 'submitted' });
  };

  render() {
    return (
      <Context.Consumer>
        {({ boostStore: { boosts, boost, isBoostable } }) => (
          <Catvertised.Container className={this.props.className}>
            {this.state.step === 'pickCat' && this.renderPickCat()}
            {this.state.step === 'form' && this.renderForm(boosts, boost, isBoostable)}
            {this.state.step === 'submitted' && this.renderSubmitted()}
          </Catvertised.Container>
        )}
      </Context.Consumer>
    );
  }

  renderPickCat = () => {
    return (
      <div>
        <CatvertisedBack onClick={() => this.props.onBackClick()}>←</CatvertisedBack>
        <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '15px', marginTop: '15px' }}>Choose patron</p>
        <Entities>
          {({ entities }) =>
            entities.length > 0 && (
              <CatvertisedPickCatList>
                {entities.map((entity) => (
                  <CatvertisedItem key={entity.id}>
                    <CatvertisedItemButton
                      onClick={() =>
                        this.setState({
                          step: 'form',
                          entity,
                        })
                      }
                    >
                      <EntityAvatar size="medium" id={entity.id} entityInfo={entity} />
                      <CatvertisedName>
                        <EntityNameWrapper>{entity.name}</EntityNameWrapper>
                      </CatvertisedName>
                    </CatvertisedItemButton>
                  </CatvertisedItem>
                ))}
              </CatvertisedPickCatList>
            )
          }
        </Entities>
      </div>
    );
  };

  renderForm = (boosts, boost, isBoostable) => {
    return (
      <React.Fragment>
        <CatvertisedBack onClick={() => this.setState({ step: 'pickCat' })}>←</CatvertisedBack>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', overflow: 'hidden' }}>
          <LinkedEntityAvatar size="medium" id={this.state.entity.id} entityInfo={this.state.entity} />
          <CatvertisedName>
            <EntityNameWrapper>{this.state.entity.name}</EntityNameWrapper>
          </CatvertisedName>
        </div>
        <div
          style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginTop: '15px',
          }}
        >
          Support with
        </div>
        <form
          style={{ marginBottom: '-5px' }}
          onSubmit={async (e) => {
            e.preventDefault();
            const { transactionHash, networkName } = await boost(
              this.state.entity,
              this.props.token,
              this.state.value * 10 ** 18,
            );
            this.setState({
              etherscanUrl: createEtherscanUrl(transactionHash, networkName),
              step: 'submitted',
            });
          }}
        >
          <StyledInput
            pattern="^[0-9]+(\.[0-9]+)?$"
            type="text"
            value={this.state.value}
            title="Value must only contain numbers and `.` sign. e.g. 0.011"
            onChange={(e) => {
              this.setState({ value: e.target.value });
            }}
          />
          <Position>Position: {this.renderPosition(this.calculatePosition(boosts))}</Position>

          <StyledButton disabled={!isBoostable || this.state.value <= 0}>
            {!isBoostable ? 'Switch to mainnet' : this.state.value <= 0 ? 'Not enough ETH' : 'Support!'}
          </StyledButton>
        </form>
      </React.Fragment>
    );
  };

  renderSubmitted = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <CatvertisedClose
          onClick={() => {
            this.setState({ step: 'catvertised', customCatId: undefined, value: 0 });
          }}
        >
          ✖
        </CatvertisedClose>
        <img alt="" src={checkmarkIcon} style={{ transform: 'scale(2)', marginBottom: '10px' }} />
        <div
          style={{
            fontWeight: 600,
            fontSize: '2rem',
            color: '#1b2437',
          }}
        >
          Success!
        </div>
        <div style={{ fontSize: '1rem' }}>
          You've supported <EntityName id={this.state.entity.id} />
        </div>
        <A href={this.state.etherscanUrl} style={{ marginTop: '10px' }}>
          Check it on Etherscan
        </A>
      </div>
    );
  };
}
