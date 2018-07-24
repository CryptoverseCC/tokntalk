import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import timeago from 'timeago.js';
import find from 'lodash/fp/find';

import ercs20, { TokenImage } from './erc20';
import Loader from './Loader';
import Link from './Link';
import { validateParams } from './utils';
import { EntityName, LinkedEntityAvatar, IfActiveEntity, Entity } from './Entity';
import { getRanking, hasValidContext } from './api';
import { GithubIcon, TwitterIcon, InstagramIcon, FacebookIcon, socialColors } from './Icons';

export default class Discover extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Index} />
        <Route exact path={`${match.url}/byToken/:token`} component={decoratedByToken} />
        <Route exact path={`${match.url}/byToken/:token/latest`} component={decoratedLatestPage} />
        <Route exact path={`${match.url}/byToken/:token/social`} component={decoratedSocialPage} />
      </Switch>
    );
  }
}

class Index extends Component {
  renderEntityTokens = (entity) =>
    this.renderTiles(
      entity.tokens.map((asset) => {
        const [network, address] = asset.split(':');
        return find({ network, address })(ercs20);
      }),
    );

  renderOthersTokens = () => this.renderTiles(ercs20);

  renderTiles = (tokens) => {
    const { match } = this.props;
    return (
      <div className="columns is-multiline is-mobile">
        {tokens.map((token) => (
          <TokenTile
            linkTo={`${match.url}/byToken/${token.symbol}`}
            key={token.address}
            token={token}
            className="column is-one-third"
          />
        ))}
      </div>
    );
  };

  render() {
    return (
      <DiscoveryContainer>
        <H1 style={{ margin: '60px 0' }}>Discover</H1>
        <div className="columns is-marginless">
          <div className="column is-8 is-paddingless">
            <H2>Communities</H2>
            <IfActiveEntity
              then={(entityId) => (
                <Entity id={entityId}>
                  {(entity) => (
                    <React.Fragment>
                      <H3 style={{ marginTop: '30px', marginBottom: '15px' }}>Yours</H3>
                      {this.renderEntityTokens(entity)}
                      <H3 style={{ marginTop: '30px', marginBottom: '15px' }}>Others</H3>
                      {this.renderOthersTokens()}
                    </React.Fragment>
                  )}
                </Entity>
              )}
              other={
                <React.Fragment>
                  <H3 style={{ marginTop: '30px', marginBottom: '15px' }}>Others</H3> {this.renderOthersTokens()}
                </React.Fragment>
              }
            />
          </div>
          <div className="column is-3 is-offset-1" />
        </div>
      </DiscoveryContainer>
    );
  }
}

const ByToken = ({ match, token }) => (
  <React.Fragment>
    <Hero
      primaryColor={token.primaryColor}
      secondaryColor={token.secondaryColor}
      className="is-flex"
      style={{ alignItems: 'center' }}
    >
      <DiscoveryContainer style={{ flex: 1 }}>
        <Link to="/discover">
          <Back className="columns is-mobile" style={{ color: token.secondaryColor, opacity: 0.6 }}>
            <div className="column is-1">
              <BackArrow>
                <H2 className="is-pulled-right">←</H2>
              </BackArrow>
            </div>
            <div className="column">
              <H2>Communities</H2>
            </div>
          </Back>
        </Link>
        <div className="columns is-mobile">
          <div className="column is-1">
            <TokenImage token={token} className="is-pulled-right" />
          </div>
          <div className="column">
            <H1>{token.name}</H1>
          </div>
        </div>
      </DiscoveryContainer>
    </Hero>
    <DiscoveryContainer>
      <div className="columns">
        <div className="column is-8">
          <FlatContainer>
            <H3>Active members</H3>
            <Link to={`${match.url}/latest`}>
              <SeeMore style={{ marginBottom: '15px' }}>
                See more <SeeMoreArrow />
              </SeeMore>
            </Link>
            <Latest asset={`${token.network}:${token.address}`} />
          </FlatContainer>
        </div>
        <div className="column is-3 is-offset-1">
          <FlatContainer>
            <H3>In social</H3>
            <Link to={`${match.url}/social`}>
              <SeeMore style={{ marginBottom: '15px' }}>
                See more <SeeMoreArrow />
              </SeeMore>
            </Link>
            <Social asset={`${token.network}:${token.address}`} social="github" />
            <Social asset={`${token.network}:${token.address}`} social="twitter" />
            <Social asset={`${token.network}:${token.address}`} social="instagram" />
            <Social asset={`${token.network}:${token.address}`} social="facebook" />
          </FlatContainer>
        </div>
      </div>
    </DiscoveryContainer>
  </React.Fragment>
);

const Hero = styled.div`
  background: ${({ primaryColor }) => primaryColor};
  color: ${({ secondaryColor }) => secondaryColor};
  height: 15rem;

  @media (max-width: 770px) {
    height: 7.5rem;
  }
`;

const Back = Link.withComponent('div');

const BackArrow = styled.div`
  transition: transform 0.3s;

  ${Back}:hover & {
    transform: translateX(-3px);
  }
`;

const SeeMore = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  color: #264dd9;
`;

const SeeMoreArrow = styled.div.attrs({ children: '→' })`
  display: inline-block;
  transition: transform 0.3s;

  ${SeeMore}:hover & {
    transform: translateX(3px);
  }
`;

const Latest = ({ asset }) => (
  <List flow={authorsFlow(asset)} className="columns is-multiline">
    {(items) =>
      items
        .filter(hasValidContext)
        .slice(0, 9)
        .map(({ context, created_at }) => (
          <EntityContainer key={context} to={`/${context}`} className="column is-one-third">
            <LinkedEntityAvatar id={context} size="medium" />
            <EntityInfo>
              <Link
                to={`/${context}`}
                style={{ fontSize: '18px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              >
                <EntityName id={context} />
              </Link>
              <Timeago>{timeago().format(created_at)}</Timeago>
            </EntityInfo>
          </EntityContainer>
        ))
    }
  </List>
);

const LatestPage = ({ token }) => <Latest asset={`${token.network}:${token.address}`} />;

const socialFlow = (asset, type) => [
  {
    algorithm: 'experimental_social_profiles',
    params: { type },
  },
  {
    algorithm: 'experimental_author_balance',
    params: { asset },
  },
];

const socialIcons = {
  github: (props) => <GithubIcon color={socialColors.github} {...props} />,
  twitter: (props) => <TwitterIcon color={socialColors.twitter} {...props} />,
  instagram: (props) => <InstagramIcon color={socialColors.instagram} {...props} />,
  facebook: (props) => <FacebookIcon color={socialColors.facebook} {...props} />,
};

const Social = ({ asset, social, ...restProps }) => {
  const Icon = socialIcons[social];

  return (
    <React.Fragment>
      <SocialHeader style={{ marginBottom: '15px' }}>
        <Icon style={{ width: '16px', height: '16px', marginRight: '10px' }} />
        {social}
      </SocialHeader>
      <List flow={socialFlow(asset, social)} className="columns is-multiline">
        {(items) =>
          items.filter(hasValidContext).map(({ context, target }) => (
            <EntityContainer key={context} className="column is-12">
              <LinkedEntityAvatar id={context} size="medium" />
              <EntityInfo>
                <EntityName id={context} />
                <SocialLink social={social} target={target} />
              </EntityInfo>
            </EntityContainer>
          ))
        }
      </List>
    </React.Fragment>
  );
};
const SocialHeader = styled.p`
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 600;
`;

const SocialLink = ({ target, social }) => {
  let username = target;
  const result = /\/([^\/]+)(\/?)$/.exec(target);
  if (result && result[1]) {
    username = result[1];
  }

  return (
    <a href={target} target="_blank">
      {username}
    </a>
  );
};

const SocialPage = ({ token, match }) => (
  <DiscoveryContainer>
    <Social asset={`${token.network}:${token.address}`} social="github" />
    <Social asset={`${token.network}:${token.address}`} social="twitter" />
    <Social asset={`${token.network}:${token.address}`} social="instagram" />
    <Social asset={`${token.network}:${token.address}`} social="facebook" />
  </DiscoveryContainer>
);

const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  if (token.indexOf(':') !== -1) {
    const [network, address] = token.split(':');
    return !!find({ network, address })(ercs20);
  }

  return !!find({ symbol: token })(ercs20);
};

const validateTokenParam = validateParams(
  {
    token: isTokenValid,
  },
  '/404',
);

const mapTokenUrlParam = (Cmp) => (props) => {
  const { token } = props.match.params;

  let erc20Token;
  if (token.indexOf(':') === -1) {
    erc20Token = find({ symbol: token })(ercs20);
  } else {
    const [network, address] = token.split(':');
    erc20Token = find({ network, address })(ercs20);
  }

  return <Cmp token={erc20Token} {...props} />;
};

const authorsFlow = (asset) => [
  {
    algorithm: 'experimental_latest_purrers',
  },
  {
    algorithm: 'experimental_author_balance',
    params: { asset },
  },
];

const decoratedByToken = validateTokenParam(mapTokenUrlParam(ByToken));
const decoratedLatestPage = validateTokenParam(mapTokenUrlParam(LatestPage));
const decoratedSocialPage = validateTokenParam(mapTokenUrlParam(SocialPage));

class List extends Component {
  state = {
    items: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchRanking();
  }

  fetchRanking = async () => {
    const { flow } = this.props;
    try {
      this.setState({ loading: true });
      const { items } = await getRanking(flow);
      this.setState({ loading: false, items });
    } catch (e) {
      console.warn(e);
      this.setState({ loading: false });
    }
  };

  render() {
    const { children, ...restProps } = this.props;
    const { loading, items } = this.state;

    return <div {...restProps}>{loading ? <Loader /> : children(items)}</div>;
  }
}

const TokenTile = ({ linkTo, token, ...restProps }) => {
  return (
    <Link to={linkTo} {...restProps}>
      <TokenTileCotainer
        primaryColor={token.primaryColor}
        secondaryColor={token.secondaryColor}
        coverImage={token.coverImage}
        shadowColor={token.shadowColor}
      >
        <TokenTileWrapper>
          <TokenImage token={token} style={{ width: '40px', height: '40px' }} />
          <div>
            <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{token.symbol}</p>
            <H3>{token.name}</H3>
          </div>
        </TokenTileWrapper>
      </TokenTileCotainer>
    </Link>
  );
};

const TokenTileCotainer = styled.div`
  background-color: ${({ primaryColor }) => primaryColor};
  background-image: url(${({ coverImage }) => coverImage});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: ${({ secondaryColor }) => secondaryColor};
  box-shadow: 0 3rem 5rem -2rem ${({ shadowColor }) => shadowColor};
  cursor: pointer;
  position: relative;
  width: 100%;
  padding-top: 102%;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s;

  :hover {
    transform: translateY(-3px);
  }
`;

const TokenTileWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
`;

const FlatContainer = styled.div`
  border-radius: 12px;
  padding: 30px;
  background-color: #f8f9fd;
`;

const H1 = styled.p`
  font-size: 46px;
  font-weight: bold;
`;

const H2 = styled.p`
  font-size: 28px;
  font-weight: 600;
`;

const H3 = styled.p`
  font-size: 21px;
  font-weight: 600;
`;

const DiscoveryContainer = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

const EntityContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EntityInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  overflow: hidden;
`;

const Timeago = styled.p`
  color: rgb(146, 143, 155);
`;
