import React, { Component } from 'react';
import timeago from 'timeago.js';
import DOMPurify from 'dompurify';
import { StaticAvatar, ChangableAvatar } from './KittyAvatar';
import metamask from './img/metamask.png';
import Context from './Context';

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

export const ShowNewPurrs = ({ forCat }) => (
  <Context.Consumer>
    {({ purrStore: { purrs, newPurrs, temporaryPurrs, showNewPurrs } }) => {
      let newPurrsCount;
      if (forCat) {
        const purrsForCat = purrs.filter(({ token_id }) => token_id === forCat);
        const newPurrsForCat = newPurrs.filter(({ token_id }) => token_id === forCat);
        const temporaryPurrsForCat = temporaryPurrs.filter(({ token_id }) => token_id === forCat);
        newPurrsCount = newPurrsForCat.length - temporaryPurrsForCat.length - purrsForCat.length;
      } else {
        newPurrsCount = newPurrs.length - temporaryPurrs.length - purrs.length;
      }

      return (
        newPurrsCount > 0 && (
          <div className="columns">
            <button className="column is-9 is-offset-3 new-purrs--button" onClick={showNewPurrs}>
              {newPurrsCount} new purrs. Click here to show them!
            </button>
          </div>
        )
      );
    }}
  </Context.Consumer>
);

export const PurrGroupWithForm = () => (
  <Context.Consumer>
    {({ purrStore: { purr, allowPurr } }) =>
      allowPurr && (
        <PurrGroup Avatar={ChangableAvatar}>
          <PurrForm purr={purr} />
        </PurrGroup>
      )
    }
  </Context.Consumer>
);

export const PurrsList = ({ purrs }) =>
  purrs.map(({ token_id, catId, purrs, message, created_at }, purrIndex) => (
    <PurrGroup key={purrIndex} catId={token_id} Avatar={StaticAvatar}>
      <Purr key={purrIndex} message={message} date={created_at} />
    </PurrGroup>
  ));
