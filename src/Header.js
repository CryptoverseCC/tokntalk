import React from 'react';
import styled from 'styled-components';

import Link from './Link';
import NetworkWarning from './NetworkWarning';
import { ActiveEntityAvatar, ActiveEntityName, IfActiveEntity, Entities, EntityName, EntityAvatar } from './Entity';
import TranslationsContext from './Translations';
import Locked from './img/locked.svg';
import NoMetamask from './img/no.svg';
import NoIdentity from './img/noidentity.svg';
import Context from './Context';
import Logo from './Logo';
import Dropdown from './Dropdown';

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
  @media (max-width: 770px) {
    display: none;
  }
`;

const CrossLink = styled(Link)`
  margin-left: 1rem;
  color: gray;
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
  margin-top:-3px;
  padding: 5px 10px;
  background-color: ${({ http }) => (http ? '#f4f6ff' : '#fdcf0b')};
  border: none;
  font-weight:600;
  font-size:0.9rem;
  border-radius: 3px;
  outline:0;
  color: ${({ http }) => (http ? '#808080' : '#2f343a')};
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
          <CrossLink to="/discover">Discover</CrossLink>
        </LinkContainer>
        <Context.Consumer>
          {({ appStore: { http, toggleHttpClaims } }) => (
            <ToggleHttpButton http={http} onClick={toggleHttpClaims}>
              {http ? 'Off Chain' : 'On Chain'}
            </ToggleHttpButton>
          )}
        </Context.Consumer>
        <IfActiveEntity then={() => <CatDropdown />} other={<ErrorStatus />} />
      </StyledHeader>
    </HeaderContainer>
  );
};

export default Header;

const DropdownEntityName = styled.div`
  margin-left: 12px;
  font-size:0.9rem;
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
      box-shadow: 0 1px 4px 1px rgba(98, 60, 234, 0.2);
      z-index: 1;
      content: '▾';
      display: flex;
      width: 20px;
      height: 20px;
      font-size: 12px;
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

const CatDropdownToggle = ({ openDropdown }) => {
  return (
    <ToggleButton className="level" onClick={openDropdown}>
      <ActiveEntityAvatar size="small" />
      <DropdownEntityName>
        <b>
          <ActiveEntityName />
        </b>
        <span
          style={{
            display: 'inline-flex',
            fontSize: '1.6rem',
            position: 'relative',
            top: '-2px',
            lineHeight: '1px',
            marginLeft: '7px',
          }}
        >
          ⌄
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

const CatDropdownContent = styled.ul`
  box-shadow: 0 10px 30px rgba(6, 3, 16, 0.06);
  border-radius: 25px 0 12px 25px;
  padding: 0.5rem;
  max-height: 50vh;
  overflow-y: scroll;
  margin: 0;
  ::-webkit-scrollbar {
      width: 10px;
  }
   
  ::-webkit-scrollbar-track {
      border-radius: 10px;
  }
   
  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color:#DDE0EB; }
`;

const CatDropdown = () => {
  return (
    <div style={{ marginLeft: 'auto' }}>
      <Dropdown
        Content={CatDropdownContent}
        toggle={({ openDropdown }) => <CatDropdownToggle openDropdown={openDropdown} />}
        position="right"
      >
        {({ closeDropdown }) => (
          <Entities>
            {({ entities, changeActiveEntityTo }) =>
              entities.map((entity) => (
                <li className="dropdown-item" style={{ padding: '5px 0', minWidth: '15rem' }} key={entity.id}>
                  <PickEntity
                    onClick={() => {
                      changeActiveEntityTo(entity);
                      closeDropdown();
                    }}
                  >
                    <EntityAvatar id={entity.id} size="small" lazy={false} />
                    <b style={{ marginLeft: '5px', fontSize:'0.9rem' }}>
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

const DropdownLink = styled(CrossLink)`
  padding: 10px;
  margin: 0;
  min-width: 5rem;
`;

const LinkDropdownContent = styled.ul`
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(6, 3, 16, 0.06);
  border-radius: 12px;
  margin: 0;
  padding: 0.5rem;
  max-height: 50vh;
  overflow-y: scroll;
`;

const LinkDropdownContainer = styled.div`
  margin-left: 10px;
  display: none;
  @media (max-width: 770px) {
    display: flex;
  }
`;

const LinkDropdownToggle = styled.button`
  font-size: 0.9rem;
  background: none;
  border: none;
  outline: none;
  font-family: Rubik;
`;

const LinkDropdown = () => (
  <LinkDropdownContainer>
    <Dropdown
      Content={LinkDropdownContent}
      toggle={({ openDropdown }) => (
        <LinkDropdownToggle onClick={openDropdown}>
          More <span style={{ position: 'relative', top: '-2px' }}>⌄</span>
        </LinkDropdownToggle>
      )}
      position="left"
    >
      {() => (
        <React.Fragment>
          <DropdownLink to="/discover">Discover</DropdownLink>
        </React.Fragment>
      )}
    </Dropdown>
  </LinkDropdownContainer>
);

const Error = styled.span`
  color: #fc0035;
  text-shadow: 0 0 10px rgba(252, 0, 53, 0.3);
  @media (max-width: 770px) {
    display: none;
  }
`;

const NoMetamaskStatus = () => (
  <ErrorContainer>
    <img src={NoMetamask} alt="No metamask" />
    <Error>No Metamask</Error>
  </ErrorContainer>
);

const MetamaskLockedStatus = () => (
  <ErrorContainer>
    <img src={Locked} alt="Metamask locked" />
    <Error>Metamask locked</Error>
  </ErrorContainer>
);

const NoIdentitiesStatus = () => (
  <ErrorContainer>
    <img src={NoIdentity} style={{ marginRight: '10px' }} alt="No Identities found" />
    <Error>
      <TranslationsContext.Consumer>{({ noEntitiesError }) => noEntitiesError}</TranslationsContext.Consumer>
    </Error>
  </ErrorContainer>
);

const ErrorContainer = styled.div`
  margin-left: auto;
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
