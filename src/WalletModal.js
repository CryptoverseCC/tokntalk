import React from 'react';
import styled from 'styled-components';

import metamask from './img/metamask.png';
import { FixedModal } from './Modal';
import AppContext from './Context';
import { H3 } from './Components';

const ProviderLogo = ({ name, ...restProps }) => {
  const src = metamask;
  return <img src={src} {...restProps} />;
};

const Container = styled.div`
  background: #ffffff;
  border-radius: 30px;
  padding: 30px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledProviderLogo = styled(ProviderLogo)`
  object-fit: contain;
  margin-bottom: 30px;
`;

const WalletModal = ({ provider }) => (
  <FixedModal>
    <Container>
      <StyledProviderLogo name={provider} />
      <H3>Working</H3>
      <small>Check your wallet to sign the transaction.</small>
    </Container>
  </FixedModal>
);

const ConnectedWalletModal = () => (
  <AppContext.Consumer>
    {({ web3Store: { waitingForConfirm, provider } }) => waitingForConfirm > 0 && <WalletModal provider={provider} />}
  </AppContext.Consumer>
);

export default ConnectedWalletModal;
