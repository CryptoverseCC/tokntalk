import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { BN } from 'web3-utils';

import Context from './Context';
import Dropdown from './Dropdown';
import { withActiveEntity, EntityAvatar, WithBoosts, EntityName } from './Entity';
import { claimWithTokenMultiValueTransfer, claimWithMultiValueTransfer } from './api';
import { getEntityData } from './entityApi';
import { toWei } from './balance';
import { A } from './Link';
import closeIcon from './img/small-remove.svg';
import { StyledButton } from './Components';

const Container = styled.div`
  position: relative;
  display: flex;
  font-size: 1rem;
  font-weight: 600;
`;

const Avatar = styled(EntityAvatar)`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const SendingContainer = Container.extend`
  min-height: 52px;
  align-items: center;
  background-color: #dae2fb;
  font-weight: 600;
  color: #264dd9;
`;

const SentContainer = SendingContainer.extend`
  background-color: #d0ffd6;
  color: #1ac631;
`;

const ConfirmContainer = SendingContainer.extend`
  display: flex;
  flex-direction: column;
`;

const ConfirmHeader = styled.div`
  display: flex;
  width: 100%;
`;

const ConfirmRecipients = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const TokenSelectorContent = styled.ul`
  min-width: 235px;
  border-radius: 6px;
  background-color: #ffffff;
`;

const TokenItem = styled.li`
  padding: 6px;

  :hover {
    border-radius: 6px;
    background-color: #f8f9fd;
  }
`;

const TokenToggle = styled.div.attrs({
  children: ({ value }) => value.symbol,
})`
  display: flex;
  align-items: center;
  min-width: 50px;
  cursor: pointer;
  margin: 6px;
  padding: 6px;
  height: calc(100% - 2 * 6px);
  font-weight: 600;
  font-size: 0.8rem;
  border-radius: 6px;
  background-color: #dae2fb;
  ::after {
    content: '⌄';
    font-size: 1.2rem;
    margin-left: auto;
  }
`;

const StyledInput = styled.div.attrs({
  children: (props) => <input {...props} />,
})`
  flex-grown: 0;
  postion: relative;

  & > input {
    height: 100%;
    width: 70px;
    font-size: 1rem;
    font-weight: 600;
    color: #264dd9;
    background-color: #f3f6ff;
    border-radius: 12px;
    padding: 10px;
  }
`;

const TokenSelector = ({ tokens, value, onChange }) => (
  <Dropdown
    position="left"
    Content={TokenSelectorContent}
    toggle={({ openDropdown }) => <TokenToggle value={value} onClick={openDropdown} />}
  >
    {({ closeDropdown }) =>
      tokens.map((t) => (
        <TokenItem
          key={t.symbol}
          onClick={() => {
            onChange(t);
            closeDropdown();
          }}
        >
          {t.symbol} - {t.name}
        </TokenItem>
      ))
    }
  </Dropdown>
);

export const InitialButton = styled(StyledButton)`
  margin: 0;
`;

const pulsate = keyframes`
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0.0;
  }
  50% {
    opacity: 1.0;
  }
  100% {
    transform: scale(1.2, 1.2);
    opacity: 0.0;
  }
`;

const Pulsar = styled((props) => (
  <div {...props}>
    <div className="ringring" />
    <div className="circle" />
  </div>
))`
  position: relative;
  width: 30px;
  margin: 3px;
  height: 30px;

  & > .circle {
    width: 15px;
    height: 15px;
    background-color: #264dd9;
    border-radius: 50%;
    position: absolute;
    top: 7.5px;
    left: 7.5px;
  }

  & > .ringring {
    box-sizing: content-box;
    border: 3px solid #264dd9;
    border-radius: 30px;
    height: 25px;
    width: 25px;
    position: absolute;
    left: 0;
    top: 0;
    animation: ${pulsate} 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

class Airdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'send',
      token: this.props.assetInfo,
      value: 0.00001,
      txHash: '',
      tokens: this.filterTokens(this.props.activeEntity.tokens),
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.activeEntity.tokens !== newProps.activeEntity.tokens) {
      this.setState({ tokens: this.filterTokens(newProps.activeEntity.tokens) });
    }
  }

  filterTokens = (tokens = []) => {
    return [{ name: 'Ethereum', symbol: 'ETH' }, ...tokens.filter((token) => !token.is721 && !token.isCustom)];
  };

  onTokenChange = (token) => this.setState({ token });

  onInputChange = (e) => this.setState({ value: e.target.value });

  onConfirm = async () => {
    const { token, value, recipients } = this.state;
    const PPP = new BN(10).pow(new BN(token.decimals));

    const recipientsAddresses = await Promise.all(
      recipients.map(async ([_, { id }]) => (await getEntityData(id)).owner),
    ); //TODO: convert to owner addresses

    const values = recipients.map(([id, { score }]) => new BN(score.toFixed(0)));

    const sum = values.reduce((acc, i) => acc.add(i), new BN(0));
    // BN does not support decimals so airdrops of fractions would not work
    // We will support fractions up to 10 decimal points. It doesn't make sense to support less either way.
    const valueWei = new BN(value * 10000000000).mul(PPP).div(new BN(10000000000));
    const split = values.map((i) => i.mul(valueWei).div(sum));

    try {
      let txHash = '';
      if (token.symbol === 'ETH') {
        txHash = await claimWithMultiValueTransfer(
          { claim: { target: 'ETH Airdrop to my supporters' } },
          recipientsAddresses,
          split,
          valueWei,
        );
      } else {
        txHash = await claimWithTokenMultiValueTransfer(
          { claim: { target: 'ETH Airdrop to my supporters' } },
          recipientsAddresses,
          token.address,
          split,
        );
      }
      this.setState({ step: 'sent', txHash });
    } catch (e) {
      this.setState({ step: 'failure' });
    }
  };

  onSend = async (number, boosts) => {
    const recipients = Object.entries(boosts)
      .sort(([, { score: a }], [, { score: b }]) => b - a)
      .slice(0, number);

    this.setState({ step: 'confirm', recipients: recipients });
  };

  render() {
    return (
      <WithBoosts entity={this.props.entity} asset={this.props.asset}>
        {(boosts) => this.renderContent(boosts)}
      </WithBoosts>
    );
  }

  renderContent(boosts) {
    const { step, tokens, token, value, txHash } = this.state;
    if (step === 'sending') {
      return (
        <SendingContainer>
          <span style={{ marginLeft: '15px' }}>
            Sending {value} {token.symbol}
          </span>
          <Pulsar style={{ marginLeft: 'auto' }} />
        </SendingContainer>
      );
    }

    if (step === 'sent') {
      return (
        <SentContainer>
          <span style={{ marginLeft: '15px' }}>
            Sent {value} {token.symbol}
          </span>
          <A
            href={`https://etherscan.io/tx/${txHash}`}
            style={{ marginLeft: 'auto', marginRight: '10px' }}
            target="_blank"
          >
            <StyledButton style={{ background: '#1ac631' }}>Check tx</StyledButton>
          </A>
        </SentContainer>
      );
    }

    if (step === 'failure') {
      return (
        <SentContainer style={{ background: '#ffe0e6', color: '#ff003d' }}>
          <span style={{ marginLeft: '15px' }}>Failure</span>
          <StyledButton
            style={{ background: '#000000', marginLeft: 'auto', marginRight: '10px' }}
            onClick={() => this.setState({ step: 'send' })}
          >
            Try again
          </StyledButton>
        </SentContainer>
      );
    }

    if (step === 'confirm') {
      return (
        <ConfirmContainer>
          <ConfirmHeader>
            <span style={{ marginLeft: '15px' }}>Confirm Airdrop to</span>
            <StyledButton
              style={{ background: '#000000', marginLeft: 'auto', marginRight: '10px' }}
              onClick={this.onConfirm}
            >
              Confirm
            </StyledButton>
            <StyledButton
              style={{ background: '#000000', marginLeft: 'auto', marginRight: '10px' }}
              onClick={() => this.setState({ step: 'send' })}
            >
              Cancel
            </StyledButton>
          </ConfirmHeader>

          <ConfirmRecipients>
            {this.state.recipients.map(([id, { context_info: entity }]) => (
              <span key={id}>
                <Avatar id={entity.id} entityInfo={entity} />
                {entity.name}
              </span>
            ))}
          </ConfirmRecipients>
        </ConfirmContainer>
      );
    }

    return (
      <Container>
        <Form>
          <span>Airdrop</span>
          <StyledInput
            value={value}
            onChange={this.onInputChange}
            title="Value must only contain numbers and `.` sign. e.g. 0.011"
            pattern="^[0-9]+(\.[0-9]+)?$"
            type="text"
          />
          <TokenSelector value={token} tokens={tokens} onChange={this.onTokenChange} />
          <span>to</span>
          <StyledButton disabled={value <= 0} onClick={() => this.onSend(5, boosts)}>
            Top 5
          </StyledButton>
          <StyledButton disabled={value <= 0} onClick={() => this.onSend(10, boosts)}>
            Top 10
          </StyledButton>
          <StyledButton disabled={value <= 0} onClick={() => this.onSend(20, boosts)}>
            Top 20
          </StyledButton>
          <span>
            <EntityName id={this.props.entity.id} /> supporters
          </span>
          <StyledButton onClick={this.props.onClose}>Cancel</StyledButton>
        </Form>
      </Container>
    );
  }
}

export default withActiveEntity(Airdrop);
