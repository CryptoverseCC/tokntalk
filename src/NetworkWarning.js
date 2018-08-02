import React from 'react';
import styled from 'styled-components';

import { IfOnMainnet } from './Entity';
import { ExclamationMark } from './Icons';

const StyledNetworkWarning = styled.div`
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: rgba(255, 234, 142, 0.85);
  border-radius: 30px 30px 0 0;
  font-weight: 600;
`;

const NetworkWarning = () => (
  <IfOnMainnet>
    <StyledNetworkWarning>
      <ExclamationMark style={{ marginRight: '15px', width: '17px' }} />
      You are on mainnet. Interact with application on testnet to save money and network!
    </StyledNetworkWarning>
  </IfOnMainnet>
);
export default NetworkWarning;
