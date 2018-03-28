import React from 'react';
import TextArea from 'react-autosize-textarea';
import '../index.css';
import Metamask from '../img/metamask.png';
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
    this.setState({comment: ''})
  }

  render() {
    return (
      <form
        style={{ position: 'relative' }}
        onSubmit={e => {
          e.preventDefault();
          this.submitForm();
        }}
      >
        <div
          style={{
            fontFamily: 'Rubik',
            fontSize: '18px',
            fontWeight: '500',
            color: '#623CEA'
          }}
        >
          {this.props.id}
        </div>
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

storiesOf('Header', module)
  .add('No Metamask', () => <Header status={<ErrorStatus message={'No Metamask'} />} />)
  .add('No identity detected', () => <Header status={<ErrorStatus message={'No identity detected'} />} />)
  .add('Metamask locked', () => <Header status={<ErrorStatus message={'Metamask locked'} />} />)
  .add('with identity', () => <Header status={<IdentityStatus id={'Cpt. Barbossa'} />} />);

storiesOf('Hero', module)
  .add('without identity', () => <Hero />)
  .add('with identity', () => <Hero id={'Cpt. Barbossa'} />);
