import React, { Component } from 'react';
import styled from 'styled-components';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import { getEntities } from './api';
import { LinkedEntityAvatar } from './Entity';
import Link from './Link';
import { FlatContainer, H4 } from './Components';
import { niceScroll } from './cssUtils';

const CousinsList = styled(List)`
  ${niceScroll};
`;

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Item = styled.div`
  width: 100px;
  height: 100px;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ITEM_SIZE = 55;

export class CousinsBox extends Component {
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
    const { entity: activeEntity, style, title } = this.props;

    return this.state.entities.length ? (
      <FlatContainer style={style}>
        <H4>{title || 'Cousins'}</H4>
        <AutoSizer disableHeight>
          {({ width }) => {
            const itemsPerRow = Math.floor(width / ITEM_SIZE);
            const rowCount = Math.ceil(this.state.entities.length - (!activeEntity.isAddress | 0) / itemsPerRow);
            return (
              <List
                className="List"
                width={width}
                height={200}
                rowCount={rowCount}
                rowHeight={ITEM_SIZE}
                rowRenderer={({ index, key, style }) => {
                  const items = [];
                  const fromIndex = index * itemsPerRow;
                  const toIndex = Math.min(
                    fromIndex + itemsPerRow,
                    this.state.entities.length - (!activeEntity.isAddress | 0),
                  );

                  for (let index = fromIndex; index < toIndex; index++) {
                    const cousin = this.state.entities.filter((entity) => entity.id !== this.props.entity.id)[index];
                    items.push(
                      <Item key={index}>
                        <LinkedEntityAvatar id={cousin.id} entityInfo={cousin} size="medium" />
                      </Item>,
                    );
                  }

                  return (
                    <Row key={key} style={style}>
                      {items}
                    </Row>
                  );
                }}
              />
            );
          }}
        </AutoSizer>
      </FlatContainer>
    ) : null;
  }
}
