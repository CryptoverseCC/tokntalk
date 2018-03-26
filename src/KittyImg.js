import React from 'react';

export default class KittyImg extends React.Component {
  componentDidMount() {
    this.props.getCatInfo(this.props.catId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.catId !== this.props.catId) {
      this.props.getCatInfo(nextProps.catId);
    }
  }

  render() {
    const { catId, getCatInfo, catsInfo, ...restProps } = this.props;
    return catsInfo[catId] ? <img alt="" src={catsInfo[catId].image_url} {...restProps} /> : null;
  }
}
