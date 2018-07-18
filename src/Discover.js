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
          <Route exact path={`${match.url}/byToken/:token`} component={ByTokenWithValidParams} />
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

class ByToken extends Component {
  constructor(props) {
    super(props);
    const { token } = this.props.match.params;

    let asset = token;
    if (token.indexOf(':') === -1) {
      const erc20 = find({ symbol: token })(ercs20);
      asset = `${erc20.network}:${erc20.address}`;
    }

    this.state = {
      asset,
      loading: false,
      authors: [],
    };
  }

  componentDidMount() {
    this.fetchLatestAuthors();
  }

  fetchLatestAuthors = async () => {
    const { asset } = this.state;
    try {
      this.setState({ loading: true });
      const { items } = await getRanking([
        {
          algorithm: 'experimental_latest_purrers',
        },
        {
          algorithm: 'experimental_author_balance',
          params: {
            asset,
          },
        },
      ]);

      const authors = items.filter(hasValidContext);
      this.setState({ authors, loading: false });
    } catch (e) {
      this.setState({ loading: false });
    }
  };

  renderAuthor = ({ context, created_at: createdAt }) => (
    <AuthorContainer key={context} to={`/${context}`}>
      <EntityAvatar id={context} size="medium" />
      <AuthorInfo>
        <EntityName id={context} />
        <Timeago>{timeago().format(createdAt)}</Timeago>
      </AuthorInfo>
    </AuthorContainer>
  );

  render() {
    const { loading, authors } = this.state;

    return (
      <div>
        <h2>Latest authors</h2>
        {loading && <Loader />}
        {authors.map(this.renderAuthor)}
      </div>
    );
  }
}

const ByTokenWithValidParams = validateParams(
  {
    token: (token) => {
      if (!token) {
        return false;
      }

      if (token.indexOf(':') !== -1) {
        const [network, address] = token.split(':');
        return !!find({ network, address })(ercs20);
      }

      return !!find({ symbol: token })(ercs20);
    },
  },
  '/404',
)(ByToken);

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
