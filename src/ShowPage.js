import React, { Component } from 'react';
import Hero from './Hero';
import { PurrGroupWithForm, PurrsList, ShowNewPurrs } from './Purr';

export default class ShowPage extends Component {
  componentDidMount() {
    this.refreshPurrs(true);
    this.refreshInterval = setInterval(this.refreshPurrs, 3000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.catId !== this.props.match.params.catId) {
      this.refreshPurrs(true);
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refreshPurrs = async (purge = false) => {
    const response = await fetch(
      `https://api-dev.userfeeds.io/ranking/posts;context=ethereum:0x06012c8cf97bead5deae237070f9587f8e7a266d:${
        this.props.match.params.catId
      }/filter_sort;by=created_at;order=desc`
    );
    const { items: purrs } = await response.json();
    if (purrs) {
      console.log(purge)
      this.props.updatePurrs(purrs, purge);
    }
  };

  render() {
    const { match: { params: { catId } } } = this.props;
    return (
      <React.Fragment>
        <Hero forCat={catId} />
        <section style={{ paddingTop: '4rem' }}>
          <div className="container">
            <PurrGroupWithForm />
            <ShowNewPurrs forCat={catId} />
            <PurrsList forCat={catId} />
          </div>
        </section>
      </React.Fragment>
    );
  }
}
