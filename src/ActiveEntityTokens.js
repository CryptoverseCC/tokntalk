import React from 'react';
import styled from 'styled-components';
import find from 'lodash/fp/find';

import Link from './Link';
import { H4 } from './Components';
import AppContext from './Context';
import { IfActiveEntity, Entity } from './Entity';
import clubs, { TokenImage } from './clubs';
import { DiscoverIcon } from './Icons';
import { UnreadedCount } from './UnreadedMessages';

import toshi from './img/wallets/toshi.svg';
import trust from './img/wallets/trust.svg';
import cipher from './img/wallets/cipher.svg';
import metamask from './img/wallets/metamask.svg';
import unlockBackground from './img/unlock_bg.png';
import mouse from './img/mouse_click.png';

const ActiveEntityTokens = () => (
  <AppContext.Consumer>
    {({ web3Store: { provider } }) => {
      if (typeof provider === 'undefined') {
        return null;
      }
      if (typeof provider === 'boolean' && !provider) {
        return <NoMetamask />;
      }

      return (
        <IfActiveEntity other={<NoActiveEntity />}>
          {(activeEntityId) => (
            <Entity id={activeEntityId}>
              {(entity) => (
                <YourCommunitiesContainer>
                  <H4 style={{ marginBottom: '15px' }}>Your communities</H4>
                  {entity.tokens.map((asset) => (
                    <Token key={asset} asset={asset} />
                  ))}
                  <DiscoverMore>{!entity.tokens.length ? 'Join your first community' : 'Discover more'}</DiscoverMore>
                </YourCommunitiesContainer>
              )}
            </Entity>
          )}
        </IfActiveEntity>
      );
    }}
  </AppContext.Consumer>
);

export default ActiveEntityTokens;

const YourCommunitiesContainer = styled.div`
  margin-bottom: 3rem;
  background-color: 'transparent';
  padding: 0;
  border-radius: 0;
  background-color: #ecf1f9;
  position: relative;
  padding: 30px;
  border-radius: 12px;
  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
  }
`;

const YourCommunitiesLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 7px 0;
  font-size: 1rem;
  color: #1b2437;
  transition: all 0.15s ease;

  :hover {
    color: #264dd9;
    transition: all 0.15s ease;
  }
`;

const WalletContainer = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #000000;
`;

const WalletIcon = styled.img`
  width: 80%;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0.6rem 1rem -0.3rem rgba(27, 36, 55, 0.04);
  padding: 10px;
`;

const WalletType = styled.span`
  color: #acb7c8;
`;

const NoMetamask = () => (
  <YourCommunitiesContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <p
      style={{
        fontSize: '1.5rem',
        color: '#1B2538',
        fontWeight: 600,
      }}
    >
      Get a wallet
    </p>
    <p style={{ marginBottom: '30px' }}>To connect with token owners</p>
    <div className="columns is-multiline is-mobile">
      <div className="column is-half">
        <WalletContainer href="https://metamask.io/">
          <WalletIcon src={metamask} />
          <p>Metamask</p>
          <WalletType>Desktop</WalletType>
        </WalletContainer>
      </div>
      <div className="column is-half">
        <WalletContainer href="https://trustwalletapp.com/">
          <WalletIcon src={trust} />
          <p>Trust</p>
          <WalletType>Mobile</WalletType>
        </WalletContainer>
      </div>
      <div className="column is-half">
        <WalletContainer href="https://www.toshi.org/">
          <WalletIcon src={toshi} />
          <p>Toshi</p>
          <WalletType>Mobile</WalletType>
        </WalletContainer>
      </div>
      <div className="column is-half">
        <WalletContainer href="https://www.cipherbrowser.com/">
          <WalletIcon src={cipher} />
          <p>Cipher</p>
          <WalletType>Mobile</WalletType>
        </WalletContainer>
      </div>
    </div>
  </YourCommunitiesContainer>
);

const NoActiveEntity = () => (
  <YourCommunitiesContainer
    style={{
      backgroundImage: `url(${unlockBackground})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Unlock your wallet</p>
    <span>To connect with token owners alike</span>
    <img style={{ width: '208px', height: 'auto', marginTop: '20px' }} src={mouse} />
  </YourCommunitiesContainer>
);

const DiscoverMore = ({ children, props }) => (
  <div {...props}>
    <Link
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '1px solid #dce0eb',
      }}
      to="/discover"
    >
      <DiscoverIcon
        style={{
          width: '24px',
          height: '24px',
          marginRight: '15px',
        }}
      />
      {children}
    </Link>
  </div>
);

const StyledUnreadedMessages = styled(UnreadedCount)`
  color: #1b2437;
  background: white;
`;

const Token = ({ asset }) => {
  const [network, address] = asset.split(':');
  const token = find({ network, address })(clubs);

  return (
    <YourCommunitiesLink to={`/discover/byToken/${token.symbol}`}>
      <TokenImage token={token} style={{ width: '22px', height: '22px', marginRight: '15px' }} />
      {token.name}
      <StyledUnreadedMessages token={token} />
    </YourCommunitiesLink>
  );
};
