import React from 'react';

import Header from '../Header';
import CreateTokens from '../CreateTokens';
import { SidebarProvider, SidebarContainer, SidebarLeft, SidebarRight } from '../Sidebar';

const CreateTokensApp = (props) => (
  <SidebarProvider overlay>
    <Header />
    <SidebarContainer>
      <SidebarLeft />
      <SidebarRight>
        <CreateTokens {...props} />
      </SidebarRight>
    </SidebarContainer>
  </SidebarProvider>
);

export default CreateTokensApp;
