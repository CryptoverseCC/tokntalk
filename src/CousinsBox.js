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

const Avatar = styled(LinkedEntityAvatar)`
  width: 48px;
  height: 48px;
`;

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
          {({ width }) => (
            <CousinsList
              height={300}
              width={width}
              rowHeight={54}
              rowRenderer={this.renderRow}
              rowCount={activeEntity.isAddress ? this.state.entities.length : this.state.entities.length - 1}
            />
          )}
        </AutoSizer>
      </FlatContainer>
    ) : null;
  }

  renderRow = ({ index, key, style }) => {
    const cousin = this.state.entities.filter((entity) => entity.id !== this.props.entity.id)[index];
    return (
      <div key={key} style={{ display: 'flex', boxAlgin: 'center', alignItems: 'center', ...style }}>
        <Avatar id={cousin.id} entityInfo={cousin} />
        <Link
          to={`/${cousin.id}`}
          style={{
            fontFamily: 'AvenirNext',
            fontSize: '0.8rem',
            fontWeight: '600',
            marginLeft: '10px',
          }}
        >
          {cousin.name}
        </Link>
      </div>
    );
  };
}
