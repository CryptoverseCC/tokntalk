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
  color: #78818c;

  ${ShareContainer}:hover > & {
    color: #000;
  }
`;

const SharePopup = styled(Modal)`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 80%;
  left: -110px;
  width: 120px;
  background-color: #fff;
  box-shadow: 0 20px 40px 0 rgba(6, 3, 16, 0.09);
  padding: 15px;
  border-radius: 4px;
  font-size: 0.8em;
  z-index: 1;
`;

const ShareItem = styled.p`
  color: #264dd9;
  cursor: default;
  padding: 6px;
  font-size: 0.8rem;

  &:hover {
    color: #2f2670;
    cursor: pointer;
  }
`;

const Status = styled.p`
  color: #264dd9;
  text-align: center;
`;

class Share extends Component {
  state = {
    open: false,
    loading: false,
    sharingState: '',
  };

  render() {
    const { open, loading, sharingState } = this.state;
    return (
      <ShareContainer>
        <StyledExternalLink onClick={() => this.setState({ open: true })} />
        {open && (
          <SharePopup onClose={() => this.setState({ open: false })}>
            {loading ? (
              <React.Fragment>
                <div style={{ width: '30px', height: '30px', alignSelf: 'center' }}>
                  <Loader style={{ transform: 'scale(0.25)', transformOrigin: 'left top' }} />
                </div>
                <Status>
                  {sharingState === 'image' && 'Generating an image'}
                  {sharingState === 'upload' && 'Uploading to ipfs'}
                </Status>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/*<ShareItem onClick={(e) => this.share('tweet', e)}>Tweet it</ShareItem>*/}
                <ShareItem onClick={(e) => this.share('image', e)}>Get verifiable image</ShareItem>
              </React.Fragment>
            )}
          </SharePopup>
        )}
      </ShareContainer>
    );
  }

  onProgress = (sharingState) => {
    this.setState({ sharingState });
  };

  share = (type, event) => {
    event.stopPropagation();
    const { author, message, etherscanUrl } = this.props;
    this.setState({ loading: true, sharingState: 'image' });

    toIpfsImage(message, `https://tokntalk.club/${author}`, etherscanUrl, author, this.onProgress)
      .then((ipfsUrl) => {
        const encodedMessage = encodeURIComponent(message);

        let newWindow;
        switch (type) {
          case 'tweet':
            const encodedlinkToShare = encodeURIComponent(
              `https://share.tokntalk.club/share/?img=${encodeURIComponent(
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
