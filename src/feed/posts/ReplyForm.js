import React from 'react';
import styled from 'styled-components';

import { LinkedActiveEntityAvatar } from '../../Entity';
import { ConnectedReplyForm, ReplyForm } from '../../CommentForm';

const Avatar = styled(LinkedActiveEntityAvatar)`
  width: 38px;
  height: 38px;
`;

const Container = styled.div`
  display: flex;
`;

const Form = styled(ReplyForm)`
  padding: 2px 50px 2px 10px;
  margin-left: 10px;
`;

const PostReplyForm = ({ about, children, ...props }) => (
  <Container>
    <Avatar />
    <ConnectedReplyForm Form={Form} about={about} {...props} />
  </Container>
);

export default PostReplyForm;
