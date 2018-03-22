import React, { Component } from 'react';
import timeago from 'timeago.js';
import sanitizeHtml from 'sanitize-html';
import { SplitString } from './utils';
import metamask from './img/metamask.png';
import getWeb3 from './web3';

const contractAddressesForNetworkId = {
  1: '0xFd74f0ce337fC692B8c124c094c1386A14ec7901',
  3: '0xC5De286677AC4f371dc791022218b1c13B72DbBd',
  4: '0x6f32a6F579CFEed1FFfDc562231C957ECC894001',
  42: '0x139d658eD55b78e783DbE9bD4eb8F2b977b24153',
};

const contractAbi = [
  {
    constant: false,
    inputs: [{ name: 'data', type: 'string' }],
    name: 'post',
    outputs: [],
    payable: false,
    type: 'function',
  },
];

export class PurrForm extends Component {
  state = {
    purr: undefined
  };

  purr = async (e) => {
    const data = {
      claim: {
        target: this.state.purr
      },
      context: `ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:${this.props.catId}`
    };
    const web3 = await getWeb3();
    const [networkId, [from]] = await Promise.all([
      web3.eth.net.getId(),
      web3.eth.getAccounts()
    ])
    const contractAddress = contractAddressesForNetworkId[networkId];
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    contract.setProvider(web3.currentProvider);
    contract.methods.post(JSON.stringify(data)).send({from});
  }

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
          <label className="txtwav bounce">
            <SplitString>Purr about cat problems!</SplitString>
          </label>
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
  const sanitizedMessage = sanitizeHtml(message);
  const expression = /https?:\/\/[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
  const regex = new RegExp(expression);
  const replaceMatchWithLink = (match) => {
    return `<a href="${match}">${match}</a>`
  }
  return (
    <div className="purr" style={{ display: 'flex', alignItems: 'center' }}>
      <p className="purr--message" dangerouslySetInnerHTML={{__html: sanitizedMessage.replace(regex, replaceMatchWithLink)}} />
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
