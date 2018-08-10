import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import jazzicon from 'jazzicon';

export const validateParams = (validators, redirectTo) => (Cmp) => {
  return class extends Component {
    static displayName = `validateParams(${Cmp.displayName || Cmp.name})`;

    constructor(props) {
      super(props);
      const { params } = props.match;
      const isParamasValid = Object.entries(validators).reduce(
        (acc, [key, validator]) => acc && validator(params[key]),
        true,
      );
      this.state = { isParamasValid };
    }

    render() {
      return this.state.isParamasValid ? <Cmp {...this.props} /> : <Redirect to={redirectTo} />;
    }
  };
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
