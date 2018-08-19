import React, { Component } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { FixedModal } from './Modal';
import { createEtherscanUrl } from './utils';
import { getHttpClaimDetails } from './api';
import Loader from './Loader';
import { H2 } from './Components';
import checkmarkIcon from './img/checkmark.svg';
import { A } from './Link';

const CheckIcon = styled.img.attrs({ src: checkmarkIcon })`
  width: 44px;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 30px;
  padding: 30px;
  max-width: 600px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
`;

const Verified = styled(H2)`
  color: #44e192;
`;

const Hash = styled.p`
  word-break: break-all;
  max-height: 250px;
  overflow-y: scroll;
  background-color: #f5f5f5;
  color: #4a4a4a;
  font-size: 0.875em;
  letter-spacing: 0.1em
  padding: 1.25rem 1.5rem;
`;

const Copy = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  padding: 3px;
  border-bottom-left-radius: 3px;
  background: ${({ copied }) => (copied ? 'rgba(55, 247, 114, 0.6)' : 'rgba(191, 188, 188, 0.6)')};
  transition: background 0.3s;
`;

const CopyableHash = styled(
  class extends Component {
    state = { copied: false };

    onCopy = () => {
      this.setState({ copied: true }, () => {
        setTimeout(() => this.setState({ copied: false }), 5000);
      });
    };

    render() {
      const { className, style, children } = this.props;
      const { copied } = this.state;
      return (
        <div className={className} style={style}>
          <Hash>{children}</Hash>
          <CopyToClipboard text={children} onCopy={this.onCopy}>
            <Copy copied={copied}>{copied ? 'Copied' : 'Copy'}</Copy>
          </CopyToClipboard>
        </div>
      );
    }
  },
)`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export class VerifyModal extends Component {
  state = {
    httpClaimDetails: undefined,
    isLoading: true,
  };

  componentDidMount() {
    const { feedItem } = this.props;
    if (feedItem.family.toLowerCase() === 'http') {
      getHttpClaimDetails(feedItem).then((res) => {
        this.setState({ httpClaimDetails: res, isLoading: false });
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <FixedModal onClose={this.props.onClose}>
        <ModalContainer>
          {!this.state.isLoading && this.renderLoaded()}
          {this.state.isLoading && (
            <Loader
              style={{
                marginBottom: '20px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          )}
        </ModalContainer>
      </FixedModal>
    );
  }

  renderLoaded() {
    return (
      <React.Fragment>
        <Header style={{ marginBottom: '15px' }}>
          <CheckIcon />
          <Verified>Verified!</Verified>
          <p>This message is signed cryptographically</p>
        </Header>
        {this.renderByType()}
      </React.Fragment>
    );
  }

  renderByType = () => {
    if (this.props.feedItem.family.toLowerCase() === 'http') {
      return this.renderHttpType();
    } else {
      return this.renderNotHttpType();
    }
  };

  renderHttpType = () => {
    const { httpClaimDetails } = this.state;
    if (httpClaimDetails === undefined) {
      return null;
    }
    return (
      <Container>
        {this.renderHttpDescBySignatureValue()}
        <p>Stored on: HTTP Server</p>
        <p>
          Author:
          <CopyableHash>{this.props.feedItem.author}</CopyableHash>
        </p>
        <p>
          Message signature hash:
          <CopyableHash>{httpClaimDetails.signatureValue}</CopyableHash>
        </p>
        <p>
          Message:
          <CopyableHash>{this.renderHttpClaimDetails()}</CopyableHash>
        </p>
      </Container>
    );
  };

  renderHttpDescBySignatureValue = () => {
    const { httpClaimDetails } = this.state;
    if (httpClaimDetails.signatureType === 'ethereum:personal:sign') {
      return (
        <p style={{ alignSelf: 'center' }}>
          Copy values to{' '}
          <A href="http://etherscan.io/verifySig" target="_blank" rel="noopener">
            Etherscan
          </A>{' '}
          to check it by yourself!
        </p>
      );
    }
    if (httpClaimDetails.signatureType === 'ethereum:personal:sign:with_missing_nonce') {
      return <p>This claim was verified by our system, but we lost its nonce which makes it unverifiable</p>;
    }

    return <p>Unknown signatureType: {httpClaimDetails.signatureType}</p>;
  };

  renderNotHttpType = () => {
    const { feedItem } = this.props;

    return (
      <Container>
        <A
          href={createEtherscanUrl(this.props.feedItem)}
          target="_blank"
          rel="noopener"
          style={{ alignSelf: 'center' }}
        >
          Check on Etherscan
        </A>
        <p>Stored on: {feedItem.family}</p>
        <p>
          Author:
          <Hash>{feedItem.author}</Hash>
        </p>
        <p>
          Transaction hash:
          <Hash>{this.props.feedItem.id.split(':')[1]}</Hash>
        </p>
      </Container>
    );
  };

  renderHttpClaimDetails = () => {
    return JSON.stringify(JSON.parse(this.state.httpClaimDetails.data));
  };
}
