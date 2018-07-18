import React from 'react';
import styled from 'styled-components';

const NotFound = () => <NotFoundContainer>🙀 404 😿</NotFoundContainer>;

const NotFoundContainer = styled.div`
  height: calc(100vh - 65px);
  font-size: 6em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NotFound;
