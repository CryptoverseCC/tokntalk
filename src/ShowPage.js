import React, { Component } from 'react';
import styled from 'styled-components';
import find from 'lodash/fp/find';

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
import AppContext from './Context';
import IdentityAvatar from './Avatar';
import Modal from './Modal';
import { socialIcons } from './Icons';
import { ConnectedLabelForm, ReplyForm, CommentForm, ConnectedWriteToForm, ConnectedCommentForm } from './CommentForm';
import Link from './Link';
import Advertised from './Catvertised';
import ercs20 from './erc20';
import { HeaderSpacer } from './Header';
import { FlatContainer, ContentContainer, H2, H3, H4, SocialUsername } from './Components';
import { TokenTile } from './Discover'; // ToDo extract it from Discovery

const CommunitiesListContainer = styled.div`
  position: relative;
  min-width: 100%;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    width: 80px;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
    z-index: 1;
  }
`;

const CommunitiesList = styled.div`
  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #dde0eb;
  }
`;

export default class ShowPage extends Component {
  state = { editing: undefined };

  componentDidMount() {
    pageView();
    window.scrollTo(0, 0);
    this.props.getFeedItems(this.props.match.params.entityId);
    this.props.getEntityInfo(this.props.match.params.entityId);
    // this.refreshInterval = setInterval(() => this.props.getNewFeedItems(this.props.match.params.entityId), 3000);
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

  static ProfileImageContainer = styled.div`
    position: relative;
    padding-top: 69%;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: hidden;
    background-color: ${({ backgroundColor }) => backgroundColor || '#f8f9fd'};
  `;

  static ProfileImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  `;

  static FeedContainer = styled.div``;

  render() {
    const { entityId } = this.props.match.params;

    return (
      <Entity id={entityId}>
        {(entity) => (
          <ContentContainer>
            <HeaderSpacer style={{ marginBottom: '60px' }} />
            <div className="columns">
              <div className="column is-3">
                <ShowPage.ProfileImageContainer backgroundColor={entity.color}>
                  <ShowPage.ProfileImage src={entity.image_url} alt={entity.id} />
                </ShowPage.ProfileImageContainer>
                <FlatContainer style={{ borderTopLeftRadius: 'unset', borderTopRightRadius: 'unset' }}>
                  <H2>
                    <EntityName id={entity.id} />
                  </H2>
                  <H4 style={{ marginTop: '10px', marginBottom: '10px' }}>Seen In</H4>
                  <IfIsActiveEntity
                    id={entity.id.toString()}
                    then={<SocialList editable {...entity} />}
                    other={<SocialList {...entity} />}
                  />
                </FlatContainer>
                <FlatContainer style={{ marginTop: '30px' }}>
                  <AppContext.Consumer>
                    {({ boostStore: { getBoosts } }) => <Advertised getBoosts={getBoosts} token={entityId} />}
                  </AppContext.Consumer>
                </FlatContainer>
              </div>
              <div className="column is-8 is-offset-1">
                <FlatContainer style={{ marginBottom: '2rem' }}>
                  <H4 style={{ marginBottom: '15px' }}>
                    <EntityName id={entityId} /> Communities
                  </H4>
                  <CommunitiesListContainer>
                    <CommunitiesList className="columns is-mobile">
                      {entity.tokens.map((asset) => {
                        const [network, address] = asset.split(':');
                        const token = find({ network, address })(ercs20);

                        return (
                          <TokenTile
                            key={asset}
                            small
                            linkTo={`/discover/byToken/${token.symbol}`}
                            token={token}
                            className="column is-one-fifth-desktop is-one-third-mobile"
                          />
                        );
                      })}
                    </CommunitiesList>
                  </CommunitiesListContainer>
                </FlatContainer>
                <ShowPage.FeedContainer>
                  <IfActiveEntity>
                    {(token) => (
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
                    )}
                  </IfActiveEntity>
                  <ConnectedFeed forEntity={entity} className="todo" />
                </ShowPage.FeedContainer>
              </div>
            </div>
          </ContentContainer>
        )}
      </Entity>
    );
  }
}

const SocialBadge = styled.a`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  cursor: pointer;

  :last-child {
    padding-bottom: 0;
  }
`;

const InlineButton = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #264dd9;
`;

const SocialIcon = styled(({ type, ...restProps }) => React.createElement(socialIcons[type], restProps))`
  width: 24px;
  height: 24px;
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

export class SocialList extends React.Component {
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

  editLabel = (labelType) => (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ editing: labelType });
  };

  EditButton = ({ labelType }) => (
    <InlineButton onClick={this.editLabel(labelType)} style={{ fontSize: '1rem', marginLeft: 'auto' }}>
      {this.props.editable && 'Edit'}
    </InlineButton>
  );

  validate = (label) => {
    const { editing: labelType } = this.state;
    return label === '' || SocialList.VALID_LABEL_EXPRESSIONS[labelType].test(label);
  };

  normalizeHref = (href) => {
    return href ? href : undefined;
  };

  static Container = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  `;

  render() {
    const {
      EditButton,
      normalizeHref,
      props: { facebook, twitter, instagram, github, id, editable },
    } = this;
    return (
      <SocialList.Container>
        <Entity id={id}>
          {({ url, color, name, image_url }) => (
            <SocialBadge href={url}>
              <IdentityAvatar entity={id} backgroundColor={color} size="verySmall" src={image_url} />
              <span style={{ marginLeft: '15px' }}>{name}</span>
            </SocialBadge>
          )}
        </Entity>
        {(facebook || editable) && (
          <SocialBadge href={normalizeHref(facebook)}>
            <SocialIcon type="facebook" />
            <SocialUsername link={facebook} style={{ marginLeft: '15px' }} />
            <EditButton labelType="facebook" />
          </SocialBadge>
        )}
        {(twitter || editable) && (
          <SocialBadge href={normalizeHref(twitter)}>
            <SocialIcon type="twitter" />
            <SocialUsername link={twitter} style={{ marginLeft: '15px' }} />
            <EditButton labelType="twitter" />
          </SocialBadge>
        )}
        {(instagram || editable) && (
          <SocialBadge href={normalizeHref(instagram)}>
            <SocialIcon type="instagram" />
            <SocialUsername link={instagram} style={{ marginLeft: '15px' }} />
            <EditButton labelType="instagram" />
          </SocialBadge>
        )}
        {(github || editable) && (
          <SocialBadge href={normalizeHref(github)}>
            <SocialIcon type="github" />
            <SocialUsername link={github} style={{ marginLeft: '15px' }} />
            <EditButton labelType="github" />
          </SocialBadge>
        )}
        {this.state.editing && (
          <LabelModal onClose={this.editLabel(undefined)}>
            <ConnectedLabelForm
              Form={ReplyForm}
              validate={this.validate}
              placeholder={SocialList.PLACEHOLDERS[this.state.editing]}
              labelType={this.state.editing}
              onSubmit={this.editLabel(undefined)}
            />
          </LabelModal>
        )}
      </SocialList.Container>
    );
  }
}
