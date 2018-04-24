import React from 'react';
import styled from 'styled-components';

const Letter = styled.svg`
  position: absolute;
  top: 64%;
  left: 56%;
  transform: translate(-50%, -50%);
`;

const Ear = styled.svg`
  position: absolute;
  top: -3px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.2s ease;
  z-index: 1;
`;

const EarRight = styled(Ear)`
  right: 0px;
`;

const EarLeft = styled(Ear)`
  left: 0px;
`;

const Logo = styled.div.attrs({
  children: (
    <React.Fragment>
      <Letter
        width="25px"
        height="34px"
        viewBox="0 0 25 34"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g transform="translate(-328.000000, -617.000000)">
          <g transform="translate(314.000000, 567.000000)" fill="#FFFFFF">
            <g transform="translate(0.000000, 39.000000)">
              <path d="M14.3,44.5741577 L14.3,12.7687097 C14.3,12.415052 14.4112211,12.1337376 14.6336667,11.9247581 C14.8561122,11.7157785 15.1262206,11.6112903 15.444,11.6112903 L19.2573333,11.6112903 C19.6068906,11.6112903 19.8928878,11.7238161 20.1153333,11.948871 C20.3377789,12.1739259 20.449,12.4472027 20.449,12.7687097 L20.449,14.6977419 C22.1332306,12.3185903 24.6595387,11.1290323 28.028,11.1290323 C31.2375716,11.1290323 33.7003248,12.1498016 35.4163333,14.191371 C37.1323419,16.2329403 38.0538883,18.9737462 38.181,22.413871 C38.2127779,22.7996793 38.2286667,23.3783832 38.2286667,24.15 C38.2286667,24.9216168 38.2127779,25.5003207 38.181,25.886129 C38.0856662,29.2619524 37.1720642,31.9866832 35.4401667,34.0604032 C33.7082691,36.1341233 31.2375716,37.1709677 28.028,37.1709677 C24.8502063,37.1709677 22.4192306,36.0296351 20.735,33.7469355 L20.735,44.5741577 L14.3,44.5741577 Z M31.6506667,25.5967742 C31.6824446,25.2752672 31.6983333,24.793014 31.6983333,24.15 C31.6983333,23.506986 31.6824446,23.0247328 31.6506667,22.7032258 C31.4282211,18.4593336 29.6169059,16.3374194 26.2166667,16.3374194 C24.4053243,16.3374194 23.0547822,16.9321984 22.165,18.1217742 C21.2752178,19.31135 20.7985559,20.7581098 20.735,22.4620968 C20.7032221,22.8479052 20.6873333,23.4587593 20.6873333,24.2946774 C20.6873333,25.1305956 20.7032221,25.7575248 20.735,26.1754839 C20.7985559,27.7830188 21.2911065,29.149403 22.2126667,30.2746774 C23.1342268,31.3999519 24.4688801,31.9625806 26.2166667,31.9625806 C29.6169059,31.9625806 31.4282211,29.8406664 31.6506667,25.5967742 Z" />
            </g>
          </g>
        </g>
      </Letter>

      <EarRight
        width="14px"
        height="10px"
        viewBox="0 0 14 10"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient x1="18.2055918%" y1="-51.109094%" x2="50%" y2="100%" id="linearGradient-1">
            <stop stop-color="#9C70F7" offset="0%" />
            <stop stop-color="#976CF1" offset="0%" />
            <stop stop-color="#8E63E6" offset="100%" />
          </linearGradient>
          <path
            d="M13.963507,6.03261851 C9.66937018,2.39277641 3.00569763,-2.2397499 0.429215543,1.48548439 C0.0774067436,1.98716351 0.0463647907,2.64895298 0.336089684,3.19332819 L3.55747768,9.01227679 C5.16229539,9.61653646 7.03241257,9.61653646 9.16782924,9.01227679 C11.3032459,8.40801711 12.9018052,7.41479769 13.963507,6.03261851 Z"
            id="path-2"
          />
        </defs>
        <g transform="translate(-719.000000, -755.000000)">
          <g transform="translate(726.000000, 760.000000) scale(-1, 1) translate(-726.000000, -760.000000) translate(719.000000, 755.000000)">
            <g>
              <mask>
                <use xlinkHref="#path-2" />
              </mask>
              <use id="Mask" fill="url(#linearGradient-1)" xlinkHref="#path-2" />
            </g>
          </g>
        </g>
      </EarRight>
      <EarLeft
        width="14px"
        height="10px"
        viewBox="0 0 14 10"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient x1="18.2055918%" y1="-51.109094%" x2="50%" y2="100%" id="linearGradient-1">
            <stop stop-color="#9C70F7" offset="0%" />
            <stop stop-color="#976CF1" offset="0%" />
            <stop stop-color="#8E63E6" offset="100%" />
          </linearGradient>
        </defs>
        <g transform="translate(-726.000000, -734.000000)">
          <path
            d="M739.823683,739.922223 C735.529546,736.28238 728.865873,731.649854 726.289391,735.375088 C725.937582,735.876768 725.90654,736.538557 726.196265,737.082932 L729.417653,742.901881 C731.022471,743.506141 732.892588,743.506141 735.028005,742.901881 C737.163421,742.297621 738.761981,741.304402 739.823683,739.922223 Z"
            id="Mask-Copy"
            fill="url(#linearGradient-1)"
          />
        </g>
      </EarLeft>
    </React.Fragment>
  )
})`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: -moz-linear-gradient(top, #8f64e6 0%, #623cea 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #8f64e6 0%, #623cea 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #8f64e6 0%,
    #623cea 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8f64e6', endColorstr='#623cea',GradientType=0 ); /* IE6-9 */
  position: relative;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    -webkit-box-shadow: 0px 10px 30px 0px rgba(156, 112, 247, 0.3);
    -moz-box-shadow: 0px 10px 30px 0px rgba(156, 112, 247, 0.3);
    box-shadow: 0px 10px 30px 0px rgba(156, 112, 247, 0.3);
    transition: all 0.2s ease;
  }

  &:hover ${Ear} {
    transform: translateY(0);
    opacity: 1;
    transition: all 0.2s ease;
  }
`;

export default Logo;
