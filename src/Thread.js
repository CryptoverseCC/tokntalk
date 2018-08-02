import React, { Component } from 'react';
import styled from 'styled-components';
import transition from 'styled-transition-group';

import Modal from './Modal';
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

const FixedModal = styled(Modal)`
  min-width: 400px;
`;

const Overlay = transition.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 100vh;
  left: 0;
  width: 100vw;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);

  &:enter {
    background: rgba(0, 0, 0, 0.0);
  }

  &:enter-active {
    background: rgba(0, 0, 0, 0.6);
    transition: background-color 300ms linear;
  }

  &:exit-active {
    background: rgba(0, 0, 0, 0.0);
    transition: background 300ms linear;
  }

  &:exit {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const Fade = transition.div`
  &:enter {
    opacity: 0.01;
  }

  &:enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;

  }

  &:exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-out;
  }

  &:exit {
    opacity: 1;
  }
`;

export class ModalThread extends Component {
  state = {
    show: false,
  };

  componentDidMount() {
    this.setState({ show: true });
  }

  onClose = () => {
    this.setState({ show: false }, () => setTimeout(() => this.props.history.goBack(), 300));
  };

  render() {
    const { show } = this.state;

    return (
      <Overlay timeout={300} in={show}>
        <FixedModal onClose={this.onClose}>
          <Fade timeout={300} in={show}>
            <Thread {...this.props} />
          </Fade>
        </FixedModal>
      </Overlay>
    );
  }
}
