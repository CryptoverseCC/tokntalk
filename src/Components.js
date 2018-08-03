import React from 'react';
import styled from 'styled-components';

export const ContentContainer = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

export const FlatContainer = styled.div`
  border-radius: 12px;
  padding: 30px;
  background-color: white;
`;

export const WarningContainer = FlatContainer.extend`
  background-color: rgba(255, 234, 142, 0.75);
`;

export const H1 = styled.p`
  font-size: 4rem;
  font-weight: bold;
`;

export const H2 = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

export const H3 = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const H4 = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

export const SocialUsername = ({ link, ...restProps }) => {
  const result = /\/([^/]+)(\/?)$/.exec(link);
  const username = result && result[1] ? result[1] : link;

  return <span {...restProps}>{username || link}</span>;
};
