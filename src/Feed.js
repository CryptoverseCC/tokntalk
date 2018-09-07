import React, { Component } from 'react';
import equals from 'lodash/fp/equals';
import pipe from 'lodash/fp/pipe';
import uniqBy from 'lodash/fp/uniqBy';
import sortBy from 'lodash/fp/sortBy';
import capitalize from 'lodash/capitalize';
import timeago from 'timeago.js';
import ReactVisibilitySensor from 'react-visibility-sensor';
import styled, { keyframes } from 'styled-components';

import Link from './Link';
import Context from './Context';
import { ConnectedReplyForm, ReplyForm } from './CommentForm';
import {
  IfActiveEntity,
  LinkedActiveEntityAvatar,
  LinkedEntityAvatar,
  IfActiveEntityLiked,
  IsActiveEntityFromFamily,
  DoesActiveEntityHasToken,
} from './Entity';
import InfiniteScroll from './InfiniteScroll';
import { FacebookIcon, TwitterIcon, InstagramIcon, GithubIcon, LikeIcon, ReplyIcon } from './Icons';
import TranslationsContext from './Translations';
import Loader from './Loader';
import { CollapsableText, ShowMore } from './CollapsableText';
import { VerifyModal } from './VerifyModal';
import LikersModal from './LikersModal';
import { createEtherscanUrl } from './utils';

const IconContainer = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StartingMessage = styled.p`
  margin-top: 8px;
  font-size: 1.5rem;
  font-weight: 500;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  @media (max-width: 770px) {
    font-size: 1.3rem;
  }
`;

const ArticleReactions = styled.article`
  display: flex;
  margin: 8px 0 16px 0;
`;

const LabelText = styled.span`
  margin-left: 8px;
  margin-bottom: -2px;
  transition: all 0.15s ease-in-out;
`;

const LabelCounter = styled.span`
  margin-left: 0.3125em;
  height: 1.25em;
  font-size: 0.8rem;
  padding: 0.125em 0.625em 0.1em 0.625em;
  line-height: 1.25em;
  border-radius: 1.25em;
  background: ${({ unActive, background }) => (!unActive ? background : '#e8eaf3')};
  color: ${({ unActive }) => unActive && '#928f9b'};
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
        <LabelText>
          Like
          {liked && 'd'}
        </LabelText>
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

const InlineLikeLabel = styled(LikeLabel)`
  display: inline-flex;
`;

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
        <LabelText>Reply</LabelText>
      </LabelButton>
      <LabelCounter unActive={unActive} disabled background="#ebefff">
        {count}
      </LabelCounter>
    </LabelContainer>
  );
};

const PostReactions = ({ id, reactions, replies, disabledInteractions, onReply, onShowLikers, style }) => (
  <ArticleReactions style={style}>
    <div className="" style={{ width: '70px' }} />
    <div className="columns is-mobile" style={{ width: '100%' }}>
      <div className="column" style={{ display: 'flex', alignItems: 'center', marginLeft: '12px' }}>
        {disabledInteractions ? (
          <LikeLabel unActive count={reactions.length} onShowLikers={onShowLikers} />
        ) : (
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
        )}
      </div>
      <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
        {disabledInteractions ? (
          <ReplyLabel unActive count={replies.length} />
        ) : (
          <IfActiveEntity other={<ReplyLabel unActive count={replies.length} />}>
            {() => <ReplyLabel count={replies.length} onClick={onReply} />}
          </IfActiveEntity>
        )}
      </div>
    </div>
  </ArticleReactions>
);

const Post = ({ id, from, entityInfo, createdAt, family, message, reaction, suffix, style = {}, onVerify }) => {
  return (
    <article className="media" style={style}>
      <div className="media-left" style={{ width: '64px' }}>
        <LinkedEntityAvatar size="medium" reaction={reaction} id={from} entityInfo={entityInfo} />
      </div>
      <div className="media-content">
        <CardTitle
          id={id}
          from={from}
          entityInfo={entityInfo}
          createdAt={createdAt}
          family={family}
          suffix={suffix}
          onVerify={onVerify}
        />
        <StartingMessage>
          <CollapsableText text={message} />
        </StartingMessage>
      </div>
    </article>
  );
};

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
  <article className="media" style={{ borderTop: 'none', ...style }}>
    <div className="media-left is-hidden-mobile">
      <div style={{ height: '64px', width: '64px' }} />
    </div>
    <div className="media-content columns is-mobile" style={{ overflow: 'hidden' }}>
      <div className="column is-narrow">
        <LinkedEntityAvatar size="medium" id={from} entityInfo={entityInfo} />
      </div>
      <div className="column">
        <div
          style={{
            width: '100%',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
          }}
        >
          <Link to={`/${from}`} style={{ display: 'block' }}>
            <b>{entityInfo.name} </b>
          </Link>
          <CollapsableText text={message} />
        </div>
        <div>
          <small style={{ color: '#928F9B', display: 'flex', alignItems: 'center' }}>
            {disabledInteractions ? (
              <InlineLikeLabel count={reactions.length} unActive onShowLikers={onShowLikers} />
            ) : (
              <IfActiveEntityLiked
                reactions={reactions}
                notLiked={
                  <Context.Consumer>
                    {({ feedStore: { react } }) => (
                      <InlineLikeLabel count={reactions.length} onLike={() => react(id)} onShowLikers={onShowLikers} />
                    )}
                  </Context.Consumer>
                }
                liked={<InlineLikeLabel count={reactions.length} liked onShowLikers={onShowLikers} />}
                unActive={<InlineLikeLabel count={reactions.length} unActive onShowLikers={onShowLikers} />}
              />
            )}
            <span style={{ marginLeft: '10px' }}>{timeago().format(createdAt)}</span>{' '}
            <Verify onClick={onVerify} style={{ marginLeft: '15px' }}>
              Verify
            </Verify>
          </small>
        </div>
      </div>
    </div>
  </article>
);

const ReplyFormContainer = ({ about, children, ...props }) => (
  <article className="media" style={{ borderTop: 'none' }}>
    <div className="media-left is-hidden-mobile">
      <div style={{ height: '64px', width: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
    </div>

    <div className="media-content columns is-mobile">
      <div className="column is-narrow">
        <LinkedActiveEntityAvatar size="medium" />
      </div>
      <div className="column">
        <ConnectedReplyForm Form={ReplyForm} about={about} {...props} />
        {children}
      </div>
    </div>
  </article>
);

const SenderName = styled(Link)`
  font-size: 1rem;
`;

const Verify = styled.span`
  color: #1b2437;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #264dd9;
  }
`;

const CardTitle = ({ id, from, entityInfo, createdAt, family, suffix, share, onVerify }) => {
  return (
    <React.Fragment>
      <div>
        <SenderName to={`/${from}`}>{entityInfo.name}</SenderName> {suffix}
      </div>
      <div style={{ color: '#928F9B', fontSize: '0.8rem' }}>
        {timeago().format(createdAt)}
        <Verify onClick={onVerify} style={{ marginLeft: '15px' }}>
          Verify
        </Verify>
        {id ? (
          <Link
            style={{ color: '#1b2437', marginLeft: '15px' }}
            to={{
              pathname: `/thread/${id}`,
              state: { modal: true },
              search: `?backUrl=${encodeURIComponent(window.location.pathname)}`,
            }}
          >
            Perma link
          </Link>
        ) : null}
      </div>
    </React.Fragment>
  );
};

const Reaction = styled(IconContainer)`
  height: 33px;
  width: 33px;
`;

const LikeReaction = styled(Reaction).attrs({
  children: <LikeIcon style={{ width: '21px', marginLeft: '-1px', marginTop: '1px' }} />,
})`
  background-color: white;
`;

const ReplyReaction = styled(Reaction).attrs({
  children: <ReplyIcon style={{ width: '21px', marginLeft: '-1px', marginTop: '1px' }} />,
})`
  background-color: white;
`;

const FacebookLabel = styled(Reaction).attrs({
  children: <FacebookIcon style={{ width: '21px', marginLeft: '-1px', marginTop: '1px' }} />,
})`
  background-color: white;
  ${FacebookIcon} {
    height: 60%;
  }
`;

const GithubLabel = styled(Reaction).attrs({
  children: <GithubIcon style={{ width: '21px', marginLeft: '-1px', marginTop: '1px' }} />,
})`
  background-color: white;
  ${GithubIcon} {
    height: 60%;
  }
`;

const TwitterLabel = styled(Reaction).attrs({
  children: <TwitterIcon style={{ width: '21px', marginLeft: '-1px', marginTop: '1px' }} />,
})`
  background-color: white;
  ${TwitterIcon} {
    height: 50%;
  }
`;

const InstagramLabel = styled(Reaction).attrs({
  children: <InstagramIcon style={{ width: '21px', marginLeft: '-1px', marginTop: '1px' }} />,
})`
  background-color: white;
  ${InstagramIcon} {
    height: 50%;
  }
`;

const LabelItems = {
  facebook: FacebookLabel,
  twitter: TwitterLabel,
  instagram: InstagramLabel,
  github: GithubLabel,
};

const blink = keyframes`
  0% {
    background-color: #2850d9;
  }

  100% {
    background-color: transparent;
  }
`;

const ClubStip = styled.div`
  border-radius: 12px 0 0 12px;
  position: absolute;
  background: ${({ color }) => color};
  top: 0;
  left: 0;
  width: 45px;
  height: 100%;

  @media (max-width: 770px) {
    width: 30px;
  }
`;

const ClubLink = styled(Link)`
  position: absolute;
  display: flex;
  align-items: center
  top: -5px;
  right: -5px;
  border-radius: 5px;
  padding: 5px;
  font-size: 0.8rem;
  color: ${({ secondaryColor }) => secondaryColor}!important;
  background: ${({ primaryColor }) => primaryColor};
  box-shadow: ${({ shadowColor }) => `0 1rem 1rem -0.5rem ${shadowColor}`};
  transition: all 0.15s ease;

  ::after {
    content: '→';
    margin-left: 5px;
  }

  :hover {
    transform: translateY(-2px);
    box-shadow: ${({ shadowColor }) => `0 1rem 1.5rem -0.5rem ${shadowColor}`};
  }

  :active {
    transform: scale(0.98);
    box-shadow: ${({ shadowColor }) => `0 1rem 0.9rem -0.5rem ${shadowColor}`};
  }
`;

const CardBoxContent = styled.div`
  overflow: hidden;
  border-radius: 12px;
  background-color: white;
  padding: 1.25rem;
  ${({ added }) => (added ? `animation: ${blink} 1s ease-out 1` : '')};
`;
const CardBox = styled(({ children, club, className, style }) => {
  return (
    <div className={className} style={style}>
      {club && <ClubStip color={club.primaryColor} />}
      {club && (
        <ClubLink
          to={`/clubs/${club.isCustom ? `${club.network}:${club.address}` : club.symbol}`}
          primaryColor={club.primaryColor}
          secondaryColor={club.secondaryColor}
          shadowColor={club.shadowColor}
        >
          <img src={club.logo} style={{ height: '0.8rem', marginRight: '5px' }} />
          {club.name}
        </ClubLink>
      )}
      <CardBoxContent>{children}</CardBoxContent>
    </div>
  );
})`
  position: relative;
  margin-right: 10px;
  box-shadow: 0 2rem 4rem -1.5rem rgba(118, 103, 170, 0.09);
  :not(:first-child) {
    margin-top: 2rem;
  }

  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
    :not(:first-child) {
      margin-top: 1rem;
    }
  }
`;

const getInfoAboutReplyVisibility = (hasToken, isActiveEntityFromFamily, club, isClubFeed) => {
  let message = '';
  let warning = false;
  if (!isClubFeed) {
    if (!hasToken) {
      warning = true;
      message = `Your message will be only displayed here. Aquire ${club.name} to display your message in the club.`;
    } else if (club.is721 && !isActiveEntityFromFamily && hasToken) {
      warning = true;
      message = `Your message will not be displayed in the ${club.name} club. Switch avatar.`;
    } else {
      message = `Your message will be displayed in the ${club.name} club and here.`;
    }
  }

  return { warning, message };
};

const ReplyClubInfo = styled.div`
  display: none;
  text-align: right;
  margin-top: 5px;
  font-size: 0.8em;
  color: ${({ warning }) => 'rgb(146, 143, 155)'};

  *:focus-within + & {
    display: block;
  }
`;

export class Card extends React.Component {
  replyForm = null;

  state = {
    wasShown: !this.props.added,
    areRepliesCollapsed: this.props.collapseReplies && this.props.replies.length > 3,
  };

  focusReply = () => {
    if (this.replyForm && this.replyForm.focus) {
      this.replyForm.focus();
    }
  };

  onShowLikers = (item, likes) => () => {
    this.props.onShowLikers(item, likes);
  };

  showMoreReplies = () => this.setState({ areRepliesCollapsed: false });

  onVerify = (feedItem) => {
    this.props.onVerify(feedItem);
  };

  renderItem = () => {
    const { areRepliesCollapsed } = this.state;
    const { feedItem, replies, reactions, disabledInteractions, isClubFeed } = this.props;

    if (feedItem.type === 'like') {
      return this.renderLikeItem(feedItem, disabledInteractions);
    }
    if (feedItem.type === 'response') {
      return this.renderResponseItem(feedItem);
    }

    return (
      <React.Fragment>
        {feedItem.type === 'boost' ? (
          this.renderBoostPost(feedItem)
        ) : (
          <Post
            id={feedItem.id}
            style={{ borderTop: 'none' }}
            from={feedItem.isFromAddress ? feedItem.author : feedItem.context}
            entityInfo={feedItem.isFromAddress ? feedItem.author_info : feedItem.context_info}
            createdAt={feedItem.created_at}
            message={feedItem.target}
            family={feedItem.family}
            suffix={this.getSuffix(feedItem)}
            reaction={
              (feedItem.type === 'response' && <ReplyReaction />) ||
              (feedItem.type === 'social' &&
                Object.keys(LabelItems).includes(feedItem.label) &&
                React.createElement(LabelItems[feedItem.label]))
            }
            onVerify={() => this.onVerify(feedItem)}
          />
        )}
        <PostReactions
          id={feedItem.id}
          reactions={reactions}
          replies={replies}
          disabledInteractions={disabledInteractions}
          onReply={this.focusReply}
          onShowLikers={this.onShowLikers(feedItem, reactions)}
          style={{ fontSize: '1rem' }}
        />
        {areRepliesCollapsed && <ViewMoreReplies leftCount={replies.length - 2} onClick={this.showMoreReplies} />}
        {(areRepliesCollapsed ? replies.slice(replies.length - 2) : replies).map((reply) => {
          const reactions = uniqBy((target) => target.id)([
            ...this.props.getTemporaryReactions(reply.id),
            ...(reply.likes || []),
          ]);

          return (
            <Reply
              id={reply.id}
              key={reply.id}
              from={reply.isFromAddress ? reply.author : reply.context}
              entityInfo={reply.isFromAddress ? reply.author_info : reply.context_info}
              createdAt={reply.created_at}
              message={reply.target}
              family={reply.family}
              reactions={reactions}
              etherscanUrl={createEtherscanUrl(reply)}
              onShowLikers={this.onShowLikers(reply, reactions)}
              onVerify={() => this.onVerify(reply)}
              disabledInteractions={disabledInteractions}
            />
          );
        })}
        {!disabledInteractions && (
          <IfActiveEntity>
            {() =>
              feedItem.type === 'post_club' ? (
                <IsActiveEntityFromFamily asset={`${feedItem.about_info.network}:${feedItem.about_info.address}`}>
                  {(isActiveEntityFromFamily) => (
                    <DoesActiveEntityHasToken token={feedItem.about_info}>
                      {(hasToken) => {
                        const { warning, message } = getInfoAboutReplyVisibility(
                          hasToken,
                          isActiveEntityFromFamily,
                          feedItem.about_info,
                          isClubFeed,
                        );
                        return (
                          <ReplyFormContainer about={feedItem.id} inputRef={(ref) => (this.replyForm = ref)}>
                            <ReplyClubInfo warning={warning}>{message}</ReplyClubInfo>
                          </ReplyFormContainer>
                        );
                      }}
                    </DoesActiveEntityHasToken>
                  )}
                </IsActiveEntityFromFamily>
              ) : (
                <ReplyFormContainer about={feedItem.id} inputRef={(ref) => (this.replyForm = ref)}>
                  {isClubFeed && (
                    <ReplyClubInfo>Your message will be displayed here and on the main feed.</ReplyClubInfo>
                  )}
                </ReplyFormContainer>
              )
            }
          </IfActiveEntity>
        )}
      </React.Fragment>
    );
  };

  renderBoostPost = (feedItem) => (
    <Post
      id={feedItem.id}
      style={{ borderTop: 'none' }}
      from={feedItem.target}
      entityInfo={feedItem.target_info}
      createdAt={feedItem.created_at}
      message={createEtherscanUrl(feedItem)}
      family={feedItem.family}
      suffix={
        <React.Fragment>
          <span>supported</span>
          <LinkedEntityAvatar
            size="verySmall"
            style={{ marginLeft: '0.325em', display: 'inline-block' }}
            id={feedItem.about}
            entityInfo={feedItem.about_info}
          />
          <Link to={`/${feedItem.about}`} style={{ marginLeft: '0.325em' }} className="is-hidden-mobile">
            <b>{feedItem.about_info.name}</b>
          </Link>
        </React.Fragment>
      }
      onVerify={() => this.onVerify(feedItem)}
    />
  );

  renderLikeItem = (feedItem, disabledInteractions) => {
    const { isFromAddress } = feedItem;
    return (
      <React.Fragment>
        <article className="media">
          <div className="media-left" style={{ width: '64px' }}>
            <LinkedEntityAvatar
              size="medium"
              reaction={<LikeReaction />}
              id={isFromAddress ? feedItem.author : feedItem.context}
              entityInfo={isFromAddress ? feedItem.author_info : feedItem.context_info}
            />
          </div>
          <div className="media-content">
            <CardTitle
              from={isFromAddress ? feedItem.author : feedItem.context}
              entityInfo={isFromAddress ? feedItem.author_info : feedItem.context_info}
              createdAt={feedItem.created_at}
              family={feedItem.family}
              suffix={
                <span>
                  reacted to <b>Post</b>
                </span>
              }
              onVerify={() => this.onVerify(feedItem)}
            />
          </div>
        </article>
        <Post
          style={{
            borderTop: '0',
            borderRadius: '12px',
            backgroundColor: '#f4f8fd',
            marginLeft: '80px',
            paddingLeft: '15px',
            paddingBottom: '5px',
            paddingRight: '15px',
          }}
          from={feedItem.target.isFromAddress ? feedItem.target.author : feedItem.target.context}
          entityInfo={feedItem.target.isFromAddress ? feedItem.target.author_info : feedItem.target.context_info}
          createdAt={feedItem.target.created_at}
          message={feedItem.target.target}
          family={feedItem.target.family}
          suffix={this.getSuffix(feedItem.target)}
          disabledInteractions={disabledInteractions}
          onVerify={() => this.onVerify(feedItem.target)}
        />
      </React.Fragment>
    );
  };

  renderResponseItem = (feedItem) => {
    const reply = feedItem.reply_to;
    const entityInfo = feedItem.isFromAddress ? feedItem.author_info : feedItem.context_info;
    const from = feedItem.isFromAddress ? feedItem.author : feedItem.context;
    return (
      <React.Fragment>
        <article className="media">
          <div className="media-left" style={{ width: '64px' }}>
            <LinkedEntityAvatar size="medium" id={from} entityInfo={entityInfo} />
          </div>
          <div className="media-content">
            <CardTitle
              id={reply.id}
              from={from}
              entityInfo={entityInfo}
              createdAt={feedItem.created_at}
              family={feedItem.family}
              suffix={
                <span>
                  replied to{' '}
                  <LinkedEntityAvatar
                    size="verySmall"
                    style={{ marginLeft: '0.325em', display: 'inline-block' }}
                    id={feedItem.id}
                    entityInfo={reply.isFromAddress ? reply.author_info : reply.context_info}
                  />
                  <Link to={`/${feedItem.id}`} style={{ marginLeft: '0.325em' }} className="is-hidden-mobile">
                    <b>{(reply.isFromAddress ? reply.author_info : reply.context_info).name}</b>
                  </Link>
                </span>
              }
              onVerify={() => this.onVerify(feedItem)}
            />
          </div>
        </article>
        <StartingMessage style={{ marginLeft: '80px' }}>
          <CollapsableText text={feedItem.target} />
        </StartingMessage>
      </React.Fragment>
    );
  };

  getSuffix = (feedItem) => {
    const suffix = {
      post_to: () => {
        const id = feedItem.about;
        const about = feedItem.about_info;
        return (
          <React.Fragment>
            <span>wrote to</span>
            <LinkedEntityAvatar
              size="verySmall"
              style={{ marginLeft: '0.325em', display: 'inline-block' }}
              id={id}
              entityInfo={about}
            />
            <Link to={`/${id}`} style={{ marginLeft: '0.325em' }} className="is-hidden-mobile">
              <b>{about.name}</b>
            </Link>
          </React.Fragment>
        );
      },
      post_about: () => (
        <React.Fragment>
          <span style={{ display: 'inline-flex' }}>
            wrote about
            <b
              style={{
                marginLeft: '0.325em',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: '300px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              <CollapsableText text={feedItem.about} />
            </b>
          </span>
        </React.Fragment>
      ),
      social: (feedItem) => (
        <span>
          changed its <b>{capitalize(feedItem.label)}</b>
        </span>
      ),
    };

    return suffix[feedItem.type] && suffix[feedItem.type](feedItem);
  };

  onItemVisibilityChange = (isVisible) => {
    if (isVisible) {
      this.setState({ wasShown: true });
    }
  };

  onCloseVerify = () => {
    this.setState({ showVerify: false, verifiableItem: undefined });
  };

  render() {
    const { feedItem } = this.props;
    return (
      <CardBox
        added={this.props.added && this.state.wasShown}
        style={this.props.style}
        club={feedItem.type === 'post_club' ? feedItem.about_info : null}
      >
        {!this.state.wasShown && <ReactVisibilitySensor onChange={this.onItemVisibilityChange} />}
        {this.renderItem()}
      </CardBox>
    );
  }
}

const EmptyFeedPlaceholder = styled.div`
  display: flex;
  flex: 1;
  padding: 4rem 0.75rem;
  font-size: 2rem;
  font-weight: 600;
  border-radius: 20px;
  background-color: white;
  color: #1b2437;
  justify-content: center;
`;

const ViewMoreReplies = ({ leftCount, onClick }) => (
  <div className="is-flex" style={{ margin: '15px 0' }}>
    <div className="is-hidden-mobile" style={{ marginRight: '1rem' }}>
      <div style={{ width: '64px' }} />
    </div>
    <ShowMore onClick={onClick}>
      View {leftCount} more comment
      {leftCount > 1 ? 's' : ''}
    </ShowMore>
  </div>
);

class Feed extends Component {
  state = {
    showLikes: false,
    feedItemLikes: [],
    showVerify: false,
    verifiableItem: undefined,
  };

  onShowLikers = (feedItem, reactions) => {
    this.setState({ showLikes: true, feedItemLikes: reactions });
  };

  onVerify = (item) => {
    this.setState({ showVerify: true, verifiableItem: item });
  };

  getTemporaryReactions = (id) => this.props.temporaryReactions[id] || [];

  render() {
    const {
      feedItems,
      feedLoading,
      temporaryReplies,
      getMoreFeedItems,
      feedLoadingMore,
      className,
      style,
      disabledInteractions,
      isClubFeed,
    } = this.props;
    const { showLikes, feedItemLikes, showVerify, verifiableItem } = this.state;

    return (
      <div className={className} style={{ display: 'flex', justifyContent: 'center', ...style }}>
        {feedLoading ? (
          <div style={{ paddingTop: '20px' }}>
            <Loader />
          </div>
        ) : feedItems.length > 0 ? (
          <InfiniteScroll
            style={{ width: '100%' }}
            hasMore={true}
            onLoadMore={getMoreFeedItems}
            throttle={100}
            threshold={300}
            isLoading={feedLoadingMore || feedLoading}
          >
            {feedItems.map((feedItem) => {
              const replies = pipe(
                sortBy('created_at'),
                uniqBy((about) => about.id),
              )([...(temporaryReplies[feedItem.id] || []), ...(feedItem.replies || [])]);

              const reactions = uniqBy((target) => target.id)([
                ...this.getTemporaryReactions(feedItem.id),
                ...(feedItem.likes || []),
              ]);

              return (
                <Card
                  collapseReplies
                  disabledInteractions={disabledInteractions}
                  isClubFeed={isClubFeed}
                  feedItem={feedItem}
                  replies={replies}
                  reactions={reactions}
                  key={feedItem.id}
                  added={feedItem.added}
                  onShowLikers={this.onShowLikers}
                  getTemporaryReactions={this.getTemporaryReactions}
                  onVerify={this.onVerify}
                />
              );
            })}
          </InfiniteScroll>
        ) : (
          <EmptyFeedPlaceholder>
            <b>
              <TranslationsContext.Consumer>{({ emptyFeed }) => emptyFeed}</TranslationsContext.Consumer>
            </b>
          </EmptyFeedPlaceholder>
        )}
        {showLikes && (
          <LikersModal
            onClose={() => this.setState({ showLikes: false })}
            likes={feedItemLikes}
            onVerify={this.onVerify}
          />
        )}
        {showVerify && <VerifyModal onClose={() => this.setState({ showVerify: false })} feedItem={verifiableItem} />}
      </div>
    );
  }
}
export default Feed;

export const getFeed = (
  fetchFnk,
  isFetchFnkCacheable,
  showTemporaryFeedItems,
  getFilterForTemporaryFeedItemsFnk,
  sortFnk,
) =>
  class extends Component {
    state = {
      feedLoading: false,
      feedItems: [],
      visibleItemsCount: 0,
      allFeedItems: [],
      feedVersion: undefined,
      lastFeedItemId: undefined,
      feedLoadingMore: false,
    };

    componentDidMount() {
      this.fetchFeedItems();
      if (isFetchFnkCacheable) {
        this.fetchNewItemsPeriodically();
      }
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutId);
    }

    timeoutId = null;
    fetchNewItemsPeriodically = () => {
      this.timeoutId = setTimeout(async () => {
        await this.getNewFeedItems();
        this.fetchNewItemsPeriodically();
      }, 3000);
    };

    componentDidUpdate(prevProps) {
      if (!equals(this.props.options, prevProps.options)) {
        this.fetchFeedItems();
      }
    }

    fetchFeedItems = async () => {
      this.setState({ feedLoading: true });
      try {
        if (isFetchFnkCacheable) {
          const { feedItems, total: feedItemsCount, version: feedVersion, lastItemId } = await fetchFnk({
            ...this.props.options,
            size: 30,
          });
          this.setState({ feedLoading: false, feedItems, feedItemsCount, feedVersion, lastFeedItemId: lastItemId });
        } else {
          const items = await fetchFnk(this.props.options);
          this.setState({
            feedLoading: false,
            allFeedItems: items,
            feedItems: items.slice(0, 10),
            visibleItemsCount: items.length > 10 ? 10 : items.length,
          });
        }
      } catch (e) {
        console.warn('Failed to download feedItems', e);
        this.setState({ loading: false });
      }
    };

    getMoreFeedItems = async () => {
      try {
        if (isFetchFnkCacheable) {
          if (this.state.feedLoadingMore) {
            return;
          }

          this.setState({ feedLoadingMore: true }, async () => {
            const { lastFeedItemId } = this.state;
            const { feedItems: moreFeedItems, total: feedItemsCount, lastItemId } = await fetchFnk({
              ...this.props.options,
              size: 30,
              oldestKnown: lastFeedItemId,
            });

            this.setState(({ feedItems }) => ({
              lastFeedItemId: lastItemId,
              feedLoadingMore: false,
              feedItems: [...feedItems, ...moreFeedItems],
              feedItemsCount,
            }));
          });
        } else {
          this.setState(({ visibleItemsCount, allFeedItems }) => {
            const countToShow =
              allFeedItems.length > visibleItemsCount + 30 ? visibleItemsCount + 30 : allFeedItems.length;
            return {
              visibleItemsCount: countToShow,
              feedItems: allFeedItems.slice(0, countToShow),
            };
          });
        }
      } catch (e) {
        console.warn('Failed to download more feedItems', e);
      }
    };

    getNewFeedItems = async () => {
      try {
        const { feedVersion: lastVersion, lastFeedItemId } = this.state;
        const { feedItems: newFeedItems, total: feedItemsCount, version: feedVersion } = await fetchFnk({
          ...this.props.options,
          lastVersion,
          oldestKnown: lastFeedItemId,
        });

        const addedFeedItems = newFeedItems.map((item) => ({ ...item, added: true }));
        this.setState(({ feedItems }) => ({
          feedVersion,
          feedItems: [...addedFeedItems, ...feedItems],
          feedItemsCount,
        }));
      } catch (e) {
        console.warn('Failed to download feedItems', e);
      }
    };

    render() {
      const { className } = this.props;
      const { feedItems, feedLoading, feedLoadingMore } = this.state;

      return (
        <Context.Consumer>
          {({ feedStore: { temporaryFeedItems, temporaryReplies, temporaryReactions } }) => {
            let filteredTemporaryFeedItems = [];
            if (showTemporaryFeedItems) {
              filteredTemporaryFeedItems = getFilterForTemporaryFeedItemsFnk
                ? temporaryFeedItems.filter(getFilterForTemporaryFeedItemsFnk(this.props.options))
                : temporaryFeedItems;
            }

            const allFeedItems = uniqBy('id')([...feedItems, ...filteredTemporaryFeedItems]);

            return (
              <Feed
                className={className}
                feedItems={sortFnk ? allFeedItems.sort(sortFnk) : allFeedItems}
                feedLoading={feedLoading}
                temporaryReplies={temporaryReplies}
                temporaryReactions={temporaryReactions}
                getMoreFeedItems={this.getMoreFeedItems}
                feedLoadingMore={feedLoadingMore}
              />
            );
          }}
        </Context.Consumer>
      );
    }
  };
