import React from 'react';
import { createPortal } from 'react-dom';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.classList.add('cp-modal');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
      window.addEventListener('touchstart', this.onWindowClick);
    }, 100);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick);
  }

  closeModal = () => {
    this.props.onClose();
  };

  onWindowClick = event => {
    if (event.target !== this.el && !this.el.contains(event.target)) {
      this.closeModal();
    }
  };

  render() {
    return createPortal(this.props.children, this.el);
  }
}
