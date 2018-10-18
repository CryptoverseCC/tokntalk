import React from 'react';
import timeago from 'timeago.js';
import styled from 'styled-components';

import Profile from '../Profile';
import { VerifyButton } from '../Buttons.js';
import Link from '../../Link';
import { CollapsableText } from '../CollapsableText';
import Reactions from '../Reactions';
import Share from '../../Share';

const Text = styled.p`
  font-size: 1.5rem;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 8px 0px 10px 50px;
  padding: 10px;
  border-radius: 10px;

  @media (max-width: 770px) {
    font-size: 1rem;
    margin: 8px 0px 10px 45px;
    padding: 10px;
  }
`;

const Message = ({
  id,
  from,
  entityInfo,
  createdAt,
  message,
  reaction,
  suffix,
  replies,
  disabledInteractions,
  onVerify,
  onReply,
  onShowLikers,
  reactions,
  etherscanUrl,
}) => {
  return (
    <div>
      <Profile from={from} entityInfo={entityInfo} suffix={suffix} reaction={reaction}>
        {reactions && (
          <Reactions
            id={id}
            reactions={reactions}
            replies={replies}
            disabledInteractions={disabledInteractions}
            onReply={onReply}
            onShowLikers={onShowLikers}
            style={{ fontSize: '1rem' }}
          />
        )}
        <span>{timeago().format(createdAt)}</span>
        <VerifyButton onClick={onVerify} />
        <Link
          to={{
            pathname: `/thread/${id}`,
            state: { modal: true },
            search: `?backUrl=${encodeURIComponent(window.location.pathname)}`,
          }}
        >
          Permalink
        </Link>
        <Share author={from} message={message} etherscanUrl={etherscanUrl} />
      </Profile>
      <Text>
        <CollapsableText text={message} />
      </Text>
    </div>
  );
};

export default Message;
