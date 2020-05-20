import styled, { css } from 'styled-components';

export const InputWrapper = styled.input`
  display: block;
  width: 100%;
  background: transparent;
  border: 1px solid ${props => props.theme.text.primary};
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  padding: 10px 20px;
  border-radius: 3px;
  margin-top: 8px;
  outline: none;
  color: ${props => props.theme.text.primary};

  &:focus {
    border-color: #366bf5;
  }
`;

export const TextareaWrapper = styled(InputWrapper)`
  resize: vertical;
`;

export const LabelSpan = styled.span`
  color: red;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: ${props => props.theme.text.primary};

  .css-yk16xz-control {
    transition: none;
    border: 1px solid ${props => props.theme.text.primary};

    &:hover {
      border: 1px solid ${props => props.theme.text.primary};
    }
  }

  .css-1pahdxg-control {
    border: 1px solid #366bf5;
  }

  .css-2b097c-container {
    margin-top: 8px;
  }

  .css-yk16xz-control,
  .css-1pahdxg-control,
  .css-2b097c-container,
  .css-26l3qy-menu {
    background: transparent;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    box-shadow: none;

    .css-g1d714-ValueContainer {
      padding: 10px 20px;
    }

    .css-1uccc91-singleValue,
    .css-1wa3eu0-placeholder {
      color: ${props => props.theme.text.primary};
    }

    .css-b8ldur-Input {
      margin: 0;
      padding: 0;
      color: ${props => props.theme.text.primary};

      input {
        margin-top: 0;
      }
    }

    .css-4ljt47-MenuList {
      .css-1n7v3ny-option {
        background: #4fbfe6;
        color: #fff;
      }

      .css-9gakcf-option {
        color: #fff;
        background: #4fbfe6;
      }
    }

    .css-tlfecz-indicatorContainer,
    .css-1gtu0rj-indicatorContainer {
      color: ${props => props.theme.text.primary};
    }

    .css-1gtu0rj-indicatorContainer {
      color: #366bf5;

      &:hover {
        color: #366cf5a5;
      }
    }
  }

  .css-26l3qy-menu {
    margin-top: 4px;
    overflow: hidden;
    background: ${props => props.theme.bg.card};
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const ErrorDiv = styled.div`
  margin-top: 0.4rem;
  font-size: 13px;
  font-weight: 400;
`;

export const FormGroup = styled.div<{ error: boolean }>`
  margin-top: 1rem;

  ${props =>
    props.error &&
    css`
      color: #ef5350;

      .css-yk16xz-control {
        border: 1px solid #ef5350;
      }

      ${InputWrapper},
      ${TextareaWrapper} {
        border: 1px solid #ef5350;
      }
    `}
`;

//     .card {
//       background: #fff;
//       box-shadow: 0 1px 15px 0 hsla(0, 0%, 48.2%, 0.05);
//     }
