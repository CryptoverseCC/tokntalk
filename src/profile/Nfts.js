import React, { Component } from 'react';
import styled from 'styled-components';

import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import Link from '../Link';
import AppContext from '../Context';
import { getEntities } from '../api';
import { LinkedEntityAvatar } from '../Entity';
import { FlatContainer, H4 } from '../Components';
import { niceScroll } from '../cssUtils';
import { Token } from '../ActiveEntityTokens';

const ScrollableContainer = styled.div`
  ${niceScroll};
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 300px;
`;

const CousinsList = styled(List)`
  ${niceScroll};
`;

const Avatar = styled(LinkedEntityAvatar)`
  width: 48px;
  height: 48px;
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

export default class Nfts extends Component {
  render() {
    const { entity } = this.props;
    return (
      <React.Fragment>
        <div>
          <H4>Types</H4>
          {entity.tokens.length ? (
            <ScrollableContainer>
              {entity.tokens.map((token) => token.is721 && <Token key={token.address} token={token} />)}
            </ScrollableContainer>
          ) : null}
          <H4>Tokens</H4>
          <AppContext.Consumer>
            {({ entityStore: { entityInfo } }) => {
              if ((!entity.isAddress && entityInfo[entity.id]) || entity.isAddress) {
                const owner = entity.isAddress ? entity.id : entity.owner;
                return <Avatars id={entity.id} owner={owner} />;
              }
            }}
          </AppContext.Consumer>
        </div>
      </React.Fragment>
    );
  }
}
