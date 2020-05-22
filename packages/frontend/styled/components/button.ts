import styled from 'styled-components';
import { CenterAllFlex, Flex } from './props/flex';

export const Base = styled.button`
  ${Flex}
  cursor: pointer;
  outline: none;
  border: none;
`;

export const BaseButton = styled(Base)`
  ${CenterAllFlex}
  background: none;
`;

export const PrimaryButton = styled(BaseButton)``;

export const SecondaryButton = styled(BaseButton)``;

export const ThirdButton = styled(BaseButton)``;

export const ErrorButton = styled(BaseButton)``;

export const WarningButton = styled(BaseButton)``;

export const SuccessButton = styled(BaseButton)``;

export const InfoButton = styled(BaseButton)``;
