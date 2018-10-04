import React from 'react';
import styled from 'styled-components';
import { LinkedEntityAvatar } from '../Entity';
import Link from '../Link';

const Avatar = styled(LinkedEntityAvatar)`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 15px;

  @media (max-width: 770px) {
    mergin-left: 5px;
  }
`;

const NameContainer = styled.div`
  display: flex;
`;

const Suffix = styled.div`
  margin-left: 5px;
`;

const StatusRow = styled.div`
  align-items: flex-end;
  color: #78818c;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;

  > * {
    margin-right: 12px;
  }
`;

const Profile = ({
  className, // required by styled(Profile)`...`;
  children,
  from,
  entityInfo,
  createdAt,
  family,
  message,
  reaction,
  suffix,
  onVerify,
  hidePermalink,
}) => {
  return (
    <Container className={className}>
      <Avatar reaction={reaction} id={from} entityInfo={entityInfo} />
      <Content>
        <NameContainer>
          <Link to={`/${from}`} style={{ display: 'block' }}>
            <Name>{entityInfo.name}</Name>
          </Link>
          <Suffix>{suffix}</Suffix>
        </NameContainer>
        <StatusRow>{children}</StatusRow>
      </Content>
    </Container>
  );
};

export default Profile;
