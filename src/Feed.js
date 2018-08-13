import React, { Component } from 'react';
import pipe from 'lodash/fp/pipe';
import find from 'lodash/fp/find';
import uniqBy from 'lodash/fp/uniqBy';
import sortBy from 'lodash/fp/sortBy';
import reverse from 'lodash/fp/reverse';
import capitalize from 'lodash/capitalize';
import timeago from 'timeago.js';
import ReactVisibilitySensor from 'react-visibility-sensor';
import styled, { keyframes } from 'styled-components';

import { FixedModal } from './Modal';
import Link, { A } from './Link';
import Context from './Context';
import { ConnectedReplyForm, ReplyForm } from './CommentForm';
import { IfActiveEntity, LinkedActiveEntityAvatar, LinkedEntityAvatar, IfActiveEntityLiked } from './Entity';
import InfiniteScroll from './InfiniteScroll';
import { FacebookIcon, TwitterIcon, InstagramIcon, GithubIcon, LikeIcon, ReplyIcon, empty } from './Icons';
import TranslationsContext from './Translations';
import Loader from './Loader';
import ercs20 from './erc20';
import { H3 } from './Components';
import { CollapsableText } from './CollapsableText';

const IconContainer = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StartingMessage = styled.p`
  margin-top: 20px;
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
  margin: 20px 0;
  @media (max-width: 770px) {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

const LabelText = styled.span`
  margin-left: 10px;
  transition: all 0.15s ease-in-out;
`;

const LabelCounter = styled.span`
  margin-left: 0.3125em;
  height: 1.25em;
  padding: 0.125em 0.625em;
  line-height: 1.25em;
  border-radius: 1.25em;
  background: ${({ unActive, background }) => (!unActive ? background : '#cfd3e2')};
  color: ${({ unActive }) => unActive && '#000000'};
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
  padding: 4px;
`;

const LabelIconContainer = styled(IconContainer)`
  height: 1em;
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
          shadow="0 0 20px 9px rgba(255, 117, 117, 0.2)"
          background="rgba(255, 117, 117, 0.2)"
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
      <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
        {disabledInteractions ? (
          <LikeLabel unActive count={reactions.length} />
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

const Post = ({ id, from, entityInfo, createdAt, etherscanUrl, family, message, reaction, suffix, style = {} }) => {
  return (
    <article className="media" style={style}>
      <div className="media-left" style={{ width: '54px' }}>
        <LinkedEntityAvatar size="medium" reaction={reaction} id={from} entityInfo={entityInfo} />
      </div>
      <div className="media-content">
        <CardTitle
          id={id}
          from={from}
          entityInfo={entityInfo}
          createdAt={createdAt}
          etherscanUrl={etherscanUrl}
          family={family}
          suffix={suffix}
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
  etherscanUrl,
  family,
  message,
  reactions,
  onShowLikers,
  disabledInteractions,
  style = {},
}) => (
  <article className="media" style={{ borderTop: 'none', ...style }}>
    <div className="media-left is-hidden-mobile" style={{ position: 'relative' }}>
      <div
        style={{
          height: '54px',
          width: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
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
            <A href={etherscanUrl} style={{ marginLeft: '5px', textTransform: 'capitalize' }}>
              {family}
            </A>
          </small>
        </div>
      </div>
    </div>
  </article>
);

const createEtherscanUrl = (item) => {
  if (item.family.toLowerCase() === 'http') return undefined;
  const familyPrefix = item.family === 'ethereum' ? '' : `${item.family}.`;
  return `https://${familyPrefix}etherscan.io/tx/${item.id.split(':')[1]}`;
};

const ReplyFormContainer = ({ about, ...props }) => (
  <article className="media" style={{ borderTop: 'none' }}>
    <div className="media-left is-hidden-mobile">
      <div style={{ height: '54px', width: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
    </div>

    <div className="media-content columns is-mobile">
      <div className="column is-narrow">
        <LinkedActiveEntityAvatar size="medium" />
      </div>
      <div className="column">
        <ConnectedReplyForm Form={ReplyForm} about={about} {...props} />
      </div>
    </div>
  </article>
);

const SenderName = styled(Link)`
  font-size: 1rem;
`;

const CardTitle = ({ id, from, entityInfo, createdAt, etherscanUrl, family, suffix, share }) => {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SenderName to={`/${from}`}>{entityInfo.name}</SenderName>
        <span style={{ color: '#928F9B', marginLeft: '15px', fontSize: '14px' }}>
          {timeago().format(createdAt)}
          <A href={etherscanUrl} style={{ marginLeft: '15px', textTransform: 'capitalize' }}>
            {family}
          </A>
        </span>
      </div>
      {suffix}
    </React.Fragment>
  );
};

const Reaction = styled(IconContainer)`
  height: 15px;
  width: 15px;
`;

const LikeReaction = styled(Reaction).attrs({ children: <LikeIcon style={{ width: '15px' }} /> })`
  background-color: rgba(255, 117, 117, 0.4);
  box-shadow: 0 0 20px 9px rgba(255, 117, 117, 0.4);
`;

const ReplyReaction = styled(Reaction).attrs({ children: <ReplyIcon style={{ width: '12px' }} /> })`
  background-color: #264dd9;
  box-shadow: 0 4px 15px 4px rgba(98, 60, 234, 0.3);
`;

const FacebookLabel = styled(Reaction).attrs({ children: <FacebookIcon /> })`
  background-color: #4167b2;
  box-shadow: 0 4px 15px 4px rgba(65, 103, 178, 0.3);
  ${FacebookIcon} {
    height: 60%;
  }
`;

const GithubLabel = styled(Reaction).attrs({ children: <GithubIcon /> })`
  background-color: #24292e;
  box-shadow: 0 4px 15px 4px rgba(36, 41, 46, 0.3);
  ${GithubIcon} {
    height: 60%;
  }
`;

const TwitterLabel = styled(Reaction).attrs({ children: <TwitterIcon /> })`
  background-color: #1ca1f2;
  box-shadow: 0 4px 15px 4px rgba(28, 161, 242, 0.3);
  ${TwitterIcon} {
    height: 50%;
  }
`;

const InstagramLabel = styled(Reaction).attrs({ children: <InstagramIcon /> })`
  background-color: #f41476;
  box-shadow: 0 4px 15px 4px rgba(244, 20, 118, 0.3);
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
    background-color: #264dd9;
  }

  100% {
    background-color: transparent;
  }
`;

const CardBox = styled.div`
  box-shadow: 0 2rem 5rem -2rem rgba(118, 103, 170, 0.12);
  overflow: hidden;
  border-radius: 12px;
  border: solid 1px #efedf6;
  padding: 1.25rem;
  background-color: white;
  border: 1px solid #f0eef6;
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

  ${({ added }) => (added ? `animation: ${blink} 1s ease-out 1` : '')};
`;

export class Card extends React.Component {
  state = {
    wasShown: !this.props.added,
  };

  replyForm = null;

  focusReply = () => {
    if (this.replyForm && this.replyForm.focus) {
      this.replyForm.focus();
    }
  };

  onShowLikers = (item, likes) => () => {
    this.props.onShowLikers(item, likes);
  };

  renderItem = () => {
    const { feedItem, replies, reactions, disabledInteractions } = this.props;
    const { isFromAddress } = feedItem;

    if (feedItem.type === 'like') {
      return (
        <React.Fragment>
          <article className="media">
            <div className="media-left" style={{ width: '54px' }}>
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
                etherscanUrl={createEtherscanUrl(feedItem)}
                family={feedItem.family}
                suffix={
                  <span>
                    reacted to <b>Post</b>
                  </span>
                }
              />
            </div>
          </article>
          <Post
            style={{ marginTop: '20px' }}
            from={feedItem.target.isFromAddress ? feedItem.target.author : feedItem.target.context}
            entityInfo={feedItem.target.isFromAddress ? feedItem.target.author_info : feedItem.target.context_info}
            createdAt={feedItem.target.created_at}
            message={feedItem.target.target}
            family={feedItem.target.family}
            etherscanUrl={createEtherscanUrl(feedItem.target)}
            suffix={this.getSuffix(feedItem.target)}
            disabledInteractions={disabledInteractions}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Post
          id={feedItem.id}
          style={{ borderTop: 'none' }}
          from={feedItem.isFromAddress ? feedItem.author : feedItem.context}
          entityInfo={feedItem.isFromAddress ? feedItem.author_info : feedItem.context_info}
          createdAt={feedItem.created_at}
          message={feedItem.target}
          family={feedItem.family}
          etherscanUrl={createEtherscanUrl(feedItem)}
          suffix={this.getSuffix(feedItem)}
          reaction={
            (feedItem.type === 'response' && <ReplyReaction />) ||
            (feedItem.type === 'social' &&
              Object.keys(LabelItems).includes(feedItem.label) &&
              React.createElement(LabelItems[feedItem.label]))
          }
        />
        <PostReactions
          id={feedItem.id}
          reactions={reactions}
          replies={replies}
          disabledInteractions={disabledInteractions}
          onReply={this.focusReply}
          onShowLikers={this.onShowLikers(feedItem, reactions)}
          style={{ fontSize: '1rem' }}
        />
        {replies.map((reply) => {
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
              disabledInteractions={disabledInteractions}
            />
          );
        })}{' '}
        {!disabledInteractions && (
          <IfActiveEntity>
            {() => <ReplyFormContainer about={feedItem.id} inputRef={(ref) => (this.replyForm = ref)} />}
          </IfActiveEntity>
        )}
      </React.Fragment>
    );
  };

  getSuffix = (feedItem) => {
    const suffix = {
      post_club: () => {
        const [network, address] = feedItem.about.split(':');
        const token = find({ network, address })(ercs20);

        return (
          <React.Fragment>
            <span>wrote in</span>
            <Link to={`/discover/byToken/${token.symbol}`} style={{ marginLeft: '10px' }}>
              <b>{token.name} club </b>
            </Link>
          </React.Fragment>
        );
      },
      post_to: () => {
        const id = feedItem.about;
        const about = feedItem.about_info;
        return (
          <React.Fragment>
            <span>wrote to</span>
            <LinkedEntityAvatar
              size="verySmall"
              style={{ marginLeft: '10px', display: 'inline-block' }}
              id={id}
              entityInfo={about}
            />
            <Link to={`/${id}`} style={{ marginLeft: '10px' }} className="is-hidden-mobile">
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
                marginLeft: '10px',
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
      labels: (feedItem) => <span>changed its {capitalize(feedItem.labels[0])}</span>,
    };

    return suffix[feedItem.type] && suffix[feedItem.type](feedItem);
  };

  onItemVisibilityChange = (isVisible) => {
    if (isVisible) {
      this.setState({ wasShown: true });
    }
  };

  render() {
    return (
      <CardBox added={this.props.added && this.state.wasShown} style={this.props.style}>
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

export const LikersModal = styled(({ likes, onClose, className }) => (
  <FixedModal onClose={onClose}>
    <div className={className}>
      <H3 style={{ marginBottom: '30px' }}>Liked by</H3>
      {likes.map(({ context, context_info, isFromAddress, author, author_info }, index) => (
        <div key={`${context}:${index}`} style={{ display: 'flex', marginBottom: '15px' }}>
          <LinkedEntityAvatar
            id={isFromAddress ? author : context}
            entityInfo={isFromAddress ? author_info : context_info}
            size="medium"
          />
          <Link to={`/${isFromAddress ? author : context}`} style={{ display: 'block', marginLeft: '15px' }}>
            <b>{(isFromAddress ? author_info : context_info).name}</b>
          </Link>
        </div>
      ))}
    </div>
  </FixedModal>
))`
  border-radius: 30px;
  padding: 30px;
  background: #ffffff;
`;

class Feed extends Component {
  state = {
    showModal: false,
    feedItemLikes: [],
  };

  onShowLikers = (feedItem, reactions) => {
    this.setState({ showModal: true, feedItemLikes: reactions });
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
    } = this.props;
    const { showModal, feedItemLikes } = this.state;

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
                  disabledInteractions={disabledInteractions}
                  feedItem={feedItem}
                  replies={replies}
                  reactions={reactions}
                  key={feedItem.id}
                  added={feedItem.added}
                  onShowLikers={this.onShowLikers}
                  getTemporaryReactions={this.getTemporaryReactions}
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
        {showModal && <LikersModal onClose={() => this.setState({ showModal: false })} likes={feedItemLikes} />}
      </div>
    );
  }
}
export default Feed;

export const ConnectedFeed = ({ forEntity, className }) => (
  <Context.Consumer>
    {({
      feedStore: {
        feedItems,
        feedLoading,
        temporaryFeedItems,
        temporaryReplies,
        temporaryReactions,
        getMoreFeedItems,
        feedLoadingMore,
      },
    }) => {
      let filteredTemporaryFeedItems = temporaryFeedItems;
      if (forEntity) {
        filteredTemporaryFeedItems = temporaryFeedItems.filter(({ context, about }) => {
          const userfeedsEntityId = forEntity;
          return context === userfeedsEntityId || (about && about.id === userfeedsEntityId);
        });
      }
      const allFeedItems = pipe(
        uniqBy('id'),
        sortBy('created_at'),
        reverse,
      )([...feedItems, ...filteredTemporaryFeedItems]);
      return (
        <Feed
          className={className}
          feedItems={allFeedItems}
          feedLoading={feedLoading}
          temporaryReplies={temporaryReplies}
          temporaryReactions={temporaryReactions}
          getMoreFeedItems={() => (forEntity ? getMoreFeedItems(forEntity.id) : getMoreFeedItems())}
          feedLoadingMore={feedLoadingMore}
        />
      );
    }}
  </Context.Consumer>
);
