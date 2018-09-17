import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { H4 } from './Components';
import { IfActiveEntity, EntityClubs } from './Entity';
import { DiscoverIcon } from './Icons';
import { TokenImage } from './clubs';
import { UnreadedCount } from './UnreadedMessages';

import menuIcon from './img/menu.png';

const SidebarContext = React.createContext();

export class SidebarProvider extends Component {
  state = { open: true }; // Read from LS

  toogle = () => this.setState(({ open }) => ({ open: !open }));

  render() {
    const { children } = this.props;
    const { open } = this.state;

    return <SidebarContext.Provider value={{ open, toogle: this.toogle }}>{children}</SidebarContext.Provider>;
  }
}

export const SidebarToggler = () => (
  <SidebarContext.Consumer>
    {({ toogle }) => <img src={menuIcon} onClick={toogle} style={{ width: '25px', marginRight: '15px' }} />}
  </SidebarContext.Consumer>
);

export const Sidebar = styled.div`
  display: flex;
`;

export const SidebarLeft = () => (
  <SidebarContext.Consumer>
    {({ open }) => (
      <SidebarLeftContainer open={open}>
        <LinkItem to="/" icon={<img src={menuIcon} />}>
          Feed
        </LinkItem>
        <LinkItem to="/clubs" icon={<DiscoverIcon />}>
          Clubs
        </LinkItem>
        <H4 style={{ padding: '5px 10px' }}>Your Clubs</H4>
        <IfActiveEntity>
          {(entityId) => (
            <EntityClubs id={entityId}>
              {(clubs) => clubs.map((club) => <Token key={club.address} token={club} />)}
            </EntityClubs>
          )}
        </IfActiveEntity>
      </SidebarLeftContainer>
    )}
  </SidebarContext.Consumer>
);

export const SidebarRight = styled(({ className, children }) => (
  <div className={className}>
    <div className="inner">{children}</div>
  </div>
))`
  flex: 1;
  margin-top: 30px;

  .inner {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledUnreadedMessages = styled(UnreadedCount)`
  color: #1b2437;
  background: white;
`;

const Token = ({ token }) => (
  <LinkItem
    to={token.isCustom ? `/clubs/${token.network}:${token.address}` : `/clubs/${token.symbol}`}
    icon={<TokenImage token={token} />}
  >
    {token.name}
    <StyledUnreadedMessages token={token} />
  </LinkItem>
);

const LinkItem = styled(({ children, icon, ...props }) => (
  <NavLink {...props} exact activeClassName="selected">
    <span style={{ marginRight: '15px' }}>{icon}</span>
    {children}
  </NavLink>
))`
  display: block;
  padding: 5px 10px;

  &.selected {
    background: #f5f8fd;
  }

  :hover {
    background: #fefffd;
  }

  & img,
  & svg {
    width: 22px;
    height: 22px;
  }
`;

const SidebarLeftContainer = styled.div`
  padding: 15px 0;
  display: ${({ open }) => (open ? 'block' : 'none')};
  background-color: #edf1f8;
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  min-width: 200px;
  margin-right: 1.5rem;
`;
