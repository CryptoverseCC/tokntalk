import React from 'react';
import styled from 'styled-components';

import { createEtherscanUrl } from '../../utils';
import { LinkedEntityAvatar } from '../../Entity';
import Link from '../../Link';
import Post from './Basic';

const Avatar = styled(LinkedEntityAvatar)`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Boost = ({ feedItem, onVerify }) => (
  <Post
    id={feedItem.id}
    from={feedItem.target}
    entityInfo={feedItem.target_info}
    createdAt={feedItem.created_at}
    message={createEtherscanUrl(feedItem)}
    family={feedItem.family}
    suffix={
      <React.Fragment>
        <span>supported</span>
        <Avatar id={feedItem.about} entityInfo={feedItem.about_info} />
        <Link to={`/${feedItem.about}`}>
          <b>{feedItem.about_info.name}</b>
        </Link>
      </React.Fragment>
    }
    onVerify={() => onVerify(feedItem)}
  />
);

export default Boost;
