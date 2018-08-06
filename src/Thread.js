import React, { Component } from 'react';

import { FixedModal } from './Modal';
import { Card } from './Feed';
import Loader from './Loader';
import Context from './Context';
import { HeaderSpacer } from './Header';

export class Thread extends Component {
  componentDidMount() {
    this.props.getFeedItem(this.props.match.params.claimId);
  }

  render() {
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
