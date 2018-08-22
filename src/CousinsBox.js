import React, { Component } from 'react';
import { getEntities } from './api';
import { EntityName, LinkedEntityAvatar } from './Entity';
import Link from './Link';

export class CousinsBox extends Component {
  state = {
    entities: [],
  };

  async componentDidMount() {
    this.updateEntities(this.props.owner);
  }

  async componentWillReceiveProps(nextProps) {
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
      <div>
        {this.state.entities.filter((entity) => entity.id != this.props.entity.id).map((cousin) => {
          return (
            <div key={cousin.id}>
              <LinkedEntityAvatar id={cousin.id} entityInfo={cousin} size="medium" />
              <Link
                to={`/${cousin.id}`}
                style={{
                  fontFamily: 'AvenirNext',
                  fontSize: '1rem',
                  fontWeight: '700',
                }}
              >
                <EntityName id={cousin.id} />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
