import React, { Component } from 'react';
import styled from 'styled-components';
import List from 'react-virtualized/dist/commonjs/List';

import Link from './Link';
import NetworkWarning from './NetworkWarning';
import { IfActiveEntity, Entities, EntityAvatar, LinkedActiveEntityAvatar, LinkedActiveEntityName } from './Entity';
import TranslationsContext from './Translations';
import Locked from './img/locked.svg';
import NoMetamask from './img/no.svg';
import NoIdentity from './img/noidentity.svg';
import Context from './Context';
import Logo from './Logo';
import Dropdown from './Dropdown';
import { niceScroll } from './cssUtils';

export const HeaderSpacer = styled.div`
  height: 65px;
  width: 100vw;
`;

const StyledHeader = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 0 0 30px 30px;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0 2rem;
  box-shadow: 0 0.6rem 1rem -0.3rem rgba(27, 36, 55, 0.04);
`;

const HeaderContainer = styled.div`
  position: fixed;
  width: 1280px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;

  @media (max-width: 770px) {
    padding: 0 0.75rem;
  }

  @media (max-width: 1280px) {
    width: 100%;
  }
`;

const TitleLink = styled(Link)`
  margin-left: 1rem;
  color: #1b2437;
  @media (max-width: 770px) {
    display: none;
  }
`;

const CrossLink = styled(Link)`
  margin-left: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  padding-left: 10px;
  border-left: 1px solid #dce0eb;
`;

const LinkContainer = styled.ul`
  display: flex;
  align-items: center;
  @media (max-width: 770px) {
    display: none;
  }
`;

const ToggleHttpButton = styled.button`
  margin-left: 10px;
  margin-top: -3px;
  padding: 5px 10px;
  background-color: ${({ http }) => (http ? '#ecf1f9' : '#fdcf0b')};
  border: none;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 3px;
  outline: 0;
  color: ${({ http }) => (http ? '#8c91a2' : '#2f343a')};
`;

const Header = () => {
  return (
    <HeaderContainer>
      <NetworkWarning />
      <StyledHeader>
        <Link to="/">
          <Logo />
        </Link>
        <LinkDropdown />
        <LinkContainer>
          <TitleLink to="/">{process.env.REACT_APP_NAME}</TitleLink>
          <CrossLink to="/about">About</CrossLink>
          <CrossLink to="/clubs">Token Communities</CrossLink>
        </LinkContainer>
        <Context.Consumer>
          {({ appStore: { http, toggleHttpClaims } }) => (
            <ToggleHttpButton http={http} onClick={toggleHttpClaims}>
              {http ? 'Off Chain' : 'On Chain'}
            </ToggleHttpButton>
          )}
        </Context.Consumer>
        <IfActiveEntity
          then={() => (
            <Entities>
              {({ entities, changeActiveEntityTo }) => (
                <CatDropdown entities={entities} changeActiveEntityTo={changeActiveEntityTo} />
              )}
            </Entities>
          )}
          other={<Status />}
        />
      </StyledHeader>
    </HeaderContainer>
  );
};

export default Header;

const DropdownEntityName = styled.div`
  margin-left: 12px;
  font-size: 0.9rem;
  @media (max-width: 770px) {
    display: none;
  }
`;

const ToggleButton = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  margin-left: auto;
  position: relative;

  @media (max-width: 770px) {
    &:before {
      border-radius: 50%;
      background-color: white;
      box-shadow: 0 0.2rem 1.5rem -0.2rem rgba(118, 103, 170, 0.4);
      z-index: 1;
      content: '▾';
      display: flex;
      width: 30px;
      height: 30px;
      font-size: 20px;
      color: rgb(98, 60, 234);
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      align-items: center;
      justify-content: center;
    }
  }
`;
const stopPropagation = (e) => e.stopPropagation();

const CatDropdownToggle = ({ openDropdown }) => {
  return (
    <ToggleButton className="level" onClick={openDropdown}>
      <span onClick={stopPropagation}>
        <LinkedActiveEntityAvatar size="small" />
      </span>
      <DropdownEntityName style={{ fontFamily: 'AvenirNext', fontSize: '0.9rem', fontWeight: '600' }}>
        <span onClick={stopPropagation}>
          <LinkedActiveEntityName style={{ fontFamily: 'AvenirNext', fontSize: '0.9rem', fontWeight: '600' }} />
        </span>
        <span
          style={{
            display: 'inline-flex',
            fontSize: '0.8rem',
            position: 'relative',
            fontWeight: '600',
            padding: '1.2em 0.6em 1em 0.6em',
            color: '#264dd9',
            backgroundColor: '#ebefff',
            borderRadius: '20px',
            lineHeight: '1px',
            marginLeft: '7px',
          }}
        >
          Switch 🔽
        </span>
      </DropdownEntityName>
    </ToggleButton>
  );
};

const PickEntity = styled.button`
  border: none;
  background: none;
  outline: none;
  margin: 0;
  padding: 0.375rem 0.75rem;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #ebefff;
    color: #2850d9;
  }
`;

const CatDropdownContent = styled.div`
  box-shadow: 0 10px 30px rgba(6, 3, 16, 0.06);
  border-radius: 25px 0 12px 25px;
  padding: 0.5rem;
  max-height: 50vh;
  margin: 0;
`;

const CatDropdownList = styled(List)`
  ${niceScroll};
`;

class CatDropdown extends Component {
  render() {
    const entities = this.props.entities;
    return (
      <div style={{ marginLeft: 'auto' }}>
        <Dropdown
          Content={CatDropdownContent}
          toggle={({ openDropdown }) => <CatDropdownToggle openDropdown={openDropdown} />}
          position="right"
        >
          {({ closeDropdown }) => (
            <CatDropdownList
              height={300}
              width={240}
              rowHeight={74}
              rowCount={entities.length}
              rowRenderer={this.renderCatDropdownEntity(closeDropdown)}
            />
          )}
        </Dropdown>
      </div>
    );
  }

  renderCatDropdownEntity = (closeDropdown) => ({ index, key, style }) => {
    const entity = this.props.entities[index];
    return (
      <div key={key} className="dropdown-item" style={{ padding: '5px 0', minWidth: '15rem', ...style }}>
        <PickEntity
          onClick={() => {
            this.props.changeActiveEntityTo(entity);
            closeDropdown();
          }}
        >
          <EntityAvatar id={entity.id} entityInfo={entity.entityInfo} size="small" lazy={false} />
          <b style={{ marginLeft: '5px', fontSize: '0.9rem' }}>{entity.name}</b>
        </PickEntity>
      </div>
    );
  };
}

const DropdownLink = styled(CrossLink)`
  padding: 10px;
  margin: 0;
  min-width: 5rem;
  color: #264dd9;
  font-weight: 600;
`;

const LinkDropdownContainer = styled.div`
  margin-left: 10px;
  display: none;
  @media (max-width: 770px) {
    display: flex;
  }
`;

const LinkDropdown = () => (
  <LinkDropdownContainer>
    <React.Fragment>
      <DropdownLink to="/about">About</DropdownLink>
      <DropdownLink to="/clubs">Clubs</DropdownLink>
    </React.Fragment>
  </LinkDropdownContainer>
);

const Error = styled.span`
  color: #fc0035;
  text-shadow: 0 0 10px rgba(252, 0, 53, 0.3);
  @media (max-width: 770px) {
    display: none;
  }
`;

const Loading = styled.span`
  color: blue;
  @media (max-width: 770px) {
    display: none;
  }
`;

const LoadingStatus = () => (
  <MessageContainer>
    <Loading>Loading...</Loading>
  </MessageContainer>
);

const NoMetamaskStatus = () => (
  <MessageContainer>
    <img src={NoMetamask} alt="No metamask" />
    <Error>No Metamask</Error>
  </MessageContainer>
);

const MetamaskLockedStatus = () => (
  <MessageContainer>
    <img src={Locked} alt="Metamask locked" />
    <Error>Metamask locked</Error>
  </MessageContainer>
);

const NoIdentitiesStatus = () => (
  <MessageContainer>
    <img src={NoIdentity} style={{ marginRight: '10px' }} alt="No Identities found" />
    <Error>
      <TranslationsContext.Consumer>{({ noEntitiesError }) => noEntitiesError}</TranslationsContext.Consumer>
    </Error>
  </MessageContainer>
);

const MessageContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const Status = () => {
  const renderStatus = (provider, from) => {
    if (typeof provider === 'undefined') {
      return <LoadingStatus />;
    } else if (typeof provider === 'boolean' && !provider) {
      return <NoMetamaskStatus />;
    } else if (!from) {
      return <MetamaskLockedStatus />;
    } else {
      return <NoIdentitiesStatus />;
    }
  };
  return <Context.Consumer>{({ web3Store: { provider, from } }) => renderStatus(provider, from)}</Context.Consumer>;
};
