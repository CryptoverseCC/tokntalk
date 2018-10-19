import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from 'react-virtualized/dist/commonjs/Grid';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import Link from '../Link';
import AppContext from '../Context';
import { LinkedEntityAvatar, EntityName } from '../Entity';
import { niceScroll } from '../cssUtils';
import { Token } from '../ActiveEntityTokens';

const NiceGrid = styled(Grid)`
  ${niceScroll};
`;

const CoverImage = styled.div`
  border-radius: 32px;
  background-image: ${({ src }) => `url(${src})`};
  background-color: ${({ primaryColor }) => primaryColor};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 200px;
  height: 150px;
  background-clip: padding-box;
  border: 20px solid transparent;
`;

const Cover = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Cell = styled.div`
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  position: relative;
`;

const Name = styled.span`
  font-family: AvenirNext;
  font-size: 1.5rem;
  font-weight: 600;
  overflow: hidden;
`;

const Tools = styled.div`
  width: 100%;
`;

export class ClubsGrid extends Component {
  render() {
    const { entity, style } = this.props;
    const cellSize = 200;
    const columnsNumber = entity.tokens.length;

    return entity.tokens.length ? (
      <AutoSizer>
        {({ width, height }) => (
          <NiceGrid
            cellRenderer={({ ...args }) => this.renderCell(entity, parseInt(width / cellSize), args)}
            columnCount={parseInt(width / cellSize)}
            columnWidth={cellSize}
            height={height}
            rowCount={parseInt(entity.tokens.length / parseInt(width / cellSize)) + 1}
            rowHeight={cellSize}
            width={width}
          />
        )}
      </AutoSizer>
    ) : (
      <span>
        <EntityName id={entity.id} /> doesn't hold any tokens
      </span>
    );
  }

  renderCell = (entity, columnCount, { columnIndex, rowIndex, key, style }) => {
    let index = rowIndex * columnCount + columnIndex;
    const club = entity.tokens[index];
    if (!club) return null;
    return (
      <div key={key} style={style}>
        {club && (
          <Cell>
            <Cover to={`/clubs/${club.network}:${club.address}`}>
              <CoverImage src={club.logo} primaryColor={club.primaryColor} />
              <Name>{club.name}</Name>
            </Cover>
            <Tools>
              {
                //<TransferButton entity={entity} />
              }
            </Tools>
          </Cell>
        )}
      </div>
    );
  };
}

export default class Clubs extends Component {
  render() {
    const { entity } = this.props;
    return (
      <React.Fragment>
        <AppContext.Consumer>
          {({ entityStore: { entityInfo } }) => (
            <div style={{ width: '100%', height: 'calc(100vh - 190px)', backgroundColor: 'lightred' }}>
              <ClubsGrid entity={entity} />
            </div>
          )}
        </AppContext.Consumer>
      </React.Fragment>
    );
  }
}
