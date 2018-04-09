import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from './Context';

const Navigation = () => (
  <nav className="navigation">
    <div className="container">
      <div className="columns" style={{ alignItems: 'center' }}>
        <div className="column is-2">
          <Link to="/cryptopurr">
            <h3 className="logo">Purrbook</h3>
          </Link>
        </div>
        <div className="column is-10 has-text-right">
          <Context.Consumer>
            {({ entityStore: { myEntities } }) => (
              <Dropdown disabled={myEntities.length === 0}>
                {closeDropdown =>
                  myEntities.map(entity => (
                    <DropdownItem key={entity.token} to={entity.token} closeDropdown={closeDropdown}>
                      Kitty {entity.token}
                    </DropdownItem>
                  ))
                }
              </Dropdown>
            )}
          </Context.Consumer>
        </div>
      </div>
    </div>
  </nav>
);

class Dropdown extends Component {
  state = {
    active: false
  };

  componentWillUnmount() {
    this.closeDropdown();
  }

  openDropdown = e => {
    e.stopPropagation();
    this.setState({ active: true }, () => {
      window.addEventListener('click', this.onWindowClick);
      window.addEventListener('touchstart', this.onWindowClick);
    });
  };

  closeDropdown = () => {
    this.setState({ active: false });
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick);
  };

  onWindowClick = event => {
    if (event.target !== this.dropdownElement && !this.dropdownElement.contains(event.target) && this.state.active) {
      this.closeDropdown();
    }
  };

  render() {
    return (
      <div className={`dropdown ${this.state.active ? 'is-active' : ''}`}>
        <div className="dropdown-trigger">
          <button className="button" onClick={e => this.openDropdown(e)} disabled={this.props.disabled}>
            <span>{this.props.disabled ? 'No kitties found 😭' : 'Your kitties'}</span>
          </button>
        </div>
        <div className="dropdown-menu" ref={dropdown => (this.dropdownElement = dropdown)}>
          <div className="dropdown-content">{this.props.children(this.closeDropdown)}</div>
        </div>
      </div>
    );
  }
}

const DropdownItem = ({ children, to, closeDropdown }) => (
  <Link to={`/cryptopurr/${to}`} className="dropdown-item" onClick={closeDropdown}>
    {children}
  </Link>
);

export default Navigation;
