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

const IdentityAvatar = ({ size, reaction, style = {} }) => {
  const { containerSize, imgSize, imgTopOffset } = {
    verySmall: { containerSize: '32px', imgSize: '70px', imgTopOffset: '85%' },
    small: { containerSize: '44px', imgSize: '110px', imgTopOffset: '85%' },
    medium: { containerSize: '54px', imgSize: '120px', imgTopOffset: '77%' },
    large: { containerSize: '64px', imgSize: '130px', imgTopOffset: '70%' }
  }[size];
  return (
    <div style={{ position: 'relative', ...style }}>
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

const Post = ({ from, createdAt, etherscanUrl, family, message, reactions, reaction, suffix, style = {} }) => {
  return (
    <article className="media" style={style}>
      <div className="media-left" style={{ width: '54px' }}>
        <IdentityAvatar size="medium" reaction={reaction} />
      </div>
      <div className="media-content">
        <CardTitle from={from} createdAt={createdAt} etherscanUrl={etherscanUrl} family={family} suffix={suffix} />
        <p style={{ marginTop: '20px', fontSize: '18px', wordBreak: 'break-word' }}>{message}</p>
        {reactions && (
          <div style={{ marginTop: '20px', display: 'flex' }}>
            <Label
              className="cp-like"
              icon={<img src={LikeIcon} />}
              text={'Like'}
              count={reactions.length}
              colors={{ border: '#ffe4f3', iconBackground: '#FFA6D8', count: '#FFA6D8' }}
            />
          </div>
        )}
      </div>
    </article>
  );
};

const Reply = ({ highlighted, from, createdAt, etherscanUrl, family, message, style = {} }) => (
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
            borderRadius: '12px',
            wordBreak: 'break-word'
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
    if (feedItem.type === 'like') {
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
        response: () => (
          <span style={{ marginLeft: '10px' }}>
            replied to <b>⬆</b>
          </span>
        ),
        post_to: () => (
          <React.Fragment>
            <span style={{ marginLeft: '10px' }}>wrote to</span>
            <IdentityAvatar size="verySmall" style={{ marginLeft: '10px' }} />{' '}
            <a style={{ marginLeft: '10px' }}>
              <b>{feedItem.about.id.split(':')[2]}</b>
            </a>
          </React.Fragment>
        )
      };
      return (
        <React.Fragment>
          {feedItem.type === 'response' && (
            <Reply
              from={feedItem.about.context.split(':')[2]}
              createdAt={feedItem.about.created_at}
              etherscanUrl={createEtherscanUrl(feedItem.about)}
              family={feedItem.about.family}
              message={feedItem.about.target.id}
            />
          )}
          <Post
            style={{ borderTop: 'none' }}
            from={feedItem.context.split(':')[2]}
            createdAt={feedItem.created_at}
            message={feedItem.target.id}
            family={feedItem.family}
            etherscanUrl={createEtherscanUrl(feedItem)}
            reactions={feedItem.targeted}
            replies={feedItem.abouted}
            suffix={suffix[feedItem.type] && suffix[feedItem.type]()}
            reaction={feedItem.type === 'response' && <ReplyReaction />}
          />
          {feedItem.abouted.map(reply => (
            <Reply
              from={reply.context.split(':')[2]}
              createdAt={reply.created_at}
              message={reply.target.id}
              family={reply.family}
              etherscanUrl={createEtherscanUrl(reply)}
            />
          ))}{' '}
          <ReplyForm />
        </React.Fragment>
      );
    }
  };

  return (
    <div
      className="box cp-box"
      style={{ boxShadow: '0 4px 10px rgba(98,60,234,0.07)', fontFamily: 'Rubik', overflow: 'hidden' }}
    >
      {renderItem()}
    </div>
  );
};
// <article className="media">
//               <div className="media-left" style={{ width: '54px' }}>
//                 <IdentityAvatar size="medium" reaction={<ReplyReaction />} />
//               </div>
//               <div className="media-content">
//                 <CardTitle
//                   from={feedItem.context.split(':')[2]}
//                   createdAt={feedItem.created_at}
//                   etherscanUrl={createEtherscanUrl(feedItem)}
//                   family={feedItem.family}
//                   suffix={
//                     <React.Fragment>
//                       responded to <b>Post</b>
//                     </React.Fragment>
//                   }
//                 />
//               </div>
//             </article>

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
      abouted: [
        {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
          created_at: 1521787620000,
          family: 'kovan',
          id: 'claim:0xd87fbe04e51c55bbd90b3dcfbd48046311427038dfbb5597c533f85c5a85e7bf:0',
          sequence: 6516195,
          target: {
            id: 'I h8 catnip'
          }
        }
      ],
      author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
      context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
      created_at: 1521787620000,
      family: 'kovan',
      id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
      sequence: 6516195,
      target: {
        id: 'There are so many things that connect us... Bun in owen?'
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

storiesOf('Feed', module).add('Multiple cards', () => {
  const feedItems = {
    items: [
      {
        about: null,
        abouted: [],
        author: '0x6be450972b30891b16c8588dcbc10c8c2aef04da',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:134330',
        created_at: 1522240608000,
        family: 'kovan',
        id: 'claim:0x64df539f9baeadeb6bf5e95b200bf7619e76f9dac37d537dab0f3d12298e122c:0',
        sequence: 6599499,
        target: { id: 'https://web.telegram.org/#/im?p=g233708218' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
        created_at: 1522236023000,
        family: 'ethereum',
        id: 'claim:0x6e74c3d2163c76232eefdecda087537dc5d055291cdf0b8d60304f20cf324f82:0',
        sequence: 5336772,
        target: { id: 'Purr, purr, purr, purray!' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:627811',
        created_at: 1522184448000,
        family: 'kovan',
        id: 'claim:0x7a4e4c7e1870747bcad204b88d8c05d4094ac1d24ce571d47daa4897932cd928:0',
        sequence: 6589301,
        target: { id: 'purr purr purr mark' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:627811',
        created_at: 1522184360000,
        family: 'kovan',
        id: 'claim:0x6ce8716b25cc041feb8f7935e21bebaaaf0eb69e106214e42ded0e200a88e1c9:0',
        sequence: 6589285,
        target: { id: "mark's going to testify, i'm going to purr" },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9899f66b4ef5132a3473e25f0cc7f22f2711b3da',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635196',
        created_at: 1522178808000,
        family: 'kovan',
        id: 'claim:0x5769955562ca28a74a227544b4f7861253ec829cab93490f9cfc2b619b299f81:0',
        sequence: 6588283,
        target: {
          id: 'Big if true! http://money.cnn.com/2018/03/27/technology/mark-zuckerberg-testify-congress-facebook/'
        },
        targeted: [],
        type: 'regular'
      },
      {
        about: {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
          created_at: 1522178076000,
          family: 'kovan',
          id: 'claim:0x057ab97a934f51682d00fee4cb456b5c0b6c8abf7dc77eaf4b3203dc50cb3beb:0',
          sequence: 6588140,
          target: { id: 'Burn! Hahaha burn' }
        },
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
        created_at: 1522178076000,
        family: 'kovan',
        id: 'claim:0x2ac35379cdeb7a8753e7402f048bcc5c036326815fcbc6349c9015368c1786ed:0',
        sequence: 6588140,
        target: {
          author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:397289',
          created_at: 1522141900000,
          family: 'kovan',
          id: 'claim:0x057ab97a934f51682d00fee4cb456b5c0b6c8abf7dc77eaf4b3203dc50cb3beb:0',
          sequence: 6581263,
          target: { id: 'Burn! Hahaha burn' }
        },
        targeted: [],
        type: 'response'
      },
      {
        about: null,
        abouted: [],
        author: '0x9899f66b4ef5132a3473e25f0cc7f22f2711b3da',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635196',
        created_at: 1522178004000,
        family: 'kovan',
        id: 'claim:0xe4b009bbb241769f9e21ba200cc05b4a1dfdfa62780fe90df2c17bca9e6c0778:0',
        sequence: 6588126,
        target: { id: 'Meeeeeooow!' },
        targeted: [],
        type: 'regular'
      },
      {
        about: { id: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:397289' },
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
        created_at: 1522177572000,
        family: 'kovan',
        id: 'claim:0x82e4ee21a6a7ddf4f7e2183b03e983746969ad2d19872c6732c7167f31420cf6:0',
        sequence: 6588042,
        target: {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
          created_at: 1522177108000,
          family: 'kovan',
          id: 'claim:0x01502573790fe463c227e7736574ff7e7d4489e9c13f91788be3a4f9c02770c9:0',
          sequence: 6587952,
          target: { id: 'Planning a trip to https://goo.gl/maps/n9w98AAWqRU2' }
        },
        targeted: [],
        type: 'post_to'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
        created_at: 1522177108000,
        family: 'kovan',
        id: 'claim:0x01502573790fe463c227e7736574ff7e7d4489e9c13f91788be3a4f9c02770c9:0',
        sequence: 6587952,
        target: { id: 'Planning a trip to https://goo.gl/maps/n9w98AAWqRU2' },
        targeted: [
          {
            author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
            created_at: 1522177572000,
            family: 'kovan',
            id: 'claim:0x82e4ee21a6a7ddf4f7e2183b03e983746969ad2d19872c6732c7167f31420cf6:0',
            sequence: 6588042
          }
        ],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x6be450972b30891b16c8588dcbc10c8c2aef04da',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:134330',
        created_at: 1522158168000,
        family: 'kovan',
        id: 'claim:0xffa8bae299cad4914698031fcd6ee5f2967ef412872fdfd9db55f103165bb528:0',
        sequence: 6584271,
        target: { id: 'https://gitter.im/Userfeeds' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1522142544000,
        family: 'kovan',
        id: 'claim:0x605474825adf9f6f4983d6cc2fceb4275de0ba619cdfed69543ddedd4896ad30:0',
        sequence: 6581374,
        target: {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
          created_at: 1521787620000,
          family: 'kovan',
          id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
          sequence: 6516195,
          target: { id: 'There are so many things that connect us... Bun in owen?' }
        },
        targeted: [],
        type: 'like'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1522142520000,
        family: 'kovan',
        id: 'claim:0x8bbe6afe71fd845a9b9b0b0a37f999166b478611ace6160d24cd9dd4a7e98ed3:0',
        sequence: 6581371,
        target: {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
          created_at: 1521787620000,
          family: 'kovan',
          id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
          sequence: 6516195,
          target: { id: 'There are so many things that connect us... Bun in owen?' }
        },
        targeted: [],
        type: 'like'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
        created_at: 1522142472000,
        family: 'kovan',
        id: 'claim:0xcb91f935b6eaf85442843f2aafa058c4685b114c0bec354b7fdaf91638590590:0',
        sequence: 6581362,
        target: {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
          created_at: 1521787620000,
          family: 'kovan',
          id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
          sequence: 6516195,
          target: { id: 'There are so many things that connect us... Bun in owen?' }
        },
        targeted: [],
        type: 'like'
      },
      {
        about: null,
        abouted: [],
        author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:397289',
        created_at: 1522142076000,
        family: 'kovan',
        id: 'claim:0x38c486cde0749f3632fc297330ae394e917f6c0f2c1dd8f538ee00d10336621e:0',
        sequence: 6581293,
        target: {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
          created_at: 1521787620000,
          family: 'kovan',
          id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
          sequence: 6516195,
          target: { id: 'There are so many things that connect us... Bun in owen?' }
        },
        targeted: [],
        type: 'like'
      },
      {
        about: {
          author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:397289',
          created_at: 1522141900000,
          family: 'kovan',
          id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
          sequence: 6581263,
          target: { id: 'There are so many things that connect us... Bun in owen?' }
        },
        abouted: [
          {
            author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
            created_at: 1522178076000,
            family: 'kovan',
            id: 'claim:0x2ac35379cdeb7a8753e7402f048bcc5c036326815fcbc6349c9015368c1786ed:0',
            sequence: 6588140,
            target: { id: 'claim:0x057ab97a934f51682d00fee4cb456b5c0b6c8abf7dc77eaf4b3203dc50cb3beb:0' }
          }
        ],
        author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:397289',
        created_at: 1522141900000,
        family: 'kovan',
        id: 'claim:0x057ab97a934f51682d00fee4cb456b5c0b6c8abf7dc77eaf4b3203dc50cb3beb:0',
        sequence: 6581263,
        target: { id: 'Burn! Hahaha burn' },
        targeted: [
          {
            author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
            created_at: 1522178076000,
            family: 'kovan',
            id: 'claim:0x2ac35379cdeb7a8753e7402f048bcc5c036326815fcbc6349c9015368c1786ed:0',
            sequence: 6588140
          }
        ],
        type: 'response'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:627811',
        created_at: 1522078288000,
        family: 'kovan',
        id: 'claim:0x5315054bc488ebbab89e709202d77e803d152d4a605c85f8616cd6ffb9117b61:0',
        sequence: 6569522,
        target: { id: 'something something ' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:627811',
        created_at: 1522072740000,
        family: 'kovan',
        id: 'claim:0x9ea05c464a66d9b4283a213ab081ff279df20a0d1a7752dab64a94ac81648a91:0',
        sequence: 6568443,
        target: { id: "Ninety nine problems but a cat ain't one" },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x6be450972b30891b16c8588dcbc10c8c2aef04da',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:134330',
        created_at: 1522071272000,
        family: 'kovan',
        id: 'claim:0xe2844a3417a6a46a40e84dd39edb04f260ce9c100981cce5b69fe2125a2b70f8:0',
        sequence: 6568158,
        target: { id: 'http://userfeeds.io/' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1522065588000,
        family: 'kovan',
        id: 'claim:0xeeabb8a778d4a103b4020f2d9cda9dbcbceb4111440ff27eee72ac28c977c9c4:0',
        sequence: 6567053,
        target: { id: 'I like other cats :)' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1522065160000,
        family: 'kovan',
        id: 'claim:0xa5c8d36cf8c0e6afc09271981b4a8aa7d7ae71e904c8ecb10272d49f392d2843:0',
        sequence: 6566970,
        target: { id: "I'm not grumpy at all." },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9899f66b4ef5132a3473e25f0cc7f22f2711b3da',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635196',
        created_at: 1522063176000,
        family: 'kovan',
        id: 'claim:0x8288ab695e521461779af07910719be2aefd8b302906742c9512c801d1afb349:0',
        sequence: 6566606,
        target: { id: 'what does the cat say?' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1522055084000,
        family: 'kovan',
        id: 'claim:0x7ce66d08571d508e377a19bdcf6408498fc1826190824350ecc039a63a27f6e7:0',
        sequence: 6565173,
        target: { id: 'https://github.com/mg6maciej' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1522051356000,
        family: 'kovan',
        id: 'claim:0x879a31f4d665cdedb0ae385b3a3e1c2312d4299c82b900c2f3d1cfe9a287bdff:0',
        sequence: 6564510,
        target: { id: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:631745' },
        targeted: [],
        type: 'regular'
      },
      {
        about: { id: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286' },
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1521971016000,
        family: 'kovan',
        id: 'claim:0x18bc8127760b51db5f5d095d31d1870ce0a4237e276b7d1aeece55f4a011b697:0',
        sequence: 6549760,
        target: { id: 'Bug report: it jumps back to the first kitty after refreshing cat list of my owner.' },
        targeted: [],
        type: 'post_to'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:627811',
        created_at: 1521895924000,
        family: 'kovan',
        id: 'claim:0xe810226f59adf23fa244baf5d1cbe66d0b2fc191ccadec99cbb8e8128fc7e3f5:0',
        sequence: 6535986,
        target: { id: 'you will repent' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:627811',
        created_at: 1521892784000,
        family: 'kovan',
        id: 'claim:0xbb16a8af6088e745e3fab108be4f277a43e24ad56a038a2e5faa3fb2d766aaae:0',
        sequence: 6535375,
        target: { id: 'or dolphin, they know how to have a party' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:627811',
        created_at: 1521892744000,
        family: 'kovan',
        id: 'claim:0x8674371eb7dd8d36faafb9becbb1f6a84a89398e0676150a4ed2e3058be4e978:0',
        sequence: 6535367,
        target: { id: 'i wish i was manatee' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521830208000,
        family: 'kovan',
        id: 'claim:0xc687fe379fe5ae4e20821d7d4b41748b35d67a30e2965870a6a5fd5decceb1e2:0',
        sequence: 6524070,
        target: { id: 'My intelligence is underrated!' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521830140000,
        family: 'kovan',
        id: 'claim:0x3328810c594a63320196159016941a7f5fd4567ae082e1a5a1b139f940d6aae3:0',
        sequence: 6524057,
        target: { id: 'As my owner knows, nobody owns me.' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521829832000,
        family: 'kovan',
        id: 'claim:0x95c4bd598660c1ef0108675325574c4c1bd4cdd9e3c2787b97adc8df090f9f94:0',
        sequence: 6523998,
        target: { id: 'In ancient we cats were worshipped as gods; we have not forgotten this.' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521827260000,
        family: 'kovan',
        id: 'claim:0x086f5d9262b117c49a3f78481be1d47b442c63d4e753cad3d7ade364f9624e8d:0',
        sequence: 6523497,
        target: { id: 'Cats are the smartest animals alive!' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521826392000,
        family: 'kovan',
        id: 'claim:0xe4525199ed5cf2b6d9aa510cb4214c81c550a0b45b1e6ba53e4618bfd6819405:0',
        sequence: 6523328,
        target: { id: 'The sound of a purring cat is one of the most comforting sounds available' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521825324000,
        family: 'kovan',
        id: 'claim:0x1d785dcc87fdb258cbe03c9bc671d6809a34c1a353175a6fffa8fd5b85e0388d:0',
        sequence: 6523129,
        target: { id: '\ud83d\ude48\ud83d\ude49\ud83d\ude4a' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521825168000,
        family: 'kovan',
        id: 'claim:0x8bec368a98c65b1bd05106bb716f238b9519316d553a3efee2f7fbb0f0130bd9:0',
        sequence: 6523099,
        target: {
          id: '\ud83c\udf55\ud83c\udf55\ud83c\udf55\ud83c\udf55\ud83c\udf55\ud83c\udf55\ud83c\udf55\ud83c\udf55'
        },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521824412000,
        family: 'kovan',
        id: 'claim:0x3169e185bea204d6eba03905b576242a1ddf81510d8a1ec83ffc1142516a23cd:0',
        sequence: 6522967,
        target: { id: 'VIM VIM VIM' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521820780000,
        family: 'kovan',
        id: 'claim:0xd6e4cb4fdb63c827cc2c8a849e2521518cae2c5124d56f59a1469c9f0ffce796:0',
        sequence: 6522309,
        target: { id: 'Super new purr that will update immidietly and show on top!' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521820708000,
        family: 'kovan',
        id: 'claim:0xc943d5e1579cce9705a4feaf3b478091e36858ec2f3b4dfaa5ecf7174e46fc63:0',
        sequence: 6522295,
        target: { id: 'Super new purr that will update immidietly!' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:631745',
        created_at: 1521820524000,
        family: 'kovan',
        id: 'claim:0xb845f7d824608094391d2f89a3d9ee055e1f640b292b795458166a7e4218dc0d:0',
        sequence: 6522264,
        target: {
          id:
            'I purred once https://raw.githubusercontent.com/GrumpyFather/GrumpyCat/1b028270b61e43ed74a961ff6645eb999f946011/3.jpg'
        },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521820168000,
        family: 'kovan',
        id: 'claim:0x73e275cca798745792d6351e5b57b3b17690900abe151ada554848dbb261f6cf:0',
        sequence: 6522195,
        target: { id: '<3 <3 <3' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:595267',
        created_at: 1521817044000,
        family: 'kovan',
        id: 'claim:0x21e63897c02f2ca5e2efb6c1eca546145b90d7be49e43ed54edef3ad9d493d50:0',
        sequence: 6521588,
        target: { id: 'they said not to purr, i purred either way' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:595267',
        created_at: 1521816756000,
        family: 'kovan',
        id: 'claim:0x24dce93b7746397da4142203559b8ac099f259a0dc7343dfd21eef786eef55f0:0',
        sequence: 6521532,
        target: { id: 'i wish i was manatee' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:627811',
        created_at: 1521816620000,
        family: 'kovan',
        id: 'claim:0x96501860455e8e39992f33f8c361afe713b6814d7cb2b5e113d828e792952a9f:0',
        sequence: 6521506,
        target: { id: 'dolphins masturbate with dead fish' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x9093428aa6266d589b866ac2956e328ab9039bee',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:627811',
        created_at: 1521816508000,
        family: 'kovan',
        id: 'claim:0xa73a8e81508abb44f47067e36b4f2aee4e42066c905775b7f1e2cb2d67e2743c:0',
        sequence: 6521484,
        target: { id: 'terriers were used for cleaning pipes in london' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521816436000,
        family: 'kovan',
        id: 'claim:0xc21f3edc564fb6b7169eaeb53b908ca4aed6d1f44d7db9684ee9d6e7cb8a2fa8:0',
        sequence: 6521470,
        target: { id: '/\u1420\u30fb\u11bd\u30fb\u141f \\' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521816076000,
        family: 'kovan',
        id: 'claim:0x9105569f11295b2e6f3c5ed2f4c471a213ddf192f5fa77d5b1db3849c4de5395:0',
        sequence: 6521400,
        target: { id: '\u252c\u2500\u2500\u252c \u30ce( \u309c-\u309c\u30ce)' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521815996000,
        family: 'kovan',
        id: 'claim:0x809f2368a1e06406c5cbf995b5e60574a5d7076836047e5146bc2dc3e4d148a1:0',
        sequence: 6521384,
        target: { id: '(\u256f\u00b0\u25a1\u00b0\uff09\u256f\ufe35 \u253b\u2501\u253b' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521815232000,
        family: 'kovan',
        id: 'claim:0xa1d64ed33ee055e81eef229c493488fd66ef238dbe5fc1ccc71a6f22da3b892c:0',
        sequence: 6521235,
        target: { id: 'O_o *-* o_O' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521808448000,
        family: 'kovan',
        id: 'claim:0x547a4c8cf99f55771c708e56229a42477cd1c5a026a40dcccb42ea64e55758da:0',
        sequence: 6519917,
        target: { id: 'My owner is mad at me for destroying the couch :(' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521808356000,
        family: 'kovan',
        id: 'claim:0x600ff0ee3a872d8930c868684bded86c06dfb8d7735dc4d68d720508e9e416f8:0',
        sequence: 6519898,
        target: { id: 'Prrrrrrrr' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
        created_at: 1521807960000,
        family: 'kovan',
        id: 'claim:0x377ac25ca35d0a79e8c5c803695116e667cd67731e0955a2494d5e36bfe84447:0',
        sequence: 6519821,
        target: {
          author: '0x6be450972b30891b16c8588dcbc10c8c2aef04da',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:134330',
          created_at: 1521807888000,
          family: 'kovan',
          id: 'claim:0x3003ea78cd0d17528a2d17c8bde248c292d8f3a894021c742bfd66bc392b43ac:0',
          sequence: 6519807,
          target: { id: "I be th' coolest cat! Yaaarrrrr! Fear me sea dogs!   " }
        },
        targeted: [],
        type: 'like'
      },
      {
        about: null,
        abouted: [],
        author: '0x6be450972b30891b16c8588dcbc10c8c2aef04da',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:134330',
        created_at: 1521807888000,
        family: 'kovan',
        id: 'claim:0x3003ea78cd0d17528a2d17c8bde248c292d8f3a894021c742bfd66bc392b43ac:0',
        sequence: 6519807,
        target: { id: "I be th' coolest cat! Yaaarrrrr! Fear me sea dogs!   " },
        targeted: [
          {
            author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
            created_at: 1521807960000,
            family: 'kovan',
            id: 'claim:0x377ac25ca35d0a79e8c5c803695116e667cd67731e0955a2494d5e36bfe84447:0',
            sequence: 6519821
          }
        ],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
        created_at: 1521807672000,
        family: 'kovan',
        id: 'claim:0xb9ec6b981ff0f31cdb9dbd15e33c627583fe27d7fb735fe07d230c5b35e4418a:0',
        sequence: 6519765,
        target: {
          author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:631745',
          created_at: 1521807544000,
          family: 'kovan',
          id: 'claim:0x00ddb09d783efd74f623b58181f7271be29fc8b19215b85b2bcfe01448586846:0',
          sequence: 6519741,
          target: {
            id:
              'There are two kinds of people in this world https://raw.githubusercontent.com/GrumpyFather/GrumpyCat/master/1.jpg'
          }
        },
        targeted: [],
        type: 'like'
      },
      {
        about: null,
        abouted: [],
        author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:631745',
        created_at: 1521807544000,
        family: 'kovan',
        id: 'claim:0x00ddb09d783efd74f623b58181f7271be29fc8b19215b85b2bcfe01448586846:0',
        sequence: 6519741,
        target: {
          id:
            'There are two kinds of people in this world https://raw.githubusercontent.com/GrumpyFather/GrumpyCat/master/1.jpg'
        },
        targeted: [
          {
            author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
            created_at: 1521807672000,
            family: 'kovan',
            id: 'claim:0xb9ec6b981ff0f31cdb9dbd15e33c627583fe27d7fb735fe07d230c5b35e4418a:0',
            sequence: 6519765
          }
        ],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
        created_at: 1521806196000,
        family: 'kovan',
        id: 'claim:0x37e3729078925064b4e05fe9b8cd0a14f6a96584e5e83e17d2468ad4bcfeee3d:0',
        sequence: 6519478,
        target: { id: 'Purr, purr, purr, purray!' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521805188000,
        family: 'kovan',
        id: 'claim:0x3002f806d8988a7793bb700afd15da8bb7c967e26a3b86ca25ecacaf7ea7f8c2:0',
        sequence: 6519288,
        target: { id: 'This should be something important!' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x460031ae4db5720d92a48fecf06a208c5099c186',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:593163',
        created_at: 1521797027000,
        family: 'rinkeby',
        id: 'claim:0x65d0fd753bbb7f2f1434496c29571f1fbf9aa959a6dcac14e357c7791c7b32ce:0',
        sequence: 1981799,
        target: { id: 'Greetings for warsaw office' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x460031ae4db5720d92a48fecf06a208c5099c186',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:593163',
        created_at: 1521796727000,
        family: 'rinkeby',
        id: 'claim:0x5ac2466fff22d6cbf620886cf3ea06259094dc4bbe908060883caabab0d21b67:0',
        sequence: 1981779,
        target: { id: 'Greetings for warsaw office' },
        targeted: [],
        type: 'regular'
      },
      {
        about: {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
          created_at: 1521787620000,
          family: 'kovan',
          id: 'claim:0xd87fbe04e51c55bbd90b3dcfbd48046311427038dfbb5597c533f85c5a85e7bf:0',
          sequence: 6516195,
          target: { id: 'I \u2764 catnip' }
        },
        abouted: [
          {
            author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:397289',
            created_at: 1522141900000,
            family: 'kovan',
            id: 'claim:0x057ab97a934f51682d00fee4cb456b5c0b6c8abf7dc77eaf4b3203dc50cb3beb:0',
            sequence: 6581263,
            target: { id: 'Burn! Hahaha burn' }
          }
        ],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1521787620000,
        family: 'kovan',
        id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
        sequence: 6516195,
        target: { id: 'There are so many things that connect us... Bun in owen?' },
        targeted: [
          {
            author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
            created_at: 1522142544000,
            family: 'kovan',
            id: 'claim:0x605474825adf9f6f4983d6cc2fceb4275de0ba619cdfed69543ddedd4896ad30:0',
            sequence: 6581374
          },
          {
            author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
            created_at: 1522142520000,
            family: 'kovan',
            id: 'claim:0x8bbe6afe71fd845a9b9b0b0a37f999166b478611ace6160d24cd9dd4a7e98ed3:0',
            sequence: 6581371
          },
          {
            author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
            created_at: 1522142472000,
            family: 'kovan',
            id: 'claim:0xcb91f935b6eaf85442843f2aafa058c4685b114c0bec354b7fdaf91638590590:0',
            sequence: 6581362
          },
          {
            author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:397289',
            created_at: 1522142076000,
            family: 'kovan',
            id: 'claim:0x38c486cde0749f3632fc297330ae394e917f6c0f2c1dd8f538ee00d10336621e:0',
            sequence: 6581293
          }
        ],
        type: 'response'
      },
      {
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
      },
      {
        about: null,
        abouted: [],
        author: '0x6be450972b30891b16c8588dcbc10c8c2aef04da',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:134330',
        created_at: 1521786547000,
        family: 'ethereum',
        id: 'claim:0x9f2caa8c537657d9e1e3115916c3f8d4bcb6f841c99fbd2721d328de2a6a1305:0',
        sequence: 5305632,
        target: { id: "Ha! Shiver me timbers! Th' world be ours! Join me!  " },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1521785296000,
        family: 'kovan',
        id: 'claim:0xfca2a0a7037efc55c0e858f232bc90c30a7bc5ce4d4078a4975838e60968270f:0',
        sequence: 6515775,
        target: {
          id:
            'I have lost the private key to my ethereum address 0x0000000000000000000000000000000000000000. If you happen to find it, please send me an encrypted message using public key of my current owner.'
        },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1521755696000,
        family: 'kovan',
        id: 'claim:0x733d1cc03c879280f6608ba9f23ba98b04ab32c01e00d8667fa2d2f7ba832a72:0',
        sequence: 6510361,
        target: { id: 'Purrduction working!' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521751736000,
        family: 'kovan',
        id: 'claim:0x23d56caca78271925c51fdcfb6da8c8eccf7e35ead7cdfb01520ed18f1cd4f5a:0',
        sequence: 6509649,
        target: { id: '\ud83d\ude20 \ud83d\udc36 \ud83d\ude20' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x6b7eb2e2084ad4f3606a5f082195c0121c0efa3b',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:528346',
        created_at: 1521748884000,
        family: 'kovan',
        id: 'claim:0x1b547eb0fb132376551c0e0d3063d1f7c8afcac256ec6f3cb750a00acd799fbd:0',
        sequence: 6509101,
        target: { id: 'Meow!' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [
          {
            author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
            context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
            created_at: 1521787620000,
            family: 'kovan',
            id: 'claim:0x4999436ecf49984576651c7586dc95d4b59766e00c779cc2fdeade6ffc0bf8e8:0',
            sequence: 6516195,
            target: { id: 'There are so many things that connect us... Bun in owen?' }
          }
        ],
        author: '0x6b7eb2e2084ad4f3606a5f082195c0121c0efa3b',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:587035',
        created_at: 1521748632000,
        family: 'kovan',
        id: 'claim:0xd87fbe04e51c55bbd90b3dcfbd48046311427038dfbb5597c533f85c5a85e7bf:0',
        sequence: 6509052,
        target: { id: 'I \u2764 catnip' },
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
      },
      {
        about: null,
        abouted: [],
        author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:397289',
        created_at: 1521748244000,
        family: 'kovan',
        id: 'claim:0xf7009fdc96e5fc001d7ee355661fa53e8aa8b29734e54b2529e368ea630a8f28:0',
        sequence: 6508977,
        target: { id: 'Bite! Hehehe bite' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x6b7eb2e2084ad4f3606a5f082195c0121c0efa3b',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:606284',
        created_at: 1521748096000,
        family: 'kovan',
        id: 'claim:0x5efa5038d61d4fbcf4f68bb5ae1ed7b04881c678f8b386f1556d3f9b6183914b:0',
        sequence: 6508948,
        target: { id: 'We come in peace \ud83d\udc7d' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x157da080cb7f3e091eadfa32bc7430d9f142bee3',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:631745',
        created_at: 1521746228000,
        family: 'kovan',
        id: 'claim:0x12c7313e795f891f6d3b28dff787c3f2c718fac3b14c53681f73ddcefbe6171d:0',
        sequence: 6508585,
        target: { id: "What doesn't kill you https://raw.githubusercontent.com/GrumpyFather/GrumpyCat/master/2.jpg" },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521738380000,
        family: 'kovan',
        id: 'claim:0x27c6faafcf697918ae62b2c3fcd4cc8e48ed2079579d4311c402883e41c2f680:0',
        sequence: 6507133,
        target: { id: 'I IZ SAD *-* CAN U PLZ \u2764 ME? ' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x1e3fff1b730f10087d23f848f02047ee8f4cbe8d',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:635286',
        created_at: 1521733836000,
        family: 'kovan',
        id: 'claim:0xec2eaf128572891218a02ae0ef1f2e65c41ad06b57e1c849bb232628f36994d7:0',
        sequence: 6506323,
        target: { id: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        targeted: [],
        type: 'regular'
      },
      {
        about: { id: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:593163' },
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:608827',
        created_at: 1521727248000,
        family: 'kovan',
        id: 'claim:0x68aa7a0d512831680b8d578c2cb05f5d04f4c66b6ead9ebf3f5386d8bca476fd:0',
        sequence: 6505161,
        target: { id: 'New cool kitten on the block' },
        targeted: [],
        type: 'post_to'
      },
      {
        about: null,
        abouted: [],
        author: '0x460031ae4db5720d92a48fecf06a208c5099c186',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:593163',
        created_at: 1521661967000,
        family: 'rinkeby',
        id: 'claim:0x570a40a6b5e9b5d568536c33b986c62abd995deb546e21fac15c949a3e3726e7:0',
        sequence: 1972795,
        target: { id: '\ud83e\udd1f\ud83c\udffb' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1521654044000,
        family: 'kovan',
        id: 'claim:0x351c80ae981d375cc4cb62ebe9fa2af0ae4281a2f603e6218b43940e932612b5:0',
        sequence: 6491843,
        target: { id: 'claim:0x89123a410bc6cf750c08ced40fc5a6228a66285722c3143441936f4824505bb7:0' },
        targeted: [],
        type: 'regular'
      },
      {
        about: null,
        abouted: [],
        author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
        context: 'ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:341605',
        created_at: 1520425637000,
        family: 'ethereum',
        id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
        sequence: 5212559,
        target: { id: "I'm supercat! (true story)" },
        targeted: [],
        type: 'regular'
      }
    ]
  };

  return (
    <div
      style={{
        backgroundColor: '#f9fbfd'
      }}
    >
      <div className="container" style={{ padding: '40px 0' }}>
        <div className="columns">
          <div className="column is-6 is-offset-3">{feedItems.items.map(feedItem => <Card feedItem={feedItem} />)}</div>
        </div>
      </div>
    </div>
  );
});
