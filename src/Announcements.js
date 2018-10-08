import React, { Component } from 'react';
import styled from 'styled-components';

import TranslationsContext from './Translations';
import { FlatContainer, H3 } from './Components';

import openseaImg from './img/announcements/opensea.png';

const ANNOUNCEMENTS = [
  {
    name: 'OpenSea',
    content: (
      <div>
        <H3>Announcement: OpenSea Integration</H3>
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

const Dismiss = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;

  margin-top: 15px;
  font-family: 'AvenirNext';
  font-weight: 600;
  border: none;
  outline: none;
  color: white;
  background-color: #264dd9;
  font-size: 1rem;
  padding: 1em 0.75rem 0.75em 0.75rem;
  border-radius: 12px;
  cursor: pointer;
`;

const Container = styled(FlatContainer)`
  display: ${({ dismissed }) => (dismissed ? 'none' : 'block')};
  width: 100%;
  max-width: 100%;
  margin-bottom: 10px;
  position: relative;
`;

export default class Announcement extends Component {
  state = {
    dismissed: localStorage.getItem(STORAGE_KEY) | 0,
  };

  dismiss = (value) => {
    this.setState(
      {
        dismissed: value,
      },
      () => {
        localStorage.setItem(STORAGE_KEY, value);
      },
    );
  };

  render() {
    return (
      <React.Fragment>
        {ANNOUNCEMENTS.map((announcement, number) => {
          const index = ANNOUNCEMENTS.length - number;
          return (
            <Container key={index} name={announcement.name} dismissed={index <= this.state.dismissed}>
              {announcement.content}
              <Dismiss onClick={() => this.dismiss(index)}>Dismiss</Dismiss>
            </Container>
          );
        })}
      </React.Fragment>
    );
  }
}
