import React from 'react';
import styled from 'styled-components';
import StyledLink, { A } from './Link';

const FooterContainer = styled.div`
  border-radius: 12px;
  border: 1px solid #e6dfff;
  padding: 1rem;
  color: #95929e;
  background-color: white;
`;

const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Footer = ({ className }) => {
  return (
    <FooterContainer className={className}>
      Powered by <A href="https://userfeeds.io">Userfeeds</A>
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
  bottom: 10px;
  right: 2rem;
`;

export default Footer;
