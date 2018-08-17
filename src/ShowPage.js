import React, { Component } from 'react';
import styled, { css } from 'styled-components';
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
import { socialIcons } from './Icons';
import { CommentForm, ConnectedWriteToForm, ConnectedCommentForm } from './CommentForm';
import Link from './Link';
import Advertised from './Catvertised';
import clubs from './clubs';
import { HeaderSpacer } from './Header';
import { FlatContainer, ContentContainer, H2, H3, H4, SocialUsername } from './Components';
import { TokenTile } from './Discover'; // ToDo extract it from Discovery
import closeIcon from './img/small-remove.svg';

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

const StyledTokenTile = styled(TokenTile)`
  :last-child {
    z-index: 2;
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
    background-color: ${({ backgroundColor }) => `#${backgroundColor}` || '#f8f9fd'};
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
                <ShowPage.ProfileImageContainer backgroundColor={entity.background_color}>
                  <ShowPage.ProfileImage src={entity.image_preview_url} alt={entity.id} />
                </ShowPage.ProfileImageContainer>
                <FlatContainer style={{ borderTopLeftRadius: 'unset', borderTopRightRadius: 'unset' }}>
                  <H2 style={{ wordBreak: 'break-word' }}>
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
                        const token = find({ network, address })(clubs);

                        return (
                          <StyledTokenTile
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

  :disabled {
    color: gray;
  }
`;

const SocialIcon = styled(({ type, ...restProps }) => React.createElement(socialIcons[type], restProps))`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
`;

const LabelInput = styled.input`
  padding: 10px 0;
  outline: none;
  border: none;
  background: transparent;
  color: ${({ isValid }) => !isValid && 'red'};
`;

const EditableLabelContainer = styled.div`
  flex: 1;
  display: flex;
  ${({ editing }) =>
    editing &&
    css`
      border-radius: 6px;
      background-color: #f3f6ff;
      box-shadow: inset 0 1px 3px 0 #e0dbf4;
    `};
`;

class EditableLabel extends Component {
  static VALID_LABEL_EXPRESSIONS = {
    facebook: /http(s)?:\/\/(www\.)?(facebook|fb)\.com\/(A-z 0-9 _ - \.)\/?/,
    twitter: /http(s)?:\/\/(.*\.)?twitter\.com\/[A-z 0-9 _]+\/?/,
    github: /http(s)?:\/\/(www\.)?github\.com\/[A-z 0-9 _ -]+\/?/,
    instagram: /https?:\/\/(www\.)?instagram\.com\/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/,
  };

  state = { editing: false, isValid: true, editedValue: this.props.value };

  edit = (e) => {
    e.preventDefault();
    this.setState({ editing: true });
  };

  validate = (label) => {
    const { type } = this.props;
    return label === '' || EditableLabel.VALID_LABEL_EXPRESSIONS[type].test(label);
  };

  submitLabel = (label) => () => {
    label(this.state.editedValue, this.props.type);
    this.setState({ editing: false });
  };

  onChange = (e) => {
    const value = e.target.value;
    this.setState({ editedValue: value, isValid: this.validate(value) });
  };

  render() {
    const { value, editable, type } = this.props;
    const { editing, isValid, editedValue } = this.state;

    return (
      <div>
        <EditableLabelContainer
          onClick={(e) => editing && e.preventDefault()}
          editing={editing}
          style={{ marginLeft: '15px', float: 'left' }}
        >
          {editing ? (
            <LabelInput
              placeholder={`${type} profile link`}
              value={editedValue}
              onChange={this.onChange}
              isValid={isValid}
            />
          ) : (
            <SocialUsername link={value} />
          )}
          {!editing ? (
            <InlineButton onClick={this.edit} style={{ fontSize: '1rem', marginLeft: 'auto' }}>
              {editable && 'Edit'}
            </InlineButton>
          ) : (
            <AppContext.Consumer>
              {({ feedStore: { label } }) => (
                <InlineButton
                  onClick={this.submitLabel(label)}
                  style={{ fontSize: '1rem', marginLeft: 'auto' }}
                  disabled={!isValid}
                >
                  Confirm
                </InlineButton>
              )}
            </AppContext.Consumer>
          )}
        </EditableLabelContainer>
        {editing && (
          <img
            alt=""
            src={closeIcon}
            style={{ float: 'left', padding: '13px' }}
            onClick={() => this.setState({ editing: false })}
          />
        )}
      </div>
    );
  }
}
export class SocialList extends React.Component {
  normalizeHref = (href) => {
    return href ? href : undefined;
  };

  domainRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/;
  getDomain = (url) => {
    const result = this.domainRegex.exec(url);
    if (result) {
      return result[1];
    }
    return url;
  };

  static Container = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  `;

  render() {
    const { normalizeHref, getDomain } = this;
    const { facebook, twitter, instagram, github, id, editable } = this.props;

    return (
      <SocialList.Container>
        <Entity id={id}>
          {({ external_link, background_color, image_preview_url }) => (
            <SocialBadge href={external_link}>
              <IdentityAvatar entity={id} backgroundColor={background_color} size="verySmall" src={image_preview_url} />
              <span style={{ marginLeft: '15px' }}>{getDomain(external_link)}</span>
            </SocialBadge>
          )}
        </Entity>
        {(facebook || editable) && (
          <SocialBadge href={normalizeHref(facebook)}>
            <SocialIcon type="facebook" />
            <EditableLabel value={facebook} type="facebook" editable={editable} />
          </SocialBadge>
        )}
        {(twitter || editable) && (
          <SocialBadge href={normalizeHref(twitter)}>
            <SocialIcon type="twitter" />
            <EditableLabel value={twitter} type="twitter" editable={editable} />
          </SocialBadge>
        )}
        {(instagram || editable) && (
          <SocialBadge href={normalizeHref(instagram)}>
            <SocialIcon type="instagram" />
            <EditableLabel value={instagram} type="instagram" editable={editable} />
          </SocialBadge>
        )}
        {(github || editable) && (
          <SocialBadge href={normalizeHref(github)}>
            <SocialIcon type="github" />
            <EditableLabel value={github} type="github" editable={editable} />
          </SocialBadge>
        )}
      </SocialList.Container>
    );
  }
}
