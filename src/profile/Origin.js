import React, { Component } from 'react';
import styled from 'styled-components';

import AppContext from '../Context';
import { niceScroll } from '../cssUtils';
import Loader from '../Loader';

const IFrame = styled.iframe`
  width: 100%;
  height: calc(100vh - 190px);
  ${niceScroll};
`;

const Container = styled.div`
  position: relative;
`;

const OverlayLoader = styled(Loader)`
  position: absolute;
  top: 30%;
  left: 30%;
`;

export default class Origin extends Component {
  state = {
    loading: true,
  };

  loaded() {
    this.setState({ loading: false });
  }

  render() {
    const { entity } = this.props;
    return (
      <React.Fragment>
        <Container>
          <AppContext.Consumer>
            {({ entityStore: { entityInfo } }) => <IFrame src={entity.external_link} onLoad={this.loaded.bind(this)} />}
          </AppContext.Consumer>
          {this.state.loading && <OverlayLoader />}
        </Container>
      </React.Fragment>
    );
  }
}
