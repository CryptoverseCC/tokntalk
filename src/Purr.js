import React, { Component } from 'react';
import timeago from 'timeago.js';
import DOMPurify from 'dompurify';
import metamask from './img/metamask.png';

export class PurrForm extends Component {
  state = {
    purr: undefined
  };

  purr = async () => {
    await this.props.purr(this.state.purr);
    this.setState({ purr: '' });
  };

  render() {
    return (
      <div className="purr--form">
        <div className="group">
          <input
            className={this.state.purr ? 'filled' : 'empty'}
            type="text"
            value={this.state.purr}
            onChange={e => this.setState({ purr: e.target.value })}
          />
          <span className="highlight" />
          <span className="bar" />
          <label className="txtwav bounce">Purr about cat problems!</label>
        </div>
        <div className={this.state.purr ? '' : 'hidden'}>
          <a className="button purrit" onClick={this.purr}>
            <img alt="MetaMask" style={{ width: '22px', marginRight: '20px', height: 'auto' }} src={metamask} />Purr it!
          </a>
        </div>
      </div>
    );
  }
}

export const Purr = ({ message, date }) => {
  const sanitizedMessage = DOMPurify.sanitize(message);
  const expression = /https?:\/\/[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
  const regex = new RegExp(expression);
  const replaceMatchWithLink = match => {
    return `<a href="${match}">${match}</a>`;
  };
  return (
    <div className="purr" style={{ display: 'flex', alignItems: 'center' }}>
      <p
        className="purr--message"
        dangerouslySetInnerHTML={{ __html: sanitizedMessage.replace(regex, replaceMatchWithLink) }}
      />
      <span className="purr--date">{timeago().format(date)}</span>
    </div>
  );
};

export const PurrGroup = ({ Avatar, children, catId }) => (
  <div className="columns link-group">
    <div className="kitten column is-3 has-text-centered">
      <Avatar catId={catId} />
    </div>
    <div className="column is-9" style={{ paddingTop: 0, paddingBottom: 0 }}>
      {children}
    </div>
  </div>
);
