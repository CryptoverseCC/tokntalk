import React from 'react';
import styled from 'styled-components';

const Verify = styled.span`
  color: #1b2437;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #264dd9;
  }
`;

const VerifyButton = ({ onClick }) => {
  return <Verify onClick={onClick}>Verify</Verify>;
};

export { VerifyButton };
