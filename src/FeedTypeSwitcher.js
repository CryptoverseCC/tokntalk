import React from 'react';
import styled, { css } from 'styled-components';

const FeedTypeButton = styled.div`
  display: inline;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 5px;

  ${({ selected }) =>
    selected &&
    css`
      color: #1a52ef;
      cursor: default;
      border-bottom: 3px #1a52ef solid;
    `};

  :not(:first-child) {
    margin-left: 30px;
  }

  @media (max-width: 770px) {
    :first-child {
      margin-left: 2%;
    }
  }
`;

const FeedTypeSwitcher = ({ type, onChange, style, className }) => (
  <div className={className} style={style}>
    <FeedTypeButton onClick={() => onChange('new')} selected={type === 'new'}>
      New
    </FeedTypeButton>
    <FeedTypeButton onClick={() => onChange('popular')} selected={type === 'popular'}>
      Popular
    </FeedTypeButton>
  </div>
);

export default FeedTypeSwitcher;
