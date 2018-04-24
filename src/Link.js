import styled from 'styled-components';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
  color: #623cea;
  cursor: default;

  &:hover {
    ${({ href }) =>
      href &&
      `
    color: #2f2670;
    cursor: pointer;
    `};
  }
`;

export default StyledLink;
