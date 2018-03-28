import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const Header = ({status}) => {
  return (
    <div
      className="level"
      style={{
        height: '65px',
        backgroundColor: '#f9fbfd',
        padding: '0 1rem',
        borderBottom: '1px solid #e8e8f1',
        fontFamily: 'Rubik',
        fontSize: '14px',
        fontWeight: '500'
      }}
    >
      <div className="level-left">Feed</div>
      <h1 className="level-item" style={{ color: '#1B2437', fontWeight: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}>
        Purrbook
      </h1>
      <div
        className="level-right has-text-right"
        style={{ color: '#FC0035', textShadow: '0 0 10px rgba(252,0,53,0.3)' }}
      >
        No Metamask
      </div>
    </div>
  );
};

storiesOf('NewHeader', module).add('No Metamask', () => <Header />);
