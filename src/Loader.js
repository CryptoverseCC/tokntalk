import React from 'react';
import styled, { keyframes } from 'styled-components';

const time = '1s';

const mediumShaky = keyframes`
  0% {
    transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px);
  }

  12% {
    transform: scaleX(1) scaleY(1) translateX(3px) translateY(3px);
  }

  25% {
    transform: scaleX(1) scaleY(1) translateX(6px) translateY(3px);
  }

  37% {
    transform: scaleX(1) scaleY(1) translateX(9px) translateY(0px);
  }

  50% {
    transform: scaleX(1) scaleY(1) translateX(9px) translateY(-3px);
  }

  62% {
    transform: scaleX(1) scaleY(1) translateX(6px) translateY(-6px);
  }

  75% {
    transform: scaleX(1) scaleY(1) translateX(3px) translateY(-6px);
  }

  87% {
    transform: scaleX(1) scaleY(1) translateX(0px) translateY(-3px);
  }

  100% {
    transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px);
  }
 `;

const smallShaky = keyframes`
  0% {
    transform: scale(0.8) translateX(0px) translateY(0px);
  }
    
  33% {
    transform: scale(1) translateX(-2px) translateY(1px);
  }

  100% {
    transform: scale(0.8) translateX(0px) translateY(0px);
  }
`;

const mouth = keyframes`
  0% {
    transform: scaleY(1) scaleX(1);
  }
  
  75% {
    transform: scaleY(1.15) scaleX(1.05);
  }

  100% {
    transform: scaleY(1) scaleX(1);
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f8f9fd;
  border-radius: 20px;
  width: 200px;
  height: 150px;
`;

const Eyes = styled.div`
  align-self: center;
  height: 35px;
  display: flex;
  width: 100%;
  max-width: 150px;
`;

const Eye = styled.div`
  background-color: black;
  width: 35px;
  height: 35px;
  position: relative;
  border-radius: 30px;
`;

const SmallDot = styled.div`
  display: block;
  position: absolute;
  background-color: white;
  border-radius: 20px;
  right: 6px;
  bottom: 6px;
  width: 10px;
  height: 10px;
  animation: ${smallShaky} ${time} ease infinite;
`;

const MediumDot = styled.div`
  display: block;
  position: absolute;
  background-color: white;
  border-radius: 20px;
  left: 2px;
  top: 8px;
  width: 20px;
  height: 20px;
  animation: ${mediumShaky} ${time} ease infinite;
`;

const Mouth = styled.div`
  align-self: center;
  background-color: black;
  width: 30px;
  height: 20px;
  border-radius: 5px 5px 20px 20px;
  animation: ${mouth} ${time} infinite;
`;

const LoaderCmp = (props) => (
  <Container {...props}>
    <Eyes>
      <Eye>
        <SmallDot />
        <MediumDot />
      </Eye>
      <Eye style={{ marginLeft: 'auto' }}>
        <SmallDot />
        <MediumDot />
      </Eye>
    </Eyes>
    <Mouth />
  </Container>
);

export default LoaderCmp;
