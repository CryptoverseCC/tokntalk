import React from 'react';
import Context from './Context';

export const IfActiveCat = ({children}) => (
  <Context.Consumer>{({ catStore: { activeCat } }) => activeCat ? children : null}</Context.Consumer>
)

export const EntityName = ({ id }) => (
  <Context.Consumer>{({ entityStore: { getEntity } }) => getEntity(id).name || getEntity(id).id}</Context.Consumer>
);
