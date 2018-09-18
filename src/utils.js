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

/* eslint-disable */
export const mobileOrTablet = () => {
  var check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor);
  return check;
};

export default mobileOrTablet;
