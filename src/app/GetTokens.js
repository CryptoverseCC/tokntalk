import React from 'react';

import Header from '../Header';
import GetTokens from '../GetTokens';
import { SidebarProvider, SidebarContainer, SidebarLeft, SidebarRight } from '../Sidebar';

const GetTokensApp = (props) => (
  <SidebarProvider overlay>
    <Header />
    <SidebarContainer>
      <SidebarLeft />
      <SidebarRight>
        <GetTokens {...props} />
      </SidebarRight>
    </SidebarContainer>
  </SidebarProvider>
);

export default GetTokensApp;
