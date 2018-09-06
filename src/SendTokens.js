import React, { Component } from 'react';
import styled from 'styled-components';

import Dropdown from './Dropdown';
import { findClub } from './clubs';
import { IfActiveEntity, Entity } from './Entity';

const Container = styled.div`
  background: #f4f6ff;
  border-radius: 12px;
`;

const TokenSelectorContent = styled.ul`
  // width: 100%;
`;

const TokenToggle = styled.div.attrs({
  children: ({ value }) => value.symbol,
})`
  ::after {
    content: '⌄';
  }
`;

const TokenSelector = ({ tokens, value, onChange }) => (
  <Dropdown
    Content={TokenSelectorContent}
    toggle={({ openDropdown }) => <TokenToggle value={value} onClick={openDropdown} />}
  >
    {({ closeDropdown }) => tokens.map((t) => <li key={t.address}>{t.symbol}</li>)}
  </Dropdown>
);

const StyledButton = styled.button`
  cursor: pointer;
  background-color: #264dd9;
  padding: 10px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  outline: none;
  border: none;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    background: #e4dcfb;
    transition: all 0.2s ease;
  }
`;

class SendTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'send',
      tokens: this.mapAssetsToTokens(this.props.entity.tokens),
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.entity.tokens !== newProps.entity.tokens) {
      this.setState({ tokens: this.mapAssetsToTokens(newProps.entity.tokens) });
    }
  }

  mapAssetsToTokens = (assets = []) => {
    return [
      { name: 'Ethereum', symbol: 'ETH' },
      ...assets
        .map((token) => token.split(':'))
        .map(([network, address]) => findClub(network, address))
        .filter((token) => !token.is721 && !token.isCustom),
    ];
  };

  render() {
    const { step, tokens } = this.state;
    if (step === 'initial') {
      return <StyledButton onClick={() => this.setState({ step: 'send' })}>Send tokens</StyledButton>;
    }

    return (
      <Container className="is-flex">
        <TokenSelector value={tokens[0]} tokens={tokens} />
        <StyledButton style={{ marginLeft: 'auto', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
          Send
        </StyledButton>
      </Container>
    );
  }
}

const withActiveEntity = (Cmp) => (props) => (
  <IfActiveEntity>
    {(entityId) => <Entity id={entityId}>{(entity) => <Cmp {...props} entity={entity} />}</Entity>}
  </IfActiveEntity>
);

export default withActiveEntity(SendTokens);
