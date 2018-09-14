import React from 'react';
import styled, { css } from 'styled-components';
import capitalize from 'lodash/capitalize';

const FeedTypeButton = styled.div`
  display: inline;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px;
  color: #928f9b;

  ${({ selected }) =>
    selected &&
    css`
      color: #1a52ef;
      text-align: center;
      cursor: default;
      display: inline-block;
      :before {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: #1a52ef;
        position: relative;
        bottom: -30px;
        margin: auto;
      }
    `};

  :not(:first-child) {
    margin-left: 15px;
  }

  @media (max-width: 770px) {
    :first-child {
      margin-left: 2%;
    }
  }
`;

const defaultOptions = () => [FeedTypeSwitcher.NEW, FeedTypeSwitcher.POPULAR];

const FeedTypeSwitcher = ({ type, onChange, style, className, options = defaultOptions() }) => (
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
FeedTypeSwitcher.NOTIFICATIONS = 'notifications';

export default FeedTypeSwitcher;
