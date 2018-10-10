import React, { Component } from 'react';
import styled from 'styled-components';

import TranslationsContext from './Translations';
import { FlatContainer, H3 } from './Components';

import openseaImg from './img/announcements/opensea.png';

const ANNOUNCEMENTS = [
  {
    id: 'OpenSea',
    title: 'OpenSea Integration - Buy NFTs from club page.',
    content: (
      <div>
        <H3>OpenSea Integration</H3>
        <p>
          We've introduced new way of joining token clubs. Now if you don't have required token to join given NFT club.
          We will show you 3 cheapest items offered on OpenSea marketplace and you'll be able to buy them directly form
          club page.
          <img alt="" src={openseaImg} />
        </p>
      </div>
    ),
  },
];

const STORAGE_KEY = "Tok'n'Talk_announcements";

const Button = styled.button`
  font-family: 'AvenirNext';
  font-weight: 600;
  border: none;
  outline: none;
  color: white;
  background-color: #264dd9;
  font-size: 1rem;
  padding: 0.5em;
  border-radius: 12px;
  cursor: pointer;

  @media (max-width: 770px) {
    padding: 0.1em 0.5rem 0.1em 0.5rem;
  }
`;

const Dismiss = styled(Button)`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

const ShowMore = styled(Button)`
  position: absolute;
  right: 90px;
  bottom: 5px;

  @media (max-width: 770px) {
    right: 80px;
  }
`;

const Container = styled(FlatContainer)`
  display: ${({ dismissed }) => (dismissed ? 'none' : 'block')};
  width: 100%;
  max-width: 100%;
  margin-bottom: 10px;
  position: relative;
  padding-bottom: 30px;
`;

function getInitialState() {
  // Upgrade preexisting values
  const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  return typeof value === 'object'
    ? value
    : value === 1
      ? localStorage.setItem(STORAGE_KEY, JSON.stringify(['OpenSea'])) || ['OpenSea']
      : localStorage.setItem(STORAGE_KEY, JSON.stringify([])) || [];
}

class Announcement extends Component {
  state = {
    open: false,
  };

  onShowMore() {
    this.setState({
      open: true,
    });
  }

  render() {
    const { announcement, onDismiss } = this.props;
    const { open } = this.state;

    return (
      <Container name={announcement.name}>
        {open ? announcement.content : <H3>{announcement.title}</H3>}
        {!open && <ShowMore onClick={this.onShowMore.bind(this)}>Show more</ShowMore>}
        <Dismiss onClick={onDismiss}>Dismiss</Dismiss>
      </Container>
    );
  }
}

export default class Announcements extends Component {
  state = {
    dismissed: getInitialState(),
  };

  dismiss = (value) => {
    this.setState(
      {
        dismissed: this.state.dismissed.concat([value]),
      },
      () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.dismissed));
      },
    );
  };

  render() {
    const { dismissed } = this.state;

    return (
      <React.Fragment>
        {ANNOUNCEMENTS.map(
          (announcement, index) =>
            dismissed.includes(announcement.id) ? null : (
              <Announcement key={index} announcement={announcement} onDismiss={() => this.dismiss(announcement.id)} />
            ),
        )}
      </React.Fragment>
    );
  }
}
