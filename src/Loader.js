import React from 'react';
import styled from 'styled-components';

const Block = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background: #623cea;
  animation: blockAnimation 1s linear infinite;
  border-radius: 6px;
  will-change: transform;

  @keyframes blockAnimation {
    25% {
      transform: translateY(9px) rotate(22.5deg);
    }
    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    }
    75% {
      transform: translateY(9px) rotate(67.5deg);
    }
    100% {
      transform: translateY(0) rotate(90deg);
    }
  }
`;

const Shadow = styled.div`
  width: 100px;
  height: 10px;
  background: #e9ebff;
  opacity: 1;
  position: absolute;
  bottom: -30px;
  left: 0px;
  border-radius: 50%;
  animation: shadowAnimation 1s linear infinite;
  will-change: transform;
  z-index: 2;

  @keyframes shadowAnimation {
    50% {
      transform: scale(1.2, 1);
    }
  }
`;

const Bottom = styled.div`
  height: 10px;
  background-color: inherit;
  width: 100px;
  display: block;
  position: absolute;
  z-index: 1;
  bottom: -40px;
`;

const LonelyBlock = styled.div`
  position: relative;
  background-color: inherit;
`;

const Loader = ({ className, style }) => (
  <LonelyBlock className={className} style={style}>
    <Block />
    <Shadow />
    <Bottom />
  </LonelyBlock>
);

export default Loader;