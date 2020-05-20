import styled, { css } from 'styled-components';
import { AlignCenterDiv, Flex } from '@styled/div';
import { BaseButton } from '@styled/button';

export const Header = styled(AlignCenterDiv)<{ shadow: boolean }>`
  position: fixed;
  overflow: hidden;
  top: 0;
  background: ${props => props.theme.bg.primary};
  width: 100%;
  height: 80px;
  padding: 0 2rem;
  transition: height 0.3s ease-in-out;
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  ${props =>
    props.shadow &&
    css`
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
    `}
`;

export const ToggleButton = styled.button<{ open: boolean }>`
  display: none;
  width: 25px;
  padding: 0;
  background: none;
  outline: none;
  margin-left: auto;
  height: 25px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 25px;

  span {
    position: absolute;
    height: 3px;
    background: ${props => props.theme.text.primary};
    width: 100%;
    display: block;
    border-radius: 1rem;
    transform-origin: left center;
    transition: 0.25s ease-in-out;
    right: 0;

    &:nth-child(1) {
      top: 0px;
    }

    &:nth-child(2) {
      top: 10px;
      transition: 0.2s ease-in-out;
    }

    &:nth-child(3) {
      top: 20px;
    }
  }

  ${props =>
    props.open &&
    css`
      span {
        background: #23c0e9;

        &:nth-child(1) {
          transform: rotate(45deg);
          top: 1px;
        }

        &:nth-child(2) {
          width: 0;
          opacity: 0;
        }

        &:nth-child(3) {
          transform: rotate(-45deg);
          top: 19px;
        }
      }
    `}

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
  }
`;

export const Collapsible = styled(AlignCenterDiv)`
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderImg = styled.img`
  height: 60px;
  object-fit: cover;
`;

export const NavLink = styled.a`
  color: ${props => props.theme.text.primary};
  text-decoration: none;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`;

export const Button = styled(BaseButton)`
  border: 1px solid #23c0e9;
  color: ${props => props.theme.text.primary};
  margin-right: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 3px;

  svg {
    margin-right: 0.4rem;
  }

  &:hover {
    border-color: #366bf5;
  }

  @media (max-width: 768px) {
    width: 150px;

    &:nth-child(1) {
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }
  }
`;

export const Navigation = styled(Flex)`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
