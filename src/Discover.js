import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import timeago from 'timeago.js';
import find from 'lodash/fp/find';

import ercs20, { TokenImage } from './erc20';
import Loader from './Loader';
import { validateParams } from './utils';
import { EntityName, EntityAvatar, IfActiveEntity, Entity } from './Entity';
import { getRanking, hasValidContext } from './api';

export default class Discover extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Index} />
        <Route exact path={`${match.url}/byToken/:token`} component={decoratedByToken} />
        <Route exact path={`${match.url}/byToken/:token/latest`} component={decoratedLatestPage} />
        <Route exact path={`${match.url}/byToken/:token/social/:social`} component={decoratedSocialPage} />
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
            className="column is-one-quarter"
          />
        ))}
      </div>
    );
  };

  render() {
    return (
      <DiscoveryContainer>
        <H1 style={{ margin: '60px 0' }}>Discovery</H1>
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
  <div className="columns">
    <Latest
      className="column"
      asset={`${token.network}:${token.address}`}
      header={<Link to={`${match.url}/latest`}>Latest authors</Link>}
    />
    <div className="column">
      <Social
        asset={`${token.network}:${token.address}`}
        social="github"
        header={<Link to={`${match.url}/social/github`}>Authors with github</Link>}
      />
      <Social
        asset={`${token.network}:${token.address}`}
        social="twitter"
        header={<Link to={`${match.url}/social/twitter`}>Authors with twitter</Link>}
      />
      <Social
        asset={`${token.network}:${token.address}`}
        social="instagram"
        header={<Link to={`${match.url}/social/instagram`}>Authors with instagram</Link>}
      />
      <Social
        asset={`${token.network}:${token.address}`}
        social="facebook"
        header={<Link to={`${match.url}/social/facebook`}>Authors with facebook</Link>}
      />
    </div>
  </div>
);

const Latest = ({ asset, ...restProps }) => (
  <List flow={authorsFlow(asset)} {...restProps}>
    {(items) =>
      items.filter(hasValidContext).map(({ context, created_at }) => (
        <AuthorContainer key={context} to={`/${context}`}>
          <React.Fragment>
            <EntityAvatar id={context} size="medium" />
            <AuthorInfo>
              <EntityName id={context} />
              <Timeago>{timeago().format(created_at)}</Timeago>
            </AuthorInfo>
          </React.Fragment>
        </AuthorContainer>
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

const Social = ({ asset, social, ...restProps }) => (
  <List flow={socialFlow(asset, social)} {...restProps}>
    {(items) =>
      items.filter(hasValidContext).map(({ context, target }) => (
        <React.Fragment key={context}>
          <AuthorContainer to={`/${context}`}>
            <EntityAvatar id={context} size="medium" />
            <AuthorInfo>
              <EntityName id={context} />
            </AuthorInfo>
          </AuthorContainer>
          <a href={target} target="_blank">
            {target}
          </a>
        </React.Fragment>
      ))
    }
  </List>
);

const SocialPage = ({ token, match }) => (
  <Social asset={`${token.network}:${token.address}`} social={match.params.social} />
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
const decoratedSocialPage = validateParams(
  {
    token: isTokenValid,
    social: (social) => ['facebook', 'github', 'twitter', 'instagram'].indexOf(social) !== -1,
  },
  '/404',
)(mapTokenUrlParam(SocialPage));

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
    const { header, children, ...restProps } = this.props;
    const { loading, items } = this.state;

    return (
      <div {...restProps}>
        {header}
        {loading ? <Loader /> : children(items)}
      </div>
    );
  }
}

const TokenTile = ({ linkTo, token, ...restProps }) => {
  return (
    <Link to={linkTo} {...restProps}>
      <TokenTileCotainer primaryColor={token.primaryColor} secondaryColor={token.secondaryColor}>
        <TokenTileWrapper>
          <TokenImage token={token} style={{ width: '40px', height: '40px' }} />
          <H3>{token.name}</H3>
        </TokenTileWrapper>
      </TokenTileCotainer>
    </Link>
  );
};

const TokenTileCotainer = styled.div`
  background: ${({ primaryColor }) => primaryColor};
  color: ${({ secondaryColor }) => secondaryColor}
  box-shadow: 0 15px 27px 0 rgba(98, 60, 234, 0.06);
  cursor: pointer;
  position: relative;
  width: 100%;
  padding-top: 100%;
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
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const AuthorContainer = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Timeago = styled.p`
  color: rgb(146, 143, 155);
`;
