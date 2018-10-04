import React from 'react';
import Link from './Link';
import { ConnectedCommentForm, CommentForm } from './CommentForm';
import { LinkedActiveEntityAvatar, IfActiveEntity } from './Entity';
import styled from 'styled-components';

const HeroContainer = styled.div``;

const AddStory = styled.div`
  box-shadow: rgba(118, 103, 170, 0.12) 0px 2rem 3rem -1.5rem;
  border-radius: 12px;
  display: block;
  padding: 1.25rem;
  background-color: white;
  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
    padding: 1rem;
  }
`;

const Avatar = styled(LinkedActiveEntityAvatar)`
  width: 48px;
  height: 48px;
  margin-right: 15px;

  @media (max-width: 770px) {
    width: 32px;
    height: 32px;
    margin-right: 5px;
  }
`;

const Hero = (props) => (
  <IfActiveEntity>
    {(entity) => (
      <div {...props}>
        <HeroContainer>
          <AddStory>
            <article className="media">
              <Link to={`/${entity}`}>
                <Avatar />
              </Link>
              <ConnectedCommentForm Form={CommentForm} />
            </article>
          </AddStory>
        </HeroContainer>
      </div>
    )}
  </IfActiveEntity>
);

export default Hero;
