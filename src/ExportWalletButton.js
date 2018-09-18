import React from 'react';
import AppContext from './Context';
import { FixedModal } from './Modal';
import { niceScroll } from './cssUtils';
import styled from 'styled-components';
import { CopyableHash } from './VerifyModal';
import { StyledButton } from './SendTokens';

const ModalContainer = styled.div`
  background: #ffffff;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 12px;
  padding: 30px;
  max-width: 600px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2rem 4rem -2rem;

  ${niceScroll};
`;

export class ExportWalletButton extends React.Component {
  state = {
    showModal: false,
  };

  render() {
    return (
      <React.Fragment>
        <StyledButton style={{ marginTop: '10px' }} onClick={() => this.setState({ showModal: true })}>
          Save wallet
        </StyledButton>
        {this.state.showModal && <ExportWalletModal onClose={() => this.setState({ showModal: false })} />}
      </React.Fragment>
    );
  }
}

const ExportWalletModal = ({ onClose }) => {
  return (
    <AppContext>
      {({ web3Store: { exportWallet, from } }) => (
        <FixedModal onClose={onClose}>
          <ModalContainer>
            {from && (
              <div>
                <div className="column is-two-quarters">
                  <p>Your public key</p>
                </div>
                <div className="column is-four-quarters">
                  <CopyableHash>{from.toLowerCase()}</CopyableHash>
                </div>
              </div>
            )}
            <div className="column is-two-quarters">
              <p>Your private key</p>
            </div>
            <div className="column is-four-quarters">
              <CopyableHash>{exportWallet().privateKey}</CopyableHash>
            </div>
            <div className="column is-two-quarters">
              <p>Metamask mnemonic</p>
            </div>
            <div className="column is-four-quarters">
              <CopyableHash>{exportWallet().mnemonic}</CopyableHash>
            </div>
          </ModalContainer>
        </FixedModal>
      )}
    </AppContext>
  );
};
