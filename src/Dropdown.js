import React from 'react';

export default class Dropdown extends React.Component {
  state = {
    active: false,
  };

  componentWillUnmount() {
    this.closeDropdown();
  }

  openDropdown = (e) => {
    e.stopPropagation();
    this.setState({ active: true }, () => {
      window.addEventListener('click', this.onWindowClick);
      window.addEventListener('touchstart', this.onWindowClick, { passive: true });
    });
  };

  closeDropdown = () => {
    this.setState({ active: false });
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick, { passive: true });
  };

  onWindowClick = (event) => {
    if (event.target !== this.dropdownElement && !this.dropdownElement.contains(event.target) && this.state.active) {
      this.closeDropdown();
    }
  };

  get dropdownMenuPosition() {
    return this.props.position === 'left' ? { left: 0, right: 'auto' } : { left: 'auto', right: 0 };
  }

  render() {
    return (
      <div className={`dropdown ${this.state.active ? 'is-active' : ''}`}>
        <div className="dropdown-trigger">{this.props.toggle({ openDropdown: this.openDropdown })}</div>
        <div
          className="dropdown-menu"
          ref={(dropdown) => (this.dropdownElement = dropdown)}
          style={{ ...this.dropdownMenuPosition, minWidth: 'unset' }}
        >
          <this.props.Content className="dropdown-content">
            {this.props.children({ closeDropdown: this.closeDropdown })}
          </this.props.Content>
        </div>
      </div>
    );
  }
}
