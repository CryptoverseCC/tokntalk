import styled from 'styled-components';
import { niceScroll } from '../cssUtils';

export const EntityNameWrapper = styled.b`
  white-space: nowrap;
`;

export const CatvertisedName = styled.span`
  margin-left: 10px;

  @media (max-width: 770px) {
    margin-left: 10px;
    white-space: nowrap;
  }
`;

export const CatvertisedScore = styled.div`
  margin-left: 10px;
  font-size: 0.8em;
  color: #78818c;
  font-weight: 500;
`;

export const CatvertisedList = styled.ul`
  max-height: 340px;
  overflow-y: scroll;
  position: relative;
  margin-top: 15px;

  ${niceScroll};

  @media (max-width: 770px) {
    display: flex;
    align-items: flex-start;
    overflow-y: unset;
    overflow-x: scroll;
    margin-top: 0px;
    height: 100px;

    ${CatvertisedName} {
      margin-left: 0;
    }

    ${CatvertisedScore} {
      margin-left: 0;
    }
  }
`;

export const CatvertisedItem = styled.li`
  height: 54px;
  display: flex;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  & + & {
    margin-top: 5px;
  }

  :last-child {
    margin-bottom: 15px;
  }

  @media (max-width: 770px) {
    overflow: hidden;
    height: auto;
    width: 54px;

    & + & {
      margin-top: 0;
      margin-left: 10px;
    }
  }
`;

export const EntityDescription = styled.div`
  @media (max-width: 770px) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
