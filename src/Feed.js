import React from 'react';
import escapeHtml from 'lodash/escape';
import pipe from 'lodash/fp/pipe';
import uniqBy from 'lodash/fp/uniqBy';
import sortBy from 'lodash/fp/sortBy';
import take from 'lodash/fp/take';
import reverse from 'lodash/fp/reverse';
import capitalize from 'lodash/capitalize';
import timeago from 'timeago.js';
import ReactVisibilitySensor from 'react-visibility-sensor';
import Link, { A } from './Link';
import Context from './Context';
import { ConnectedReplyForm, ReplyForm } from './CommentForm';
import { EntityName, IfActiveEntity, LinkedActiveEntityAvatar, LinkedEntityAvatar, IfActiveEntityLiked } from './Entity';
import InfiniteScroll from './InfiniteScroll';
import LikeIcon from './img/like.svg';
import ReplyIcon from './img/reply.svg';
import { createUserfeedsId } from './api';
import { FacebookIcon, TwitterIcon, InstagramIcon, GithubIcon } from './Icons';
import styled, { keyframes } from 'styled-components';

const IconContainer = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const LabelIconContainer = styled(IconContainer)`
  height: 40px;
  width: 40px;
  transition: all 0.15s ease-in-out;
  background-color: #ffa6d8;
`;

const LabelText = styled.span`
  margin-left: 10px;
`;

const LabelCounter = styled.span`
  margin-left: auto;
  margin-right: 8px;
`;

const LabelButton = styled.button`
  box-sizing: border-box;
  outline: none;
  border: none;
  background: none;
  padding: 4px;
  margin: 0;
  display: flex;
  align-items: center;
  height: 50px;
  width: 140px;
  border-radius: 25px;
  border-width: 1px;
  border-style: solid;
  border-color: #ffe4f3;
  font-size: 1rem;
  transition: all 0.15s ease-in-out;
  color: ${({ liked }) => (liked ? '#ffa6d8' : 'inherit')};
  cursor: ${({ liked }) => (liked ? 'default' : 'pointer')};

  &:hover {
    box-shadow: ${({ liked }) => (liked ? 'none' : '0 5px 20px rgba(255, 166, 216, 0.4)')};
  }
`;

const Label = ({ onClick, liked, count }) => {
  return (
    <LabelButton onClick={onClick} liked={liked}>
      <LabelIconContainer>
        <img alt="" src={LikeIcon} />
      </LabelIconContainer>
      <LabelText>Like{liked && 'd'}</LabelText>
      <LabelCounter>{count}</LabelCounter>
    </LabelButton>
  );
};

export const sanitizeMessage = message => {
  const expression = /(https:\/\/[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@;:%_+.~#?&//=]*))/g;
  const replaceMatchWithLink = match => {
    return `<a href="${match}">${escapeHtml(match)}</a>`;
  };
  return message
    .split(expression)
    .map((messagePart, index) => (index % 2 === 0 ? escapeHtml(messagePart) : replaceMatchWithLink(messagePart)))
    .join('');
};

const Post = ({ id, from, createdAt, etherscanUrl, family, message, reactions, reaction, suffix, style = {} }) => {
  return (
    <article className="media" style={style}>
      <div className="media-left" style={{ width: '54px' }}>
        <LinkedEntityAvatar size="medium" reaction={reaction} id={from} />
      </div>
      <div className="media-content" style={{ overflow: 'hidden' }}>
        <CardTitle from={from} createdAt={createdAt} etherscanUrl={etherscanUrl} family={family} suffix={suffix} />
        <p
          style={{ marginTop: '20px', fontSize: '1.1rem', wordBreak: 'break-word', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: sanitizeMessage(message) }}
        />
        {reactions && (
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
            <IfActiveEntityLiked
              id={id}
              then={<Label liked count={reactions.length} />}
              other={
                <Context.Consumer>
                  {({ feedStore: { react } }) => <Label onClick={() => react(id)} count={reactions.length} />}
                </Context.Consumer>
              }
            />
            {reactions.map((reaction, index) => {
              const id = reaction.context.split(':')[2];
              return (
                <LinkedEntityAvatar key={index} id={id} size="verySmall" style={{ marginLeft: '8px' }} />
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
};

const Reply = ({ id, from, createdAt, etherscanUrl, family, message, style = {} }) => (
  <article className="media" style={{ borderTop: 'none', ...style }}>
    <div className="media-left is-hidden-mobile" style={{ position: 'relative' }}>
      <div
        style={{
          height: '54px',
          width: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width="16px" height="16px" version="1.1">
          <g fill="#e1dfec" fillRule="nonzero">
            <path d="M8,0 C3.6,0 0,3.1 0,7 C0,10.9 3.6,14 8,14 C8.4,14 8.8,14 9.1,13.9 L14,16 L14,11.6 C15.2,10.4 16,8.8 16,7 C16,3.1 12.4,0 8,0 Z" />
          </g>
        </svg>
      </div>
    </div>

    <div className="media-content columns is-mobile" style={{ overflow: 'hidden' }}>
      <div className="column is-narrow">
        <LinkedEntityAvatar size="medium" id={from} />
      </div>
      <div className="column">
        <div
          style={{
            backgroundColor: 'rgba(246,244,255,0.7)',
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
          }}
        >
          <Link to={`/${from}`}>
            <b>
              <EntityName id={from} />
            </b>
          </Link>{' '}
          <span dangerouslySetInnerHTML={{ __html: sanitizeMessage(message) }} />
        </div>
        <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
          <small style={{ color: '#928F9B' }}>
            <IfActiveEntityLiked
              id={id}
              other={
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
                        color: '#ffa6d8',
                        cursor: 'pointer'
                      }}
                    >
                      Like
                    </button>
                  )}
                </Context.Consumer>
              }
              then={<span style={{ color: '#ffa6d8' }}>Liked</span>}
            />
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

const createEtherscanUrl = item => {
  const familyPrefix = item.family === 'ethereum' ? '' : `${item.family}.`;
  return `https://${familyPrefix}etherscan.io/tx/${item.id.split(':')[1]}`;
};

const ReplyFormContainer = ({ about }) => (
  <article className="media" style={{ borderTop: 'none' }}>
    <div className="media-left is-hidden-mobile">
      <div style={{ height: '54px', width: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="16px" height="16px" version="1.1">
          <g fill="#e1dfec" fillRule="nonzero">
            <path d="M8,0 C3.6,0 0,3.1 0,7 C0,10.9 3.6,14 8,14 C8.4,14 8.8,14 9.1,13.9 L14,16 L14,11.6 C15.2,10.4 16,8.8 16,7 C16,3.1 12.4,0 8,0 Z" />
          </g>
        </svg>
      </div>
    </div>

    <div className="media-content columns is-mobile">
      <div className="column is-narrow">
        <LinkedActiveEntityAvatar size="medium" />
      </div>
      <div className="column">
        <ConnectedReplyForm Form={ReplyForm} about={about} />
      </div>
    </div>
  </article>
);

const SenderName = styled(Link)`
  font-size: 1.1rem;
`

const CardTitle = ({ from, createdAt, etherscanUrl, family, suffix }) => {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SenderName to={`/${from}`}>
          <b>
            <EntityName id={from} />
          </b>
        </SenderName>{' '}
        {suffix}
      </div>
      <div>
        <small style={{ color: '#928F9B' }}>
          {timeago().format(createdAt)}{' '}
          <A href={etherscanUrl} style={{ marginLeft: '5px', textTransform: 'capitalize' }}>
            {family}
          </A>
        </small>
      </div>
    </React.Fragment>
  );
};

const Reaction = styled(IconContainer)`
  height: 30px;
  width: 30px;
`;

const LikeReaction = styled(Reaction).attrs({ children: <img alt="" src={LikeIcon} style={{ width: '12px' }} /> })`
  background-color: #ffa6d8;
  box-shadow: 0 4px 15px 4px rgba(255, 166, 216, 0.4);
`;

const ReplyReaction = styled(Reaction).attrs({ children: <img alt="" src={ReplyIcon} style={{ width: '12px' }} /> })`
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
  github: GithubLabel
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
  box-shadow: 0 4px 10px rgba(98, 60, 234, 0.07);
  overflow: hidden;
  border-radius: 12px;
  padding: 1.25rem;
  & + & {
    margin-top: 1.5rem;
  }

  ${({ added }) => (added ? `animation: ${blink} 1s ease-out 1` : '')};
`;

class Card extends React.Component {
  state = {
    wasShown: !this.props.added
  };

  renderItem = () => {
    const { feedItem, replies, reactions } = this.props;
    if (feedItem.type === 'like') {
      return (
        <React.Fragment>
          <article className="media">
            <div className="media-left" style={{ width: '54px' }}>
              <LinkedEntityAvatar size="medium" reaction={<LikeReaction />} id={feedItem.context.split(':')[2]} />
            </div>
            <div className="media-content">
              <CardTitle
                from={feedItem.context.split(':')[2]}
                createdAt={feedItem.created_at}
                etherscanUrl={createEtherscanUrl(feedItem)}
                family={feedItem.family}
                suffix={
                  <span style={{ marginLeft: '10px' }}>
                    reacted to <b>Post</b>
                  </span>
                }
              />
            </div>
          </article>
          <Post
            from={feedItem.target.context.split(':')[2]}
            createdAt={feedItem.target.created_at}
            etherscanUrl={createEtherscanUrl(feedItem.target)}
            family={feedItem.target.family}
            message={feedItem.target.target.id}
            style={{ marginTop: '20px' }}
          />
        </React.Fragment>
      );
    } else {
      const suffix = {
        response: () => <span style={{ marginLeft: '10px' }}>replied</span>,
        post_to: () => {
          const id = feedItem.about.id.split(':')[2];
          return (
            <React.Fragment>
              <span style={{ marginLeft: '10px' }}>wrote to</span>
              <LinkedEntityAvatar size="verySmall" style={{ marginLeft: '10px' }} id={id} />
              <Link to={`/${id}`} style={{ marginLeft: '10px' }} className="is-hidden-mobile">
                <b>
                  <EntityName id={id} />
                </b>
              </Link>
            </React.Fragment>
          );
        },
        post_about: () => (
          <React.Fragment>
            <span style={{ marginLeft: '10px' }}>wrote about</span>
            <b
              style={{
                marginLeft: '10px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: '300px',
                display: 'inline-block',
                whiteSpace: 'nowrap'
              }}
              dangerouslySetInnerHTML={{ __html: sanitizeMessage(feedItem.about.id) }}
            />
          </React.Fragment>
        ),
        labels: feedItem => <span style={{ marginLeft: '10px' }}>changed its {capitalize(feedItem.labels[0])}</span>
      };
      return (
        <React.Fragment>
          {feedItem.type === 'response' && (
            <Reply
              id={feedItem.about.id}
              from={feedItem.about.context.split(':')[2]}
              createdAt={feedItem.about.created_at}
              etherscanUrl={createEtherscanUrl(feedItem.about)}
              family={feedItem.about.family}
              message={feedItem.about.target.id}
            />
          )}
          <Post
            id={feedItem.id}
            style={{ borderTop: 'none' }}
            from={feedItem.context.split(':')[2]}
            createdAt={feedItem.created_at}
            message={feedItem.target.id}
            family={feedItem.family}
            etherscanUrl={createEtherscanUrl(feedItem)}
            reactions={reactions}
            suffix={suffix[feedItem.type] && suffix[feedItem.type](feedItem)}
            reaction={
              (feedItem.type === 'response' && <ReplyReaction />) ||
              (feedItem.type === 'labels' &&
                Object.keys(LabelItems).includes(feedItem.labels[0]) &&
                React.createElement(LabelItems[feedItem.labels[0]]))
            }
          />
          {replies.map(reply => (
            <Reply
              id={reply.id}
              key={reply.id}
              from={reply.context.split(':')[2]}
              createdAt={reply.created_at}
              message={reply.target.id}
              family={reply.family}
              etherscanUrl={createEtherscanUrl(reply)}
            />
          ))}{' '}
          <IfActiveEntity>{() => <ReplyFormContainer about={feedItem.id} />}</IfActiveEntity>
        </React.Fragment>
      );
    }
  };

  onItemVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({ wasShown: true });
    }
  };

  render() {
    return (
      <CardBox added={this.props.added && this.state.wasShown}>
        {!this.state.wasShown && <ReactVisibilitySensor onChange={this.onItemVisibilityChange} />}
        {this.renderItem()}
      </CardBox>
    );
  }
}

const Block = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background: #623cea;
  animation: blockAnimation 1s linear infinite;
  border-radius: 6px;
  will-change: transform;

  @keyframes blockAnimation {
    25% {
      transform: translateY(9px) rotate(22.5deg);
    }
    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    }
    75% {
      transform: translateY(9px) rotate(67.5deg);
    }
    100% {
      transform: translateY(0) rotate(90deg);
    }
  }
`;

const Shadow = styled.div`
  width: 100px;
  height: 10px;
  background: #e9ebff;
  opacity: 1;
  position: absolute;
  bottom: -30px;
  left: 0px;
  border-radius: 50%;
  animation: shadowAnimation 1s linear infinite;
  will-change: transform;
  z-index: 2;

  @keyframes shadowAnimation {
    50% {
      transform: scale(1.2, 1);
    }
  }
`;

const Bottom = styled.div`
  height: 10px;
  background-color: inherit;
  width: 100px;
  display: block;
  position: absolute;
  z-index: 1;
  bottom: -40px;
`;

const LonelyBlock = styled.div`
  position: relative;
  background-color: inherit;
`;

const FeedContainer = styled.div`
  padding: 40px 0.75rem;

  @media (max-width: 770px) {
    padding: 0px 0.75rem 20px;
  }
`

const Feed = ({ feedItems, feedLoading, temporaryReplies, temporaryReactions, showMoreFeedItems }) => (
  <FeedContainer className="container">
    <div className="columns">
      <div className="column is-6 is-offset-3" style={{ display: 'flex', justifyContent: 'center' }}>
        {feedLoading ? (
          <LonelyBlock>
            <Block />
            <Shadow />
            <Bottom />
          </LonelyBlock>
        ) : (
          <InfiniteScroll
            style={{ width: '100%' }}
            hasMore={true}
            onLoadMore={showMoreFeedItems}
            throttle={100}
            threshold={300}
            isLoading={false}
          >
            {feedItems.map(feedItem => {
              const replies = uniqBy(about => about.id)([
                ...(temporaryReplies[feedItem.id] || []),
                ...(feedItem.abouted || [])
              ]);
              const reactions = uniqBy(target => target.id)([
                ...(temporaryReactions[feedItem.id] || []),
                ...(feedItem.targeted || [])
              ]);
              return (
                <Card
                  feedItem={feedItem}
                  replies={replies}
                  reactions={reactions}
                  key={feedItem.id}
                  added={feedItem.added}
                />
              );
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  </FeedContainer>
);

export default Feed;

export const ConnectedFeed = ({ forEntity }) => (
  <Context.Consumer>
    {({
      feedStore: {
        feedItems,
        feedLoading,
        temporaryFeedItems,
        temporaryReplies,
        temporaryReactions,
        shownFeedItemsCount,
        showMoreFeedItems
      }
    }) => {
      let filteredTemporaryFeedItems = temporaryFeedItems;
      if (forEntity) {
        filteredTemporaryFeedItems = temporaryFeedItems.filter(({ context, about }) => {
          const userfeedsEntityId = createUserfeedsId(forEntity.id);
          return context === userfeedsEntityId || (about && about.id === userfeedsEntityId);
        });
      }
      const allFeedItems = pipe(uniqBy('id'), sortBy('created_at'), reverse, take(shownFeedItemsCount))([
        ...feedItems,
        ...filteredTemporaryFeedItems
      ]);
      return (
        <Feed
          feedItems={allFeedItems}
          feedLoading={feedLoading}
          temporaryReplies={temporaryReplies}
          temporaryReactions={temporaryReactions}
          showMoreFeedItems={showMoreFeedItems}
        />
      );
    }}
  </Context.Consumer>
);
