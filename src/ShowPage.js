import React, { Component } from 'react';
import styled from 'styled-components';
import { pageView } from './Analytics';
import { ConnectedFeed } from './Feed';
import {
  Entity,
  EntityName,
  IfIsActiveEntity,
  IfActiveEntity,
  LinkedActiveEntityAvatar,
  ActiveEntityName,
} from './Entity';
import IdentityAvatar from './Avatar';
import Modal from './Modal';
import { FacebookIcon, GithubIcon, TwitterIcon, InstagramIcon, socialColors } from './Icons';
import { ConnectedLabelForm, ReplyForm, CommentForm, ConnectedWriteToForm, ConnectedCommentForm } from './CommentForm';
import Link from './Link';
import { FeedCatvertised } from './Catvertised';

export default class ShowPage extends Component {
  state = { editing: undefined };

  componentDidMount() {
    pageView();
    window.scrollTo(0, 0);
    this.props.getFeedItems(this.props.match.params.entityId);
    this.props.getEntityInfo(this.props.match.params.entityId);
    this.refreshInterval = setInterval(() => this.props.getNewFeedItems(this.props.match.params.entityId), 3000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.entityId !== this.props.match.params.entityId) {
      pageView();
      this.props.getFeedItems(nextProps.match.params.entityId);
      this.props.getEntityInfo(nextProps.match.params.entityId);
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  static HeroImageContainer = styled.div`
    background-color: ${({ backgroundColor }) => backgroundColor || 'none'};
    height: 30rem;
    text-align: center;

    @media (max-width: 770px) {
      height: 15rem;
    }
  `;

  static FeedContainer = styled.div`
    padding: 20px 0.75rem;
  `;

  static EntityName = styled.h1`
    font-size: 3rem;
    @media (max-width: 770px) {
      font-size: 2rem;
      text-align: center;
    }
  `;

  render() {
    const { entityId } = this.props.match.params;
    return (
      <React.Fragment>
        <Entity id={entityId}>
          {(entity) => (
            <React.Fragment>
              <ShowPage.HeroImageContainer backgroundColor={entity.color}>
                <img src={entity.image_url} style={{ height: '100%' }} alt={entity.id} />
              </ShowPage.HeroImageContainer>
              <ShowPage.FeedContainer className="container">
                <div className="columns">
                  <div className="column is-6 is-offset-3">
                    <ShowPage.EntityName>
                      <EntityName id={entity.id} />
                    </ShowPage.EntityName>
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
                <IfActiveEntity>
                  {(token) => (
                    <div className="columns">
                      <div className="column is-6 is-offset-3">
                        <div
                          className="box cp-box"
                          style={{ boxShadow: '0 4px 10px rgba(98,60,234,0.07)', borderRadius: '12px' }}
                        >
                          <article className="media">
                            <div className="media-left">
                              <LinkedActiveEntityAvatar size="large" />
                            </div>
                            <div className="media-content">
                              <div className="content">
                                <Link
                                  to={`/${token}`}
                                  style={{
                                    fontFamily: 'Rubik',
                                    fontSize: '1.1rem',
                                    fontWeight: '500',
                                  }}
                                >
                                  <ActiveEntityName />
                                </Link>
                                <IfIsActiveEntity
                                  id={entity.id.toString()}
                                  then={<ConnectedCommentForm Form={CommentForm} />}
                                  other={<ConnectedWriteToForm to={entity} Form={CommentForm} />}
                                />
                              </div>
                            </div>
                          </article>
                        </div>
                      </div>
                    </div>
                  )}
                </IfActiveEntity>
                <div className="columns">
                  <FeedCatvertised token={entityId} />
                  <ConnectedFeed forEntity={entity} className={'column is-6'} />
                </div>
              </ShowPage.FeedContainer>
            </React.Fragment>
          )}
        </Entity>
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
  background-color: ${({ href }) => (href ? '' : '#eef2f5')}

  &:hover {
    color: ${({ href }) => (href ? 'white' : '#94919c')};
  }

  @media (max-width: 770px) {
    width: 50px;
    height: 50px;
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

  @media (max-width: 770px) {
    & + & {
      margin-left: 0;
    }
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
  static VALID_LABEL_EXPRESSIONS = {
    facebook: /http(s)?:\/\/(www\.)?(facebook|fb)\.com\/(A-z 0-9 _ - \.)\/?/,
    twitter: /http(s)?:\/\/(.*\.)?twitter\.com\/[A-z 0-9 _]+\/?/,
    github: /http(s)?:\/\/(www\.)?github\.com\/[A-z 0-9 _ -]+\/?/,
    instagram: /https?:\/\/(www\.)?instagram\.com\/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/,
  };

  static PLACEHOLDERS = {
    facebook: 'https://facebook.com/profileName',
    twitter: 'https://twitter.com/profileName',
    github: 'https://github.com/profileName',
    instagram: 'https://instagram.com/profileName',
  };

  state = {
    editing: undefined,
  };

  editLabel = (labelType) => () => {
    this.setState({ editing: labelType });
  };

  EditButton = ({ labelType }) => (
    <InlineButton onClick={this.editLabel(labelType)} style={{ fontSize: '1rem' }}>
      {this.props.editable && 'Edit'}
    </InlineButton>
  );

  validate = (label) => {
    const { editing: labelType } = this.state;
    return label === '' || SocialBadges.VALID_LABEL_EXPRESSIONS[labelType].test(label);
  };

  normalizeHref = (href) => {
    return href ? href : undefined;
  };

  static Container = styled.div`
    position: relative;
    display: flex;
    width: 100%;

    @media (max-width: 770px) {
      justify-content: space-between;
    }
  `;

  render() {
    const {
      EditButton,
      normalizeHref,
      props: { facebook, twitter, instagram, github, id },
    } = this;
    return (
      <SocialBadges.Container>
        <SocialBadge>
          <Entity id={id}>
            {({ url, color, image_url }) => (
              <Badge
                href={url}
                children={<IdentityAvatar entity={id} backgroundColor={color} size="medium" src={image_url} />}
              />
            )}
          </Entity>
        </SocialBadge>
        <SocialBadge>
          <Badge activeColor={socialColors.facebook} href={normalizeHref(facebook)} children={<FacebookIcon />} />
          <EditButton labelType="facebook" />
        </SocialBadge>
        <SocialBadge>
          <Badge activeColor={socialColors.twitter} href={normalizeHref(twitter)} children={<TwitterIcon />} />
          <EditButton labelType="twitter" />
        </SocialBadge>
        <SocialBadge>
          <Badge activeColor={socialColors.instagram} href={normalizeHref(instagram)} children={<InstagramIcon />} />
          <EditButton labelType="instagram" />
        </SocialBadge>
        <SocialBadge>
          <Badge activeColor={socialColors.github} href={normalizeHref(github)} children={<GithubIcon />} />
          <EditButton labelType="github" />
        </SocialBadge>
        {this.state.editing && (
          <LabelModal onClose={this.editLabel(undefined)}>
            <ConnectedLabelForm
              Form={ReplyForm}
              validate={this.validate}
              placeholder={SocialBadges.PLACEHOLDERS[this.state.editing]}
              labelType={this.state.editing}
              onSubmit={this.editLabel(undefined)}
            />
          </LabelModal>
        )}
      </SocialBadges.Container>
    );
  }
}
