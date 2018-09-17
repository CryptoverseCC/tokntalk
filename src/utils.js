import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import jazzicon from 'jazzicon';

import { getAssetsInfo } from './api';

const { REACT_APP_NAME: APP_NAME } = process.env;

export const Storage = (storage = localStorage) => ({
  getItem(key) {
    return storage.getItem(`${APP_NAME}_${key}`);
  },
  setItem(key, value) {
    return storage.setItem(`${APP_NAME}_${key}`, value);
  },
  removeItem(key) {
    return storage.removeItem(`${APP_NAME}_${key}`);
  },
});

export function getCurrentProviderName() {
  try {
    if (window.web3.currentProvider.isMetaMask) return 'metamask';

    if (window.web3.currentProvider.isTokenPocket) return 'tokenPocket';

    if (window.web3.currentProvider.isTrust) return 'trust';

    if (typeof window.SOFA !== 'undefined') return 'toshi';

    if (typeof window.__CIPHER__ !== 'undefined') return 'cipher';

    if (window.web3.currentProvider.constructor.name === 'EthereumProvider') return 'mist';

    if (window.web3.currentProvider.constructor.name === 'Web3FrameProvider') return 'parity';

    if (window.web3.currentProvider.isToknTalkEmbedded) return 'ToknTalkEmbedded';
  } catch (e) {}

  return 'unknown';
}

export const validateParams = (validators, redirectTo) => (Cmp) => {
  return class extends Component {
    static displayName = `validateParams(${Cmp.displayName || Cmp.name})`;

    constructor(props) {
      super(props);
      this.state = { isParamasValid: this.validate(props) };
    }

    componentWillReceiveProps(newProps) {
      if (this.props.match !== newProps.match) {
        this.setState({ isParamasValid: this.validate(newProps) });
      }
    }

    validate(props) {
      const { params } = props.match;
      const isParamasValid = Object.entries(validators).reduce(
        (acc, [key, validator]) => acc && validator(params[key]),
        true,
      );
      return isParamasValid;
    }

    render() {
      return this.state.isParamasValid ? <Cmp {...this.props} /> : <Redirect to={redirectTo} />;
    }
  };
};

export const enhanceCustomClubProp = (inPropName, ourPropName) => (Cmp) =>
  class extends Component {
    state = { club: this.props[inPropName] };

    componentDidMount() {
      if (this.state.club.isCustom) {
        this.getCustomClubInfo(this.state.club);
      }
    }

    componentWillReceiveProps(newProps) {
      if (newProps[inPropName] !== this.props[inPropName]) {
        const club = newProps[inPropName];
        this.setState({ club }, () => {
          if (club.isCustom) {
            this.getCustomClubInfo(club);
          }
        });
      }
    }

    getCustomClubInfo = async (club) => {
      const info = await getAssetsInfo([club.asset]);
      if (info[club.asset]) {
        const { name, symbol } = info[club.asset];
        const enhancedClub = club.extend({ name, symbol });
        this.setState({ club: enhancedClub });
      }
    };

    render() {
      return <Cmp {...{ ...this.props, [ourPropName]: this.state.club }} />;
    }
  };

export const rewriteCmp = (from, to) => ({ location }) => {
  return <Redirect to={{ ...location, pathname: location.pathname.replace(from, to) }} />;
};

const iconCache = {};
export const getAvatarUrlForAddress = (address) => {
  if (!iconCache[address]) {
    const icon = jazzicon(100, parseInt(address.slice(2, 10), 16)).firstChild;
    const serializer = new XMLSerializer();
    const blob = new Blob([serializer.serializeToString(icon)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    iconCache[address] = url;
  }

  return iconCache[address];
};

export const getEntityInfoForAddress = (address) => ({
  isAddress: true,
  id: address.toLowerCase(),
  external_link: `https://etherscan.io/address/${address}`,
  image_preview_url: getAvatarUrlForAddress(address),
  name: `${address.substr(0, 7).toLowerCase()}...${address.substring(37).toLowerCase()}`,
});

export const createEtherscanUrl = (item) => {
  if (item.family.toLowerCase() === 'http') return undefined;
  const familyPrefix = item.family === 'ethereum' ? '' : `${item.family}.`;
  return `https://${familyPrefix}etherscan.io/tx/${item.id.split(':')[1]}`;
};

class ScrollToTopCmp extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.state && location.state.modal) {
      return;
    }

    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export const ScrollTop = withRouter(ScrollToTopCmp);
