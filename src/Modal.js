import React from 'react';

export default class Modal extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
      window.addEventListener('touchstart', this.onWindowClick);
    }, 100);
  }

  componentWillUnmount() {
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
    return (
      <div ref={el => (this.el = el)} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}
