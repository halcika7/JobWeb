import styled, { css } from 'styled-components';
import {
  rotatePlaceholder,
  animateSuccessLong,
  animateSuccessTip,
} from '@styled';

const BaseIcon = styled.div`
  width: 80px;
  height: 80px;
  border-width: 4px;
  border-style: solid;
  border-radius: 50%;
  padding: 0;
  position: relative;
  box-sizing: content-box;
  margin: 20px auto 40px;
`;

const Span = styled.span`
  height: 5px;
  background-color: #a5dc86;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
`;

export const SuccessIcon = styled(BaseIcon)`
  border-color: #a5dc86;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 120px;
    background: #fff;
    transform: rotate(-45deg);
  }

  &::before {
    border-radius: 120px 0 0 120px;
    top: -11px;
    left: -33px;
    transform-origin: 60px 60px;
  }

  &::after {
    border-radius: 0 120px 120px 0;
    top: -8px;
    left: 30px;
    transform-origin: 0 60px;
    animation: ${rotatePlaceholder} 4.25s ease-in;
  }
`;

export const ErrorIcon = styled(BaseIcon)`
  border-color: #f27474;
`;

export const SpanLong = styled(Span)`
  width: 47px;
  right: 8px;
  top: 38px;
  transform: rotate(-45deg);
  animation: ${animateSuccessLong} 0.75s;
`;

export const SpanTip = styled(Span)`
  width: 25px;
  left: 14px;
  top: 46px;
  transform: rotate(45deg);
  animation: ${animateSuccessTip} 0.75s;
`;

export const Ring = styled.div`
  width: 80px;
  height: 80px;
  border: 4px solid hsla(98, 55%, 69%, 0.2);
  border-radius: 50%;
  box-sizing: content-box;
  position: absolute;
  left: -4px;
  top: -4px;
  z-index: 2;
`;

export const Corners = styled.div`
  width: 5px;
  height: 90px;
  background-color: #fff;
  padding: 1px;
  position: absolute;
  left: 28px;
  top: 8px;
  z-index: 1;
  transform: rotate(-45deg);
`;

export const SpanMark = styled.span`
  position: relative;
  display: block;
`;

export const SpanLine = styled.span<{ left?: boolean }>`
  position: absolute;
  height: 5px;
  width: 47px;
  background-color: #f27474;
  display: block;
  top: 37px;
  border-radius: 2px;

  ${props =>
    props.left &&
    css`
      transform: rotate(45deg);
      left: 17px;
    `}

  ${props =>
    !props.left &&
    css`
      transform: rotate(-45deg);
      left: 16px;
    `}
`;
