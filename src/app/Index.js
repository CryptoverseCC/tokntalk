import React from 'react';

import Context from '../Context';
import Header from '../Header';
import IndexPage from '../IndexPage';
import PersonalPage from '../PersonalPage';
import Notifications from '../Notifications';
import { SidebarProvider, SidebarContainer, SidebarLeft, SidebarRight } from '../Sidebar';

const IndexApp = (props) => (
  <SidebarProvider>
    <Header />
    <SidebarContainer>
      <SidebarLeft />
      <SidebarRight>
        <Context.Consumer>
          {({ feedStore }) => (
            <div>
              {props.location.pathname === '/' && <IndexPage {...props} />}
              {props.location.pathname === '/personal' && <PersonalPage {...props} />}
              {props.location.pathname === '/notifications' && <Notifications {...props} />}
            </div>
          )}
        </Context.Consumer>
      </SidebarRight>
    </SidebarContainer>
  </SidebarProvider>
);

export default IndexApp;
