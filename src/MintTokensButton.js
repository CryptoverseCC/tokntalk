import React from 'react';
import { StyledButton } from './SendTokens';
import { mintTokens, getAvailableTokensWithSignature } from './api';

export class MintTokensButton extends React.Component {
  state = {
    isLoading: true,
    signature: {},
  };

  async componentDidMount() {
    await this.refreshSignature();
  }

  mintTokens = () => {
    this.setState({ isLoading: true });
    mintTokens(this.state.signature).then(() => {
      this.refreshSignature();
    });
  };

  refreshSignature = async () => {
    const signature = await getAvailableTokensWithSignature();
    this.setState({ signature, isLoading: false });
  };

  render() {
    const { max } = this.state.signature;
    return (
      <StyledButton disabled={max === 0} onClick={this.mintTokens}>
        Mint {max} tokens
      </StyledButton>
    );
  }
}
