import React from 'react';
import capitalize from 'lodash/capitalize';
import ReactVisibilitySensor from 'react-visibility-sensor';
import styled, { keyframes } from 'styled-components';
import uniqBy from 'lodash/fp/uniqBy';

import { IfActiveEntity, LinkedEntityAvatar, IsActiveEntityFromFamily, DoesActiveEntityHasToken } from '../Entity';
import Link from '../Link';
import Boost from './posts/Boost';
import Post from './posts/Basic';
import Reply from './posts/Reply';
import PostReplyForm from './posts/ReplyForm';
import { CollapsableText, ShowMore } from './posts/CollapsableText';
import { FacebookIcon, TwitterIcon, InstagramIcon, GithubIcon } from '../Icons';
import { createEtherscanUrl, enhanceCustomClubProp } from '../utils';

const IconContainer = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Reaction = styled(IconContainer)`
  height: 20px;
  width: 20px;
`;

const FacebookLabel = styled(Reaction).attrs({
  children: <FacebookIcon style={{ width: '16px', marginLeft: '-1px', marginTop: '1px' }} />,
})`
  background-color: white;
  ${FacebookIcon} {
    height: 60%;
  }
`;

const GithubLabel = styled(Reaction).attrs({
  children: <GithubIcon style={{ width: '16px', marginLeft: '-1px', marginTop: '1px' }} />,
})`
  background-color: white;
  ${GithubIcon} {
    height: 60%;
  }
`;

const TwitterLabel = styled(Reaction).attrs({
  children: <TwitterIcon style={{ width: '16px', marginLeft: '-1px', marginTop: '1px' }} />,
})`
  background-color: white;
  ${TwitterIcon} {
    height: 50%;
  }
`;

const InstagramLabel = styled(Reaction).attrs({
  children: <InstagramIcon style={{ width: '16px', marginLeft: '-1px', marginTop: '1px' }} />,
})`
  background-color: white;
  ${InstagramIcon} {
    height: 50%;
  }
`;

const LabelItems = {
  facebook: FacebookLabel,
  twitter: TwitterLabel,
  instagram: InstagramLabel,
  github: GithubLabel,
};

const ReplyClubInfo = styled.div`
  display: none;
  text-align: right;
  margin-top: 5px;
  font-size: 0.8em;
  color: ${({ warning }) => 'rgb(146, 143, 155)'};

  *:focus-within + & {
    display: block;
  }
`;

const blink = keyframes`
  0% {
    background-color: #2850d9;
  }

  100% {
    background-color: transparent;
  }
`;

const ClubStip = styled.div`
  border-radius: 12px 0 0 12px;
  position: absolute;
  background: ${({ color }) => color};
  top: 0;
  left: 0;
  width: 45px;
  height: 100%;

  @media (max-width: 770px) {
    width: 30px;
  }
`;

const ClubLink = styled(
  enhanceCustomClubProp('club', 'club')(({ club, className, style }) => {
    const to = `/clubs/${club.isCustom ? `${club.network}:${club.address}` : club.symbol}`;
    return (
      <Link className={className} style={style} to={to}>
        <img src={club.logo} alt="logo" style={{ height: '0.8rem', marginRight: '5px' }} />
        {club.name}
      </Link>
    );
  }),
)`
  position: absolute;
  display: flex;
  align-items: center
  top: -5px;
  right: -5px;
  border-radius: 5px;
  padding: 5px;
  font-size: 0.8rem;
  color: ${({ club }) => club.secondaryColor}!important;
  background: ${({ club }) => club.primaryColor};
  box-shadow: ${({ club }) => `0 1rem 1rem -0.5rem ${club.shadowColor}`};
  transition: all 0.15s ease;

  ::after {
    content: '→';
    margin-left: 5px;
  }

  :hover {
    transform: translateY(-2px);
    box-shadow: ${({ club }) => `0 1rem 1.5rem -0.5rem ${club.shadowColor}`};
  }

  :active {
    transform: scale(0.98);
    box-shadow: ${({ club }) => `0 1rem 0.9rem -0.5rem ${club.shadowColor}`};
  }
`;

const CardBoxContent = styled.div`
  overflow: hidden;
  border-radius: 12px;
  background-color: white;
  padding: 15px;
  ${({ added }) => (added ? `animation: ${blink} 1s ease-out 1` : '')};
`;

const CardBox = styled(({ children, club, className, style }) => {
  return (
    <div className={className} style={style}>
      {club && <ClubStip color={club.primaryColor} />}
      {club && <ClubLink club={club} />}
      <CardBoxContent>{children}</CardBoxContent>
    </div>
  );
})`
  position: relative;
  box-shadow: 0 2rem 4rem -1.5rem rgba(118, 103, 170, 0.09);
  :not(:first-child) {
    margin-top: 2rem;
  }

  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
    :not(:first-child) {
      margin-top: 1rem;
    }
  }
`;

const ViewMoreReplies = styled(({ leftCount, onClick, className }) => (
  <ShowMore className={className} onClick={onClick}>
    Show {leftCount} more comment
    {leftCount > 1 ? 's' : ''}
    ...
  </ShowMore>
))`
  margin-left: 20px;

  @media (max-width: 770px) {
    margin-left: 20px;
  }
`;

export default class Card extends React.Component {
  replyForm = null;

  state = {
    wasShown: !this.props.added,
    areRepliesCollapsed: this.props.collapseReplies && this.props.replies.length > 3,
  };

  focusReply = () => {
    if (this.replyForm && this.replyForm.focus) {
      this.replyForm.focus();
    }
  };

  onShowLikers = (item, likes) => () => {
    this.props.onShowLikers(item, likes);
  };

  showMoreReplies = () => this.setState({ areRepliesCollapsed: false });

  onVerify = (feedItem) => {
    this.props.onVerify(feedItem);
  };

  renderItem = () => {
    const { areRepliesCollapsed } = this.state;
    const { feedItem, replies, reactions, disabledInteractions, isClubFeed, hidePermalink } = this.props;

    return (
      <React.Fragment>
        {feedItem.type === 'boost' ? (
          <Boost feedItem={feedItem} onVerify={this.onVerify} />
        ) : (
          <Post
            id={feedItem.id}
            style={{ borderTop: 'none' }}
            from={feedItem.isFromAddress ? feedItem.author : feedItem.context}
            entityInfo={feedItem.isFromAddress ? feedItem.author_info : feedItem.context_info}
            createdAt={feedItem.created_at}
            message={feedItem.target}
            family={feedItem.family}
            hidePermalink={hidePermalink}
            suffix={this.getSuffix(feedItem)}
            reaction={
              feedItem.type === 'social' &&
              Object.keys(LabelItems).includes(feedItem.label) &&
              React.createElement(LabelItems[feedItem.label])
            }
            onVerify={() => this.onVerify(feedItem)}
            replies={replies}
            disabledInteractions={disabledInteractions}
            onReply={this.focusReply}
            onShowLikers={this.onShowLikers}
            reactions={reactions}
          />
        )}
        {areRepliesCollapsed && <ViewMoreReplies leftCount={replies.length - 2} onClick={this.showMoreReplies} />}
        {(areRepliesCollapsed ? replies.slice(replies.length - 2) : replies).map((reply) => {
          const reactions = uniqBy((target) => target.id)([
            ...this.props.getTemporaryReactions(reply.id),
            ...(reply.likes || []),
          ]);

          return (
            <Reply
              id={reply.id}
              key={reply.id}
              from={reply.isFromAddress ? reply.author : reply.context}
              entityInfo={reply.isFromAddress ? reply.author_info : reply.context_info}
              createdAt={reply.created_at}
              message={reply.target}
              family={reply.family}
              reactions={reactions}
              etherscanUrl={createEtherscanUrl(reply)}
              onShowLikers={this.onShowLikers(reply, reactions)}
              onVerify={() => this.onVerify(reply)}
              disabledInteractions={disabledInteractions}
            />
          );
        })}
        {!disabledInteractions && (
          <IfActiveEntity>
            {() =>
              feedItem.type === 'post_club' ? (
                <IsActiveEntityFromFamily asset={`${feedItem.about_info.network}:${feedItem.about_info.address}`}>
                  {(isActiveEntityFromFamily) => (
                    <DoesActiveEntityHasToken token={feedItem.about_info}>
                      {(hasToken) => {
                        const { warning, message } = getInfoAboutReplyVisibility(
                          hasToken,
                          isActiveEntityFromFamily,
                          feedItem.about_info,
                          isClubFeed,
                        );
                        return (
                          <PostReplyForm about={feedItem.id} inputRef={(ref) => (this.replyForm = ref)}>
                            <ReplyClubInfo warning={warning}>{message}</ReplyClubInfo>
                          </PostReplyForm>
                        );
                      }}
                    </DoesActiveEntityHasToken>
                  )}
                </IsActiveEntityFromFamily>
              ) : (
                <PostReplyForm about={feedItem.id} inputRef={(ref) => (this.replyForm = ref)}>
                  {isClubFeed && (
                    <ReplyClubInfo>Your message will be displayed here and on the main feed.</ReplyClubInfo>
                  )}
                </PostReplyForm>
              )
            }
          </IfActiveEntity>
        )}
      </React.Fragment>
    );
  };

  static CounterpartyAvatar = styled(LinkedEntityAvatar)`
    width: 16px;
    height: 16px;
    margin-left: 0.325em;
    display: inline-block;
  `;

  getSuffix = (feedItem) => {
    const suffix = {
      post_to: () => {
        const id = feedItem.about;
        const about = feedItem.about_info;
        return (
          <React.Fragment>
            <span>wrote to</span>
            <Card.CounterpartyAvatar id={id} entityInfo={about} />
            <Link to={`/${id}`} style={{ marginLeft: '0.325em' }} className="is-hidden-mobile">
              <b style={{ fontSize: '1rem', fontWeight: '400' }}>{about.name}</b>
            </Link>
          </React.Fragment>
        );
      },
      post_about: () => (
        <React.Fragment>
          <span style={{ display: 'inline-flex' }}>
            wrote about
            <b
              style={{
                marginLeft: '0.325em',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: '300px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              <CollapsableText text={feedItem.about} />
            </b>
          </span>
        </React.Fragment>
      ),
      social: (feedItem) => (
        <span>
          changed its <b>{capitalize(feedItem.label)}</b>
        </span>
      ),
    };

    return suffix[feedItem.type] && suffix[feedItem.type](feedItem);
  };

  onItemVisibilityChange = (isVisible) => {
    if (isVisible) {
      this.setState({ wasShown: true });
    }
  };

  onCloseVerify = () => {
    this.setState({ showVerify: false, verifiableItem: undefined });
  };

  render() {
    const { feedItem } = this.props;
    return (
      <CardBox
        added={this.props.added && this.state.wasShown}
        style={this.props.style}
        club={feedItem.type === 'post_club' ? feedItem.about_info : null}
      >
        {!this.state.wasShown && <ReactVisibilitySensor onChange={this.onItemVisibilityChange} />}
        {this.renderItem()}
      </CardBox>
    );
  }
}

const getInfoAboutReplyVisibility = (hasToken, isActiveEntityFromFamily, club, isClubFeed) => {
  let message = '';
  let warning = false;
  if (!isClubFeed) {
    if (!hasToken) {
      warning = true;
      message = `Your message will be only displayed here. Aquire ${club.name} to display your message in the club.`;
    } else if (club.is721 && !isActiveEntityFromFamily && hasToken) {
      warning = true;
      message = `Your message will not be displayed in the ${club.name} club. Switch avatar.`;
    } else {
      message = `Your message will be displayed in the ${club.name} club and here.`;
    }
  }

  return { warning, message };
};
