import React, { Component } from 'react';
import { ConnectedFeed } from './Feed';
import { Entity, EntityAvatar } from './Entity';
import colors from './colors';

export default class ShowPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.refreshPurrs(true);
    this.refreshInterval = setInterval(this.refreshPurrs, 15000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.entityId !== this.props.match.params.entityId) {
      this.refreshPurrs(true, nextProps.match.params.entityId);
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refreshPurrs = async (purge = false, entityId = this.props.match.params.entityId) => {
    const response = await fetch(
      `https://api-dev.userfeeds.io/ranking/feed;context=ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:${entityId}`
    );
    const { items: purrs } = await response.json();
    if (purrs) {
      this.props.updatePurrs(
        purrs.filter(purr => ['regular', 'like', 'post_to', 'response'].includes(purr.type)),
        purge
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <Entity id={this.props.match.params.entityId}>
          {entity => (
            <div className="has-text-centered" style={{ backgroundColor: colors[entity.color], height: '30rem' }}>
              <img src={entity.image_url} style={{ height: '100%' }} />
            </div>
          )}
        </Entity>
        <ConnectedFeed />
      </React.Fragment>
    );
  }
}
