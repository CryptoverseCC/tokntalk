import React from 'react';

import Context from '../Context';
import Header from '../Header';
import ShowPage from '../ShowPage';
import { SidebarProvider, SidebarContainer, SidebarLeft, SidebarRight } from '../Sidebar';

const ShowPageApp = (props) => (
  <SidebarProvider overlay>
    <Header />
    <SidebarContainer>
      <SidebarLeft />
      <SidebarRight>
        <Context.Consumer>
          {({ feedStore, entityStore }) => (
            <ShowPage
              {...props}
              getFeedItems={feedStore.getFeedItems}
              getNewFeedItems={feedStore.getNewFeedItems}
              getEntityInfo={entityStore.getEntityInfo}
            />
          )}
        </Context.Consumer>
      </SidebarRight>
    </SidebarContainer>
  </SidebarProvider>
);

export default ShowPageApp;
