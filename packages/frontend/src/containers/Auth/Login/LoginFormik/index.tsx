import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import { Field, Formik } from 'formik';

import { UserLoginSchema } from '@containers/Auth/yup';

import { Inputs, LoginFormikProps } from './LoginFormikProps';

import Input from '@components/UI/input/Input';

import {
  FormWrapper,
  Submit,
  SubmitButton,
  SubmitParagraph,
  SubmitLink,
} from '../../styled';

const LoginFormik: FC<LoginFormikProps> = ({
  errors: initialErrors,
  values: initialValues,
  touched: initialTouched,
  status,
  buttonDisabled,
  onSubmit,
}): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (status !== null && submitting) setSubmitting(false);
  }, [status, submitting]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      initialErrors={initialErrors}
      initialTouched={initialTouched}
      validateOnChange
      validateOnBlur
      validationSchema={UserLoginSchema}
      onSubmit={data => {
        const { username, password } = data;
        setSubmitting(true);
        onSubmit({ username, password });
      }}
    >
      {({ errors, touched }) => (
        <FormWrapper>
          {Inputs.map(props => (
            <Field
              key={`${props.name}-${props.type}-${props.label}`}
              as={Input}
              error={errors[props.name]}
              touched={touched[props.name]}
              {...props}
            />
          ))}
          <Submit>
            <div className="col-12 col-md-6">
              <SubmitButton
                type="submit"
                disabled={submitting || buttonDisabled}
              >
                Login
              </SubmitButton>
            </div>
            <SubmitParagraph className="col-12 col-md-6">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" passHref>
                <SubmitLink>Sign up here</SubmitLink>
              </Link>
            </SubmitParagraph>
            <SubmitParagraph className="col-12" accept={1}>
              <Link href="/auth/forgot-password" passHref>
                <SubmitLink>Forgot Password ?</SubmitLink>
              </Link>
            </SubmitParagraph>
          </Submit>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default React.memo(LoginFormik);
