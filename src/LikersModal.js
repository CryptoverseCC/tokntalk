import React, { Component } from 'react';
import styled from 'styled-components';
import timeago from 'timeago.js';

import { LinkedEntityAvatar } from './Entity';
import Link from './Link';
import { FixedModal } from './Modal';
import { H3 } from './Components';
import { niceScroll } from './cssUtils';

const LikersModalContent = styled.div`
  border-radius: 30px;
  padding: 30px;
  background: #ffffff;
`;

const Verify = styled.span`
  color: #1b2437;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #264dd9;
  }
`;

const ScrollableContent = styled.div`
  max-height: 60vh;
  overflow-y: scroll;
  ${niceScroll};
`;

export default class LikersModal extends Component {
  onVerify = (item) => {
    this.props.onVerify(item);
  };

  render() {
    const { likes, onClose } = this.props;
    return (
      <FixedModal onClose={onClose}>
        <LikersModalContent>
          <H3 style={{ marginBottom: '30px' }}>Liked by</H3>
          <ScrollableContent>
            {likes.map(
              ({ id, context, context_info, isFromAddress, author, author_info, created_at, family }, index) => (
                <div key={`${context}:${index}`} style={{ display: 'flex', marginBottom: '15px' }}>
                  <LinkedEntityAvatar
                    id={isFromAddress ? author : context}
                    entityInfo={isFromAddress ? author_info : context_info}
                    size="medium"
                    onClick={onClose}
                  />
                  <div style={{ marginLeft: '15px', display: 'flex', flexDirection: 'column' }}>
                    <Link to={`/${isFromAddress ? author : context}`}>
                      <b onClick={onClose}>{(isFromAddress ? author_info : context_info).name}</b>
                    </Link>
                    <span style={{ color: '#928F9B', fontSize: '0.8rem' }}>
                      {timeago().format(created_at)}
                      <Verify
                        onClick={() => {
                          this.onVerify({ id, author, family });
                        }}
                        style={{ marginLeft: '15px' }}
                      >
                        {family}
                      </Verify>
                    </span>
                  </div>
                </div>
              ),
            )}
          </ScrollableContent>
        </LikersModalContent>
      </FixedModal>
    );
  }
}
