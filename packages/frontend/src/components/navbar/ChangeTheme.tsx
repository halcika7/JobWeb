import React, { FC } from 'react';
import styled, { css } from '@job/styled';

const Wrapper = styled.div<{ checked?: boolean }>`
  position: relative;
  width: 82px !important;
  height: 35px;
  padding: 5px;
  border-radius: 45px;
  border: 3px solid #1a237e;
  background-color: #3f51b5;
  overflow: hidden;
  transition: all 1s cubic-bezier(0.6, -0.28, 0.735, 0.045);

  ${props =>
    props.checked &&
    css`
      background-color: #fff;
      border-color: #f3909a;
    `}
`;

const Span = styled.span<{ large?: boolean | number; checked?: boolean }>`
  border-radius: 50%;
  display: inline-block;
  position: absolute;

  ${props =>
    props.large &&
    css`
      width: 20px;
      height: 20px;
      background: #fff;
      border: 3px solid #fff;
      top: 50%;
      transform: translateY(-50%);
      left: 7px;
      transition: all 1s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    `}

  ${props =>
    !props.large &&
    css`
      width: 15px;
      height: 15px;
      background: #3f51b5;
      left: 15px;
      top: 3px;
      transition: all 1s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    `}

    ${props =>
      props.large &&
      props.checked &&
      css`
        left: 50px;
        background: yellow;
        border-color: orange;
      `}

      ${props =>
        !props.large &&
        props.checked &&
        css`
          left: 60px;
          top: 50px;
          background-color: #fff;
        `}
`;

const Toggler = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  margin: 0;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
`;

interface Props {
  onClick: () => void;
  value: boolean;
}

const ChangeTheme: FC<Props> = ({ onClick, value }) => {
  return (
    <Wrapper checked={!value}>
      <Toggler type="checkbox" onClick={onClick} defaultChecked={value} />
      <Span large={1} checked={!value} />
      <Span checked={!value} />
    </Wrapper>
  );
};

export default ChangeTheme;
