import React from 'react';
import escapeHtml from 'lodash/escape';
import pipe from 'lodash/fp/pipe';
import uniqBy from 'lodash/fp/uniqBy';
import sortBy from 'lodash/fp/sortBy';
import take from 'lodash/fp/take';
import reverse from 'lodash/fp/reverse';
import timeago from 'timeago.js';
import ReactVisibilitySensor from 'react-visibility-sensor';
import { Link } from 'react-router-dom';
import Context from './Context';
import { ConnectedReplyForm, ReplyForm } from './CommentForm';
import { EntityName, IfActiveEntity, ActiveEntityAvatar, EntityAvatar, IfActiveEntityLiked } from './Entity';
import InfiniteScroll from './InfiniteScroll';
import LikeIcon from './img/like.svg';
import ReplyIcon from './img/reply.svg';

const Label = ({ onClick, className, icon, count, colors, style = {} }) => {
  return (
    <button
      onClick={onClick}
      className={`cp-label ${className ? className : ''}`}
      style={{
        outline: 'none',
        border: 'none',
        background: 'none',
        padding: 0,
        margin: 0
      }}
    >
      <div
        className="cp-label-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '50px',
          width: '140px',
          borderRadius: '25px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: colors.border,
          padding: '4px',
          boxSizing: 'border-box',
          fontSize: '16px',
          transition: 'all 0.15s ease-in-out',
          ...style
        }}
      >
        <div
          className="cp-label-icon_container"
          style={{
            height: '40px',
            width: '40px',
            backgroundColor: colors.iconBackground,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease-in-out'
          }}
        >
          {icon}
        </div>
        <span className="cp-label-text" style={{ marginLeft: '10px' }} />
        <span style={{ marginLeft: 'auto', marginRight: '8px', color: colors.count }}>{count}</span>
      </div>
    </button>
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
        <EntityAvatar size="medium" reaction={reaction} id={from} />
      </div>
      <div className="media-content">
        <CardTitle from={from} createdAt={createdAt} etherscanUrl={etherscanUrl} family={family} suffix={suffix} />
        <p
          style={{ marginTop: '20px', fontSize: '18px', wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: sanitizeMessage(message) }}
        />
        {reactions && (
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
            <IfActiveEntityLiked
              id={id}
              then={
                <Label
                  className="cp-like cp-label--done"
                  icon={<img alt="" src={LikeIcon} />}
                  count={reactions.length}
                  colors={{ border: '#ffe4f3', iconBackground: '#FFA6D8', count: '#FFA6D8' }}
                />
              }
              other={
                <Context.Consumer>
                  {({ feedStore: { react } }) => (
                    <Label
                      onClick={() => react(id)}
                      className="cp-like"
                      icon={<img alt="" src={LikeIcon} />}
                      count={reactions.length}
                      colors={{ border: '#ffe4f3', iconBackground: '#FFA6D8', count: '#FFA6D8' }}
                    />
                  )}
                </Context.Consumer>
              }
            />
            {reactions.map((reaction, index) => {
              const id = reaction.context.split(':')[2];
              return (
                <Link to={`/${id}`} key={index}>
                  <EntityAvatar id={id} size="verySmall" style={{ marginLeft: '8px' }} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
};

const Reply = ({ id, highlighted, from, createdAt, etherscanUrl, family, message, style = {} }) => (
  <article className="media" style={{ borderTop: 'none', ...style }}>
    <div className={`media-left ${highlighted ? 'cp-reply--highlighted' : ''}`} style={{ position: 'relative' }}>
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

    <div className="media-content columns">
      <div className="column is-narrow">
        <EntityAvatar size="medium" id={from} />
      </div>
      <div className="column">
        <div
          style={{
            backgroundColor: 'rgba(246,244,255,0.7)',
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            wordBreak: 'break-word'
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
            <a href={etherscanUrl} style={{ marginLeft: '5px', textTransform: 'capitalize' }}>
              {family}
            </a>
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
    <div className="media-left">
      <div style={{ height: '54px', width: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="16px" height="16px" version="1.1">
          <g fill="#e1dfec" fillRule="nonzero">
            <path d="M8,0 C3.6,0 0,3.1 0,7 C0,10.9 3.6,14 8,14 C8.4,14 8.8,14 9.1,13.9 L14,16 L14,11.6 C15.2,10.4 16,8.8 16,7 C16,3.1 12.4,0 8,0 Z" />
          </g>
        </svg>
      </div>
    </div>

    <div className="media-content columns">
      <div className="column is-narrow">
        <ActiveEntityAvatar size="medium" />
      </div>
      <div className="column">
        <ConnectedReplyForm Form={ReplyForm} about={about} />
      </div>
    </div>
  </article>
);

const CardTitle = ({ from, createdAt, etherscanUrl, family, suffix }) => {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`/${from}`} style={{ fontSize: '18px' }}>
          <b>
            <EntityName id={from} />
          </b>
        </Link>{' '}
        {suffix}
      </div>
      <div>
        <small style={{ color: '#928F9B' }}>
          {timeago().format(createdAt)}{' '}
          <a href={etherscanUrl} style={{ marginLeft: '5px', textTransform: 'capitalize' }}>
            {family}
          </a>
        </small>
      </div>
    </React.Fragment>
  );
};

const Reaction = ({ backgroundColor, boxShadow, Icon }) => (
  <div
    style={{
      height: '30px',
      width: '30px',
      backgroundColor: backgroundColor,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: boxShadow
    }}
  >
    <img alt="" src={Icon} style={{ width: '12px' }} />
  </div>
);

const LikeReaction = () => (
  <Reaction backgroundColor="#ffa6d8" boxShadow="0 4px 15px 4px rgba(255,166,216,0.4)" Icon={LikeIcon} />
);

const ReplyReaction = () => (
  <Reaction backgroundColor="#623cea" boxShadow="0 4px 15px 4px rgba(98,60,234,0.3)" Icon={ReplyIcon} />
);

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
              <EntityAvatar size="medium" reaction={<LikeReaction />} id={feedItem.context.split(':')[2]} />
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
              <EntityAvatar size="verySmall" style={{ marginLeft: '10px' }} id={id} />
              <Link to={`/${id}`} style={{ marginLeft: '10px' }}>
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
        )
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
            suffix={suffix[feedItem.type] && suffix[feedItem.type]()}
            reaction={feedItem.type === 'response' && <ReplyReaction />}
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
      <div
        className={`box cp-box ${this.props.added && this.state.wasShown ? 'cp-box--added' : ''}`}
        style={{
          boxShadow: '0 4px 10px rgba(98,60,234,0.07)',
          fontFamily: 'Rubik',
          overflow: 'hidden',
          borderRadius: '12px'
        }}
      >
        {!this.state.wasShown && <ReactVisibilitySensor onChange={this.onItemVisibilityChange} />}
        {this.renderItem()}
      </div>
    );
  }
}

const Feed = ({ feedItems, temporaryReplies, temporaryReactions, showMoreFeedItems }) => (
  <div className="container" style={{ padding: '40px 0' }}>
    <div className="columns">
      <div className="column is-6 is-offset-3">
        <InfiniteScroll hasMore={true} onLoadMore={showMoreFeedItems} throttle={100} threshold={300} isLoading={false}>
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
      </div>
    </div>
  </div>
);

export default Feed;

export const ConnectedFeed = () => (
  <Context.Consumer>
    {({
      feedStore: {
        feedItems,
        temporaryFeedItems,
        temporaryReplies,
        temporaryReactions,
        shownFeedItemsCount,
        showMoreFeedItems
      }
    }) => {
      const allFeedItems = pipe(uniqBy('id'), sortBy('created_at'), reverse, take(shownFeedItemsCount))([
        ...feedItems,
        ...temporaryFeedItems
      ]);
      return (
        <Feed
          feedItems={allFeedItems}
          temporaryReplies={temporaryReplies}
          temporaryReactions={temporaryReactions}
          showMoreFeedItems={showMoreFeedItems}
        />
      );
    }}
  </Context.Consumer>
);
