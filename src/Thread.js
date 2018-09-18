import React, { Component } from 'react';
import styled from 'styled-components';

import { FixedModal } from './Modal';
import { Card } from './Feed';
import LikersModal from './LikersModal';
import { VerifyModal } from './VerifyModal';
import Loader from './Loader';
import Context from './Context';

class ThreadCmp extends Component {
  state = {
    showModal: false,
    feedItemLikes: [],
    showVerify: false,
    verifiableItem: undefined,
  };

  componentDidMount() {
    this.props.getFeedItem(this.props.match.params.claimId);
  }

  onShowLikers = (feedItem, reactions) => {
    this.setState({ showModal: true, feedItemLikes: reactions });
  };

  onVerify = (item) => {
    this.setState({ showVerify: true, verifiableItem: item });
  };

  render() {
    const { showModal, feedItemLikes, showVerify, verifiableItem } = this.state;

    return (
      <React.Fragment>
        <Context.Consumer>
          {({ feedStore: { feedItemLoading, feedItem, temporaryReactions } }) => {
            const getTemporaryReactions = (id) => temporaryReactions[id] || [];

            return !!feedItem || (!feedItemLoading && !!feedItem) ? (
              <Card
                feedItem={feedItem}
                replies={feedItem.replies}
                reactions={feedItem.likes}
                style={{ marginTop: '10px' }}
                onShowLikers={this.onShowLikers}
                getTemporaryReactions={getTemporaryReactions}
                onVerify={this.onVerify}
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
            );
          }}
        </Context.Consumer>
        {showModal && (
          <LikersModal
            onClose={() => this.setState({ showModal: false })}
            likes={feedItemLikes}
            onVerify={this.onVerify}
          />
        )}
        {showVerify && <VerifyModal onClose={() => this.setState({ showVerify: false })} feedItem={verifiableItem} />}
      </React.Fragment>
    );
  }
}

export const Thread = (props) => (
  <React.Fragment>
    <ThreadCmp {...props} />
  </React.Fragment>
);

const ModalContainer = styled.div`
  max-height: 90vh;
  overflow-y: scroll;
`;

export class ModalThread extends Component {
  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <FixedModal onClose={this.onClose}>
        <ModalContainer>
          <ThreadCmp {...this.props} />
        </ModalContainer>
      </FixedModal>
    );
  }
}
