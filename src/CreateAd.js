import React, { Component } from 'react';
import { StyledButton } from './SendTokens';
import { createThreadAd } from './api';
import { toWei } from './balance';

export class CreateAd extends Component {
  createAd = async () => {
    const response = await createThreadAd(
      'claim:0x6faf671a0df92d2a0252a5bbd9509cc6bc2c3dbf83d59169a024a8d8d8b14afb:0',
      'Linux is the best opensource!x2',
      toWei(20000000000000000),
    );
    console.log(response);
  };

  render() {
    return <StyledButton onClick={this.createAd}>Create AD</StyledButton>;
  }
}
