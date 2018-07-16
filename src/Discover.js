import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import timeago from 'timeago.js';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Loader from './Loader';
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
          <Route exact path={`${match.url}/byToken/:token`} component={ByToken} />
        </Switch>
      </DiscoveryContainer>
    );
  }
}

class Index extends Component {
  tokens = [{ label: 'Avocado (AVO)', value: 'ethereum:0xfa6f7881e52fdf912c4a285d78a3141b089ce859' }];

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
  state = {
    loading: false,
    authors: [],
  };

  componentDidMount() {
    this.fetchLatestAuthors();
  }

  fetchLatestAuthors = async () => {
    try {
      this.setState({ loading: true });
      const asset = this.props.match.params.token;
      const items = await getRanking([
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
