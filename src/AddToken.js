import React, { Component } from 'react';
import styled from 'styled-components';
import { AddIcon } from './Icons';
import { H3 } from './Components';

const { NODE_ENV, REACT_APP_INTERCOM_APP_ID } = process.env;

const IntercomIconContainer = styled.a`
  background-color: #ecf1f9;
  padding: 15px;
  height: 100%;
  border-radius: 12px;
  transition: all 0.15s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  :hover {
    background-color: white;
    box-shadow: 0 3rem 5rem -2rem rgba(27, 36, 55, 0.15);
    transition: all 0.15s ease;
    transform: translateY(-3px);
  }
`;

export default class AddToken extends Component {
  state = {
    IntercomComponent: null,
  };

  componentDidMount() {
    if (NODE_ENV === 'production' && REACT_APP_INTERCOM_APP_ID) {
      import('react-intercom')
        .then((intercomModule) => this.setState({ IntercomComponent: intercomModule.default }))
        .catch((e) => {
          console.error(e);
        });
    }
  }

  render() {
    const { className } = this.props;
    const { IntercomComponent } = this.state;
    if (!IntercomComponent) {
      return null;
    }

    return (
      <div className={className}>
        <IntercomIconContainer
          id="userfeeds-crypto-intercom"
          href={`mailto:${REACT_APP_INTERCOM_APP_ID}@intercom-mail.com`}
          style={{ alignSelf: 'center' }}
        >
          <div>
            <AddIcon
              style={{
                display: 'block',
                width: '32px',
                height: '32px',
                margin: '0px auto 15px auto',
              }}
            />
            <H3 style={{ textAlign: 'center' }}>Add your community</H3>
            <p style={{ textAlign: 'center', color: '#928f9b' }}>ERC20 and ERC721 supported</p>
          </div>
        </IntercomIconContainer>
        <IntercomComponent
          appID={REACT_APP_INTERCOM_APP_ID}
          custom_launcher_selector="#userfeeds-crypto-intercom"
          hide_default_launcher={true}
        />
      </div>
    );
  }
}
