import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { A } from './Link';
import Intercom from './Intercom';
import { H4 } from './Components';
import { IfActiveEntity, EntityClubs } from './Entity';
import { DiscoverIcon } from './Icons';
import { TokenImage } from './clubs';
import { UnreadedCount } from './UnreadedMessages';

import menuIcon from './img/menu.png';
import { niceScroll } from './cssUtils';

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
        <IfActiveEntity>
          {(entityId) => (
            <React.Fragment>
              <H4 style={{ padding: '5px 10px' }}>Your Clubs</H4>
              <ClubContainer>
                <EntityClubs id={entityId}>
                  {(clubs) => clubs.map((club) => <Club key={club.address} token={club} />)}
                </EntityClubs>
              </ClubContainer>
            </React.Fragment>
          )}
        </IfActiveEntity>
        <SidebarFooter />
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

const ClubContainer = styled.div`
  overflow-y: scroll;
  ${niceScroll};
`;

const Club = ({ token }) => (
  <LinkItem
    to={token.isCustom ? `/clubs/${token.network}:${token.address}` : `/clubs/${token.symbol}`}
    icon={<TokenImage token={token} />}
  >
    {token.name}
    <StyledUnreadedMessages token={token} />
  </LinkItem>
);

const SidebarFooter = styled(({ className }) => (
  <div className={className}>
    <div>
      <A href="https://t.me/userfeeds" style={{ marginRight: '8px' }}>
        Telegram
      </A>
      <A href="https://twitter.com/tokntalkclub">Twitter</A>
    </div>
    <Intercom />
  </div>
))`
  margin-top: auto;
  padding: 10px;
`;

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
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  background-color: #edf1f8;
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  min-width: 200px;
  margin-right: 1.5rem;
`;
