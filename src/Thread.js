import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import { Card } from './Feed';
import Loader from './Loader';
import Context from './Context';

export class Thread extends Component {
  componentDidMount() {
    this.props.getFeedItem(this.props.match.params.claimId);
  }

  render() {
    return (
      <Context.Consumer>
        {({ feedStore: { feedItemLoading, feedItem } }) =>
          !!feedItem || (!feedItemLoading && !!feedItem) ? (
            <Card
              feedItem={feedItem}
              replies={feedItem.replies}
              reactions={feedItem.likes}
              style={{ background: '#ffffff' }}
            />
          ) : (
            <div
              style={{
                paddingTop: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Loader />
            </div>
          )
        }
      </Context.Consumer>
    );
  }
}

const FixedModal = styled(Modal)`
  min-width: 400px;
`;

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 100vh;
  left: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

export class ModalThread extends Component {
  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <Overlay>
        <FixedModal onClose={this.onClose}>
          <Thread {...this.props} />
        </FixedModal>
      </Overlay>
    );
  }
}
