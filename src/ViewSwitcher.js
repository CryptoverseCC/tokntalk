import React from 'react';
import { Link, Route } from 'react-router-dom';
import styled, { css } from 'styled-components';
import capitalize from 'lodash/capitalize';

export const ViewButton = styled.div`
  display: inline-block;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px;
  color: #78818c;
  text-align: center;
  margin-right: 15px;

  ${({ selected }) =>
    selected &&
    css`
      color: #1a52ef;
      cursor: default;
      :after {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: #1a52ef;
        position: relative;
        margin: auto;
      }
    `};

  @media (max-width: 770px) {
    margin-right: 5px;
  }
`;

const ViewSwitcher = ({ match, style, className, options }) => (
  <div className={className} style={style}>
    {options.map((option) => {
      const route = [match.url].concat(option.path || []).join('/'); // do not include trailing slash
      return (
        <Route
          key={route}
          path={route}
          exact={true}
          children={({ match }) => (
            <Link to={route}>
              <ViewButton selected={match}>{option.name}</ViewButton>
            </Link>
          )}
        />
      );
    })}
  </div>
);

export default ViewSwitcher;
