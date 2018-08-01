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
  background-color: #f8f9fd;
`;

export const WarningContainer = FlatContainer.extend`
  background-color: rgba(255, 234, 142, 0.75);
`;

export const H1 = styled.p`
  font-size: 46px;
  font-weight: bold;
`;

export const H2 = styled.p`
  font-size: 28px;
  font-weight: 600;
`;

export const H3 = styled.p`
  font-size: 21px;
  font-weight: 600;
`;

export const SocialUsername = ({ link, ...restProps }) => {
  const result = /\/([^/]+)(\/?)$/.exec(link);
  const username = result && result[1] ? result[1] : link;

  return <span {...restProps}>{username || link}</span>;
};
