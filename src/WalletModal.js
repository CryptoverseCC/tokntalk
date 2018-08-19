import React from 'react';
import styled from 'styled-components';

import { FixedModal } from './Modal';
import AppContext from './Context';
import { H3 } from './Components';

import toshi from './img/wallets/toshi.svg';
import trust from './img/wallets/trust.svg';
import cipher from './img/wallets/cipher.svg';
import metamask from './img/wallets/metamask.svg';

const walletsLogoMapping = {
  toshi,
  trust,
  cipher,
  metamask,
};

const ProviderLogo = ({ name, ...restProps }) => <img src={walletsLogoMapping[name] || metamask} {...restProps} />;

const Container = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2rem 4rem -2rem;
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
      <p>Check your wallet to sign the transaction.</p>
    </Container>
  </FixedModal>
);

const ConnectedWalletModal = () => (
  <AppContext.Consumer>
    {({ web3Store: { waitingForConfirm, provider } }) => waitingForConfirm > 0 && <WalletModal provider={provider} />}
  </AppContext.Consumer>
);

export default ConnectedWalletModal;
