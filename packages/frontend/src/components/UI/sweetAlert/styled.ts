import styled, { css } from 'styled-components';
import { CenterDiv, ColumnDiv, JustifyCenterDiv } from '@styled/div';
import { Base } from '@styled/button';
import { ShowSweetAlert } from '@styled/keyframes';
import { HeightWidth } from '@styled/props/height';

export const SweetAlertWrapper = styled(CenterDiv)`
  ${HeightWidth('100vh', '100%')}
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5rem;
`;

export const Backdrop = styled.div`
  ${HeightWidth('100vh', '100%')}
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const Alert = styled(ColumnDiv)`
  ${HeightWidth('400px', '100%')}
  max-width: 400px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.64);
  border-radius: 5px;
  padding: 1rem 2rem;
  text-align: center;
  animation: ${ShowSweetAlert} 0.3s;
  z-index: 1001;
`;

export const Buttons = styled(JustifyCenterDiv)`
  width: 100%;
  margin-top: auto;
  margin-bottom: 1rem;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const Button = styled(Base)<{ success?: boolean }>`
  width: 150px;
  border: 1px solid red;
  padding: 0.5rem 0;
  border-radius: 5px;

  ${props =>
    props.success &&
    css`
      border: 1px solid #66bb6a;
      background: #66bb6a;
      color: #fff;
      box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
      margin-left: auto;
      transition: box-shadow 0.125s ease-in;

      &:hover {
        box-shadow: none;
      }
    `}

  @media (max-width: 400px) {
    width: 100%;

    &:nth-child(1) {
      margin-bottom: 1rem;
    }
  }
`;
