import styled from 'styled-components';

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
  font-size: 14px;
  color: #928f9b;
  font-weight: 500;
`;

export const CatvertisedList = styled.ul`
  max-height: 340px;
  overflow-y: scroll;
  position: relative;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #dde0eb;
  }

  @media (max-width: 770px) {
    display: flex;
    align-items: flex-start;
    overflow-y: unset;
    overflow-x: scroll;

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
    margin-top: 20px;
  }

  :last-child {
    margin-bottom: 30px;
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
