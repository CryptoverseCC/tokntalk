import React from 'react';
import { storiesOf } from '@storybook/react';
import IdentityAvatar from '../Avatar';
import EntityExample from '../img/entityExample.svg';
import { withKnobs, select, text, boolean, number } from '@storybook/addon-knobs/react';

storiesOf('Components', module)
  .addDecorator(withKnobs)
  .add('Avatar', () => {
    const size = select(
      'Size',
      {
        small: 'Small',
        medium: 'Medium',
        large: 'Large'
      },
      'small'
    );

    return <IdentityAvatar size={size} src={EntityExample} backgroundColor={text('Background color')} />;
  });
