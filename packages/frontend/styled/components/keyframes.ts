import { keyframes } from 'styled-components';

export const rotatePlaceholder = keyframes`
  0% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
`;

export const animateSuccessLong = keyframes`
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
`;

export const animateSuccessTip = keyframes`
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
`;

export const ShowSweetAlert = keyframes`
0% {
  transform: scale(0.7);
  -webkit-transform: scale(0.7);
}
45% {
  transform: scale(1.05);
  -webkit-transform: scale(1.05);
}
80% {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
}
100% {
  transform: scale(1);
  -webkit-transform: scale(1);
}
`;

export const ShowAlert = keyframes`
0% {
    position: absolute;
    left: 0;
    right: 0;
    transform: translateY(-20%);
    opacity: 0;
  }
  20% {
    position: relative;
    transform: translateY(-10%);
    opacity: 0.6;
  }
  100% {
    position: relative;
    transform: translateY(0%);
    opacity: 1;
  }
`;

export const HideAlert = keyframes`
0% {
    position: relative;
    transform: translateY(0%);
    opacity: 1;
  }
  20% {
    position: absolute;
    left: 0;
    right: 0;
    opacity: 0.5;
    transform: translateY(-30%);
  }
  100% {
    position: absolute;
    left: 0;
    right: 0;
    opacity: 0;
    transform: translateY(-40%);
  }
`;
