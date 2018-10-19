import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import Dropdown from './Dropdown';
import { withActiveEntity } from './Entity';
import { transferErc20, transferEth } from './api';
import { toWei } from './balance';
import { A } from './Link';
import closeIcon from './img/small-remove.svg';

const Container = styled.div`
  position: relative;
  display: flex;
  border-radius: 6px;
  background-color: #f3f6ff;
  border-radius: 12px;
  box-shadow: inset 1px 2px 4px 0 rgba(38, 77, 217, 0.15);
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
    width: 100%;
    height: 100%;
    font-size: 1rem;
    font-weight: 600;
    color: #264dd9;
    background: none;
    outline: none;
    border: none;
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

export const InitialButton = styled.span`
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    background: #e4dcfb;
    transition: all 0.2s ease;
  }
`;

export const StyledButton = styled.button`
  cursor: pointer;
  background-color: #264dd9;
  padding: 16px 10px 15px 10px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    background: #e4dcfb;
    transition: all 0.2s ease;
  }
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

const ExitIcon = styled.img.attrs({ src: closeIcon })`
  position: absolute;
  width: 10px;
  height: 10px;
  right: -12px;
  top: calc(50% - 5px);
  transition: transform 0.2s ease-in;

  :hover {
    transform: translateY(-2px);
  }
`;

class SendTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      token: { name: 'Ethereum', symbol: 'ETH' },
      value: 0,
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

  onSend = async (e) => {
    e.preventDefault();
    const { to } = this.props;
    const { token, value } = this.state;
    const recipient = to.isAddress ? to.id : to.owner;
    this.setState({ step: 'sending' });

    try {
      let txHash = '';
      if (token.symbol !== 'ETH') {
        txHash = await transferErc20(token.address, recipient, value);
      } else {
        txHash = await transferEth(recipient, value);
      }
      this.setState({ step: 'sent', txHash });
    } catch (e) {
      this.setState({ step: 'failure' });
    }
  };

  render() {
    const { step, tokens, token, value, txHash } = this.state;
    if (step === 'initial') {
      return (
        <InitialButton style={{ marginTop: '10px' }} onClick={() => this.setState({ step: 'send' })}>
          💸 send tokens
        </InitialButton>
      );
    }

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

    return (
      <Container>
        <TokenSelector value={token} tokens={tokens} onChange={this.onTokenChange} />
        <form className="is-flex" onSubmit={this.onSend}>
          <StyledInput
            value={value}
            onChange={this.onInputChange}
            title="Value must only contain numbers and `.` sign. e.g. 0.011"
            pattern="^[0-9]+(\.[0-9]+)?$"
            type="text"
          />
          <StyledButton
            style={{ marginLeft: 'auto', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            disabled={value <= 0}
          >
            💸 send
          </StyledButton>
          <ExitIcon onClick={() => this.setState({ step: 'initial' })} />
        </form>
      </Container>
    );
  }
}

export default withActiveEntity(SendTokens);
