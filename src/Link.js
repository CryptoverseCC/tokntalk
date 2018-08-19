import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  ${({ href, to }) =>
    href || to
      ? `
    color: #264dd9;
    font-weight: 600;
    cursor: default;
  `
      : `
    color: #928f9b;
  `} &:hover {
    ${({ href, to }) =>
      href || to
        ? `
    color: #2f2670;
    cursor: pointer;
    `
        : `
    color: #928f9b;
        `};
  }
`;

export const A = StyledLink.withComponent('a');

export default StyledLink;
