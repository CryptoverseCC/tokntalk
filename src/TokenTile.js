import React from 'react';
import styled from 'styled-components';

import Link from './Link';
import { TokenImage } from './clubs';
import { H4 } from './Components';
import { UnreadedCount } from './UnreadedMessages';

const TokenTileCotainer = styled.div`
  background-color: ${({ primaryColor }) => primaryColor};
  background-image: ${({ coverImage }) => `url(${coverImage})`};
  background-repeat: no-repeat;
  background-size: cover;
  color: ${({ secondaryColor }) => secondaryColor};
  box-shadow: ${({ shadowColor }) => `0 3rem 5rem -2rem ${shadowColor}`};
  cursor: pointer;
  position: relative;
  width: 100%;
  padding-top: 105%;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s;
  transition: all 0.15s ease;
  margin-bottom: 40px;

  :hover {
    transform: translateY(-3px);
    box-shadow: ${({ shadowColor }) => `0 3rem 6rem -2rem  ${shadowColor}`};
    transition: all 0.15s ease;
  }

  :active {
    transform: scale(0.98);
    box-shadow: ${({ shadowColor }) => `0 3rem 4rem -2rem  ${shadowColor}`};
    transitionn: all 0.15s ease;
  }

  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
    padding-top: 50%;

    background-size: 50%;
    background-position: 100% 50%;
  }
`;

const TokenTileWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
`;

export const TokenTile = ({ linkTo, token, ...restProps }) => {
  return (
    <Link to={linkTo} {...restProps}>
      <TokenTileCotainer
        primaryColor={token.primaryColor}
        secondaryColor={token.secondaryColor}
        coverImage={token.coverImage}
        shadowColor={token.shadowColor}
      >
        <TokenTileWrapper>
          <div className="is-flex">
            <TokenImage token={token} style={{ width: '40px', height: '40px' }} />
            <UnreadedCount token={token} />
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{token.symbol}</p>
            <H4>{token.name.length > 20 ? token.shortName : token.name}</H4>
          </div>
        </TokenTileWrapper>
      </TokenTileCotainer>
    </Link>
  );
};

const SmallTokenTileContainer = styled.div`
  position: relative;
  background: white;
  margin-top: 40px;
  margin-bottom: 20px;
  padding-top: 50px;
  padding-bottom: 10px;
  border-radius: 12px;
  color: #000000;
  text-align: center;
  transition: all 0.15s ease;

  :hover {
    transform: translateY(-3px);
    box-shadow: ${({ shadowColor }) => `0 3rem 6rem -2rem  ${shadowColor}`};
    transition: all 0.15s ease;
  }

  :active {
    transform: scale(0.98);
    box-shadow: ${({ shadowColor }) => `0 3rem 4rem -2rem  ${shadowColor}`};
    transitionn: all 0.15s ease;
  }
`;

const TokenLogo = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ primaryColor }) => primaryColor};
  box-shadow: 0 0rem 1.4rem -0.3rem ${({ shadowColor }) => shadowColor};
  width: 80px;
  height: 80px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SmallTokenTile = ({ linkTo, token, ...restProps }) => {
  return (
    <Link to={linkTo} {...restProps}>
      <SmallTokenTileContainer shadowColor={token.shadowColor}>
        <TokenLogo primaryColor={token.primaryColor} shadowColor={token.shadowColor}>
          <TokenImage token={token} style={{ width: '40px', height: '40px' }} />
        </TokenLogo>
        <div>
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#78818c' }}>{token.symbol}</p>
          <H4>{token.name.length > 20 ? token.shortName : token.name}</H4>
        </div>
      </SmallTokenTileContainer>
    </Link>
  );
};
