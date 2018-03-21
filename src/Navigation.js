import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ myCats, activeCat }) => (
  <nav className="navigation">
    <div className="container">
      <div className="columns" style={{ alignItems: 'center' }}>
        <div className="column is-2">
          <Link to="/">
            <h3 className="logo">Purrbook</h3>
          </Link>
        </div>
        <div className="column is-10 has-text-right">
          <Dropdown>
            {closeDropdown =>
              myCats.map(cat => (
                <DropdownItem key={cat.token} to={cat.token} closeDropdown={closeDropdown}>
                  Kitty {cat.token}
                </DropdownItem>
              ))
            }
          </Dropdown>
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
          <button className="button" onClick={e => this.openDropdown(e)}>
            <span>Your kitties</span>
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
  <Link to={`/${to}`} className="dropdown-item" onClick={closeDropdown}>
    {children}
  </Link>
);

export default Navigation;
