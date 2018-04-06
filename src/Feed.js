import React from 'react';
import uniqBy from 'lodash/uniqBy';
import timeago from 'timeago.js';
import ReactVisibilitySensor from 'react-visibility-sensor';
import { Link } from 'react-router-dom';
import Context from './Context';
import { ConnectedReplyForm } from './CommentForm';
import { EntityName, IfActiveCat, ActiveEntityAvatar, EntityAvatar, IfActiveEntityLiked } from './Entity';
import LikeIcon from './img/like.svg';
import ReplyIcon from './img/reply.svg';

const Label = ({ onClick, className, icon, text, count, colors, style = {} }) => {
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

const Post = ({ id, from, createdAt, etherscanUrl, family, message, reactions, reaction, suffix, style = {} }) => {
  return (
    <article className="media" style={style}>
      <div className="media-left" style={{ width: '54px' }}>
        <EntityAvatar size="medium" reaction={reaction} id={from} />
      </div>
      <div className="media-content">
        <CardTitle from={from} createdAt={createdAt} etherscanUrl={etherscanUrl} family={family} suffix={suffix} />
        <p style={{ marginTop: '20px', fontSize: '18px', wordBreak: 'break-word' }}>{message}</p>
        {reactions && (
          <div style={{ marginTop: '20px', display: 'flex' }}>
            <IfActiveEntityLiked
              id={id}
              other={
                <Context.Consumer>
                  {({ purrStore: { react } }) => (
                    <Label
                      onClick={() => react(id)}
                      className="cp-like"
                      icon={<img alt="" src={LikeIcon} />}
                      text={'Like'}
                      count={reactions.length}
                      colors={{ border: '#ffe4f3', iconBackground: '#FFA6D8', count: '#FFA6D8' }}
                    />
                  )}
                </Context.Consumer>
              }
              then={
                <Label
                  className="cp-like cp-label--done"
                  icon={<img alt="" src={LikeIcon} />}
                  text={'Like'}
                  count={reactions.length}
                  colors={{ border: '#ffe4f3', iconBackground: '#FFA6D8', count: '#FFA6D8' }}
                />
              }
            />
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
          <Link to={`/cryptopurr/${from}`}>
            <b>
              <EntityName id={from} />
            </b>
          </Link>{' '}
          {message}
        </div>
        <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
          <small style={{ color: '#928F9B' }}>
            <IfActiveEntityLiked
              id={id}
              other={
                <Context.Consumer>
                  {({ purrStore: { react } }) => (
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

const ReplyForm = ({ about }) => (
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
        <ConnectedReplyForm
          about={about}
          style={{
            backgroundColor: 'rgba(246,244,255,0.7)',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            alignItems: 'center'
          }}
          inputStyle={{
            fontSize: '16px',
            fontWeight: 'normal'
          }}
          inputClassName="cp-textarea--reply"
        />
      </div>
    </div>
  </article>
);

const CardTitle = ({ from, createdAt, etherscanUrl, family, suffix }) => {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`/cryptopurr/${from}`} style={{ fontSize: '18px' }}>
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
              <Link to={`/cryptopurr/${id}`} style={{ marginLeft: '10px' }}>
                <b>
                  <EntityName id={id} />
                </b>
              </Link>
            </React.Fragment>
          );
        }
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
          <IfActiveCat>{() => <ReplyForm about={feedItem.id} />}</IfActiveCat>
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

const Feed = ({ feedItems, temporaryReplies, temporaryReactions }) => (
  <div className="container" style={{ padding: '40px 0' }}>
    <div className="columns">
      <div className="column is-6 is-offset-3">
        {feedItems.map(feedItem => {
          const temporaryRepliesForItem = temporaryReplies[feedItem.id];
          const replies = uniqBy([...(temporaryRepliesForItem || []), ...(feedItem.abouted || [])], about => about.id);
          const temporaryReactionsForItem = temporaryReactions[feedItem.id];
          const reactions = uniqBy(
            [...(temporaryReactionsForItem || []), ...(feedItem.targeted || [])],
            target => target.id
          );
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
      </div>
    </div>
  </div>
);

export default Feed;

export const ConnectedFeed = ({ forId }) => (
  <Context.Consumer>
    {({ purrStore: { purrs, temporaryPurrs, temporaryReplies, temporaryReactions } }) => {
      let allPurrs = uniqBy([...temporaryPurrs, ...purrs], purr => purr.id);
      if (forId) {
        allPurrs = allPurrs.filter(({ token_id }) => token_id === forId);
      }
      return <Feed feedItems={allPurrs} temporaryReplies={temporaryReplies} temporaryReactions={temporaryReactions} />;
    }}
  </Context.Consumer>
);
