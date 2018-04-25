import React from 'react';
import styled from 'styled-components';
import { IfOnMainnet } from './Entity';

const StyledNetworkWarning = styled.p`
  text-align: center;
  padding: 0.5rem 2rem;
  background-color: #fdcf0b;
  color: #2f343a;
`;

const NetworkWarning = () => (
  <IfOnMainnet>
    <StyledNetworkWarning>
      <b>You are on mainnet. Interact with application on testnet to save money and network!</b>
    </StyledNetworkWarning>
  </IfOnMainnet>
);
export default NetworkWarning;
