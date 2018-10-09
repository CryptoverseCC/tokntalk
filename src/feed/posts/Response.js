import React from 'react';
import styled from 'styled-components';

import { LinkedEntityAvatar } from '../../Entity';
import Link from '../../Link';
import Message from './Message';

const Avatar = styled(LinkedEntityAvatar)`
  width: 20px;
  height: 20px;
`;

const Container = styled.div`
  display: flex;
`;

const Name = styled(Link)`
  @media (max-width: 480px) {
    display: none;
  }
`;

const Response = ({ feedItem, onVerify }) => {
  const reply = feedItem.reply_to;
  const entityInfo = feedItem.isFromAddress ? feedItem.author_info : feedItem.context_info;
  const from = feedItem.isFromAddress ? feedItem.author : feedItem.context;

  return (
    <Message
      id={feedItem.id}
      createdAt={feedItem.created_at}
      entityInfo={entityInfo}
      from={from}
      family={feedItem.family}
      message={feedItem.target}
      suffix={
        <Container>
          replied to&nbsp;
          <Avatar
            id={reply.isFromAddress ? reply.author : reply.context}
            entityInfo={reply.isFromAddress ? reply.author_info : reply.context_info}
          />
          &nbsp;
          <Name to={`/${reply.isFromAddress ? reply.author : reply.context}`}>
            <b>{(reply.isFromAddress ? reply.author_info : reply.context_info).name}</b>
          </Name>
        </Container>
      }
      onVerify={() => onVerify(feedItem)}
    />
  );
};

export default Response;
