import React from 'react';
import styled from 'styled-components';
import StyledLink, { A } from './Link';

const FooterContainer = styled.div`
  border-radius: 12px;
  border: 1px solid #e6dfff;
  padding: 1rem;
  color: #95929e;
  background-color: white;

  @media (max-width: 700px) {
    border-radius: 0;
    border-width: 1px 0 0 0;
    display: flex;
    justify-content: space-between;
  }
`;

const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 700px) {
    > * + * {
      margin-left: 10px;
    }
  }
`;

const Footer = ({ className }) => {
  return (
    <FooterContainer className={className}>
      <div>Powered by <A href="https://userfeeds.io">Userfeeds</A></div>
      <FooterLinksContainer>
        <A href="https://gitter.im/userfeeds">Gitter</A>
        <A href="https://t.me/userfeeds">Telegram</A>
        <StyledLink to="/faq">FAQ</StyledLink>
      </FooterLinksContainer>
    </FooterContainer>
  );
};

export const PositionedFooter = styled(Footer)`
  position: fixed;
  z-index: 1000;
  bottom: 10px;
  right: 2rem;

  @media (max-width: 700px) {
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  }
`;

export default Footer;
