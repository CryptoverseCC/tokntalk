import React from 'react';
import timeago from 'timeago.js';
import styled from 'styled-components';

import Profile from '../Profile';
import { VerifyButton } from '../Buttons.js';
import { CollapsableText } from './CollapsableText';
import PostReactions from './PostReactions';

const Message = styled.p`
  font-size: 1rem;
  margin: 20px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;

  @media (max-width: 770px) {
    font-size: 1rem;
    margin: 0px 0px 10px 20px;
  }
`;

const ReplyContainer = styled.div`
  @media (max-width: 770px) {
    margin-left: 0px;
  }
`;

const ReplyProfile = styled(Profile)`
  display: flex;
  transform: scale(0.8);
  transform-origin: top left;
`;

const Reply = ({
  id,
  from,
  entityInfo,
  createdAt,
  onVerify,
  family,
  message,
  reactions,
  onShowLikers,
  disabledInteractions,
  style = {},
}) => (
  <ReplyContainer>
    <ReplyProfile from={from} entityInfo={entityInfo}>
      <PostReactions
        id={id}
        reactions={reactions}
        disabledInteractions={disabledInteractions}
        onShowLikers={onShowLikers}
        style={{ fontSize: '1rem' }}
      />
      <span>{timeago().format(createdAt)}</span>
      <VerifyButton onClick={onVerify} />
    </ReplyProfile>
    <Message>
      <CollapsableText text={message} />
    </Message>
  </ReplyContainer>
);

export default Reply;
