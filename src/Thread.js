import React, { Component } from 'react';

import { FixedModal } from './Modal';
import { Card, LikersModal } from './Feed';
import Loader from './Loader';
import Context from './Context';
import { HeaderSpacer } from './Header';

export class Thread extends Component {
  state = {
    showModal: false,
    feedItemLikes: [],
  };

  componentDidMount() {
    this.props.getFeedItem(this.props.match.params.claimId);
  }

  onShowLikers = (feedItem, reactions) => {
    this.setState({ showModal: true, feedItemLikes: reactions });
  };

  render() {
    const { showModal, feedItemLikes } = this.state;

    return (
      <React.Fragment>
        <HeaderSpacer />
        <Context.Consumer>
          {({ feedStore: { feedItemLoading, feedItem } }) =>
            !!feedItem || (!feedItemLoading && !!feedItem) ? (
              <Card
                feedItem={feedItem}
                replies={feedItem.replies}
                reactions={feedItem.likes}
                style={{ background: '#ffffff' }}
                onShowLikers={this.onShowLikers}
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
        {showModal && <LikersModal onClose={() => this.setState({ showModal: false })} likes={feedItemLikes} />}
      </React.Fragment>
    );
  }
}

export class ModalThread extends Component {
  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <FixedModal onClose={this.onClose}>
        <Thread {...this.props} />
      </FixedModal>
    );
  }
}
