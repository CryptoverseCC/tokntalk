import React from 'react';
import Link from './Link';
import { ConnectedCommentForm, CommentForm } from './CommentForm';
import { LinkedActiveEntityAvatar, IfActiveEntity, ActiveEntityName } from './Entity';
import styled from 'styled-components';

const HeroContainer = styled.div``;

const Hero = (props) => (
  <IfActiveEntity>
    {(entity) => (
      <div {...props}>
        <HeroContainer>
          <div className="box cp-box" style={{ boxShadow: '0 4px 10px rgba(98,60,234,0.07)', borderRadius: '12px' }}>
            <article className="media">
              <div className="media-left">
                <LinkedActiveEntityAvatar size="large" />
              </div>
              <div className="media-content">
                <div className="content">
                  <Link
                    to={`/${entity}`}
                    style={{
                      fontFamily: 'Rubik',
                      fontSize: '1.1rem',
                      fontWeight: '500',
                    }}
                  >
                    <ActiveEntityName />
                  </Link>
                  <ConnectedCommentForm Form={CommentForm} />
                </div>
              </div>
            </article>
          </div>
        </HeroContainer>
      </div>
    )}
  </IfActiveEntity>
);

export default Hero;
