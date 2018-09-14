import React, { Component } from 'react';
import { H4 } from './Components';
import styled from 'styled-components';

const { NODE_ENV, REACT_APP_INTERCOM_APP_ID } = process.env;

const IntercomIcon = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 8px;
`;

const IntercomIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #264dd9;
  border-radius: 8px
  width: 100%;
  height: 50px;
  transition: all 0.2s cubic-bezier(0.5, 0, 0.1, 1), left 0s linear;
  box-shadow: 0 1.2rem 3rem -0.8rem rgba(132, 128, 173, 0.2);

  :hover {
    box-shadow: 0 1.2rem 4rem -0.8rem rgba(132, 128, 173, 0.25);
    transform: translateY(-2px);
    transition: all 0.2s cubic-bezier(0.5, 0, 0.1, 1), left 0s linear;
  }
`;

export class Intercom extends Component {
  state = {
    IntercomComponent: null,
  };

  componentDidMount() {
    if (NODE_ENV === 'production' && REACT_APP_INTERCOM_APP_ID) {
      import('react-intercom')
        .then((intercomModule) => this.setState({ IntercomComponent: intercomModule.default }))
        .catch(() => {});
    }
  }

  render() {
    const { children, ...restProps } = this.props;
    const { IntercomComponent } = this.state;
    if (!IntercomComponent) {
      return children;
    }

    return (
      <React.Fragment>
        <IntercomComponent
          appID={REACT_APP_INTERCOM_APP_ID}
          custom_launcher_selector="#userfeeds-crypto-intercom"
          hide_default_launcher={true}
        />
        <a
          id="userfeeds-crypto-intercom"
          href={`mailto:${REACT_APP_INTERCOM_APP_ID}@intercom-mail.com`}
          style={{ alignSelf: 'center' }}
          {...restProps}
        >
          {children}
        </a>
      </React.Fragment>
    );
  }
}

const InvestorsContainer = styled.div`
  margin-bottom: 1rem;
  background-color: #ecf1f9;
  position: relative;
  padding: 30px;
  border-radius: 12px;
  @media (max-width: 770px) {
    width: 96%;
    margin-left: 2%;
  }
`;

const DefaultIntercom = () => (
  <Intercom>
    <InvestorsContainer>
      <H4 style={{ marginBottom: '15px' }}>We're looking for investors.</H4>
      <IntercomIconContainer>
        <IntercomIcon>
          <p style={{ textAlign: 'center', paddingTop: '14px', fontWeight: '600', color: 'white' }}>Contact us</p>
        </IntercomIcon>
      </IntercomIconContainer>
    </InvestorsContainer>
  </Intercom>
);

export default DefaultIntercom;
