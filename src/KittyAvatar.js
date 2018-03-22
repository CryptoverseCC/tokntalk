import React from 'react';
import colors from './colors';

const KittyAvatar = ({ catId, catsInfo, getCatInfo }) => {
  const backgroundColor = catsInfo[catId] ? colors[catsInfo[catId].color] : '';
  return (
    <div className="kitten--img-container" style={{background: backgroundColor}}>
      <KittyImg catId={catId} catsInfo={catsInfo} getCatInfo={getCatInfo} />
    </div>
  );
};

export class KittyImg extends React.Component {
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

export default KittyAvatar;
