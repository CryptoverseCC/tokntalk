import React from 'react';
import styled, { keyframes } from 'styled-components';

import { IfActiveEntity, IfActiveEntityLiked } from '../Entity';
import Context from '../Context';
import { LikeIcon, ReplyIcon } from '../Icons';

const IconContainer = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const LabelCounter = styled.span`
  margin-left: 0.3em;
  height: 1.25em;
  padding: 0.125em 0.625em 0.1em 0.625em;
  line-height: 1.25em;
  border-radius: 1.25em;
  background: ${({ unActive, background }) => (!unActive ? background : '#e8eaf3')};
  color: ${({ unActive }) => unActive && '#78818c'};
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  transition: transform 0.15s ease-in-out;

  :hover {
    transform: ${({ disabled }) => !disabled && 'translateY(-3px)'};
  }
`;

const LabelButton = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.15s ease-in-out;
  cursor: ${({ liked, unActive }) => (liked || unActive ? 'default' : 'pointer')};
`;

const shaky = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
  60% {
    transform: translateY(-3px);
  }
`;

const LabelContainer = styled.div`
  color: ${({ unActive, color }) => (!unActive ? color : '#918f9b')};
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-weight: 600;
  padding: 4px 0 3px 0;
  margin-right: 5px;
`;

const LabelIconContainer = styled(IconContainer)`
  transition: all 0.15s ease-in-out;
  background: ${({ liked, background }) => (liked ? background : 'none')};
  box-shadow: ${({ liked, shadow }) => (liked ? shadow : '')};

  ${LabelButton}:hover & {
    background: ${({ liked, unActive, background }) => !liked && !unActive && background};
    box-shadow: ${({ liked, unActive, shadow }) => !liked && !unActive && shadow};

    img {
      animation: ${({ liked, unActive }) => !liked && !unActive && `${shaky} 1s ease-in-out`};
      animation-iteration-count: infinite;
    }
  }
`;

const LikeLabel = ({ style, className, onLike, onShowLikers, liked, unActive, count }) => {
  return (
    <LabelContainer className={className} style={style} color="#ff8482" unActive={unActive}>
      <LabelButton onClick={onLike} liked={liked} unActive={unActive}>
        <LabelIconContainer
          liked={liked}
          unActive={unActive}
          shadow="0 0 20px 9px rgba(255, 117, 117, 0.15)"
          background="rgba(255, 117, 117, 0.15)"
        >
          <LikeIcon inactive={unActive} style={{ height: '100%' }} />
        </LabelIconContainer>
      </LabelButton>
      <LabelCounter
        unActive={unActive}
        background="#ffebeb"
        onClick={() => count > 0 && onShowLikers()}
        disabled={count === 0}
      >
        {count}
      </LabelCounter>
    </LabelContainer>
  );
};

const ReplyLabel = ({ onClick, unActive, count }) => {
  return (
    <LabelContainer unActive={unActive} color="#2850d9">
      <LabelButton onClick={onClick} unActive={unActive}>
        <LabelIconContainer
          unActive={unActive}
          shadow="0 0 20px 9px rgba(89, 123, 246, 0.11)"
          background="rgba(89, 123, 246, 0.11)"
        >
          <ReplyIcon inactive={unActive} style={{ height: '100%' }} />
        </LabelIconContainer>
      </LabelButton>
      <LabelCounter unActive={unActive} disabled background="#ebefff">
        {count}
      </LabelCounter>
    </LabelContainer>
  );
};

const ReactionsContainer = styled.div`
  display: flex;
`;

const DisabledReactions = ({ reactions, replies = [], onShowLikers }) => (
  <ReactionsContainer>
    <LikeLabel unActive count={reactions.length} onShowLikers={onShowLikers} />
    {!!replies.length && <ReplyLabel unActive count={replies.length} />}
  </ReactionsContainer>
);

const EnabledReactions = ({ id, reactions, replies = [], onReply, onShowLikers }) => (
  <ReactionsContainer>
    <IfActiveEntityLiked
      reactions={reactions}
      unActive={<LikeLabel unActive count={reactions.length} onShowLikers={onShowLikers} />}
      notLiked={
        <Context.Consumer>
          {({ feedStore: { react } }) => (
            <LikeLabel onLike={() => react(id)} count={reactions.length} onShowLikers={onShowLikers} />
          )}
        </Context.Consumer>
      }
      liked={<LikeLabel liked count={reactions.length} onShowLikers={onShowLikers} />}
    />
    {!!replies.length && (
      <IfActiveEntity other={<ReplyLabel unActive count={replies.length} />}>
        {() => <ReplyLabel count={replies.length} onClick={onReply} />}
      </IfActiveEntity>
    )}
  </ReactionsContainer>
);

const Reactions = ({ id, reactions, replies, disabledInteractions, onReply, onShowLikers, style }) =>
  disabledInteractions ? (
    <DisabledReactions reactions={reactions} replies={replies} onShowLikers={onShowLikers} />
  ) : (
    <EnabledReactions id={id} reactions={reactions} replies={replies} onReply={onReply} onShowLikers={onShowLikers} />
  );

export default Reactions;
