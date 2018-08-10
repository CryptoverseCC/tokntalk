import React, { Component } from 'react';
import styled from 'styled-components';

import { FixedModal } from './Modal';
import { createEtherscanUrl } from './utils';
import { getHttpClaimDetails } from './api';

const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 30px;
  padding: 30px;
  max-width: 400px;
`;

const Hash = styled.pre`
  word-break: break-word;
`;

export class VerifyModal extends Component {
  state = {
    httpClaimDetails: undefined,
  };

  componentDidMount() {
    const { feedItem } = this.props;
    if (feedItem.family.toLowerCase() === 'http') {
      getHttpClaimDetails(feedItem).then((res) => {
        this.setState({ httpClaimDetails: res });
      });
    }
  }

  render() {
    return (
      <FixedModal onClose={this.props.onClose}>
        <ModalContainer>
          <h1>Verified!</h1>
          <p>This message is signed cryptographically</p>
          {this.renderByType()}
        </ModalContainer>
      </FixedModal>
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
    if (httpClaimDetails !== undefined) {
      return (
        <div>
          {this.renderHttpDescBySignatureValue()}
          <p>Stored on HTTP Server</p>
          <p>
            Author <Hash>{this.props.feedItem.author}</Hash>
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Message signature hash <Hash>{httpClaimDetails.signatureValue}</Hash>
          </p>
          <pre>{this.renderHttpClaimDetails()}</pre>
        </div>
      );
    } else {
      return null;
    }
  };

  renderHttpDescBySignatureValue = () => {
    const { httpClaimDetails } = this.state;
    if (httpClaimDetails.signatureType === 'ethereum:personal:sign') {
      return (
        <p>
          Copy values to{' '}
          <a href="http://etherscan.io/verifySig?" target="_blank" rel="noopener">
            Etherscan
          </a>{' '}
          to check it by yourself!
        </p>
      );
    } else if (httpClaimDetails.signatureType === 'ethereum:personal:sign:with_missing_nonce') {
      return <p>This claim was verified by our system, but we lost its nonce which makes it unverifiable</p>;
    } else {
      return <p>Unknown signatureType: {httpClaimDetails.signatureType}</p>;
    }
  };

  renderNotHttpType = () => {
    const { feedItem } = this.props;
    return (
      <div>
        <p>Stored on {feedItem.family}</p>
        <p>Author {feedItem.author}</p>
        <p>
          Transaction hash{' '}
          <a href={createEtherscanUrl(this.props.feedItem)} target="_blank" rel="noopener">
            {this.props.feedItem.id.split(':')[1]}
          </a>
        </p>
      </div>
    );
  };

  renderHttpClaimDetails = () => {
    return JSON.stringify(JSON.parse(this.state.httpClaimDetails.data));
  };
}
