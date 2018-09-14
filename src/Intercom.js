import React, { Component } from 'react';
import styled from 'styled-components';

const { NODE_ENV, REACT_APP_INTERCOM_APP_ID } = process.env;

const IntercomIcon = styled((props) => (
  <svg viewBox="0 0 102 116" version="1.1" {...props}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M13,0 L89,0 C96.1797017,-1.31888981e-15 102,5.82029825 102,13 L102,115.831055 L70.9365234,102 L13,102 C5.82029825,102 -4.44981064e-15,96.1797017 -5.32907052e-15,89 L-1.77635684e-15,13 C-2.65561672e-15,5.82029825 5.82029825,1.31888981e-15 13,0 Z M15.2959597,75.8292749 C23.639343,83.6014595 35.4595688,87.4492188 50.6357422,87.4492188 C65.8119156,87.4492188 77.6321413,83.6014595 85.9755247,75.8292749 C86.9858053,74.8881594 87.0418747,73.3062403 86.1007592,72.2959597 C85.1596437,71.285679 83.5777246,71.2296096 82.567444,72.1707251 C75.2389524,78.9974988 64.6353501,82.4492188 50.6357422,82.4492188 C36.6361343,82.4492188 26.032532,78.9974988 18.7040403,72.1707251 C17.6937597,71.2296096 16.1118406,71.285679 15.1707251,72.2959597 C14.2296096,73.3062403 14.285679,74.8881594 15.2959597,75.8292749 Z"
        fill="#FFFFFF"
      />
    </g>
  </svg>
))`
  width: 25px;
  height: 25px;

  @media (max-width: 770px) {
    width: 18px;
    height: 18px;
  }
`;

const IntercomIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0, 113, 178);
  border: 2px solid #0071b2;
  border-radius: 100%;
  width: 40px;
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
    // if (NODE_ENV === 'production' && REACT_APP_INTERCOM_APP_ID) {
    import('react-intercom')
      .then((intercomModule) => this.setState({ IntercomComponent: intercomModule.default }))
      .catch(() => {});
    // }
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

const DefaultIntercom = () => (
  <Intercom>
    <IntercomIconContainer>
      <IntercomIcon />
    </IntercomIconContainer>
  </Intercom>
);

export default DefaultIntercom;
