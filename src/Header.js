import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ActiveEntityAvatar, ActiveEntityName, IfActiveEntity, Entities, EntityAvatar, EntityName } from './Entity';
import TranslationsContext from './Translations';
import Locked from './img/locked.svg';
import NoMetamask from './img/no.svg';
import NoIdentity from './img/noidentity.svg';
import Context from './Context';

const StyledHeader = styled.div`
  background-color: #f9fbfd;
  border-bottom: 1px solid #e8e8f1;
  font-family: Rubik;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0;
  position: fixed;
  width: 100%;
  z-index: 999;
  height: 65px;
  top: 0;
`;

const Title = styled.h1`
  color: #1b2437;
  font-weight: inherit;
  font-size: inherit;
  line-height: inherit;
`;

const Header = () => {
  return (
    <StyledHeader className="level">
      <div className="container is-fluid level-item columns">
        <Link to="/" className="level-item column is-column-4 is-offset-4 has-text-centered">
          <Title>{process.env.REACT_APP_NAME}</Title>
        </Link>
        <IfActiveEntity then={() => <CatDropdown />} other={<ErrorStatus />} />
      </div>
    </StyledHeader>
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

const NoMetamaskStatus = () => (
  <StyledErrorContainer>
    <img src={NoMetamask} alt="No metamask" />
    No Metamask
  </StyledErrorContainer>
);

const MetamaskLockedStatus = () => (
  <StyledErrorContainer>
    <img src={Locked} alt="Metamask locked" />
    Metamask locked
  </StyledErrorContainer>
);

const NoIdentitiesStatus = () => (
  <StyledErrorContainer>
    <img src={NoIdentity} style={{ marginRight: '10px' }} alt="No Identities found"/>
    <TranslationsContext.Consumer>{({ noEntitiesError }) => noEntitiesError}</TranslationsContext.Consumer>
  </StyledErrorContainer>
);

const ErrorContainer = ({ children, className }) => {
  return <div className={`${className} level-right has-text-right column`}>{children}</div>;
};

const StyledErrorContainer = styled(ErrorContainer)`
  color: #fc0035;
  text-shadow: 0 0 10px rgba(252, 0, 53, 0.3);
  display: flex;
`;

const ErrorStatus = () => {
  const renderStatus = (provider, from) => {
    if (!provider) {
      return <NoMetamaskStatus />;
    } else if (!from) {
      return <MetamaskLockedStatus />;
    } else {
      return <NoIdentitiesStatus />;
    }
  };
  return <Context.Consumer>{({ web3Store: { provider, from } }) => renderStatus(provider, from)}</Context.Consumer>;
};
