import React from 'react';
import Context from './Context';
import colors from './colors';
import IdentityAvatar from './Avatar';

export const IfActiveCat = ({ children }) => (
  <Context.Consumer>{({ catStore: { activeCat } }) => (activeCat ? children : null)}</Context.Consumer>
);

export const EntityName = ({ id }) => (
  <Context.Consumer>{({ entityStore: { getEntity } }) => getEntity(id).name || getEntity(id).id}</Context.Consumer>
);

export const EntityAvatar = ({ id, ...props }) => (
  <Context.Consumer>
    {({ entityStore: { getEntity } }) => (
      <IdentityAvatar {...props} backgroundColor={colors[getEntity(id).color]} src={getEntity(id).image_url} />
    )}
  </Context.Consumer>
);

export const ActiveEntityAvatar = props => (
  <Context.Consumer>
    {({ catStore: { activeCat } }) => <EntityAvatar id={activeCat.token} {...props} />}
  </Context.Consumer>
);
