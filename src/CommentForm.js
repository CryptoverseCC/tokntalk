import React from 'react';
import TextArea from 'react-autosize-textarea/lib';

import styled, { css } from 'styled-components';
import Context from './Context';
import Paw from './img/paw.svg';
import TranslationsContext from './Translations';

export const CommentForm = styled.form`
  position: relative;
  display: flex;
`;

export const StyledTextArea = styled(({ inputRef, ...props }) => <TextArea innerRef={inputRef} {...props} />)`
  background: transparent;
  font-family: 'AvenirNext';
  font-size: 2rem;
  font-weight: 600;
  color: #1b2437;
  margin-top: 5px;
  border: none;
  resize: none;
  width: 100%;
  outline: none;
  overflow: auto;

  &::placeholder {
    transition: color 0.15s ease-in-out;
    color: #264dd9;
  }

  &:-ms-input-placeholder {
    color: #264dd9;
  }

  &::-ms-input-placeholder {
    color: #264dd9;
  }

  &:hover:-ms-input-placeholder,
  &:focus:-ms-input-placeholder {
    color: #1b2437;
  }

  &:hover::-ms-input-placeholder,
  &:focus::-ms-input-placeholder {
    color: #1b2437;
  }

  &:focus::-webkit-input-placeholder {
    color: #928f9b;
  }
`;

export const ReplyForm = styled(CommentForm)`
  background-color: #f3f6ff;
  width: 100%;
  padding: 20px 0 14px 15px;
  border-radius: 6px 6px 40px 6px;
  align-items: center;
  border: 1px solid ${({ valid }) => (valid ? 'transparent' : 'red')};
  transition: all 0.15s ease-in;

  &:focus-within {
    box-shadow: 0px 2px 6px -3px rgb(40, 80, 217, 0.6);
    transition: all 0.15s ease-in;
  }

  ${StyledTextArea} {
    font-size: 1rem;
    font-weight: normal;

    &::placeholder {
      font-weight: 500;
      color: #264dd9;
    }

    &:-ms-input-placeholder {
      font-weight: 500;
      color: #264dd9;
    }

    &::-ms-input-placeholder {
      font-weight: 500;
      color: #264dd9;
    }

    &:focus::-webkit-input-placeholder {
      color: #6c8dff;
    }
  }
`;

const MetamaskButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 5px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  outline: none;
  border: none;
  transition: all 0.15s ease-in-out;
  background: #264dd9 url(${Paw});
  background-position: 50% 50%;
  background-size: 50%;
  background-repeat: no-repeat;
  transform: translateY(5px);
  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0;
        `
      : css`
          opacity: 1;
          box-shadow: 0 0.7rem 1.5rem -0.35rem rgba(118, 103, 170, 0.8);
          transform: translateY(0px);
          cursor: pointer;
          &:hover,
          &:focus {
            box-shadow: 0 0.7rem 1.5rem -0.35rem rgba(118, 103, 170, 1);
          }
        `};
`;

export class TextAreaForm extends React.Component {
  state = {
    comment: '',
    submitting: false,
  };

  validate = () => {
    return this.props.validate ? this.props.validate(this.state.comment) : !!this.state.comment;
  };

  submitForm = async () => {
    this.setState({ submitting: true });
    await this.props.sendMessage(this.state.comment);
    this.setState({ comment: '', submitting: false });
    this.props.onSubmit && this.props.onSubmit();
  };

  render() {
    const { placeholder, className, Form, inputRef } = this.props;
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          this.submitForm();
        }}
        className={className}
        valid={this.props.validate ? this.props.validate(this.state.comment) : true}
      >
        <StyledTextArea
          inputRef={inputRef}
          placeholder={placeholder}
          value={this.state.comment}
          onChange={(e) => this.setState({ comment: e.target.value })}
          onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && this.submitForm()}
        />
        <MetamaskButton disabled={!this.state.submitting && !this.validate()} type="submit" />
      </Form>
    );
  }
}

export const ConnectedClubForm = ({ token, ...props }) => (
  <Context.Consumer>
    {({ feedStore: { writeAbout } }) => (
      <TextAreaForm
        sendMessage={(message) => writeAbout(message, token)}
        placeholder={`Write in ${token.name} club`}
        {...props}
      />
    )}
  </Context.Consumer>
);

export const ConnectedCommentForm = ({ ...props }) => (
  <Context.Consumer>
    {({ feedStore: { sendMessage } }) => (
      <TranslationsContext.Consumer>
        {({ commentPlaceholder }) => (
          <TextAreaForm sendMessage={sendMessage} placeholder={commentPlaceholder} {...props} />
        )}
      </TranslationsContext.Consumer>
    )}
  </Context.Consumer>
);

export const ConnectedReplyForm = ({ about, ...props }) => (
  <Context.Consumer>
    {({ feedStore: { reply } }) => (
      <TranslationsContext.Consumer>
        {({ replyPlaceholder }) => (
          <TextAreaForm sendMessage={(message) => reply(message, about)} placeholder={replyPlaceholder} {...props} />
        )}
      </TranslationsContext.Consumer>
    )}
  </Context.Consumer>
);

export const ConnectedLabelForm = ({ labelType, ...props }) => (
  <Context.Consumer>
    {({ feedStore: { label } }) => (
      <TextAreaForm
        sendMessage={(message) => label(message, labelType)}
        placeholder={`Set your ${labelType}`}
        {...props}
      />
    )}
  </Context.Consumer>
);

export const ConnectedWriteToForm = ({ to, ...props }) => (
  <Context.Consumer>
    {({ feedStore: { writeTo } }) => (
      <TextAreaForm placeholder={`Write to ${to.name}`} sendMessage={(message) => writeTo(message, to)} {...props} />
    )}
  </Context.Consumer>
);
