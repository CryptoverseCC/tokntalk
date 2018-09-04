import React from 'react';
import styled, { css } from 'styled-components';
import capitalize from 'lodash/capitalize';

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

const defaultOptions = ['new', 'popular'];

const FeedTypeSwitcher = ({ type, onChange, style, className, options = defaultOptions }) => (
  <div className={className} style={style}>
    {options.map((option) => (
      <FeedTypeButton key={option} onClick={() => onChange(option)} selected={type === option}>
        {capitalize(option)}
      </FeedTypeButton>
    ))}
  </div>
);

FeedTypeSwitcher.NEW = 'new';
FeedTypeSwitcher.POPULAR = 'popular';
FeedTypeSwitcher.ACTIVE = 'active';

export default FeedTypeSwitcher;
