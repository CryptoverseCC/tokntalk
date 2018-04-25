import React from 'react';
import Link, { A } from './Link';
import styled from 'styled-components';
import { ActiveEntityAvatar, ActiveEntityName, IfActiveEntity, Entities, EntityAvatar, EntityName } from './Entity';
import TranslationsContext from './Translations';
import Locked from './img/locked.svg';
import NoMetamask from './img/no.svg';
import NoIdentity from './img/noidentity.svg';
import Context from './Context';
import Logo from './Logo';

const StyledHeader = styled.div`
  background-color: #f9fbfd;
  border-bottom: 1px solid #e8e8f1;
  font-family: Rubik;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0;
  position: sticky;
  width: 100%;
  z-index: 999;
  height: 65px;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

const TitleLink = styled(Link)`
  margin-left: 1rem;
`;

const CrossLink = styled(A)`
  margin-left: 1rem;
  color: gray;
`;

const ButtonCrossLink = styled(CrossLink)`
  display: inline-block;
  padding: 5px 10px;
  background-color: rgba(246, 244, 255, 0.7);
  color: #623cea;
  border-radius: 3px;

  &:hover {
    background-color: #623cea;
    color: white !important;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <TitleLink to="/">{process.env.REACT_APP_NAME}</TitleLink>
      <CrossLink href="https://userfeeds.github.io/cryptobeep">Beep</CrossLink>
      <CrossLink href="https://userfeeds.github.io/cryptomoji">Moji</CrossLink>
      <CrossLink href="https://userfeeds.github.io/robohash-book">Hash</CrossLink>
      <ButtonCrossLink href="https://github.com/userfeeds/cryptopurr">Fork it</ButtonCrossLink>
      <IfActiveEntity then={() => <CatDropdown />} other={<ErrorStatus />} />
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

const PickEntity = styled.button`
  border: none;
  background: none;
  outline: none;
  margin: 0;
  padding: 0.375rem 1rem;
  width: 100%;
  border-radius: 33px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f4f1ff;
    color: #623cea;
  }
`;

const CatDropdown = () => {
  return (
    <div style={{ marginLeft: 'auto' }}>
      <Dropdown toggle={({ openDropdown }) => <CatDropdownToggle openDropdown={openDropdown} />}>
        {({ closeDropdown }) => (
          <Entities>
            {({ entities, changeActiveEntityTo }) =>
              entities.map(entity => (
                <li className="dropdown-item" style={{ padding: 0 }} key={entity.id}>
                  <PickEntity
                    onClick={() => {
                      changeActiveEntityTo(entity);
                      closeDropdown();
                    }}
                  >
                    <EntityAvatar id={entity.id} size="small" lazy={false} />
                    <b style={{ marginLeft: '5px' }}>
                      <EntityName id={entity.id} />
                    </b>
                  </PickEntity>
                </li>
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
  <ErrorContainer>
    <img src={NoMetamask} alt="No metamask" />
    No Metamask
  </ErrorContainer>
);

const MetamaskLockedStatus = () => (
  <ErrorContainer>
    <img src={Locked} alt="Metamask locked" />
    Metamask locked
  </ErrorContainer>
);

const NoIdentitiesStatus = () => (
  <ErrorContainer>
    <img src={NoIdentity} style={{ marginRight: '10px' }} alt="No Identities found" />
    <TranslationsContext.Consumer>{({ noEntitiesError }) => noEntitiesError}</TranslationsContext.Consumer>
  </ErrorContainer>
);

const ErrorContainer = styled.div`
  margin-left: auto;
  color: #fc0035;
  text-shadow: 0 0 10px rgba(252, 0, 53, 0.3);
  display: flex;
  align-items: center;
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
