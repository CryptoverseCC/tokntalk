import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import timeago from 'timeago.js';
import find from 'lodash/fp/find';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import ercs20 from './erc20';
import Loader from './Loader';
import { validateParams } from './utils';
import { EntityName, EntityAvatar } from './Entity';
import { getRanking, hasValidContext } from './api';

const DiscoveryContainer = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

export default class Discover extends Component {
  render() {
    const { match } = this.props;

    return (
      <DiscoveryContainer>
        <Switch>
          <Route exact path={`${match.url}/`} component={Index} />
          <Route exact path={`${match.url}/byToken/:token`} component={decoratedByToken} />
          <Route exact path={`${match.url}/byToken/:token/latest`} component={decoratedLatestPage} />
          <Route exact path={`${match.url}/byToken/:token/social/:social`} component={decoratedSocialPage} />
        </Switch>
      </DiscoveryContainer>
    );
  }
}

class Index extends Component {
  tokens = ercs20.map(({ network, address, name, symbol }) => ({
    label: `${name} (${symbol})`,
    value: `${network}:${address}`,
  }));

  onSelect = ({ value }) => {
    const { history, match } = this.props;
    history.push(`${match.url}/byToken/${value}`);
  };

  render() {
    return (
      <div>
        <h2>Discover tokens</h2>
        <Select onChange={this.onSelect} options={this.tokens} placeholder="Select token" />
      </div>
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
