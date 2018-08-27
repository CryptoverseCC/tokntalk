import React, { Component } from 'react';
import styled from 'styled-components';
import { getEntities } from './api';
import { EntityName, LinkedEntityAvatar } from './Entity';
import Link from './Link';
import { FlatContainer, H4 } from './Components';

const CousinsList = styled.div`
  overflow-y: scroll;
  max-height: 300px;
  overflow-x: hidden;

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
        <CousinsList>
          {this.state.entities.filter((entity) => entity.id !== this.props.entity.id).map((cousin) => {
            return (
              <div
                key={cousin.id}
                style={{ display: 'flex', boxAlign: 'center', alignItems: 'center', marginTop: '20px' }}
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
                  <EntityName id={cousin.id} />
                </Link>
              </div>
            );
          })}
        </CousinsList>
      </FlatContainer>
    );
  }
}
