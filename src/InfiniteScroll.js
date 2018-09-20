import React from 'react';
import throttle from 'lodash/throttle';

export default class InfiniteScroll extends React.Component {
  static defaultProps = {
    threshold: 100,
    throttle: 64,
  };

  componentDidMount() {
    this.scrollHandler = throttle(this.checkWindowScroll, this.props.throttle);
    this.resizeHandler = throttle(this.checkWindowScroll, this.props.throttle);

    const root = document.querySelector('#root');
    root.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    const root = document.querySelector('#root');
    root.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }

  checkWindowScroll = () => {
    if (this.props.isLoading) {
      return;
    }

    if (this.props.hasMore && this.sentinel.getBoundingClientRect().top - window.innerHeight < this.props.threshold) {
      this.props.onLoadMore();
    }
  };

  render() {
    return (
      <div style={this.props.style}>
        {this.props.children}
        <div ref={(i) => (this.sentinel = i)} />
      </div>
    );
  }
}
