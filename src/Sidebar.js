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
import { niceScroll } from './cssUtils';
import menuIcon from './img/menu.png';

const SidebarContext = React.createContext();

export class SidebarProvider extends Component {
  state = { open: !this.props.overlay };

  toogle = () => this.setState(({ open }) => ({ open: !open }));

  render() {
    const { children, overlay } = this.props;
    const { open } = this.state;

    return <SidebarContext.Provider value={{ open, overlay, toogle: this.toogle }}>{children}</SidebarContext.Provider>;
  }
}

export const SidebarToggler = () => (
  <SidebarContext.Consumer>
    {({ toogle }) => <img src={menuIcon} onClick={toogle} style={{ width: '25px', marginRight: '15px' }} />}
  </SidebarContext.Consumer>
);

export const SidebarContainer = styled.div`
  display: flex;
  position: relative;
`;

export const SidebarLeft = () => (
  <SidebarContext.Consumer>
    {({ open, overlay }) => (
      <SidebarLeftContainer open={open} overlay={overlay}>
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

export const SidebarRight = ({ children }) => (
  <SidebarContext.Consumer>
    {({ open, overlay }) => (
      <SidebarRightContainer open={open} overlay={overlay}>
        <div className="inner">{children}</div>
        {overlay && open && <div className="overlay" />}
      </SidebarRightContainer>
    )}
  </SidebarContext.Consumer>
);

const SidebarRightContainer = styled.div`
  flex: 1;
  position: relative;
  padding-left: 1.5rem;
  padding-top: 30px;

  .inner {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
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
  position: ${({ overlay }) => (overlay ? 'fixed' : 'sticky')};
  top: 60px;
  z-index: 999;
  height: calc(100vh - 60px);
  min-width: 200px;
`;
