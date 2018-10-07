import React from 'react';
import timeago from 'timeago.js';
import styled from 'styled-components';

import Profile from './Profile';
import { VerifyButton } from './Buttons.js';
import { CollapsableText } from './CollapsableText';
import Reactions from './Reactions';

const Message = styled.p`
  font-size: 1.5rem;
  margin: 20px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0px 0px 10px 50px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 10px;

  @media (max-width: 770px) {
    font-size: 1rem;
    margin: 8px 0px 10px 45px;
    padding: 10px;
  }
`;

const ReplyContainer = styled.div`
  @media (max-width: 770px) {
    margin-left: 0px;
  }
`;

const ReplyProfile = styled(Profile)`
  display: flex;
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
      {reactions && (
        <Reactions
          id={id}
          reactions={reactions}
          disabledInteractions={disabledInteractions}
          onShowLikers={onShowLikers}
          style={{ fontSize: '1rem' }}
        />
      )}
      <span>{timeago().format(createdAt)}</span>
      <VerifyButton onClick={onVerify} />
    </ReplyProfile>
    <Message>
      <CollapsableText text={message} />
    </Message>
  </ReplyContainer>
);

export default Reply;
