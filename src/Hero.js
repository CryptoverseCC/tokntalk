import React from 'react';
import CommentForm from './CommentForm';
import { ActiveEntityAvatar, IfActiveCat, ActiveEntityName } from './Entity';

const Hero = () => (
  <IfActiveCat>
    <div
      style={{
        backgroundColor: '#f9fbfd'
      }}
    >
      <div className="container" style={{ padding: '40px 0' }}>
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <div className="box cp-box" style={{ boxShadow: '0 4px 10px rgba(98,60,234,0.07)', borderRadius: '12px' }}>
              <article className="media">
                <div className="media-left">
                  <ActiveEntityAvatar size="large" />
                </div>
                <div className="media-content">
                  <div className="content">
                    <div
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#623CEA'
                      }}
                    >
                      <ActiveEntityName />
                    </div>
                    <CommentForm />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </IfActiveCat>
);

export default Hero;
