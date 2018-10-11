import React, { Component } from 'react';
import styled from 'styled-components';
import transition from 'styled-transition-group';

export default class Modal extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
      window.addEventListener('touchstart', this.onWindowClick, { passive: true });
    }, 100);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick, { passive: true });
  }

  closeModal = () => {
    this.props.onClose();
  };

  onWindowClick = (event) => {
    if (event.target !== this.el && !this.el.contains(event.target)) {
      this.closeModal();
    }
  };
  render() {
    return (
      <div ref={(el) => (this.el = el)} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

const FixedModalContent = styled.div`
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
    transition: opacity 150ms ease-in;

  }

  &:exit-active {
    opacity: 0.01;
    transition: opacity 150ms ease-out;
  }

  &:exit {
    opacity: 1;
  }
`;

export class FixedModal extends Component {
  state = {
    show: false,
  };

  componentDidMount() {
    this.setState({ show: true });
  }

  onClose = (e) => {
    e.stopPropagation();
    this.setState({ show: false }, () => setTimeout(this.props.onClose, 150));
  };

  stopPropagatio = (e) => e.stopPropagation();

  render() {
    const { show } = this.state;
    const { children } = this.props;

    return (
      <Overlay timeout={150} in={show} onClick={this.onClose}>
        <FixedModalContent onClick={this.stopPropagatio}>
          <Fade timeout={150} in={show}>
            {children}
          </Fade>
        </FixedModalContent>
      </Overlay>
    );
  }
}
