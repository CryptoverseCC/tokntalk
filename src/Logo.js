import React from 'react';
import styled, { keyframes } from 'styled-components';

const dot = keyframes`
  0% {opacity:1; transform:scale(1);}
  50% {opacity:0.8; transform:scale(1.5);}
  100% {opacity:1; transform:scale(1);}
`;

const rainbow = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;

const white = keyframes`
  0% {transform:scaleX(1.1) scaleY(1.2);}
  20% {transform:scaleX(1.18) scaleY(1.2)}
  80% {transform:scaleX(1.16) scaleY(1.14)}
  100% {transform:scaleX(1.1) scaleY(1.2);}
`;

const Eye = styled.div`
  box-sizing: content-box;
  display: inline-block;
  background-color: white;
  border: 2px solid #4001e4;
  width: 30px;
  height: 30px;
  position: relative;
  border-radius: 30px;
  cursor: pointer;
  @media (max-width: 770px) {
    transform: scale(0.75);
  }
`;

const Inside = styled.div`
  width: 26px;
  height: 26px;
  margin-left: 2px;
  margin-top: 2px;
  background-color: #264dd9;
  display: block;
  position: absolute;
  border-radius: 16px;
  background: linear-gradient(270deg, #4001e4, #d026d9, #d92626, #d3d711, #03d038, #00dbff, #4001e4);
  background-size: 1400% 1400%;

  ${Eye}:hover & {
    animation: ${rainbow} 2s ease infinite;
  }
  @media (max-width: 770px) {
    ${Eye}:hover & {
      animation: none;
    }
  }
`;

const Dot = styled.div`
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 3px;
  background-color: white;
  position: absolute;
  z-index: 1;
  right: 4px;
  bottom: 4px;

  ${Eye}:hover & {
    animation: ${dot} 0.4s 0.15s infinite;
  }
  @media (max-width: 770px) {
    ${Eye}:hover & {
      animation: none;
    }
  }
`;

const White = styled.div`
  display: block;
  transform-origin: left top;
  width: 16px;
  height: 16px;
  border-radius: 15px;
  background-color: white;
  position: absolute;
  left: 3px;
  top: 3px;
  transition: all 0.2s ease;

  ${Eye}:hover & {
    transform: scale(1.1);
    transition: all 0.15s ease-in;
    animation: ${white} 0.2s 0.15s infinite;
  }
  @media (max-width: 770px) {
    ${Eye}:hover & {
      transform: none;
      animation: none;
    }
  }
`;

const Logo = () => (
  <Eye>
    <Inside>
      <Dot />
      <White />
    </Inside>
  </Eye>
);

export default Logo;
