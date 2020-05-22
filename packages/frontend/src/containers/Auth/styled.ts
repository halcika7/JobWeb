import styled, { css } from 'styled-components';
import { AlignCenterDiv } from '@styled/div';
import { BaseButton } from '@styled/button';
import { FlexRow } from '@styled/props/flex';
import { GridColumns } from '@styled/props/grid';
import { Form } from 'formik';
import { HeightWidth } from '@styled/props/height';
import { setFontOptions } from '@styled/props/font';

export const AuthWrapper = styled.section`
  padding: 4rem 0 8rem;
  width: 770px;
  margin: 0 auto;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const Heading = styled.h1`
  ${setFontOptions('h3')}
  font-family: Poppins, sans-serif;
  line-height: 26.4px;
  text-align: center;
  margin-bottom: 2rem;
`;

export const WarningMessage = styled.p`
  ${setFontOptions('helper')}
  font-family: Lato, sans-serif;
  line-height: 23px;
  width: 70%;
  margin: 2rem auto 0;
  text-align: center;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const Fieldset = styled.fieldset<{ marginTop?: string }>`
  padding: 0.625rem 1.25rem;
  border: 1px solid ${props => props.theme.text.primary};
  border-radius: 3px;

  ${props =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `}
`;

export const Legend = styled.legend`
  ${setFontOptions('copyright')}
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`;

export const FieldsetButton = styled(BaseButton)<{ color?: string }>`
  font-family: Poppins, sans-serif;
  display: block;
  background: ${props => props.color || 'transparent'};
  padding: 15px 20px;
  border-radius: 3px;
  color: ${props => (props.color ? '#fff' : props.theme.text.primary)};
  border: 2px solid ${props => props.color || props.theme.text.primary};
  width: 100%;
`;

export const FieldsetWrap = styled(AlignCenterDiv)<{ social?: boolean }>`
  ${props =>
    props.social &&
    css`
      justify-content: center;
    `}

  .content {
    margin-left: 1rem;

    h3 {
      ${setFontOptions('paragraph')}
      text-align: left;
    }

    p {
      ${setFontOptions('copyright')}
      text-align: left;
      ${props =>
        props.social &&
        css`
          line-height: 21px;
          ${setFontOptions('helper')}
        `}
    }
  }

  svg {
    color: ${props => (props.social ? '#fff' : props.theme.text.primary)};
    height: ${props => (!props.social ? '35px' : '20px')};
    width: 35px;
  }
`;

export const FieldsetOptionsLi = styled.li<{ active?: boolean }>`
  flex: 2;
  margin-bottom: 0.625rem;

  &:first-child {
    margin-right: 1.5rem;
  }

  ${props =>
    props.active &&
    css`
      ${FieldsetButton} {
        color: #41b8ed;
        border-color: #41b8ed;
      }

      ${FieldsetWrap} {
        svg {
          color: #41b8ed;
        }
      }
    `}
`;

export const FieldsetOptions = styled.ul<{ login?: boolean }>`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;

  ${props =>
    props.login &&
    css`
      ${GridColumns(2)}

      ${FieldsetOptionsLi} {
        margin-bottom: 1.5rem;

        &:nth-child(odd) {
          margin-right: 1.5rem;
        }

        &:nth-child(3),
        &:nth-child(4) {
          margin-bottom: 0.625rem;
        }
      }

      @media (max-width: 768px) {
        ${GridColumns(1)}

        ${FieldsetOptionsLi} {
          &:nth-child(odd) {
            margin-right: 0;
          }

          &:nth-child(3) {
            margin-bottom: 1.5rem;
          }
        }
      }
    `}

  @media (max-width: 686px) {
    flex-direction: column;

    ${FieldsetOptionsLi} {
      flex: 1;

      &:first-child {
        margin-right: 0;
        margin-bottom: 1.5rem;
      }

      a {
        padding: 15px 10px;
      }
    }
  }
`;

export const Submit = styled(AlignCenterDiv)`
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  width: 100%;
`;

export const SubmitButton = styled(BaseButton)`
  ${setFontOptions('paragraph')}
  line-height: 1.2;
  color: #fdfdfd;
  padding: 12px 30px;
  background: #456ba9;
  border: 1px solid #456ba9;
  width: 100%;
  margin-right: 1.5rem;
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    margin-right: 0;
  }
`;

export const SubmitParagraph = styled.p<{ accept?: boolean | number }>`
  font-family: ${props =>
    !props.accept ? 'Poppins, sans-serif' : 'Lato, sans-serif'};
  font-size: ${props =>
    !props.accept
      ? props.theme.fontSizes.helper
      : props.theme.fontSizes.copyright};
  line-height: ${props => (!props.accept ? '23.8px' : '24px')};
  text-align: ${props => (!props.accept ? 'right' : 'left')};

  ${props =>
    props.accept &&
    css`
      margin: 1.5rem 0;
    `}

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const SubmitAcceptParagraph = styled(SubmitParagraph)`
  margin: 1.5rem 0;
`;

export const SubmitLink = styled.a`
  ${setFontOptions('paragraph')}
  line-height: 23.8px;
  color: #41b8ed;
`;

export const SocialDivider = styled.div`
  margin-top: 3rem;
  text-align: center;
  position: relative;
`;

export const SocialSpanLine = styled.span`
  ${HeightWidth('1px', '237px')}
  background: ${props => props.theme.text.primary};
  display: inline-block;
`;

export const SocialSpanCircle = styled.span`
  ${HeightWidth('35px', '35px')}
  line-height: 35px;
  display: inline-block;
  background: ${props => props.theme.text.primary};
  color: ${props => props.theme.bg.primary};
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -18px;
  border-radius: 50%;
`;

export const FormWrapper = styled(Form)`
  ${FlexRow}
  margin-top: 1rem;
`;
