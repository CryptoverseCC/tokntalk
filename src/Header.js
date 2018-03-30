import React from 'react';
import { ActiveEntityAvatar, ActiveEntityName, IfActiveCat } from './Entity';

const Header = () => {
  return (
    <div
      className="level"
      style={{
        height: '65px',
        backgroundColor: '#f9fbfd',
        borderBottom: '1px solid #e8e8f1',
        fontFamily: 'Rubik',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: 0
      }}
    >
      <div className="container is-fluid level-item level columns">
        <div className="level-left column">Feed</div>
        <h1
          className="level-item column has-text-centered"
          style={{ color: '#1B2437', fontWeight: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}
        >
          Purrbook
        </h1>
        <IfActiveCat then={<IdentityStatus />} other={<ErrorStatus message="No cats found" />} />
      </div>
    </div>
  );
};

export default Header;

export const IdentityStatus = () => (
  <div className="level-right column" style={{ color: '#1B2437' }}>
    <div className="level-right">
      <ActiveEntityAvatar size="small" />
      <div style={{ marginLeft: '8px' }}>
        <ActiveEntityName />
      </div>
    </div>
  </div>
);

export const ErrorStatus = ({ message }) => (
  <div
    className="level-right has-text-right column"
    style={{ color: '#FC0035', textShadow: '0 0 10px rgba(252,0,53,0.3)' }}
  >
    {message}
  </div>
);
