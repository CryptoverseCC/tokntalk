import React from 'react';
import escapeHtml from 'lodash/escape';
import pipe from 'lodash/fp/pipe';
import find from 'lodash/fp/find';
import uniqBy from 'lodash/fp/uniqBy';
import sortBy from 'lodash/fp/sortBy';
import reverse from 'lodash/fp/reverse';
import capitalize from 'lodash/capitalize';
import timeago from 'timeago.js';
import ReactVisibilitySensor from 'react-visibility-sensor';

import Link, { A } from './Link';
import Context from './Context';
import { ConnectedReplyForm, ReplyForm } from './CommentForm';
import {
  EntityName,
  IfActiveEntity,
  LinkedActiveEntityAvatar,
  LinkedEntityAvatar,
  IfActiveEntityLiked,
} from './Entity';
import InfiniteScroll from './InfiniteScroll';
import { FacebookIcon, TwitterIcon, InstagramIcon, GithubIcon, LikeIcon, ReplyIcon, empty } from './Icons';
import styled, { keyframes } from 'styled-components';
import TranslationsContext from './Translations';
import Loader from './Loader';
import ercs20 from './erc20';

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
  margin-left: 5px;
  height: 20px;
  padding: 2px 10px;
  line-height: 20px;
  border-radius: 15px;
  background: ${({ unActive, background }) => (!unActive ? background : '#cfd3e2')};
  color: ${({ unActive }) => unActive && '#000000'};
`;

const LabelButton = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 1rem !important; //TODO
  font-weight: 600;
  transition: all 0.15s ease-in-out;
  color: ${({ unActive, color }) => (!unActive ? color : '#918f9b')};
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

const LikeLabel = ({ onClick, liked, unActive, count }) => {
  return (
    <LabelButton onClick={onClick} liked={liked} unActive={unActive} color="#ff8482">
      <LabelIconContainer
        liked={liked}
        unActive={unActive}
        shadow="0 0 20px 9px rgba(255, 117, 117, 0.2)"
        background="rgba(255, 117, 117, 0.2)"
      >
        <LikeIcon inactive={unActive} />
      </LabelIconContainer>
      <LabelText>
        Like
        {liked && 'd'}
      </LabelText>
      <LabelCounter unActive={unActive} background="#ffebeb">
        {count}
      </LabelCounter>
    </LabelButton>
  );
};

const ReplyLabel = ({ onClick, unActive, count }) => {
  return (
    <LabelButton onClick={onClick} unActive={unActive} color="#2850d9">
      <LabelIconContainer
        unActive={unActive}
        shadow="0 0 20px 9px rgba(89, 123, 246, 0.11)"
        background="rgba(89, 123, 246, 0.11)"
      >
        <ReplyIcon inactive={unActive} />
      </LabelIconContainer>
      <LabelText>Reply</LabelText>
      <LabelCounter unActive={unActive} background="#ebefff">
        {count}
      </LabelCounter>
    </LabelButton>
  );
};

const PostReactions = ({ id, reactions, replies, disabledInteractions, onReply }) => (
  <ArticleReactions>
    <div className="" style={{ width: '70px' }} />
    <div className="columns is-mobile" style={{ width: '100%' }}>
      <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
        {disabledInteractions ? (
          <LikeLabel unActive count={reactions.length} />
        ) : (
          <IfActiveEntityLiked
            reactions={reactions}
            unActive={<LikeLabel unActive count={reactions.length} />}
            notLiked={
              <Context.Consumer>
                {({ feedStore: { react } }) => <LikeLabel onClick={() => react(id)} count={reactions.length} />}
              </Context.Consumer>
            }
            liked={<LikeLabel liked count={reactions.length} />}
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

export const sanitizeMessage = (message) => {
  const expression = /(\bhttps?:\/\/[^.,?!:;\s<>"]+(?:[.,?!:;]+[^.,?!:;\s<>"]+)+)/g;
  const replaceMatchWithLink = (match) => {
    return `<a href="${match}">${escapeHtml(match)}</a>`;
  };
  return message
    .split(expression)
    .map((messagePart, index) => (index % 2 === 0 ? escapeHtml(messagePart) : replaceMatchWithLink(messagePart)))
    .join('');
};

const Post = ({ id, from, createdAt, etherscanUrl, family, message, reaction, suffix, style = {} }) => {
  return (
    <article className="media" style={style}>
      <div className="media-left" style={{ width: '54px' }}>
        <LinkedEntityAvatar size="medium" reaction={reaction} id={from} />
      </div>
      <div className="media-content">
        <CardTitle
          id={id}
          from={from}
          createdAt={createdAt}
          etherscanUrl={etherscanUrl}
          family={family}
          suffix={suffix}
        />
        <StartingMessage dangerouslySetInnerHTML={{ __html: sanitizeMessage(message) }} />
      </div>
    </article>
  );
};

const Reply = ({ id, from, createdAt, etherscanUrl, family, message, reactions, disabledInteractions, style = {} }) => (
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
        <LinkedEntityAvatar size="medium" id={from} />
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
            <b>
              <EntityName id={from} />
            </b>
          </Link>
          <span dangerouslySetInnerHTML={{ __html: sanitizeMessage(message) }} />
        </div>
        <div>
          <small style={{ color: '#928F9B' }}>
            {disabledInteractions ? (
              <span style={{ color: '#FF7777' }}>Like {reactions.length ? `(${reactions.length})` : ''}</span>
            ) : (
              <IfActiveEntityLiked
                reactions={reactions}
                notLiked={
                  <Context.Consumer>
                    {({ feedStore: { react } }) => (
                      <button
                        onClick={() => react(id)}
                        style={{
                          border: 'none',
                          background: 'none',
                          display: 'inline-block',
                          padding: 0,
                          margin: 0,
                          color: '#FF7777',
                          cursor: 'pointer',
                        }}
                      >
                        Like {reactions.length ? `(${reactions.length})` : ''}
                      </button>
                    )}
                  </Context.Consumer>
                }
                liked={
                  <span style={{ color: '#FF7777' }}>Liked {reactions.length ? `(${reactions.length})` : ''}</span>
                }
                unActive={
                  <span style={{ color: '#FF7777' }}>Like {reactions.length ? `(${reactions.length})` : ''}</span>
                }
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
  font-weight: 600;
`;

const CardTitle = ({ id, from, createdAt, etherscanUrl, family, suffix, share }) => {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SenderName to={`/${from}`}>
          <EntityName id={from} />
        </SenderName>{' '}
        {/* {share ? share : null} */}
        <span style={{ color: '#928F9B', marginLeft: '15px', fontSize: '14px' }}>
          {/* <Link to={{ pathname: `/thread/${id}`, state: { modal: true } }}>{timeago().format(createdAt)} </Link> */}
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
  background-color: #623cea;
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
    background-color: #623cea;
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

  renderItem = () => {
    const { feedItem, replies, reactions, disabledInteractions } = this.props;

    if (feedItem.type === 'like') {
      return (
        <React.Fragment>
          <article className="media">
            <div className="media-left" style={{ width: '54px' }}>
              <LinkedEntityAvatar size="medium" reaction={<LikeReaction />} id={feedItem.context} />
            </div>
            <div className="media-content">
              <CardTitle
                from={feedItem.context}
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
            from={feedItem.target.context}
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
          from={feedItem.context}
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
        />
        {replies.map((reply) => (
          <Reply
            id={reply.id}
            key={reply.id}
            from={reply.context}
            createdAt={reply.created_at}
            message={reply.target}
            family={reply.family}
            reactions={reply.likes}
            etherscanUrl={createEtherscanUrl(reply)}
            disabledInteractions={disabledInteractions}
          />
        ))}{' '}
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
            <Link to={`/discover/byToken/${token.symbol}/feed`} style={{ marginLeft: '10px' }}>
              <b>{token.name} club </b>
            </Link>
          </React.Fragment>
        );
      },
      post_to: () => {
        const id = feedItem.about;
        return (
          <React.Fragment>
            <span>wrote to</span>
            <LinkedEntityAvatar size="verySmall" style={{ marginLeft: '10px', display: 'inline-block' }} id={id} />
            <Link to={`/${id}`} style={{ marginLeft: '10px' }} className="is-hidden-mobile">
              <EntityName id={id} />
            </Link>
          </React.Fragment>
        );
      },
      post_about: () => (
        <React.Fragment>
          <span>wrote about</span>
          <b
            style={{
              marginLeft: '10px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              maxWidth: '300px',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
            dangerouslySetInnerHTML={{ __html: sanitizeMessage(feedItem.about) }}
          />
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

const Feed = ({
  feedItems,
  feedLoading,
  temporaryReplies,
  temporaryReactions,
  getMoreFeedItems,
  feedLoadingMore,
  className,
  style,
  disabledInteractions,
}) => (
  <div
    className={className || 'column is-6 is-offset-3'}
    style={{ display: 'flex', justifyContent: 'center', ...style }}
  >
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
            ...(temporaryReactions[feedItem.id] || []),
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
  </div>
);

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
