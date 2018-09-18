import React from 'react';
import { StyledButton } from './SendTokens';
import { mintTokens } from './api';

export class MintTokensButton extends React.Component {
  state = {
    isLoading: false,
  };

  mintTokens = () => {
    this.setState({ isLoading: true });
    mintTokens().then(() => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    return <StyledButton onClick={() => this.mintTokens()}>Mint token</StyledButton>;
  }
}
