import React from 'react';
import styled from 'styled-components';

import Link from './Link';
import { TokenImage } from './clubs';
import { H3 } from './Components';
import { UnreadedCount } from './UnreadedMessages';

export const TokenTile = ({ linkTo, token, small, ...restProps }) => {
  return (
    <Link to={linkTo} {...restProps}>
      <TokenTileCotainer
        small={small}
        primaryColor={token.primaryColor}
        secondaryColor={token.secondaryColor}
        coverImage={token.coverImage}
        shadowColor={token.shadowColor}
      >
        <TokenTileWrapper>
          <div className="is-flex">
            <TokenImage token={token} style={{ width: '40px', height: '40px' }} />
            {!small && <UnreadedCount token={token} />}
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{token.symbol}</p>
            {!small && <H3>{token.name}</H3>}
          </div>
        </TokenTileWrapper>
      </TokenTileCotainer>
    </Link>
  );
};

const TokenTileCotainer = styled.div`
  background-color: ${({ primaryColor }) => primaryColor};
  background-image: ${({ coverImage, small }) => !small && `url(${coverImage})`};
  background-repeat: no-repeat;
  background-size: cover;
  color: ${({ secondaryColor }) => secondaryColor};
  box-shadow: ${({ shadowColor, small }) => !small && `0 3rem 5rem -2rem ${shadowColor}`};
  cursor: pointer;
  position: relative;
  width: 100%;
  padding-top: 105%;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s;
  transition: all 0.15s ease;

  :hover {
    transform: translateY(-3px);
    box-shadow: ${({ shadowColor, small }) => !small && `0 3rem 6rem -2rem  ${shadowColor}`};
    transition: all 0.15s ease;
  }

  :active {
    transform: scale(0.98);
    box-shadow: ${({ shadowColor, small }) => !small && `0 3rem 4rem -2rem  ${shadowColor}`};
    transitionn: all 0.15s ease;
  }

  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
    padding-top: ${({ small }) => !small && '50%'};

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
