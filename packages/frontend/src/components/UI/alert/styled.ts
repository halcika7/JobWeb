import styled, { css } from 'styled-components';
import { BaseButton } from '@styled/button';
import { ShowAlert, HideAlert } from '@styled/keyframes';

export const Wrapper = styled.div`
  position: relative;
  margin: 2.5rem 0;
`;

export const AlertElement = styled.div<{ type: any; hiding: boolean }>`
  width: 100%;
  border-radius: 0.2857rem;
  font-family: Lato, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 1);
  color: #fff;
  padding: 0.9rem 1.25rem;
  animation: ${ShowAlert} 0.3s ease-in-out forwards;

  ${props =>
    props.hiding &&
    css`
      animation: ${HideAlert} 0.3s ease-in-out forwards;
    `}

  ${props =>
    props.type === 'success' &&
    css`
      background: #00bf9a;
    `}

  ${props =>
    props.type === 'errror' &&
    css`
      background: #f27474;
    `}

  ${props =>
    props.type === 'warning' &&
    css`
      background: #ff9f89;
    `}

  ${props =>
    props.type === 'info' &&
    css`
      background: #4fbfe6;
    `}
`;

export const Button = styled(BaseButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5px;
  font-size: 20px;
  color: #fff;
`;