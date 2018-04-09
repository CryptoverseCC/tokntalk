import React from 'react';
import TextArea from 'react-autosize-textarea';
import Context from './Context';
import Metamask from './img/metamask.png';

export default class CommentForm extends React.Component {
  state = {
    comment: ''
  };

  submitForm = async () => {
    await this.props.sendMessage(this.state.comment);
    this.setState({ comment: '' });
    this.props.onSubmit && this.props.onSubmit();
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
          placeholder={this.props.placeholder}
          value={this.state.comment}
          onChange={e => this.setState({ comment: e.target.value })}
          onKeyPress={e => e.key === 'Enter' && e.ctrlKey && this.submitForm()}
        />
        <button
          disabled={!this.state.comment}
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

export const ConnectedCommentForm = props => (
  <Context.Consumer>
    {({ feedStore: { sendMessage } }) => <CommentForm sendMessage={sendMessage} placeholder="Purr your story" {...props} />}
  </Context.Consumer>
);

export const ConnectedReplyForm = ({about, ...props}) => (
  <Context.Consumer>
    {({ feedStore: { reply } }) => <CommentForm sendMessage={(message) => reply(message, about)} placeholder="Purr your reply" {...props} />}
  </Context.Consumer>
);

export const ConnectedLabelForm = ({labelType, ...props}) => (
  <Context.Consumer>
    {({ feedStore: { label } }) => <CommentForm sendMessage={(message) => label(message, labelType)} placeholder={`Set your ${labelType}`} {...props} />}
  </Context.Consumer>
)
