import React from 'react';
import Context from './Context';
import colors from './colors';
import IdentityAvatar from './Avatar';

export const IfActiveCat = ({ children, then, other }) => (
  <Context.Consumer>{({ catStore: { activeCat } }) => (activeCat ? then || children : other || null)}</Context.Consumer>
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

export const Entities = ({children}) => (
  <Context.Consumer>
    {({ catStore: { myCats, changeActiveCatTo }, entityStore: { getEntity } }) => {
      const catEntities = myCats.map((myCat) => getEntity(myCat.token));
      return children({entities: catEntities, changeActiveEntityTo: changeActiveCatTo});
    }}
  </Context.Consumer>
)

export const ActiveEntityName = () => (
  <Context.Consumer>{({ catStore: { activeCat } }) => <EntityName id={activeCat.token} />}</Context.Consumer>
);

export const ActiveEntityAvatar = props => (
  <Context.Consumer>
    {({ catStore: { activeCat } }) => <EntityAvatar id={activeCat.token} {...props} />}
  </Context.Consumer>
);

export const IfActiveEntityLiked = ({ id, children, then, other }) => (
  <Context.Consumer>
    {({ catStore: { activeCat }, purrStore: { purrs, temporaryReactions } }) => {
      if (!activeCat) return false;
      const liked = purrs
        .find(({ id: claimId }) => claimId === id)
        .targeted.concat(temporaryReactions[id] || [])
        .find(({ context }) => context.split(':')[2] === activeCat.token);
      return liked ? then || children : other;
    }}
  </Context.Consumer>
);
