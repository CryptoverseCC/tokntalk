import React from 'react';
import { storiesOf } from '@storybook/react';
import IdentityAvatar from '../Avatar';
import CommentForm, { StyledReplyForm, ReplyStyledTextArea } from '../CommentForm';
import EntityExample from '../img/entityExample.svg';
import { withKnobs, select, text, boolean, number } from '@storybook/addon-knobs/react';

storiesOf('Components', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '600px', height: '100vh', margin: '0 auto' }}>
      {story()}
    </div>
  ))
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
  })
  .add('Comment Form', () => <CommentForm placeholder={text('Placeholder', 'Placeholder')} />)
  .add('Reply Form', () => (
    <CommentForm
      Form={StyledReplyForm}
      TextArea={ReplyStyledTextArea}
      placeholder={text('Placeholder', 'Placeholder')}
    />
  ));
