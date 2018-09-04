import React from 'react';
import styled, { css } from 'styled-components';
import { Link as RawLink } from 'react-router-dom';

const defaultLink = css`
  color: #264dd9;
  font-weight: 600;
  cursor: default;

  &:hover {
    color: #2f2670;
    cursor: pointer;
  }
`;

const Link = ({ children, className, style, to }) => (
  <RawLink className={className} style={style} to={to}>
    {children}
  </RawLink>
);

const StyledLink = styled(Link)`
  ${defaultLink};

  ${({ href, to }) =>
    !(href || to) &&
    css`
      color: #928f9b;
    `} &:hover {
    ${({ href, to }) =>
      !(href || to) &&
      css`
        color: #928f9b;
      `};
  }
`;

export const A = StyledLink.withComponent('a');

export default StyledLink;
