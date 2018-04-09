import React, { Component } from 'react';
import posed from 'react-pose';
import ReactHoverObserver from 'react-hover-observer';
import { pageView } from './Analytics';
import { ConnectedFeed } from './Feed';
import { Entity, EntityName, IfIsActiveEntity } from './Entity';
import Modal from './Modal';
import { ConnectedLabelForm } from './CommentForm';
import { getFeedItems } from './api';
import etherDiamond from './img/ether-diamond.gif';

const Hoverable = ({ element, ...props }) => {
  const HoverablePose = element({ initialPose: 'default' });
  return (
    <ReactHoverObserver>
      {({ isHovering }) => <HoverablePose pose={isHovering ? 'hovering' : 'default'} {...props} />}
    </ReactHoverObserver>
  );
};

const FacebookIcon = () => (
  <svg width="18px" height="28px" version="1.1" viewBox="0 0 18 28">
    <g fill="currentColor" fillRule="nonzero">
      <path d="M5.441274,28 L5.4,15.75 L0,15.75 L0,10.5 L5.4,10.5 L5.4,7 C5.4,2.2764 8.408718,0 12.742884,0 C14.818986,0 16.603308,0.1502725 17.123292,0.2174375 L17.123292,5.1538725 L14.117328,5.1552025 C11.760174,5.1552025 11.303766,6.244175 11.303766,7.84217 L11.303766,10.5 L18,10.5 L16.2,15.75 L11.303748,15.75 L11.303748,28 L5.441274,28 Z" />
    </g>
  </svg>
);

const GithubIcon = () => (
  <svg width="25px" height="24px" viewBox="0 0 25 24" version="1.1">
    <g fill="currentColor" fillRule="evenodd">
      <path d="M12.2352941,0 C5.50588235,0 0,5.4 0,12 C0,17.25 3.51764706,21.75 8.41176471,23.4 C9.02352941,23.55 9.17647059,23.1 9.17647059,22.8 C9.17647059,22.5 9.17647059,21.75 9.17647059,20.7 C5.81176471,21.45 5.04705882,19.2 5.04705882,19.2 C4.43529412,17.85 3.67058824,17.4 3.67058824,17.4 C2.6,16.65 3.82352941,16.65 3.82352941,16.65 C5.04705882,16.8 5.65882353,17.85 5.65882353,17.85 C6.72941176,19.8 8.56470588,19.2 9.17647059,18.9 C9.32941176,18.15 9.63529412,17.55 9.94117647,17.25 C7.18823529,16.95 4.43529412,15.9 4.43529412,11.25 C4.43529412,9.9 4.89411765,8.85 5.65882353,8.1 C5.50588235,7.8 5.04705882,6.6 5.81176471,4.95 C5.81176471,4.95 6.88235294,4.65 9.17647059,6.15 C10.0941176,5.85 11.1647059,5.7 12.2352941,5.7 C13.3058824,5.7 14.3764706,5.85 15.2941176,6.15 C17.5882353,4.65 18.6588235,4.95 18.6588235,4.95 C19.2705882,6.6 18.9647059,7.8 18.8117647,8.1 C19.5764706,9 20.0352941,10.05 20.0352941,11.25 C20.0352941,15.9 17.1294118,16.8 14.3764706,17.1 C14.8352941,17.7 15.2941176,18.45 15.2941176,19.5 C15.2941176,21.15 15.2941176,22.35 15.2941176,22.8 C15.2941176,23.1 15.4470588,23.55 16.2117647,23.4 C21.1058824,21.75 24.6235294,17.25 24.6235294,12 C24.4705882,5.4 18.9647059,0 12.2352941,0 Z" />
    </g>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
    <g fill="currentColor" fillRule="evenodd">
      <path d="M12,18 C8.691,18 6,15.309 6,12 C6,8.691 8.691,6 12,6 C15.309,6 18,8.691 18,12 C18,15.309 15.309,18 12,18 Z M12,9 C10.3455,9 9,10.3455 9,12 C9,13.6545 10.3455,15 12,15 C13.6545,15 15,13.6545 15,12 C15,10.3455 13.6545,9 12,9 Z" />
      <path d="M18,24 L6,24 C2.916,24 0,21.084 0,18 L0,6 C0,2.916 2.916,0 6,0 L18,0 C21.084,0 24,2.916 24,6 L24,18 C24,21.084 21.084,24 18,24 Z M6,3 C4.5975,3 3,4.5975 3,6 L3,18 C3,19.4295 4.5705,21 6,21 L18,21 C19.4025,21 21,19.4025 21,18 L21,6 C21,4.5975 19.4025,3 18,3 L6,3 Z" />
    </g>
  </svg>
);

const TwitterIcon = () => (
  <svg width="30px" height="26px" viewBox="0 0 30 26" version="1.1">
    <g fill="currentColor" fillRule="evenodd">
      <path d="M30,3.75 C28.875,4.3125 27.75,4.5 26.4375,4.6875 C27.75,3.9375 28.6875,2.8125 29.0625,1.3125 C27.9375,2.0625 26.625,2.4375 25.125,2.8125 C24,1.6875 22.3125,0.9375 20.625,0.9375 C17.4375,0.9375 14.625,3.75 14.625,7.125 C14.625,7.6875 14.625,8.0625 14.8125,8.4375 C9.75,8.25 5.0625,5.8125 2.0625,2.0625 C1.5,3 1.3125,3.9375 1.3125,5.25 C1.3125,7.3125 2.4375,9.1875 4.125,10.3125 C3.1875,10.3125 2.25,9.9375 1.3125,9.5625 C1.3125,9.5625 1.3125,9.5625 1.3125,9.5625 C1.3125,12.5625 3.375,15 6.1875,15.5625 C5.625,15.75 5.0625,15.75 4.5,15.75 C4.125,15.75 3.75,15.75 3.375,15.5625 C4.125,18 6.375,19.875 9.1875,19.875 C7.125,21.5625 4.5,22.5 1.5,22.5 C0.9375,22.5 0.5625,22.5 0,22.5 C2.8125,24.1875 6,25.3125 9.375,25.3125 C20.625,25.3125 26.8125,15.9375 26.8125,7.875 C26.8125,7.6875 26.8125,7.3125 26.8125,7.125 C28.125,6.1875 29.25,5.0625 30,3.75 Z" />
    </g>
  </svg>
);

const BadgeLink = ({ backgroundColor, ...props }) => {
  const style = props.href
    ? { color: '#fff', background: backgroundColor, cursor: 'pointer' }
    : { color: '#94919c', background: '#EEF2F5' };

  return (
    // eslint-disable-next-line
    <a
      style={{
        width: '100%',
        height: '100%',
        outline: 'none',
        border: 'none',
        borderRadius: '50%',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      {...props}
    />
  );
};

class Badge extends React.Component {
  render() {
    const { id, backgroundColor, style = {}, href, Icon, Form } = this.props;
    const EditButton = posed.button({
      initialPose: 'default',
      hovering: { opacity: 1, y: '0%' },
      default: { opacity: 0, y: '-110%' }
    });

    return (
      <Hoverable
        element={posed.div}
        style={{
          position: 'relative',
          textAlign: 'center',
          ...style
        }}
      >
        <div
          style={{
            height: '60px',
            width: '60px'
          }}
        >
          <BadgeLink href={href} backgroundColor={backgroundColor}>
            {Icon}
          </BadgeLink>
          {!this.props.constant && (
            <IfIsActiveEntity id={id.toString()}>
              <EditButton
                onClick={this.props.edit}
                className="cp-inline-button"
                style={{
                  position: 'absolute',
                  top: '100%',
                  zIndex: 0,
                  width: '100%',
                  left: '0px',
                  fontSize: '16px'
                }}
              >
                Edit
              </EditButton>
              {this.props.editing && (
                <Modal onClose={this.props.stopEditing}>
                  <div
                    style={{
                      backgroundColor: '#fff',
                      boxShadow: '0 20px 40px 0 rgba(6,3,16,0.09)',
                      padding: '25px',
                      borderRadius: '4px'
                    }}
                  >
                    {Form}
                  </div>
                </Modal>
              )}
            </IfIsActiveEntity>
          )}
        </div>
      </Hoverable>
    );
  }
}

const LabelForm = props => (
  <ConnectedLabelForm
    style={{
      backgroundColor: 'rgba(246,244,255,0.7)',
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      alignItems: 'center'
    }}
    inputStyle={{
      fontSize: '16px',
      fontWeight: 'normal'
    }}
    inputClassName="cp-textarea--reply"
    {...props}
  />
);

export default class ShowPage extends Component {
  state = { editing: undefined };

  componentDidMount() {
    pageView();
    window.scrollTo(0, 0);
    this.refreshFeedItems(true);
    this.props.getEntityInfo(this.props.match.params.entityId);
    this.refreshInterval = setInterval(this.refreshFeedItems, 15000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.entityId !== this.props.match.params.entityId) {
      pageView();
      this.refreshFeedItems(true, nextProps.match.params.entityId);
      this.props.getEntityInfo(nextProps.match.params.entityId);
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refreshFeedItems = async (purge = false, entityId = this.props.match.params.entityId) => {
    const feedItems = await getFeedItems(entityId);
    this.props.updateFeedItems(feedItems, purge);
  };

  render() {
    return (
      <React.Fragment>
        <Entity id={this.props.match.params.entityId}>
          {entity => (
            <React.Fragment>
              <div className="has-text-centered" style={{ backgroundColor: entity.color, height: '30rem' }}>
                <img src={entity.image_url} style={{ height: '100%' }} alt={entity.id} />
              </div>
              <div className="container" style={{ padding: '20px 0' }}>
                <div className="columns">
                  <div className="column is-6 is-offset-3">
                    <h1 style={{ fontSize: '3rem', display: 'inline' }}>
                      <EntityName id={entity.id} />
                    </h1>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-6 is-offset-3" style={{ display: 'flex' }}>
                    <Badge
                      constant
                      id={entity.id}
                      Icon={<img src={etherDiamond} style={{ height: '70%' }} alt={entity.id} />}
                      href={entity.url}
                      backgroundColor={entity.color}
                    />
                    <Badge
                      edit={() => this.setState({ editing: 'facebook' })}
                      stopEditing={() => this.setState({ editing: undefined })}
                      editing={this.state.editing === 'facebook'}
                      id={entity.id}
                      Icon={<FacebookIcon />}
                      href={entity.facebook}
                      Form={<LabelForm labelType="facebook" onSubmit={() => this.setState({ editing: undefined })} />}
                      backgroundColor="#4167B2"
                      style={{ marginLeft: '20px' }}
                    />
                    <Badge
                      edit={() => this.setState({ editing: 'github' })}
                      stopEditing={() => this.setState({ editing: undefined })}
                      editing={this.state.editing === 'github'}
                      id={entity.id}
                      href={entity.github}
                      Icon={<GithubIcon />}
                      Form={<LabelForm labelType="github" onSubmit={() => this.setState({ editing: undefined })} />}
                      backgroundColor="#24292e"
                      style={{ marginLeft: '20px' }}
                    />
                    <Badge
                      edit={() => this.setState({ editing: 'twitter' })}
                      stopEditing={() => this.setState({ editing: undefined })}
                      editing={this.state.editing === 'twitter'}
                      id={entity.id}
                      href={entity.twitter}
                      Icon={<TwitterIcon />}
                      Form={<LabelForm labelType="twitter" onSubmit={() => this.setState({ editing: undefined })} />}
                      backgroundColor="#1CA1F2"
                      style={{ marginLeft: '20px' }}
                    />
                    <Badge
                      edit={() => this.setState({ editing: 'instagram' })}
                      stopEditing={() => this.setState({ editing: undefined })}
                      editing={this.state.editing === 'instagram'}
                      id={entity.id}
                      href={entity.instagram}
                      Form={<LabelForm labelType="instagram" onSubmit={() => this.setState({ editing: undefined })} />}
                      Icon={<InstagramIcon />}
                      backgroundColor="#F41476"
                      style={{ marginLeft: '20px' }}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </Entity>
        <ConnectedFeed />
      </React.Fragment>
    );
  }
}
