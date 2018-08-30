import React, { Component } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { FixedModal } from './Modal';
import { createEtherscanUrl } from './utils';
import { getHttpClaimDetails } from './api';
import Loader from './Loader';
import { H2 } from './Components';
import checkmarkIcon from './img/checkmark.svg';
import httpStorage from './img/httpstorage.svg';
import onChain from './img/onchain.svg';
import { A } from './Link';
import { niceScroll } from './cssUtils';

const CheckIcon = styled.img.attrs({ src: checkmarkIcon })`
  width: 44px;
  margin-bottom: 10px;
`;

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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
`;

const Verified = styled(H2)`
  color: #44e192;
  font-weight: 900;
`;

const Hash = styled.p`
  word-break: break-all;
  max-height: 200px;
  overflow-y: scroll;
  background-color: #f3f6ff;
  border-radius: 16px;
  color: #1b2437;
  font-size: 1rem;
  letter-spacing: 0.05em
  padding: 1.25rem 1.5rem 1rem 1.5rem;
  ${niceScroll};
`;

const VerifyContainerLabel = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Copy = styled.div`
  position: absolute;
  right: 0;
  top: 10px;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 8px 10px;
  font-weight: 600;
  border-radius: 12px 0px 0px 12px;
  background: ${({ copied }) => (copied ? '#1AC631' : '#264dd9')};
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
        <Header>
          <CheckIcon />
          <Verified>Verified!</Verified>
          <p style={{ fontWeight: '500' }}>This message is signed cryptographically</p>
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
        <div className="columns">
          <div className="column is-one-quarter">
            <VerifyContainerLabel>Stored on</VerifyContainerLabel>
          </div>
          <div className="column is-three-quarters">
            <img alt="" style={{ marginRight: '10px', display: 'inline-block' }} src={httpStorage} />
            <p style={{ fontWeight: '600', display: 'inline-block' }}>HTTP Server</p>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-quarter">
            <VerifyContainerLabel>Author</VerifyContainerLabel>
          </div>
          <div className="column is-three-quarters">
            <CopyableHash>{this.props.feedItem.author}</CopyableHash>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-quarter">
            <VerifyContainerLabel>Message signature hash</VerifyContainerLabel>
          </div>
          <div className="column is-three-quarters">
            <CopyableHash>{httpClaimDetails.signatureValue}</CopyableHash>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-quarter">
            <VerifyContainerLabel>Message</VerifyContainerLabel>
          </div>
          <div className="column is-three-quarters">
            <CopyableHash>{this.renderHttpClaimDetails()}</CopyableHash>
          </div>
        </div>
      </Container>
    );
  };

  renderHttpDescBySignatureValue = () => {
    const { httpClaimDetails } = this.state;
    if (httpClaimDetails.signatureType === 'ethereum:personal:sign') {
      return (
        <p style={{ alignSelf: 'center', marginBottom: '60px' }}>
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
          style={{ alignSelf: 'center', marginBottom: '60px' }}
        >
          Check on Etherscan
        </A>
        <div className="columns">
          <div className="column is-one-quarter">
            <VerifyContainerLabel>Stored on</VerifyContainerLabel>
          </div>
          <div className="column is-three-quarters">
            <img alt="" style={{ marginRight: '10px', display: 'inline-block' }} src={onChain} />
            <p style={{ fontWeight: '600', display: 'inline-block' }}>{feedItem.family}</p>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-quarter">
            <VerifyContainerLabel>Author</VerifyContainerLabel>
          </div>
          <div className="column is-three-quarters">
            <Hash>{feedItem.author}</Hash>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-quarter">
            <VerifyContainerLabel>Transaction hash</VerifyContainerLabel>
          </div>
          <div className="column is-three-quarters">
            <Hash>{this.props.feedItem.id.split(':')[1]}</Hash>
          </div>
        </div>
      </Container>
    );
  };

  renderHttpClaimDetails = () => {
    return JSON.stringify(JSON.parse(this.state.httpClaimDetails.data));
  };
}
