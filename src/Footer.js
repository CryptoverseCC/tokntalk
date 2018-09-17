import React from 'react';
import styled from 'styled-components';

import { A } from './Link';
import Intercom from './Intercom';

const FooterContainer = styled.div`
  border-radius: 0 3rem 3rem 0rem;
  border: 1px solid #e6dfff;
  padding: 1rem 2rem 0.9rem 1rem;
  color: #95929e;
  background-color: #f5f8fd;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 770px) {
    border-radius: 0;
    border-width: 1px 0 0 0;
  }
`;

const FotterInnerContainer = styled.div`
  @media (max-width: 770px) {
    display: flex;
    justify-content: space-between;
  }
`;

const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 770px) {
    margin-left: 10px;
    > * + * {
      margin-left: 10px;
    }
  }
`;

const Footer = ({ className }) => {
  return (
    <FooterContainer className={className}>
      <FotterInnerContainer>
        <div>Support</div>
        <FooterLinksContainer>
          <A href="https://t.me/userfeeds" style={{ marginRight: '8px' }}>
            Telegram
          </A>
          <A href="https://twitter.com/tokntalkclub">Twitter</A>
        </FooterLinksContainer>
      </FotterInnerContainer>
      <Intercom />
    </FooterContainer>
  );
};

export const PositionedFooter = styled(Footer)`
  position: fixed;
  z-index: 1000;
  bottom: 10px;
  left: 0;

  @media (max-width: 770px) {
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  }
`;

export default Footer;
