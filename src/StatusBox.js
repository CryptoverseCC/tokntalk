import React, { Component } from 'react';
import styled from 'styled-components';
import hoistNonReactStatics from 'hoist-non-react-statics';

import AppContext from './Context';
import { SwitcherIcon, ExclamationMark } from './Icons';
import unlockBackground from './img/unlock_bg.png';
import mouse from './img/mouse_click.png';
import OpenSea from './OpenSea';

const Web3Locked = () => (
  <Web3LockedContainer>
    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Unlock your wallet</p>
    <span>To connect with token owners alike</span>
    <img style={{ width: '208px', height: 'auto', marginTop: '0px', textAlign: 'center' }} alt="" src={mouse} />
  </Web3LockedContainer>
);
const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  border-radius: 12px;
  padding: 10px;

  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
  }
`;

const Web3LockedContainer = StatusContainer.extend`
  background-image: url(${unlockBackground});
  background-size: cover;
  flex-direction: column;
`;

const WarningContainerColored = StatusContainer.extend`
  background: ${({ primaryColor }) => primaryColor};
  color: ${({ secondaryColor }) => secondaryColor};

  display: flex;
  align-items: baseline
  flex-direction: column;
`;

const StatusHeader = styled.div`
  display: flex;
`;

const NoToken = ({ token }) => (
  <WarningContainerColored primaryColor={token.primaryColor} secondaryColor={token.secondaryColor}>
    <StatusHeader>
      <ExclamationMark style={{ marginRight: '30px', fill: token.secondaryColor }} />
      <div>
        <p style={{ fontSize: '1.5rem', color: token.secondaryColor, lineHeight: '1.2' }}>
          Acquire {token.name} to participate!
        </p>
        <p style={{ fontSize: '1rem', color: token.secondaryColor, opacity: '0.6' }}>
          Then you'll be able to join the conversation.
        </p>
      </div>
    </StatusHeader>
    {token.is721 ? (
      <AppContext>
        {({ web3Store }) =>
          web3Store.networkName === 'ethereum' &&
          web3Store.from && <OpenSea token={token} style={{ marginTop: '15px' }} />
        }
      </AppContext>
    ) : null}
  </WarningContainerColored>
);

const ActiveEntityIsNotFromFamily = ({ token }) => (
  <WarningContainerColored
    primaryColor={token.primaryColor}
    secondaryColor={token.secondaryColor}
    className="is-flex"
    style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
  >
    <SwitcherIcon style={{ marginRight: '30px', fill: token.secondaryColor }} />
    <div>
      <p style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>Switch your avatar!</p>
      <p style={{ fontSize: '14px' }}>Change your character to {token.name} in the upper right corner</p>
    </div>
  </WarningContainerColored>
);

class StatusBox extends Component {
  static Web3Locked = ({ entityStore: { activeEntity } }) => (activeEntity ? null : <Web3Locked />);

  static HasToken = (token) => ({ entityStore: { activeEntity, getEntity } }) => {
    if (!activeEntity) return <NoToken token={token} />;
    const hasToken = !!getEntity(activeEntity.id).tokens.find((t) => t.asset === token.asset);
    return hasToken ? null : <NoToken token={token} />;
  };

  static IsFromFamily = (token) => ({ entityStore: { activeEntity } }) => {
    if (!activeEntity) return <ActiveEntityIsNotFromFamily token={token} />;
    const [network, address] = activeEntity.id.split(':');
    const is = `${network}:${address}` === token.asset;
    return is ? null : <ActiveEntityIsNotFromFamily token={token} />;
  };

  render() {
    const { state, check, children, style, className } = this.props;
    const status = check.reduce((acc, check) => (acc ? acc : check(state)), null);

    return (
      <div style={style} className={className}>
        {status || children}
      </div>
    );
  }
}

const StatusBoxWithContext = (props) => (
  <AppContext.Consumer>{(state) => <StatusBox state={state} {...props} />}</AppContext.Consumer>
);

export default hoistNonReactStatics(StatusBoxWithContext, StatusBox);
