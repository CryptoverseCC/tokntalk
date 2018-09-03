import React, { Component } from 'react';
import List from 'react-virtualized/dist/commonjs/List';
import styled from 'styled-components';

import { getEntities } from './api';
import { LinkedEntityAvatar } from './Entity';
import Link from './Link';
import { FlatContainer, H4 } from './Components';
import { niceScroll } from './cssUtils';

const CousinsList = styled(List)`
  ${niceScroll};
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
    const entities = await getEntities(owner);
    this.setState({ entities });
  };

  render() {
    return (
      <FlatContainer style={{ marginTop: '2rem' }}>
        <H4 style={{ marginTop: '10px' }}>Cousins</H4>
        <p style={{ fontSize: '0.8rem', color: '#928f9b' }}>Other tokens from this address</p>
        <CousinsList
          height={300}
          width={232.33}
          rowHeight={74}
          rowRenderer={this.renderRow}
          rowCount={this.state.entities.length}
        />
      </FlatContainer>
    );
  }

  renderRow = ({ index, key, style }) => {
    const cousin = this.state.entities[index];
    return (
      <div
        key={key}
        style={{ display: 'flex', boxAlgin: 'center', alignItems: 'center', paddingTop: '20px', ...style }}
      >
        <LinkedEntityAvatar id={cousin.id} entityInfo={cousin} size="medium" />
        <Link
          to={`/${cousin.id}`}
          style={{
            fontFamily: 'AvenirNext',
            fontSize: '1rem',
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
