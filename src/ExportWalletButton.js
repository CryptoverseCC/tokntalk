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

export default class ExportWalletButton extends React.Component {
  state = {
    showModal: false,
  };

  render() {
    return (
      <React.Fragment>
        <AppContext>
          {({ web3Store: { exportWallet, hasInternalWallet, clearWallet, from } }) =>
            hasInternalWallet() && (
              <React.Fragment>
                <StyledButton style={{ marginTop: '10px' }} onClick={() => this.setState({ showModal: true })}>
                  Export internal wallet
                </StyledButton>
                {this.state.showModal && (
                  <ExportWalletModal
                    onClose={() => this.setState({ showModal: false })}
                    onClear={() => {
                      clearWallet();
                      setTimeout(() => {
                        this.setState({ showModal: false });
                      }, 500);
                    }}
                  />
                )}
              </React.Fragment>
            )
          }
        </AppContext>
      </React.Fragment>
    );
  }
}

const ExportWalletModal = ({ onClose, onClear }) => {
  return (
    <AppContext>
      {({ web3Store: { exportWallet, hasInternalWallet, from } }) => (
        <FixedModal onClose={onClose}>
          clear
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
            <StyledButton style={{ marginTop: '10px', background: '#EE0000' }} onClick={onClear}>
              I've copied mnemonic to another wallet. Remove it from browser memory (Cannot be recovered!!!).
            </StyledButton>
          </ModalContainer>
        </FixedModal>
      )}
    </AppContext>
  );
};
