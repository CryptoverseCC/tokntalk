import React from 'react';
import timeago from 'timeago.js';
import styled from 'styled-components';

import { VerifyButton } from '../Buttons.js';
import Profile from '../Profile';
import Message from './Message';
import Boost from './Boost';
import { LikeIcon } from '../../Icons';

const LikeReaction = styled.div.attrs({
  children: <LikeIcon style={{ width: '15px' }} />,
})`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  height: 28px;
  width: 28px;
  background-color: white;
  border: 1px solid #ddd;
`;

const ReactionProfile = styled(Profile)`
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
  padding-bottom: 15px;

  @media (max-width: 770px) {
    margin-bottom: 5px;
    padding-bottom: 5px;
  }
`;

const Reaction = ({ feedItem, reactionSuffix, messageSuffix, disabledInteractions, onVerify }) => (
  <div>
    <ReactionProfile
      reaction={<LikeReaction />}
      id={feedItem.isFromAddress ? feedItem.author : feedItem.context}
      entityInfo={feedItem.isFromAddress ? feedItem.author_info : feedItem.context_info}
      from={feedItem.isFromAddress ? feedItem.author : feedItem.context}
      family={feedItem.family}
      suffix={<span>{reactionSuffix}</span>}
    >
      <span>{timeago().format(feedItem.created_at)}</span>
      <VerifyButton onClick={() => onVerify(feedItem)} />
    </ReactionProfile>
    {feedItem.target.type === 'boost' ? (
      <Boost feedItem={feedItem.target} onVerify={onVerify} />
    ) : (
      <Message
        from={feedItem.target.isFromAddress ? feedItem.target.author : feedItem.target.context}
        entityInfo={feedItem.target.isFromAddress ? feedItem.target.author_info : feedItem.target.context_info}
        createdAt={feedItem.target.created_at}
        message={feedItem.target.target}
        family={feedItem.target.family}
        suffix={messageSuffix}
        disabledInteractions={disabledInteractions}
        onVerify={() => onVerify(feedItem.target)}
      />
    )}
  </div>
);

export default Reaction;
