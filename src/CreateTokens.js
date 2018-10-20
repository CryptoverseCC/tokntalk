import React, { Component } from 'react';
import styled from 'styled-components';

import { deployERC20 } from './api';
import Link from './Link';
import { ChangellyFastBuy } from './Changelly';
import { CoinbaseWidget } from './CoinbaseWidget';
import { Container, FlatContainer, H3, H4, StyledInput, StyledButton } from './Components';
import { IfActiveEntity } from './Entity';
import { ERC20Code } from './contract';

const Input = styled.div.attrs({
  children: (props) => <input {...props} />,
})`
  flex-grown: 0;
  postion: relative;

  & > input {
    height: 100%;
    width: 200px;
    font-size: 1rem;
    font-weight: 600;
    color: #264dd9;
    background-color: #f3f6ff;
    border-radius: 12px;
    padding: 10px;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

class ERC20 extends Component {
  state = {
    name: 'Your Token Name',
    symbol: 'YOUR TOKEN SYMBOL',
    totalSupply: 21000000,
    decimals: 8,
    feeAddress: '0x6Be450972b30891B16c8588DcBc10c8c2aEf04da',
    feeDivider: 1000,
  };

  async createToken() {
    try {
      const contract = await deployERC20({
        ...this.state,
        onTransactionHash: (t) => this.setState({ transaction: t }),
        onReceipt: (r) => this.setState({ receipt: r }),
      });
      console.log(contract);
    } catch (e) {
      console.error(e);
      return;
    }
  }

  render() {
    return (
      <IfActiveEntity>
        {(entityId) => (
          <React.Fragment>
            <Form>
              <div>
                Name <Input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
              </div>
              <div>
                Symbol (eg. MKR, ZRX, CK, MOKEN)
                <Input value={this.state.symbol} onChange={(e) => this.setState({ symbol: e.target.value })} />
              </div>
              <div>
                Total supply (min: 1, max: 2^
                {256 - this.state.decimals}
                -1), default: 21000000)
                <Input
                  value={this.state.totalSupply}
                  onChange={(e) => this.setState({ totalSupply: parseInt(e.target.value || 0) })}
                />
              </div>
              <b>Advanced:</b>
              <div>
                Decimals (min: 0, max: 18, default: 8)
                <Input
                  value={this.state.decimals}
                  onChange={(e) =>
                    this.setState({ decimals: parseInt(e.target.value || 0) > 18 ? 18 : parseInt(e.target.value || 0) })
                  }
                />
              </div>
              <StyledButton onClick={this.createToken.bind(this)}>Create Token</StyledButton>
              {JSON.stringify(this.state.receipt)}
              {this.state.transaction}
            </Form>
          </React.Fragment>
        )}
      </IfActiveEntity>
    );
  }
}

const CreateTokens = () => {
  return (
    <React.Fragment>
      <div className="columns ordered-mobile">
        <div className="column is-8 fl-1 is-offset-1">
          <Container>
            <H3>Create ERC20 Token</H3>
            <div>
              <ERC20 />
            </div>
          </Container>

          {/*<CoinbaseWidget />*/}
        </div>
        <div className="column is-3 is-hidden-mobile">
          <FlatContainer>
            Here you can create different types of tokens.
            <br />
            <br />
            We support only ERC20 tokens for now. ERC721 are in the works.
          </FlatContainer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateTokens;
