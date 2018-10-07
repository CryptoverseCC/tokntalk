import React from 'react';
import styled from 'styled-components';

import { LinkedActiveEntityAvatar } from '../Entity';
import { ConnectedReplyForm, ReplyForm } from '../CommentForm';

const Avatar = styled(LinkedActiveEntityAvatar)`
  width: 48px;
  height: 48px;

  @media (max-width: 770px) {
    width: 38px;
    height: 38px;
  }
`;

const Container = styled.div`
  display: flex;
`;

const Form = styled(ReplyForm)`
  padding: 2px 50px 2px 10px;
  margin-left: 10px;
`;

const RForm = ({ about, children, ...props }) => (
  <Container>
    <Avatar />
    <ConnectedReplyForm Form={Form} about={about} {...props} />
  </Container>
);

export default RForm;
