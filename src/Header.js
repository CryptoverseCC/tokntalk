import React from 'react';
import styled from 'styled-components';

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
import { SidebarToggler } from './Sidebar';

const StyledHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0 2rem;
  box-shadow: 0 0.6rem 1rem -0.3rem rgba(27, 36, 55, 0.04);

  @media (max-width: 770px) {
    padding: 0 10px;
  }
`;

const HeaderContainer = styled.div`
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
`;

const TitleLink = styled(Link)`
  margin-left: 5px;
  color: #1b2437;
  @media (max-width: 770px) {
    display: none;
  }
`;

const CrossLink = styled(Link)`
  margin-left: 10px;
  font-weight: 600;
  font-size: 0.8rem;
  padding-left: 10px;
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
        <SidebarToggler />
        <Link to="/">
          <Logo />
        </Link>
        <LinkDropdown />
        <LinkContainer>
          <TitleLink to="/">
            Tok
            <span style={{ color: '#78818c' }}>n</span>
            talk
          </TitleLink>
          <CrossLink to="/about">About</CrossLink>
          <CrossLink to="/clubs">Explore clubs</CrossLink>
        </LinkContainer>
        <IfActiveEntity then={() => <AvatarSwitcher />} other={<Status />} />
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
  align-items: center;
  background-color: white;
  border-radius: 10%;
  border: 0;
  box-shadow: 0 0.2rem 1.5rem -0.2rem rgba(118, 103, 170, 0.4);
  color: rgb(98, 60, 234);
  display: flex;
  font-size: 20px;
  justify-content: center;
  pading: 10px;
  z-index: 1;
  margin-left: 15px;

  @media (max-width: 770px) {
    align-items: center;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0.2rem 1.5rem -0.2rem rgba(118, 103, 170, 0.4);
    color: rgb(98, 60, 234);
    display: flex;
    font-size: 20px;
    height: 30px;
    justify-content: center;
    width: 30px;
    z-index: 1;
    margin-left: 5px;
    margin-right: 5px;
  }
`;
const stopPropagation = (e) => e.stopPropagation();

const AvatarSwitcherToggle = ({ openDropdown }) => {
  return (
    <ToggleButton onClick={openDropdown}>
      <span
        style={{
          fontSize: '0.8rem',
          position: 'relative',
          fontWeight: '600',
          padding: '5px',
          color: '#264dd9',
        }}
      >
        <HiddenOnMobile>Switch</HiddenOnMobile>
        &nbsp;▾
      </span>
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

const AvatarSwitcherContent = styled.ul`
  box-shadow: 0 10px 30px rgba(6, 3, 16, 0.06);
  border-radius: 25px 0 12px 25px;
  padding: 0.5rem;
  max-height: 50vh;
  overflow-y: scroll;
  margin: 0;

  ${niceScroll};
`;

const HiddenOnMobile = styled.span`
  @media (max-width: 770px) {
    display: none;
  }
`;

const Avatar = styled.span`
  margin-right: 10px;

  @media (max-width: 770px) {
    margin-right: 5px;
  }
`;

const AvatarSwitcher = () => {
  return (
    <div
      style={{
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar>Avatar:</Avatar>
      <LinkedActiveEntityAvatar size="verySmall" style={{ marginRight: '10px' }} />
      <HiddenOnMobile>
        <LinkedActiveEntityName style={{ fontFamily: 'AvenirNext', fontSize: '0.8rem', fontWeight: '600' }} />
      </HiddenOnMobile>
      <Dropdown
        Content={AvatarSwitcherContent}
        toggle={({ openDropdown }) => <AvatarSwitcherToggle openDropdown={openDropdown} />}
        position="right"
      >
        {({ closeDropdown }) => (
          <Entities>
            {({ entities, changeActiveEntityTo }) =>
              entities.map((entity) => {
                const { id, ...entityInfo } = entity;
                return (
                  <li className="dropdown-item" style={{ padding: '5px 0', minWidth: '15rem' }} key={entity.id}>
                    <PickEntity
                      onClick={() => {
                        changeActiveEntityTo(entity);
                        closeDropdown();
                      }}
                    >
                      <EntityAvatar id={id} entityInfo={entityInfo} size="small" lazy={false} />
                      <b style={{ marginLeft: '5px', fontSize: '0.9rem' }}>{entity.name}</b>
                    </PickEntity>
                  </li>
                );
              })
            }
          </Entities>
        )}
      </Dropdown>
    </div>
  );
};

const DropdownLink = styled(CrossLink)`
  padding: 3px;
  margin: 0;
  color: #264dd9;
  font-weight: 600;
`;

const LinkDropdownContainer = styled.div`
  margin-left: 5px;
  display: none;
  @media (max-width: 770px) {
    display: flex;
  }
`;

const LinkDropdown = () => (
  <LinkDropdownContainer>
    <React.Fragment>
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
