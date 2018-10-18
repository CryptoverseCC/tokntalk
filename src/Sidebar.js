import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { A } from './Link';
import Intercom from './Intercom';
import { H4 } from './Components';
import { IfActiveEntity, EntityClubs } from './Entity';
import { TokenImage } from './clubs';
import { UnreadedCount } from './UnreadedMessages';
import { niceScroll } from './cssUtils';
import feedIcon from './img/feeds.svg';
import notificationsIcon from './img/notifications.svg';
import { mobileOrTablet } from './utils';
import Context from './Context';

const SidebarContext = React.createContext();

class SidebarProviderCmp extends Component {
  state = { open: !this.props.overlay && !mobileOrTablet() };

  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname && this.props.overlay && mobileOrTablet()) {
      this.setState({ open: false });
    }
  }

  toggle = () => this.setState(({ open }) => ({ open: !open }));

  render() {
    const { children, overlay } = this.props;
    const { open } = this.state;

    return <SidebarContext.Provider value={{ open, overlay, toggle: this.toggle }}>{children}</SidebarContext.Provider>;
  }
}

export const SidebarProvider = withRouter(SidebarProviderCmp);

export const SidebarToggler = () => (
  <SidebarContext.Consumer>{({ toggle, open }) => <Burger onClick={toggle} open={open} />}</SidebarContext.Consumer>
);

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

export const SidebarContainer = styled.div`
  display: flex;
  position: relative;
`;

const Header = styled(H4)`
  padding: 30px 10px 10px 15px;

  @media (max-width: 770px) {
    padding: 5px 1px 3px 5px;
  }
`;

const Settings = styled.div``;

const FeedsContainer = styled.div`
  overflow: scroll;
  flex-grow: 100;
`;

export const SidebarLeft = () => (
  <SidebarContext.Consumer>
    {({ open, overlay, toggle }) => (
      <SidebarLeftContainer open={open} overlay={overlay}>
        <FeedsContainer>
          <Header>Tools</Header>
          <LinkItem to="/how-to-get-tokens" icon={<span>🛠</span>} toggle={toggle}>
            How to get tokens?
          </LinkItem>
          <Header>Feeds</Header>
          <LinkItem to="/" icon={<img alt="" style={{ width: '16px' }} src={feedIcon} />} toggle={toggle}>
            All
          </LinkItem>
          <IfActiveEntity>
            {(entityId) => (
              <React.Fragment>
                <LinkItem to="/personal" icon={<img alt="" style={{ width: '16px' }} src={feedIcon} />} toggle={toggle}>
                  My Clubs Feed
                </LinkItem>
                <LinkItem
                  to="/notifications"
                  icon={<img alt="" style={{ width: '16px' }} src={notificationsIcon} />}
                  toggle={toggle}
                >
                  Notifications
                </LinkItem>
                <EntityClubs id={entityId}>
                  {(clubs) => clubs.map((club) => <Club key={club.address} token={club} toggle={toggle} />)}
                </EntityClubs>
              </React.Fragment>
            )}
          </IfActiveEntity>
        </FeedsContainer>
        <Settings>
          <Header>Settings</Header>
          <Context.Consumer>
            {({ appStore: { http, toggleHttpClaims } }) => (
              <ToggleHttpButton http={http} onClick={toggleHttpClaims}>
                {http ? 'Off Chain' : 'On Chain'}
              </ToggleHttpButton>
            )}
          </Context.Consumer>
        </Settings>
        <SidebarFooter />
      </SidebarLeftContainer>
    )}
  </SidebarContext.Consumer>
);

export const SidebarRight = ({ children }) => (
  <SidebarContext.Consumer>
    {({ open, overlay, toggle }) => (
      <SidebarRightContainer open={open} overlay={overlay}>
        <div className="inner">{children}</div>
        {overlay && open && <div className="overlay" onClick={toggle} />}
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
    max-width: 96%;
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

  @media (max-width: 770px) {
    padding-left: unset;

    .inner {
      width: 100vw;
    }
  }
`;

const StyledUnreadedMessages = styled(UnreadedCount)`
  align-items: center;
  background-color: #dd0000;
  color: #fff;
  display: flex;
  font-size: 8px;
  height: 10px;
  padding: 7px;
  transform: translate(50%, 70%);
  width: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const ClubContainer = styled.div`
  overflow-y: scroll;
  ${niceScroll};
  height: 300px;
`;

const Club = ({ token, toggle }) => (
  <LinkItem
    to={token.isCustom ? `/clubs/${token.network}:${token.address}` : `/clubs/${token.symbol}`}
    primaryColor={token.primaryColor}
    icon={
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <TokenImage token={token} />
        <StyledUnreadedMessages token={token} short={true} />
      </div>
    }
    toggle={toggle}
  >
    {token.name}
  </LinkItem>
);

const SidebarFooter = styled(({ className }) => (
  <div className={className}>
    <div style={{ width: '75%', display: 'inline-block' }}>
      <div style={{ display: 'block' }}>
        <A href="https://t.me/userfeeds" style={{ marginRight: '8px', fontSize: '0.8rem' }}>
          About
        </A>
        <A href="https://t.me/userfeeds" style={{ fontSize: '0.8rem' }}>
          Create your club
        </A>
      </div>
      <div>
        <A href="https://t.me/userfeeds" style={{ marginRight: '8px', fontSize: '0.8rem' }}>
          Telegram
        </A>
        <A href="https://twitter.com/tokntalkclub" style={{ fontSize: '0.8rem' }}>
          Twitter
        </A>
      </div>
    </div>
    <Intercom />
  </div>
))`
  padding-top: 15px;
  border-top: 1px solid #dae1ec;
  margin-top: auto;
  padding: 10px;
`;

const LinkItem = styled(({ children, icon, primaryColor, toggle, ...props }) => (
  <NavLink {...props} exact activeClassName="selected" onClick={() => (isMobile ? toggle() : null)}>
    <IconContainer primaryColor={primaryColor}>{icon}</IconContainer>
    {children}
  </NavLink>
))`
  display: block;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px;
  color: #1b2437;
  border-radius: 6px;
  &.selected {
    background: #f5f8fd;
  }

  :hover {
    background: #fefffd;
  }

  & img,
  & svg {
    width: 22px;
    height: auto;
  }

  @media (max-width: 770px) {
    max-width: unset;
    padding: 2px 3px;
  }
`;

const IconContainer = styled.div`
  margin-right: 15px;
  width: 33px;
  height: 33px;
  background-color: ${({ primaryColor }) => primaryColor || 'white'};
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 770px) {
    margin-right: 5px;
  }
`;

const SidebarLeftContainer = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: ${({ overlay }) => (overlay ? 'fixed' : 'sticky')};
  padding: 30px 10px 10px 15px;
  flex-direction: column;
  background-color: #edf1f8;
  top: 60px;
  z-index: 999;
  min-width: 240px;
  height: calc(100vh - 60px);

  @media (max-width: 770px) {
    position: fixed;
    width: 100vw;
    padding: 5px;
  }
`;

const BurgerBarWidth = '20px';
const BurgerBarHeight = '2px';
const BurgerBarSpacing = '6px';

const activeBurgerCss = css`
  .hamburger-menu {
    background: rgba(0, 0, 0, 0);

    &:after {
      top: 0;
      transform: rotate(45deg);
      transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    &:before {
      bottom: 0;
      transform: rotate(-45deg);
      transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
    }
  }
`;

const Burger = styled((props) => (
  <div {...props}>
    <div className="hamburger-menu" />
  </div>
))`
  & {
    margin-bottom: 15px;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hamburger-menu,
  .hamburger-menu:after,
  .hamburger-menu:before {
    width: ${BurgerBarWidth};
    height: ${BurgerBarHeight};
  }

  .hamburger-menu {
    position: relative;
    transform: translateY(${BurgerBarSpacing});
    background: rgba(0, 0, 0, 1);
    transition: all 0ms 300ms;
  }

  .hamburger-menu:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: ${BurgerBarSpacing};
    background: rgba(0, 0, 0, 1);
    transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .hamburger-menu:after {
    content: '';
    position: absolute;
    left: 0;
    top: ${BurgerBarSpacing};
    background: rgba(0, 0, 0, 1);
    transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  ${({ open }) => open && activeBurgerCss};
`;
