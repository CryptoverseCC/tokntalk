import React from 'react';
import Link from './Link';
import Context from './Context';
import { ConnectedCommentForm, CommentForm, TextAreaForm } from './CommentForm';
import { LinkedEntityAvatar, IfActiveEntity, ActiveEntityName } from './Entity';
import TranslationsContext from './Translations';
import styled from 'styled-components';

const HeroContainer = styled.div``;

const AddStory = styled.div`
  box-shadow: rgba(118, 103, 170, 0.12) 0px 2rem 5rem -2rem;
  border-radius: 12px;
  display: block;
  padding: 1.25rem;
  background-color: white;
  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
  }
`;

const Hero = (props) => (
  <Context.Consumer>
    {({ entityStore: { activeEntity } }) => (
      <div {...props}>
        <HeroContainer>
          <AddStory>
            <article className="media">
              <div className="media-left">
                {activeEntity ? (
                  <LinkedEntityAvatar id={activeEntity.id} entityInfo={activeEntity} size="medium" {...props} />
                ) : (
                  <div
                    style={{
                      display: 'block',
                      width: '54px',
                      height: '54px',
                      backgroundColor: '#dde0eb',
                      borderRadius: '16%',
                    }}
                  />
                )}
              </div>
              <div className="media-content">
                <div className="content">
                  {activeEntity ? (
                    <div>
                      <Link
                        to={`/${activeEntity.id}`}
                        style={{
                          fontFamily: 'AvenirNext',
                          fontSize: '1rem',
                          fontWeight: '600',
                          marginBottom: '20px',
                          marginTop: '10px',
                        }}
                      >
                        {activeEntity.name}
                      </Link>
                      <ConnectedCommentForm Form={CommentForm} />
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          display: 'block',
                          width: '100%',
                          maxWidth: '160px',
                          height: '12px',
                          borderRadius: '4px',
                          backgroundColor: '#dde0eb',
                          marginBottom: '8px',
                        }}
                      />
                      <TranslationsContext.Consumer style={{ opacity: '0.2' }}>
                        {({ commentPlaceholder }) => (
                          <TextAreaForm Form={CommentForm} placeholder="Unlock your wallet to write" disabled={true} />
                        )}
                      </TranslationsContext.Consumer>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </AddStory>
        </HeroContainer>
      </div>
    )}
  </Context.Consumer>
);

export default Hero;
