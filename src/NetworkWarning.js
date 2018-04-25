import React from 'react';
import styled from 'styled-components';
import { IfOnMainnet } from './Entity';

const StyledNetworkWarning = styled.p`
  text-align: center;
  padding: 0.5rem 2rem;
  background-color: lightyellow;
  color: #fc0035;
`;

const NetworkWarning = () => (
  <IfOnMainnet>
    <StyledNetworkWarning>You are on mainnet. You can also interact with application on testnet!</StyledNetworkWarning>
  </IfOnMainnet>
);
export default NetworkWarning;
