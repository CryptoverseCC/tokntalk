import React from 'react';
import TextArea from 'react-autosize-textarea';
import timeago from 'timeago.js';
import '../index.css';
import Metamask from '../img/metamask.png';
import Like from '../img/like.svg';
import Reply from '../img/reply.svg';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const IdentityAvatar = ({ size }) => {
  const { containerSize, imgSize, imgTopOffset } = {
    small: { containerSize: '44px', imgSize: '110px', imgTopOffset: '85%' },
    medium: { containerSize: '54px', imgSize: '120px', imgTopOffset: '77%' },
    large: { containerSize: '64px', imgSize: '130px', imgTopOffset: '70%' }
  }[size];
  return (
    <div
      style={{
        overflow: 'hidden',
        width: containerSize,
        height: containerSize,
        position: 'relative',
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
        style={{ position: 'relative' }}
        onSubmit={e => {
          e.preventDefault();
          this.submitForm();
        }}
      >
        <TextArea
          className="cp-textarea"
          style={{
            fontFamily: 'Rubik',
            fontSize: '24px',
            fontWeight: '500',
            color: '#1B2437',
            border: 'none',
            resize: 'none',
            width: 'calc(100% - 50px)',
            outline: 'none',
            overflow: 'auto'
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
            right: 0,
            bottom: 0,
            height: '50px',
            width: '50px',
            backgroundColor: '#fff',
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

const Card = ({ feedItem }) => {
  const familyPrefix = feedItem.family === 'ethereum' ? '' : `${feedItem.family}.`;
  const etherscanUrl = `https://${familyPrefix}etherscan.io/tx/${feedItem.id.split(':')[1]}`;
  return (
    <div className="box cp-box" style={{ boxShadow: '0 4px 10px rgba(98,60,234,0.07)', fontFamily: 'Rubik' }}>
      <article className="media">
        <div className="media-left" style={{ width: '54px' }}>
          <IdentityAvatar size="medium" />
        </div>
        <div className="media-content">
          <a>
            <div style={{ fontSize: '18px' }}>
              <b>Cpt. Barbossa</b>
            </div>
          </a>
          <div>
            <small style={{ color: '#928F9B' }}>
              {timeago().format(feedItem.created_at)}{' '}
              <a href={etherscanUrl} style={{ marginLeft: '5px', textTransform: 'capitalize' }}>
                {feedItem.family}
              </a>
            </small>
          </div>
          <p style={{ marginTop: '20px', fontSize: '18px' }}>{feedItem.target.id}</p>
          <div style={{ marginTop: '20px', display: 'flex' }}>
            <Label
              className="cp-like cp-label--done"
              icon={<img src={Like} />}
              text={'Like'}
              count={feedItem.targeted.length}
              colors={{ border: '#ffe4f3', iconBackground: '#FFA6D8', count: '#FFA6D8' }}
            />
            <Label
              className="cp-reply"
              icon={<img src={Reply} />}
              text={'Reply'}
              count={feedItem.abouted.length}
              style={{ marginLeft: '30px' }}
              colors={{ border: '#cfc4f8', iconBackground: '#623CEA', count: '#623CEA' }}
            />
          </div>
        </div>
      </article>
      {feedItem.abouted.map(reply => (
        <article className="media" style={{ borderTop: 'none' }}>
          <div className="media-left">
            <div
              style={{ height: '54px', width: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                  <b>{reply.context.split(':')[2]}</b>
                </a>{' '}
                {reply.target.id}
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
                  <span style={{ marginLeft: '10px' }}>{timeago().format(reply.created_at)}</span>{' '}
                  <a href={etherscanUrl} style={{ marginLeft: '5px', textTransform: 'capitalize' }}>
                    {reply.family}
                  </a>
                </small>
              </div>
            </div>
          </div>
        </article>
      ))}
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

storiesOf('Card', module).add('Comment', () => (
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
));
