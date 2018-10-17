import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from 'react-virtualized/dist/commonjs/Grid';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import { fromWeiToString } from '../balance';
import Link from '../Link';
import Context from '../Context';
import { getEntities } from '../api';
import { LinkedEntityAvatar, Entity, WithBoosts, EntityName } from '../Entity';
import { FlatContainer, H4, StyledButton } from '../Components';
import { niceScroll } from '../cssUtils';
import { Token } from '../ActiveEntityTokens';
import SupporterForm from '../profile/SupporterForm';
import Airdrop from '../Airdrop';
import Toolbar from '../Toolbar';

const NiceGrid = styled(Grid)`
  ${niceScroll};
`;

const CoverImage = styled.div`
  border-radius: 12px;
  background-image: ${({ src }) => `url(${src})`};
  background-color: ${({ primaryColor }) => primaryColor};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 300px;
  height: 200px;
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

const Position = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: 600;
  font-size: 1.8rem;
  color: #999;
  background-color: white;
  z-index: 10;
  padding: 2px 7px 0 7px;
  border: 10px solid #eee;
  border-radius: 20px;
  display:flex;
  flex-direction: column;

  ::after {
    content: '${({ score }) => score}';
    font-size: 0.5rem;
  }
`;

export class Avatars extends Component {
  render() {
    const { entity, activeEntity, style, assetInfo, asset } = this.props;
    const cellSize = 300;
    return (
      <WithBoosts entity={entity} asset={asset}>
        {(boosts) => {
          const boostsList = Object.entries(boosts || {});
          const columnsNumber = boostsList.length;
          return (
            <React.Fragment>
              {boostsList.length ? (
                <AutoSizer>
                  {({ width, height }) => (
                    <NiceGrid
                      cellRenderer={({ ...args }) =>
                        this.renderCell(boostsList, assetInfo, parseInt(width / cellSize), args)
                      }
                      columnCount={parseInt(width / cellSize)}
                      columnWidth={cellSize}
                      height={height}
                      rowCount={parseInt(boostsList.length / parseInt(width / cellSize)) + 1}
                      rowHeight={cellSize}
                      width={width}
                    />
                  )}
                </AutoSizer>
              ) : (
                <span>
                  <EntityName id={entity.id} /> have no supporters.
                </span>
              )}
            </React.Fragment>
          );
        }}
      </WithBoosts>
    );
  }

  renderCell = (boostsList, assetInfo, columnCount, { columnIndex, rowIndex, key, style }) => {
    let index = rowIndex * columnCount + columnIndex;
    if (!boostsList[index]) return;
    const [id, { score, context_info: entityInfo }] = boostsList[index];
    return (
      <div key={key} style={style}>
        {id && (
          <Cell>
            <Position score={fromWeiToString(score, assetInfo.decimals) + assetInfo.symbol}>#{index + 1}</Position>
            <Cover to={`/${id}`}>
              <CoverImage src={entityInfo.image_preview_url} primaryColor={entityInfo.primaryColor} />
              <Name>{entityInfo.name}</Name>
            </Cover>
          </Cell>
        )}
      </div>
    );
  };
}

class SupportersImpl extends Component {
  render() {
    const { entity, asset, assetInfo } = this.props;
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 230px)' }}>
        <Toolbar>
          <span>
            <StyledButton>
              Support <Entity id={entity.id}>{(entity) => entity.name}</Entity>
            </StyledButton>
            <StyledButton>Airdrop</StyledButton>
          </span>
          <span>
            <SupporterForm entity={entity} asset={asset} assetInfo={assetInfo} />
            <Airdrop entity={entity} asset={asset} assetInfo={assetInfo} />
          </span>
        </Toolbar>
        <Avatars entity={entity} asset={asset} assetInfo={assetInfo} />
      </div>
    );
  }
}

export default class Supporters extends Component {
  render() {
    return (
      <React.Fragment>
        <SupportersImpl asset={'ethereum'} assetInfo={{ symbol: 'ETH', decimals: 18 }} {...this.props} />
      </React.Fragment>
    );
  }
}
