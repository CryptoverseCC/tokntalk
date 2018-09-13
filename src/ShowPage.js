import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { getRanking, isValidFeedItem, enhanceFeedItem } from './api';
import { pageView } from './Analytics';
import { getFeed } from './Feed';
import {
  Entity,
  EntityName,
  IfIsActiveEntity,
  IfIsOwnedByCurrentUser,
  IfActiveEntity,
  LinkedActiveEntityAvatar,
  ActiveEntityName,
  EntityClubs,
  EntityAvatar,
} from './Entity';
import AppContext from './Context';
import IdentityAvatar from './Avatar';
import { socialIcons } from './Icons';
import { CommentForm, ConnectedWriteToForm, ConnectedCommentForm } from './CommentForm';
import Link from './Link';
import { findClub } from './clubs';
import { TokenImage } from './clubs';
import { PromotionBox } from './promotion/PromotionBox';
import { HeaderSpacer } from './Header';
import { FlatContainer, ContentContainer, H2, H4, SocialUsername } from './Components';
import { TokenTile } from './Discover'; // ToDo extract it from Discovery
import checkMark from './img/checkmark.svg';
import closeIcon from './img/small-remove.svg';
import { CousinsBox } from './CousinsBox';
import { niceScroll } from './cssUtils';
import SendTokens from './SendTokens';
import ProfileBox from './ProfileBox';
import { Token } from './ActiveEntityTokens';

const StyledTokenTile = styled(TokenTile)`
  :last-child {
    z-index: 2;
  }
`;

const ScrollableContainer = styled.div`
  ${niceScroll};
  overflow-y: scroll;
  max-height: 300px;
`;

const getSingleFeed = async ({ entityId }) => {
  const { items } = await getRanking(
    [{ algorithm: 'cryptoverse_single_feed', params: { id: entityId } }],
    'api/decorate-with-opensea',
  );

  return items.filter(isValidFeedItem).map(enhanceFeedItem);
};

const filterTemporaryItemsNotForEntity = ({ entityId }) => ({ context, about }) =>
  context === entityId || about === entityId;

const Feed = getFeed(
  getSingleFeed,
  false,
  true,
  filterTemporaryItemsNotForEntity,
  (f0, f1) => f1.created_at - f0.created_at,
);

export default class ShowPage extends Component {
  state = { editing: undefined };

  componentDidMount() {
    pageView();
    this.props.getEntityInfo(this.props.match.params.entityId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.entityId !== this.props.match.params.entityId) {
      pageView();
      this.props.getEntityInfo(nextProps.match.params.entityId);
    }
  }

  static ProfileImageContainer = styled.div`
    position: relative;
    padding-top: 69%;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: hidden;
    background-color: ${({ backgroundColor }) => (backgroundColor ? `#${backgroundColor}` : 'white')};
  `;

  static ProfileImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  `;

  render() {
    const { EntityInfo, PromotionBox, Cousins, Communities, FeedContainer } = this;
    const { entityId } = this.props.match.params;
    const tokenClub = this.getCommunityToken(entityId);

    return (
      <Entity id={entityId}>
        {(entity) => (
          <ContentContainer>
            <HeaderSpacer style={{ marginBottom: '60px' }} />
            <div className="columns">
              <div className="column is-3">
                <ProfileBox
                  coverImage={entity.image_preview_url}
                  coverImageStyle={{
                    backgroundSize: entity.isAddress ? 'cover' : 'contain',
                    backgroundPositionX: '100%',
                  }}
                  avatar={
                    <IdentityAvatar
                      backgroundColor="transparent"
                      entity={entityId}
                      src={entity.image_preview_url}
                      size="medium"
                      style={{ alignSelf: 'flex-end' }}
                    />
                  }
                  primaryColor={entity.background_color ? `#${entity.background_color}` : tokenClub.primaryColor}
                >
                  <EntityInfo entity={entity} />
                </ProfileBox>
                <PromotionBox entity={entity} />
              </div>
              <div className="column is-6">
                <FeedContainer entity={entity} />
              </div>
              <div className="column is-3">
                <Communities entity={entity} />
                <Cousins entity={entity} style={{ marginTop: '2rem' }} />
              </div>
            </div>
          </ContentContainer>
        )}
      </Entity>
    );
  }

  EntityInfo = ({ entity }) => (
    <React.Fragment>
      <H2 style={{ wordBreak: 'break-word' }}>
        <EntityName id={entity.id} />
      </H2>
      <AppContext>{({ web3Store }) => web3Store.networkName === 'ethereum' && <SendTokens to={entity} />}</AppContext>
      <H4 style={{ marginTop: '10px', marginBottom: '10px' }}>Seen In</H4>
      <IfIsOwnedByCurrentUser
        entity={entity}
        then={<SocialList editable {...entity} />}
        other={<SocialList {...entity} />}
      />
    </React.Fragment>
  );

  PromotionBox = ({ entity }) => (
    <FlatContainer style={{ marginTop: '30px' }}>
      <AppContext.Consumer>
        {({ boostStore: { getBoosts, getSupportings } }) => (
          <PromotionBox getBoosts={getBoosts} getSupportings={getSupportings} token={entity.id} showPurrmoter={false} />
        )}
      </AppContext.Consumer>
    </FlatContainer>
  );

  Cousins = ({ entity, style }) => (
    <AppContext.Consumer>
      {({ entityStore: { entityInfo } }) => {
        if ((!entity.isAddress && entityInfo[entity.id]) || entity.isAddress) {
          const owner = entity.isAddress ? entity.id : entity.owner;
          return <CousinsBox entity={entity} owner={owner} style={style} />;
        }
      }}
    </AppContext.Consumer>
  );

  Communities = ({ entity }) => (
    <FlatContainer>
      <H4>Clubs</H4>
      <ScrollableContainer>
        {entity.tokens.map((token) => (
          <Token key={token.address} token={token} />
        ))}
      </ScrollableContainer>
    </FlatContainer>
  );

  FeedContainer = ({ entity }) => (
    <div>
      <IfActiveEntity>
        {(token) => (
          <div className="box cp-box" style={{ boxShadow: '0 4px 10px rgba(98,60,234,0.07)', borderRadius: '12px' }}>
            <article className="media">
              <div className="media-left">
                <LinkedActiveEntityAvatar size="large" />
              </div>
              <div className="media-content">
                <div className="content">
                  <Link
                    to={`/${token}`}
                    style={{
                      fontFamily: 'AvenirNext',
                      fontSize: '1rem',
                      fontWeight: '700',
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
      <Feed options={{ entityId: entity.id }} />
    </div>
  );

  getCommunityToken = (id) => {
    if (id.indexOf(':') === -1) {
      return {};
    }
    const [network, address] = id.split(':');
    return findClub(network, address);
  };
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
    cursor: not-allowed;
  }
`;

const SocialIcon = styled(({ type, ...restProps }) => React.createElement(socialIcons[type], restProps))`
  flex-shrink: 0;
  width: auto;
  height: 16px;
`;

const LabelInput = styled.input`
  padding: 10px 0;
  outline: none;
  border: none;
  background: transparent;
  font-size: 0.8rem;
  color: ${({ isValid }) => !isValid && '#1b2437'};
  &::placeholder {
    transition: color 0.15s ease-in-out;
    color: #97abe2;
  }
`;

const EditableLabelContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  ${({ editing }) =>
    editing &&
    css`
      border-radius: 6px;
      background-color: #f3f6ff;
      box-shadow: inset 0 1px 3px 0 #e0dbf4;
    `};
`;

const SendIcon = styled.img.attrs({ src: checkMark })`
  transition: transform 0.2s;

  ${InlineButton}:not(:disabled):hover & {
    transform: translateY(-2px);
  }
`;

const ExitIcon = styled.img.attrs({ src: closeIcon })`
  position: absolute;
  width: 10px;
  height: 10px;
  right: -12px;
  top: calc(50% - 5px);
  transition: transform 0.2s ease-in;

  :hover {
    transform: translateY(-2px);
  }
`;

class EditableLabel extends Component {
  static DOMAIN_REGEX = {
    facebook: /^(?:(?:https?:\/\/)?(?:www\.)?(?:facebook|fb).com\/)?([\w.-]+)$/,
    twitter: /^(?:(?:https?:\/\/)?(?:www\.)?twitter\.com\/)?([\w]+)$/,
    github: /^(?:(?:https?:\/\/)?(?:www\.)?github\.com\/)?([\w-+@]+)$/,
    instagram: /^(?:(?:https?:\/\/)?(?:www\.)?instagram\.com\/)?([\w.-]+)$/,
  };
  static DOMAINS = {
    facebook: 'https://facebook.com/',
    twitter: 'https://twitter.com/',
    github: 'https://github.com/',
    instagram: 'https://instagram.com/',
  };

  static extractUsername = (text, type) => {
    if (text !== undefined) {
      const username = EditableLabel.DOMAIN_REGEX[type].exec(text);
      if (username !== null) {
        return username[1];
      }
    }
    return '';
  };

  state = {
    editing: false,
    isValid: true,
    editedValue: EditableLabel.extractUsername(this.props.value, this.props.type),
  };

  edit = (e) => {
    e.preventDefault();
    this.setState({ editing: true });
  };

  validate = (label) => {
    const { type } = this.props;
    return label === '' || EditableLabel.DOMAIN_REGEX[type].test(label);
  };

  createFullSocialUrl = () => {
    const { editedValue } = this.state;
    const { type } = this.props;
    if (EditableLabel.DOMAIN_REGEX[type].test(editedValue)) {
      return EditableLabel.DOMAINS[type] + EditableLabel.extractUsername(editedValue, type);
    } else {
      return '';
    }
  };

  submitLabel = (label) => {
    label(this.createFullSocialUrl(), this.props.type);
    this.setState({ editing: false });
  };

  onChange = (e) => {
    const value = e.target.value;
    this.setState({ editedValue: value, isValid: this.validate(value) });
  };

  render() {
    const { value, editable } = this.props;
    const { editing, isValid, editedValue } = this.state;

    return (
      <EditableLabelContainer
        onClick={(e) => editing && e.preventDefault()}
        editing={editing}
        style={{ marginLeft: '15px' }}
      >
        {editing ? (
          <LabelInput
            placeholder="username"
            value={editedValue}
            onChange={this.onChange}
            isValid={isValid}
            style={{ paddingLeft: '10px' }}
          />
        ) : (
          <SocialUsername link={value} />
        )}
        {!editing ? (
          <InlineButton onClick={this.edit} style={{ fontSize: '0.8rem', marginLeft: 'auto', fontWeight: '600' }}>
            {editable && 'Edit'}
          </InlineButton>
        ) : (
          <AppContext.Consumer>
            {({ feedStore: { label } }) => (
              <InlineButton
                onClick={() => this.submitLabel(label)}
                style={{ fontSize: '1rem', marginLeft: 'auto', flexShrink: 0 }}
                disabled={!isValid}
              >
                <SendIcon />
              </InlineButton>
            )}
          </AppContext.Consumer>
        )}
        {editing && <ExitIcon onClick={() => this.setState({ editing: false })} />}
      </EditableLabelContainer>
    );
  }
}
export class SocialList extends React.Component {
  normalizeHref = (href) => {
    return href ? href : undefined;
  };

  domainRegex = /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/;
  getDomain = (url) => {
    const result = this.domainRegex.exec(url);
    if (result) {
      return result[1];
    }
    return url;
  };

  getCommunityToken = (id) => {
    const [network, address] = id.split(':');
    return findClub(network, address);
  };

  isAddress = (id) => {
    return !id.includes(':');
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
              {this.isAddress(id) && (
                <IdentityAvatar
                  entity={id}
                  backgroundColor={background_color}
                  size="verySmall"
                  src={image_preview_url}
                />
              )}
              {!this.isAddress(id) && <TokenImage token={this.getCommunityToken(id)} size="verySmall" />}
              <span style={{ marginLeft: '15px' }}>{getDomain(external_link)}</span>
            </SocialBadge>
          )}
        </Entity>
        {(facebook || editable) && (
          <SocialBadge href={normalizeHref(facebook)}>
            <SocialIcon style={{ marginLeft: '3px' }} type="facebook" />
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
