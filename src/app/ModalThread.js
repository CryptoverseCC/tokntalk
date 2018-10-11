import React from 'react';
import Context from '../Context';
import { ModalThread } from '../Thread';

const ModalThreadApp = (props) => (
  <Context.Consumer>
    {({ feedStore }) => <ModalThread {...props} getFeedItem={feedStore.getFeedItem} />}
  </Context.Consumer>
);

export default ModalThreadApp;
