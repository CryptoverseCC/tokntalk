import React from 'react';
import uniqBy from 'lodash/uniqBy';
import Context from './Context';
import colors from './colors';
import IdentityAvatar from './Avatar';

export const IfActiveCat = ({ children, then, other }) => (
  <Context.Consumer>{({ catStore: { activeEntity } }) => (activeEntity ? (then && then(activeEntity)) || children(activeEntity) : other || null)}</Context.Consumer>
);

export const IfIsActiveCat = ({ id, children, then, other }) => (
  <Context.Consumer>{({ catStore: { activeEntity } }) => (activeEntity && (activeEntity.token === id) ? then || children : other || null)}</Context.Consumer>
);

export const IfOwnerOfEntity = ({ id, children, then, other }) => (
  <Context.Consumer>
    {({ catStore: { myCats } }) => (!!myCats.find(cat => id.toString() === cat.token) ? then || children : other || null)}
  </Context.Consumer>
);

export const Entity = ({ id, children }) => (
  <Context.Consumer>{({ entityStore: { getEntity } }) => children(getEntity(id))}</Context.Consumer>
);

export const EntityName = ({ id }) => (
  <Context.Consumer>{({ entityStore: { getEntity } }) => getEntity(id).name || `Kitty #${getEntity(id).id}`}</Context.Consumer>
);

export const EntityAvatar = ({ id, ...props }) => (
  <Context.Consumer>
    {({ entityStore: { getEntity } }) => (
      <IdentityAvatar {...props} backgroundColor={colors[getEntity(id).color]} src={getEntity(id).image_url} />
    )}
  </Context.Consumer>
);

export const Entities = ({ children }) => (
  <Context.Consumer>
    {({ catStore: { myCats, changeActiveEntityTo }, entityStore: { getEntity } }) => {
      const catEntities = myCats.map(myCat => getEntity(myCat.token));
      return children({ entities: catEntities, changeActiveEntityTo: changeActiveEntityTo });
    }}
  </Context.Consumer>
);

export const ActiveEntityName = () => (
  <Context.Consumer>{({ catStore: { activeEntity } }) => <EntityName id={activeEntity.token} />}</Context.Consumer>
);

export const ActiveEntityAvatar = props => (
  <Context.Consumer>
    {({ catStore: { activeEntity } }) => <EntityAvatar id={activeEntity.token} {...props} />}
  </Context.Consumer>
);

export const IfActiveEntityLiked = ({ id, children, then, other }) => (
  <Context.Consumer>
    {({ catStore: { activeEntity }, purrStore: { purrs, temporaryPurrs, temporaryReactions } }) => {
      if (!activeEntity) return other;
      const claim = uniqBy([...temporaryPurrs, ...purrs], purr => purr.id).find(({ id: claimId }) => claimId === id);
      const liked =
        claim &&
        claim.targeted
          .concat(temporaryReactions[id] || [])
          .find(({ context }) => context.split(':')[2] === activeEntity.token);
      return liked ? then || children : other;
    }}
  </Context.Consumer>
);
