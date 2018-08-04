import React from 'react';
import Link from './Link';
import { ConnectedCommentForm, CommentForm } from './CommentForm';
import { LinkedActiveEntityAvatar, IfActiveEntity, ActiveEntityName } from './Entity';
import styled from 'styled-components';

const HeroContainer = styled.div``;

const AddStory = styled.div`
  box-shadow: rgba(118, 103, 170, 0.12) 0px 2rem 5rem -2rem;
  border-radius: 12px;
  display: block;
  padding: 1.25rem;
  background-color:white;
  @media (max-width: 770px) {
    width:96%;
    margin-left:2%;
  }
`;

const Hero = (props) => (
  <IfActiveEntity>
    {(entity) => (
      <div {...props}>
        <HeroContainer>
          <AddStory>
            <article className="media">
              <div className="media-left">
                <LinkedActiveEntityAvatar size="large" />
              </div>
              <div className="media-content">
                <div className="content">
                  <Link
                    to={`/${entity}`}
                    style={{
                      fontFamily: 'AvenirNext',
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom:'20px',
                      marginTop:'10px',
                    }}
                  >
                    <ActiveEntityName />
                  </Link>
                  <ConnectedCommentForm Form={CommentForm} />
                </div>
              </div>
            </article>
          </AddStory>
        </HeroContainer>
      </div>
    )}
  </IfActiveEntity>
);

export default Hero;
