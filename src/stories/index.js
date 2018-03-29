import React from 'react';
import TextArea from 'react-autosize-textarea';
import timeago from 'timeago.js';
import '../index.css';
import Metamask from '../img/metamask.png';
import LikeIcon from '../img/like.svg';
import ReplyIcon from '../img/reply.svg';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const IdentityAvatar = ({ size, reaction }) => {
  const { containerSize, imgSize, imgTopOffset } = {
    small: { containerSize: '44px', imgSize: '110px', imgTopOffset: '85%' },
    medium: { containerSize: '54px', imgSize: '120px', imgTopOffset: '77%' },
    large: { containerSize: '64px', imgSize: '130px', imgTopOffset: '70%' }
  }[size];
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          width: containerSize,
          height: containerSize,
          borderRadius: '50%',
          backgroundColor: '#CDF5D4'
        }}
      >
        <img
          style={{
            width: imgSize,
            position: 'absolute',
            left: '55%',
            top: imgTopOffset,
            transform: 'translate(-50%, -50%)',
            maxWidth: 'none'
          }}
          alt=""
          src="https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/635286.svg"
        />
      </div>
      {reaction && (
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}>
          {reaction}
        </div>
      )}
    </div>
  );
};

const IdentityStatus = ({ id }) => (
  <div className="level-right column" style={{ color: '#1B2437' }}>
    <div className="level-right">
      <IdentityAvatar size="small" />
      <div style={{ marginLeft: '8px' }}>{id}</div>
    </div>
  </div>
);

const ErrorStatus = ({ message }) => (
  <div
    className="level-right has-text-right column"
    style={{ color: '#FC0035', textShadow: '0 0 10px rgba(252,0,53,0.3)' }}
  >
    {message}
  </div>
);

const Header = ({ status }) => {
  return (
    <div
      className="level"
      style={{
        height: '65px',
        backgroundColor: '#f9fbfd',
        borderBottom: '1px solid #e8e8f1',
        fontFamily: 'Rubik',
        fontSize: '14px',
        fontWeight: '500'
      }}
    >
      <div className="container is-fluid level-item level columns">
        <div className="level-left column">Feed</div>
        <h1
          className="level-item column has-text-centered"
          style={{ color: '#1B2437', fontWeight: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}
        >
          Purrbook
        </h1>
        {status}
      </div>
    </div>
  );
};

class CommentForm extends React.Component {
  state = {
    comment: ''
  };

  submitForm = () => {
    this.setState({ comment: '' });
  };

  render() {
    return (
      <form
        style={{ position: 'relative', display: 'flex', ...(this.props.style || {}) }}
        onSubmit={e => {
          e.preventDefault();
          this.submitForm();
        }}
      >
        <TextArea
          className={`cp-textarea ${this.props.inputClassName ? this.props.inputClassName : ''}`}
          style={{
            background: 'transparent',
            fontFamily: 'Rubik',
            fontSize: '24px',
            fontWeight: '500',
            color: '#1B2437',
            border: 'none',
            resize: 'none',
            width: 'calc(100% - 60px)',
            outline: 'none',
            overflow: 'auto',
            ...(this.props.inputStyle || {})
          }}
          placeholder="Purr your story"
          value={this.state.comment}
          onChange={e => this.setState({ comment: e.target.value })}
          onKeyPress={e => e.key === 'Enter' && e.ctrlKey && this.submitForm()}
        />
        <button
          type="submit"
          className={`cp-metamask-submit ${this.state.comment ? 'cp-metamask-submit--active' : ''}`}
          style={{
            position: 'absolute',
            right: '10px',
            bottom: '5px',
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            outline: 'none',
            border: 'none',
            transition: 'all 0.15s ease-in-out'
          }}
        >
          <img src={Metamask} style={{ width: '70%' }} />
        </button>
      </form>
    );
  }
}

const Hero = ({ id }) => {
  return id ? (
    <div
      style={{
        backgroundColor: '#f9fbfd'
      }}
    >
      <div className="container" style={{ padding: '40px 0' }}>
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <div className="box cp-box" style={{ boxShadow: '0 4px 10px rgba(98,60,234,0.07)' }}>
              <article className="media">
                <div className="media-left">
                  <IdentityAvatar size="large" />
                </div>
                <div className="media-content">
                  <div className="content">
                    <div
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#623CEA'
                      }}
                    >
                      {id}
                    </div>
                    <CommentForm id={id} />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

const Label = ({ className, icon, text, count, colors, style = {} }) => {
  return (
    <button
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

const Post = ({ from, createdAt, etherscanUrl, family, message, reactions, replies, style = {} }) => {
  return (
    <article className="media" style={style}>
      <div className="media-left" style={{ width: '54px' }}>
        <IdentityAvatar size="medium" />
      </div>
      <div className="media-content">
        <CardTitle from={from} createdAt={createdAt} etherscanUrl={etherscanUrl} family={family} />
        <p style={{ marginTop: '20px', fontSize: '18px' }}>{message}</p>
        {reactions &&
          replies && (
            <div style={{ marginTop: '20px', display: 'flex' }}>
              <Label
                className="cp-like cp-label--done"
                icon={<img src={LikeIcon} />}
                text={'Like'}
                count={reactions.length}
                colors={{ border: '#ffe4f3', iconBackground: '#FFA6D8', count: '#FFA6D8' }}
              />
              <Label
                className="cp-reply"
                icon={<img src={ReplyIcon} />}
                text={'Reply'}
                count={replies.length}
                style={{ marginLeft: '30px' }}
                colors={{ border: '#cfc4f8', iconBackground: '#623CEA', count: '#623CEA' }}
              />
            </div>
          )}
      </div>
    </article>
  );
};

const Reply = ({ from, createdAt, etherscanUrl, family, message, style = {} }) => (
  <article className="media" style={{ borderTop: 'none', ...style }}>
    <div className="media-left">
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
          <g fill="#e1dfec" fill-rule="nonzero">
            <path d="M8,0 C3.6,0 0,3.1 0,7 C0,10.9 3.6,14 8,14 C8.4,14 8.8,14 9.1,13.9 L14,16 L14,11.6 C15.2,10.4 16,8.8 16,7 C16,3.1 12.4,0 8,0 Z" />
          </g>
        </svg>
      </div>
    </div>

    <div className="media-content columns">
      <div className="column is-narrow">
        <IdentityAvatar size="medium" />
      </div>
      <div className="column">
        <div
          style={{
            backgroundColor: 'rgba(246,244,255,0.7)',
            width: '100%',
            padding: '12px',
            borderRadius: '12px'
          }}
        >
          <a>
            <b>{from}</b>
          </a>{' '}
          {message}
        </div>
        <div style={{ paddingLeft: '12px', marginTop: '6px' }}>
          <small style={{ color: '#928F9B' }}>
            <button
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

const ReplyForm = () => (
  <article className="media" style={{ borderTop: 'none' }}>
    <div className="media-left">
      <div style={{ height: '54px', width: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="16px" height="16px" version="1.1">
          <g fill="#e1dfec" fill-rule="nonzero">
            <path d="M8,0 C3.6,0 0,3.1 0,7 C0,10.9 3.6,14 8,14 C8.4,14 8.8,14 9.1,13.9 L14,16 L14,11.6 C15.2,10.4 16,8.8 16,7 C16,3.1 12.4,0 8,0 Z" />
          </g>
        </svg>
      </div>
    </div>

    <div className="media-content columns">
      <div className="column is-narrow">
        <IdentityAvatar size="medium" />
      </div>
      <div className="column">
        <CommentForm
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
      <div>
        <a style={{ fontSize: '18px' }}>
          <b>{from}</b>
        </a>{' '}
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
    <img src={Icon} style={{ width: '12px' }} />
  </div>
);

const LikeReaction = () => (
  <Reaction backgroundColor="#ffa6d8" boxShadow="0 4px 15px 4px rgba(255,166,216,0.4)" Icon={LikeIcon} />
);

const ReplyReaction = () => (
  <Reaction backgroundColor="#623cea" boxShadow="0 4px 15px 4px rgba(98,60,234,0.3)" Icon={ReplyIcon} />
);

const Card = ({ feedItem }) => {
  const renderItem = () => {
    switch (feedItem.type) {
      case 'regular': {
        return (
          <React.Fragment>
            <Post
              from={feedItem.context.split(':')[2]}
              createdAt={feedItem.created_at}
              etherscanUrl={createEtherscanUrl(feedItem)}
              family={feedItem.family}
              message={feedItem.target.id}
              reactions={feedItem.targeted}
              replies={feedItem.abouted}
            />
            {feedItem.abouted.map(reply => (
              <Reply
                from={reply.context.split(':')[2]}
                createdAt={reply.created_at}
                message={reply.target.id}
                family={reply.family}
                etherscanUrl={createEtherscanUrl(reply)}
              />
            ))}
            <ReplyForm />
          </React.Fragment>
        );
      }
      case 'like': {
        return (
          <React.Fragment>
            <article className="media">
              <div className="media-left" style={{ width: '54px' }}>
                <IdentityAvatar size="medium" reaction={<LikeReaction />} />
              </div>
              <div className="media-content">
                <CardTitle
                  from={feedItem.context.split(':')[2]}
                  createdAt={feedItem.created_at}
                  etherscanUrl={createEtherscanUrl(feedItem)}
                  family={feedItem.family}
                  suffix={
                    <React.Fragment>
                      reacted on <b>Post</b>
                    </React.Fragment>
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
      }
      case 'response': {
        return (
          <React.Fragment>
            <article className="media">
              <div className="media-left" style={{ width: '54px' }}>
                <IdentityAvatar size="medium" reaction={<ReplyReaction />} />
              </div>
              <div className="media-content">
                <CardTitle
                  from={feedItem.context.split(':')[2]}
                  createdAt={feedItem.created_at}
                  etherscanUrl={createEtherscanUrl(feedItem)}
                  family={feedItem.family}
                  suffix={
                    <React.Fragment>
                      responded to <b>Post</b>
                    </React.Fragment>
                  }
                />
              </div>
            </article>
            <Post
              from={feedItem.about.context.split(':')[2]}
              createdAt={feedItem.about.created_at}
              etherscanUrl={createEtherscanUrl(feedItem.about)}
              family={feedItem.about.family}
              message={feedItem.about.target.id}
              style={{ marginTop: '20px' }}
            />
          </React.Fragment>
        );
      }
    }
  };
  return (
    <div className="box cp-box" style={{ boxShadow: '0 4px 10px rgba(98,60,234,0.07)', fontFamily: 'Rubik' }}>
      {renderItem()}
    </div>
  );
};

storiesOf('Header', module)
  .add('No Metamask', () => <Header status={<ErrorStatus message={'No Metamask'} />} />)
  .add('No identity detected', () => <Header status={<ErrorStatus message={'No identity detected'} />} />)
  .add('Metamask locked', () => <Header status={<ErrorStatus message={'Metamask locked'} />} />)
  .add('with identity', () => <Header status={<IdentityStatus id={'Cpt. Barbossa'} />} />);

storiesOf('Hero', module)
  .add('without identity', () => <Hero />)
  .add('with identity', () => <Hero id={'Cpt. Barbossa'} />);

storiesOf('Card', module)
  .add('Comment with replies and like', () => {
    const feedItem = {
      about: null,
      abouted: [
        {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
          created_at: 1521787620000,
          family: 'kovan',
          id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
          sequence: 6516195,
          target: {
            id: 'There are so many things that connect us... Bun in owen?'
          }
        },
        {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
          created_at: 1521787620000,
          family: 'kovan',
          id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
          sequence: 6516195,
          target: {
            id: 'There are so many things that connect us... Bun in owen?'
          }
        }
      ],
      author: '0x6b7eb2e2084ad4f3606a5f082195c0121c0efa3b',
      context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:587035',
      created_at: 1521748632000,
      family: 'kovan',
      id: 'claim:0xd87fbe04e51c55bbd90b3dcfbd48046311427038dfbb5597c533f85c5a85e7bf:0',
      sequence: 6509052,
      target: {
        id: 'I ❤ catnip'
      },
      targeted: [
        {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
          created_at: 1521787260000,
          family: 'kovan',
          id: 'claim:0x20565864419442c5d58dbbe912d17b97fceaed71b1710944d907619a9358f637:0',
          sequence: 6516128
        }
      ],
      type: 'regular'
    };

    return (
      <div
        style={{
          backgroundColor: '#f9fbfd'
        }}
      >
        <div className="container" style={{ padding: '40px 0' }}>
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <Card feedItem={feedItem} />
            </div>
          </div>
        </div>
      </div>
    );
  })
  .add('Comment without replies or likes', () => {
    const feedItem = {
      about: null,
      abouted: [],
      author: '0x6b7eb2e2084ad4f3606a5f082195c0121c0efa3b',
      context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:587035',
      created_at: 1521748632000,
      family: 'kovan',
      id: 'claim:0xd87fbe04e51c55bbd90b3dcfbd48046311427038dfbb5597c533f85c5a85e7bf:0',
      sequence: 6509052,
      target: {
        id: 'I ❤ catnip'
      },
      targeted: [],
      type: 'regular'
    };

    return (
      <div
        style={{
          backgroundColor: '#f9fbfd'
        }}
      >
        <div className="container" style={{ padding: '40px 0' }}>
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <Card feedItem={feedItem} />
            </div>
          </div>
        </div>
      </div>
    );
  })
  .add('Like a post', () => {
    const feedItem = {
      about: null,
      abouted: [],
      author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
      context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
      created_at: 1521787260000,
      family: 'kovan',
      id: 'claim:0x20565864419442c5d58dbbe912d17b97fceaed71b1710944d907619a9358f637:0',
      sequence: 6516128,
      target: {
        author: '0x6b7eb2e2084ad4f3606a5f082195c0121c0efa3b',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:587035',
        created_at: 1521748632000,
        family: 'kovan',
        id: 'claim:0xd87fbe04e51c55bbd90b3dcfbd48046311427038dfbb5597c533f85c5a85e7bf:0',
        sequence: 6509052,
        target: { id: 'I \u2764 catnip' }
      },
      targeted: [],
      type: 'like'
    };

    return (
      <div
        style={{
          backgroundColor: '#f9fbfd'
        }}
      >
        <div className="container" style={{ padding: '40px 0' }}>
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <Card feedItem={feedItem} />
            </div>
          </div>
        </div>
      </div>
    );
  })
  .add('Reply', () => {
    const feedItem = {
      about: {
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1521787620000,
        family: 'kovan',
        id: 'claim:0xd87fbe04e51c55bbd90b3dcfbd48046311427038dfbb5597c533f85c5a85e7bf:0',
        sequence: 6516195,
        target: {
          id: 'I ❤ catnip'
        }
      },
      abouted: [],
      author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
      context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
      created_at: 1521787620000,
      family: 'kovan',
      id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
      sequence: 6516195,
      target: {
        id: 'There are so many things that connect us... Bun in owen?'
      },
      targeted: [],
      type: 'response'
    };

    return (
      <div
        style={{
          backgroundColor: '#f9fbfd'
        }}
      >
        <div className="container" style={{ padding: '40px 0' }}>
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <Card feedItem={feedItem} />
            </div>
          </div>
        </div>
      </div>
    );
  });
