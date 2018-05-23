import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import Loader from './Loader';
import { ExternalLink } from './Icons';
import toIpfsImage from './toIpfsImage';

const ShareContainer = styled.div`
  position: relative;
  margin-left: auto;
`;

const StyledExternalLink = styled(ExternalLink)`
  cursor: pointer;
  color: #928f9b;

  ${ShareContainer}:hover > & {
    color: #000;
  }
`;

const SharePopup = styled(Modal)`
  position: absolute;
  top: 80%;
  left: -110px;
  width: 120px;
  background-color: #fff;
  box-shadow: 0 20px 40px 0 rgba(6, 3, 16, 0.09);
  padding: 15px;
  border-radius: 4px;
  font-size: 0.8em;
`;

const ShareItem = styled.p`
  color: #623cea;
  cursor: default;

  &:hover {
    color: #2f2670;
    cursor: pointer;
  }
`;

class Share extends Component {
  state = {
    open: false,
    loading: false,
  };

  render() {
    const { open, loading } = this.state;
    return (
      <ShareContainer>
        <StyledExternalLink onClick={() => this.setState({ open: true })} />
        {open && (
          <SharePopup onClose={() => this.setState({ open: false })}>
            {loading ? (
              <Loader style={{ transform: 'scale(0.3)' }} />
            ) : (
              <React.Fragment>
                <ShareItem onClick={(e) => this.share('tweet', e)}>Tweet it</ShareItem>
                <ShareItem onClick={(e) => this.share('image', e)}>Get an image</ShareItem>
              </React.Fragment>
            )}
          </SharePopup>
        )}
      </ShareContainer>
    );
  }

  share = (type, event) => {
    event.stopPropagation();
    const { author, message, etherscanUrl } = this.props;
    this.setState({ loading: true });

    toIpfsImage(message, `https://cryptopurr.co/${author}`, etherscanUrl, author)
      .then((ipfsUrl) => {
        const encodedMessage = encodeURIComponent(message);

        let newWindow;
        switch (type) {
          case 'tweet':
            const encodedlinkToShare = encodeURIComponent(
              `https://share.cryptopurr.co/share/?img=${encodeURIComponent(
                ipfsUrl,
              )}&title=${author}&description=${encodedMessage}`,
            );
            newWindow = window.open(
              `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedlinkToShare}&via=CryptopurrC`,
              '_blank',
            );
            break;
          default:
            newWindow = window.open(ipfsUrl, '_blank');
        }

        if (newWindow && newWindow.opener) {
          newWindow.opener = null;
        }
        this.setState({ loading: false });
      })
      .catch((e) => {
        this.setState({ loading: false });
      });
  };
}

export default Share;
