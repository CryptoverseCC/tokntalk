import React from "react";
import TextArea from 'react-autosize-textarea';
import Metamask from './img/metamask.png';

export default class CommentForm extends React.Component {
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
          <img alt="" src={Metamask} style={{ width: '70%' }} />
        </button>
      </form>
    );
  }
}
