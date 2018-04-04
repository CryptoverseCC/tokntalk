import React from 'react';
import { Link } from "react-router-dom";
import { ActiveEntityAvatar, ActiveEntityName, IfActiveCat, Entities, EntityAvatar, EntityName } from './Entity';

const Header = () => {
  return (
    <div
      className="level"
      style={{
        backgroundColor: '#f9fbfd',
        borderBottom: '1px solid #e8e8f1',
        fontFamily: 'Rubik',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: 0,
        position: 'fixed',
        width: '100%',
        zIndex: '999',
        height: '65px',
        top: 0
      }}
    >
      <div className="container is-fluid level-item level columns">
        <Link to="/cryptopurr" className="level-item column is-column-4 is-offset-4 has-text-centered">
          <h1
            style={{ color: '#1B2437', fontWeight: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}
          >
            Purrbook
          </h1>
        </Link>
        <IfActiveCat then={<CatDropdown />} other={<ErrorStatus message="No cats found" />} />
      </div>
    </div>
  );
};

export default Header;

const CatDropdownToggle = ({ openDropdown }) => {
  return (
    <button
      className="level"
      onClick={openDropdown}
      style={{ border: 'none', background: 'none', outline: 'none', cursor: 'pointer', marginLeft: 'auto' }}
    >
      <ActiveEntityAvatar size="small" />
      <div style={{ marginLeft: '12px' }}>
        <b>
          <ActiveEntityName />
        </b>
        <span
          style={{
            display: 'inline-flex',
            fontSize: '25px',
            position: 'relative',
            top: '-2px',
            lineHeight: '1px',
            marginLeft: '7px'
          }}
        >
          ⌄
        </span>
      </div>
    </button>
  );
};

const CatDropdown = () => {
  return (
    <div className="has-text-right column" style={{ color: '#1B2437' }}>
      <Dropdown toggle={({ openDropdown }) => <CatDropdownToggle openDropdown={openDropdown} />}>
        {({ closeDropdown }) => (
          <Entities>
            {({ entities, changeActiveEntityTo }) =>
              entities.map(entity => (
                <button
                  key={entity.id}
                  className="dropdown-item cp-dropdown-item"
                  onClick={() => {
                    changeActiveEntityTo(entity.id);
                    closeDropdown();
                  }}
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    margin: 0,
                    width: '100%',
                    borderRadius: '33px',
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <EntityAvatar id={entity.id} size="small" lazy={false} />
                    <b style={{ marginLeft: '5px' }}>
                      <EntityName id={entity.id} />
                    </b>
                  </div>
                </button>
              ))
            }
          </Entities>
        )}
      </Dropdown>
    </div>
  );
};

class Dropdown extends React.Component {
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
        <div className="dropdown-trigger">{this.props.toggle({ openDropdown: this.openDropdown })}</div>
        <div
          className="dropdown-menu"
          ref={dropdown => (this.dropdownElement = dropdown)}
          style={{ left: 'auto', right: 0 }}
        >
          <div
            className="dropdown-content"
            style={{ boxShadow: '0 10px 30px rgba(6,3,16,0.06)', borderRadius: '25px 0 12px 25px', padding: '0.5rem' }}
          >
            {this.props.children({ closeDropdown: this.closeDropdown })}
          </div>
        </div>
      </div>
    );
  }
}

export const ErrorStatus = ({ message }) => (
  <div
    className="level-right has-text-right column"
    style={{ color: '#FC0035', textShadow: '0 0 10px rgba(252,0,53,0.3)' }}
  >
    {message}
  </div>
);
