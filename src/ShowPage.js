import React, { Component } from 'react';
import styled from 'styled-components';
import { pageView } from './Analytics';
import { ConnectedFeed } from './Feed';
import { Entity, EntityName, IfIsActiveEntity } from './Entity';
import Modal from './Modal';
import { FacebookIcon, GithubIcon, TwitterIcon, InstagramIcon } from './Icons';
import { ConnectedLabelForm, ReplyForm } from './CommentForm';
import { getFeedItems } from './api';
import { EntityIcon } from './entityApi';

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
                    <IfIsActiveEntity
                      id={entity.id.toString()}
                      then={<SocialBadges editable {...entity} />}
                      other={<SocialBadges {...entity} />}
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

const Badge = styled.a`
  width: 60px;
  height: 60px;
  outline: none;
  border: none;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ href }) => (href ? 'pointer' : 'default')};
  color: ${({ href }) => (href ? 'white !important' : '#94919c')};
  background-color: ${({ href, activeColor }) => (href ? activeColor : '#eef2f5')}

  &:hover {
    color: ${({ href }) => (href ? 'white' : '#94919c')};
  }
`;

const InlineButton = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #623cea;
  &:hover {
    color: #2f2670;
  }
`;

const SocialBadge = styled.div`
  text-align: center;

  & + & {
    margin-left: 20px;
  }
`;

const LabelModal = styled(Modal)`
  position: absolute;
  top: 100%;
  z-index: 100;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 20px 40px 0 rgba(6, 3, 16, 0.09);
  padding: 25px;
  border-radius: 4px;
`;

export class SocialBadges extends React.Component {
  state = {
    editing: undefined
  };

  editLabel = labelType => () => {
    this.setState({ editing: labelType });
  };

  EditButton = ({ labelType }) => (
    <InlineButton onClick={this.editLabel(labelType)} style={{ fontSize: '16px' }}>
      {this.props.editable && 'Edit'}
    </InlineButton>
  );

  render() {
    const {
      EditButton,
      props: { facebook, twitter, instagram, github, id }
    } = this;
    return (
      <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
        <SocialBadge>
          <Entity id={id}>
            {({ url, color }) => <Badge href={url} activeColor={color} children={<EntityIcon />} />}
          </Entity>
        </SocialBadge>
        <SocialBadge>
          <Badge activeColor="#4167b2" href={facebook} children={<FacebookIcon />} />
          <EditButton labelType="facebook" />
        </SocialBadge>
        <SocialBadge>
          <Badge activeColor="#1CA1F2" href={twitter} children={<TwitterIcon />} />
          <EditButton labelType="twitter" />
        </SocialBadge>
        <SocialBadge>
          <Badge activeColor="#F41476" href={instagram} children={<InstagramIcon />} />
          <EditButton labelType="instagram" />
        </SocialBadge>
        <SocialBadge>
          <Badge activeColor="#24292e" href={github} children={<GithubIcon />} />
          <EditButton labelType="github" />
        </SocialBadge>
        {this.state.editing && (
          <LabelModal onClose={this.editLabel(undefined)}>
            <ConnectedLabelForm Form={ReplyForm} labelType={this.state.editing} onSubmit={this.editLabel(undefined)} />
          </LabelModal>
        )}
      </div>
    );
  }
}
