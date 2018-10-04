import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Link from './Link';
import { IfActiveEntity, EntityClubs } from './Entity';
import { TokenImage } from './clubs';
import { DiscoverIcon } from './Icons';
import { UnreadedCount } from './UnreadedMessages';

import coinbase from './img/wallets/coinbase.png';
import trust from './img/wallets/trust.svg';
import cipher from './img/wallets/cipher.svg';
import metamask from './img/wallets/metamask.svg';
import tokenpocket from './img/wallets/tokenpocket.png';
const { REACT_APP_INTERFACE_VALUE: INTERFACE_VALUE } = process.env;

const ActiveEntityTokens = () => (
  <IfActiveEntity>
    {(activeEntityId) => (
      <EntityClubs id={activeEntityId}>
        {(clubs) => (
          <React.Fragment>
            {clubs.map((club) => (
              <Token key={club.address} token={club} withCounter />
            ))}
            {/* <DiscoverMore>{!clubs.length ? 'Join your first community' : 'Discover more'}</DiscoverMore> */}
          </React.Fragment>
        )}
      </EntityClubs>
    )}
  </IfActiveEntity>
);

export default ActiveEntityTokens;

const YourCommunitiesContainer = styled.div``;

const YourCommunitiesLink = styled(NavLink)`
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

  &.selected {
    background: #f5f8fd;
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
  width: 44px;
  height: 44px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1rem -0.2rem rgba(27, 36, 55, 0.12);
  margin-bottom: 6px;
  padding: 10px;
`;

const WalletType = styled.span`
  color: #acb7c8;
  font-size: 0.8rem;
  margin-top: -5px;
`;

const NoMetamask = () => (
  <YourCommunitiesContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <p
      style={{
        fontSize: '1.5rem',
        color: '#1B2538',
        fontWeight: 'bold',
      }}
    >
      Get a wallet
    </p>
    <p style={{ marginBottom: '30px' }}>To connect with token owners</p>
    <div className="columns is-multiline is-mobile">
      <div className="column is-one-third ">
        <WalletContainer href="https://metamask.io/">
          <WalletIcon src={metamask} />
          <p>Metamask</p>
          <WalletType>Desktop</WalletType>
        </WalletContainer>
      </div>
      <div className="column is-one-third">
        <WalletContainer href="https://trustwalletapp.com/">
          <WalletIcon src={trust} />
          <p>Trust</p>
          <WalletType>Mobile</WalletType>
        </WalletContainer>
      </div>
      <div className="column is-one-third">
        <WalletContainer href="https://wallet.coinbase.com/">
          <WalletIcon src={coinbase} />
          <p>Coinbase</p>
          <WalletType>Mobile</WalletType>
        </WalletContainer>
      </div>
      <div className="column is-one-third">
        <WalletContainer href="https://www.cipherbrowser.com/">
          <WalletIcon src={cipher} />
          <p>Cipher</p>
          <WalletType>Mobile</WalletType>
        </WalletContainer>
      </div>
      <div className="column is-one-third">
        <WalletContainer href={`https://tokenpocket.github.io/applink?dappUrl=${INTERFACE_VALUE}`}>
          <WalletIcon src={tokenpocket} />
          <p>TokenPocket</p>
          <WalletType>Mobile</WalletType>
        </WalletContainer>
      </div>
    </div>
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
      to="/clubs"
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

export const Token = ({ token, withCounter = false }) => (
  <YourCommunitiesLink to={token.isCustom ? `/clubs/${token.network}:${token.address}` : `/clubs/${token.symbol}`}>
    <TokenImage token={token} style={{ width: '22px', height: '22px', marginRight: '15px' }} />
    {token.name}
    {withCounter && <StyledUnreadedMessages token={token} />}
  </YourCommunitiesLink>
);
