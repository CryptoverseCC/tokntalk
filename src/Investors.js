import React, { Component } from 'react';
import { H4 } from './Components';
import styled from 'styled-components';

const { NODE_ENV, REACT_APP_INTERCOM_APP_ID } = process.env;

const IntercomIcon = styled((props) => (
  <svg viewBox="0 0 100 100" version="1.1" {...props}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <text x="-50" y="60" fill="white" font-size="35" font-weight="bold">
        Get in touch
      </text>
    </g>
  </svg>
))`
  width: 200px;
  height: 50px;
`;

const IntercomIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: left;
  align-items: center;
  background: rgb(0, 113, 178);
  border: 2px solid #0071b2;
  border-radius: 5%;
  width: 200px;
  height: 40px;
  margin-left: 10px;

  :hover {
    box-shadow: 0 3px 32px 0 rgba(0, 0, 0, 0.14);
  }

  @media (max-width: 770px) {
    width: 35px;
    height: 35px;
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
        <IntercomIcon />
      </IntercomIconContainer>
    </InvestorsContainer>
  </Intercom>
);

export default DefaultIntercom;
