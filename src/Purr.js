import React, { Component } from 'react';
import { SplitString } from "./utils";
import metamask from './img/metamask.png';
import timeago from 'timeago.js';

export class PurrForm extends Component {
  state = {
    purr: undefined
  };
  render() {
    return (
      <div className="purr--form">
        <form>
          <div className="group">
            <input
              className={this.state.purr ? 'filled' : 'empty'}
              type="text"
              value={this.state.purr}
              onChange={e => this.setState({ purr: e.target.value })}
            />
            <span className="highlight" />
            <span className="bar" />
            <label className="txtwav bounce">
              <SplitString>Purr about cat problems!</SplitString>
            </label>
          </div>
          <div className={this.state.purr ? '' : 'hidden'}>
            <a className="button purrit">
              <img alt="MetaMask" style={{ width: '22px', marginRight: '20px', height: 'auto' }} src={metamask} />Purr
              it!
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export const Purr = ({ message, date }) => {
  return <div className="purr" style={{ display: 'flex', alignItems: 'center' }}>
    <p className="purr--message">{message}</p>
    <span className="purr--date">{timeago().format(date)}</span>
  </div>
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
