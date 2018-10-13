import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from 'react-virtualized/dist/commonjs/Grid';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import Link from '../Link';
import AppContext from '../Context';
import { getEntities } from '../api';
import { LinkedEntityAvatar } from '../Entity';
import { FlatContainer, H4 } from '../Components';
import { niceScroll } from '../cssUtils';
import { Token } from '../ActiveEntityTokens';

const NiceGrid = styled(Grid)`
  ${niceScroll};
`;

const CoverImage = styled.div`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-image: ${({ src }) => `url(${src})`};
  background-color: ${({ primaryColor }) => primaryColor};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 300px;
  height: 200px;
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

const Name = styled(Link)`
  font-family: AvenirNext;
  font-size: 1.5rem;
  font-weight: 600;
  overflow: hidden;
`;

const Tools = styled.div`
  width: 100%;
`;

const TransferButton = styled(
  class Transfer extends Component {
    render() {
      return <span>Transfer</span>;
    }
  },
)`
  font-family: 'AvenirNext';
  font-weight: 600;
  border: none;
  outline: none;
  color: white;
  background-color: #264dd9;
  font-size: 1rem;
  padding: 0.5em;
  border-radius: 12px;
  cursor: pointer;

  @media (max-width: 770px) {
    padding: 0.1em 0.5rem 0.1em 0.5rem;
  }
`;

export class Avatars extends Component {
  state = {
    entities: [],
  };

  componentDidMount() {
    this.updateEntities(this.props.owner);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.owner !== this.props.owner) {
      this.setState({ entities: [] });
      this.updateEntities(nextProps.owner);
    }
  }

  updateEntities = async (owner) => {
    try {
      const entities = await getEntities(owner);
      this.setState({ entities });
    } catch (ex) {}
  };

  render() {
    const { entity, style, title } = this.props;
    const cellSize = 300;
    const columnsNumber = this.state.entities.length;

    return this.state.entities.length ? (
      <AutoSizer>
        {({ width, height }) => (
          <NiceGrid
            cellRenderer={({ ...args }) => this.renderCell(parseInt(width / cellSize), args)}
            columnCount={parseInt(width / cellSize)}
            columnWidth={cellSize}
            height={height}
            rowCount={parseInt(this.state.entities.length / parseInt(width / cellSize)) + 1}
            rowHeight={cellSize}
            width={width}
          />
        )}
      </AutoSizer>
    ) : null;
  }

  renderCell = (columnCount, { columnIndex, rowIndex, key, style }) => {
    let index = rowIndex * columnCount + columnIndex;
    const entity = this.state.entities.filter((entity) => entity.id !== this.props.entity.id)[index];
    return (
      <div key={key} style={style}>
        {entity && (
          <Cell>
            <div>
              <CoverImage src={entity.image_preview_url} primaryColor={entity.primaryColor} />
              <Name to={`/${entity.id}`}>{entity.name}</Name>
            </div>
            <Tools>
              <TransferButton entity={entity} />
            </Tools>
          </Cell>
        )}
      </div>
    );
  };
}

export default class Nfts extends Component {
  render() {
    const { entity } = this.props;
    return (
      <React.Fragment>
        <div>
          <H4>Tokens</H4>
          <AppContext.Consumer>
            {({ entityStore: { entityInfo } }) => {
              if ((!entity.isAddress && entityInfo[entity.id]) || entity.isAddress) {
                const owner = entity.isAddress ? entity.id : entity.owner;
                return (
                  <div style={{ width: '100%', height: '700px', backgroundColor: 'lightred' }}>
                    <Avatars entity={entity} owner={owner} />
                  </div>
                );
              }
            }}
          </AppContext.Consumer>
        </div>
      </React.Fragment>
    );
  }
}
