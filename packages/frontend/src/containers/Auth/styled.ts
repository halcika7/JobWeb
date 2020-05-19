import styled, { css } from 'styled-components';
import { AlignCenterDiv } from '@styled/div';
import { Form } from 'formik';

export const AuthWrapper = styled.section`
  padding: 4rem 0 8rem;
  width: 770px;
  margin: 0 auto;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const Heading = styled.h1`
  font-family: Poppins, sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 26.4px;
  text-align: center;
  margin-bottom: 2rem;
`;

export const WarningMessage = styled.p`
  font-family: Lato, sans-serif;
  font-size: 14px;
  font-weight: 400;
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
  border: 1px solid #fdfdfd64;
  border-radius: 3px;

  ${props =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `}
`;

export const Legend = styled.legend`
  padding: 0 0.5rem;
  font-size: 13px;
  margin-bottom: 0.5rem;
`;

export const FieldsetButton = styled.button<{ color?: string }>`
  display: block;
  background: ${props => props.color || 'transparent'};
  padding: 15px 20px;
  border-radius: 3px;
  color: #fdfdfd;
  border: 2px solid ${props => props.color || '#fdfdfd'};
  font-family: Poppins, sans-serif;
  width: 100%;
  cursor: pointer;
  outline: none;
  text-decoration: none;
`;

export const FieldsetWrap = styled.div<{ social?: boolean }>`
  display: flex;
  align-items: center;

  ${props =>
    props.social &&
    css`
      justify-content: center;
    `}

  .content {
    margin-left: 1rem;

    h3 {
      font-size: 16px;
      text-align: left;
    }

    p {
      font-size: 13px;
      text-align: left;
      ${props =>
        props.social &&
        css`
          line-height: 21px;
          font-size: 14px;
        `}
    }
  }

  svg {
    color: #fdfdfd;
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
      display: grid;
      grid-template-columns: repeat(2, 1fr);

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
        grid-template-columns: repeat(1, 1fr);

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

export const SubmitButton = styled.button`
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: #fdfdfd;
  padding: 12px 30px;
  background: #456ba9;
  border: 1px solid #456ba9;
  width: 100%;
  margin-right: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    margin-right: 0;
  }
`;

export const SubmitParagraph = styled.p<{ accept?: boolean | number }>`
  font-family: ${props =>
    !props.accept ? 'Poppins, sans-serif' : 'Lato, sans-serif'};
  font-size: ${props => (!props.accept ? '14px' : '13px')};
  font-weight: 400;
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
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 23.8px;
  color: #41b8ed;
  text-decoration: none;
`;

export const SocialDivider = styled.div`
  margin-top: 3rem;
  text-align: center;
  position: relative;
`;

export const SocialSpanLine = styled.span`
  width: 237px;
  height: 1px;
  background: #edf1f9;
  display: inline-block;
`;

export const SocialSpanCircle = styled.span`
  width: 35px;
  height: 35px;
  line-height: 35px;
  display: inline-block;
  background: #edf1f9;
  color: #354b6b;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -18px;
  border-radius: 50%;
`;

export const FormWrapper = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  margin-top: 1rem;
`;

// body.light {
//   .registration,
//   .login {
//     fieldset {
//       border: 1px solid #27293d4c;
//     }

//     .options {
//       li {
//         button,
//         a {
//           color: #27293d;
//           border: 2px solid #27293d;

//           &.social {
//             color: #fdfdfd;

//             svg {
//               color: #fdfdfd;
//             }
//           }

//           svg {
//             color: #27293d;
//             height: 35px;
//             width: 35px;
//           }
//         }

//         &.active {
//           button {
//             color: #456ba9;
//             border-color: #456ba9;
//           }

//           .wrap {
//             svg {
//               color: #456ba9;
//             }
//           }
//         }
//       }
//     }

//     .submit {
//       button {
//         background: #456ba9;
//         border: 1px solid #456ba9;
//       }

//       p {
//         a {
//           color: #456ba9;
//         }
//       }
//     }

//     .accept-terms {
//       a {
//         color: #456ba9;
//       }
//     }
//   }

//   .social-divider {
//     .line {
//       background: #466ca9;
//     }

//     .circle {
//       background: #466ca9;
//       color: #fdfdfd;
//     }
//   }
// }
