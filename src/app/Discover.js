import React from 'react';

import Header from '../Header';
import Discover from '../Discover';
import { SidebarProvider, SidebarContainer, SidebarLeft, SidebarRight } from '../Sidebar';

const DiscoverApp = (props) => (
  <SidebarProvider overlay>
    <Header />
    <SidebarContainer>
      <SidebarLeft />
      <SidebarRight>
        <Discover {...props} />
      </SidebarRight>
    </SidebarContainer>
  </SidebarProvider>
);

export default DiscoverApp;
