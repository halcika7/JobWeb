import React, { FC, useEffect, useState } from 'react';
import { Field, Formik } from 'formik';
import {
  FormWrapper,
  Submit,
  SubmitButton,
  ActivateParagraph,
} from '../../styled';
import Input from '@components/UI/input/Input';

import { FormikProps } from '@containers/Auth/IFormik';
import * as yup from 'yup';

const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide valid email')
    .max(100, 'Email cannot exceed 100 characters')
    .required('Email is required'),
});

const PasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must contain at least 6 characters')
    .max(15, 'Password cannot exceed 15 characters')
    .matches(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,15})'
      ),
      'Password needs to contain both lower and upper case characters, number and a special character'
    )
    .required('Password is required'),
  password2: yup
    .string()
    .when('password', {
      is: val => val && val.length > 0,
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both password need to be the same'),
    })
    .required('Confirm password is required'),
});

interface ActivationFormikProps extends FormikProps {
  onSubmit: (data: {
    email?: string;
    password?: string;
    password2?: string;
  }) => void;
  resetLink: boolean;
}

const ActivationFormik: FC<ActivationFormikProps> = ({
  buttonDisabled,
  errors: ierrors,
  onSubmit,
  status,
  touched: itouched,
  values: ivalues,
  resetLink,
}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (status !== null && submitting) setSubmitting(false);
  }, [status, submitting]);

  return (
    <Formik
      enableReinitialize
      initialValues={ivalues}
      initialErrors={ierrors}
      initialTouched={itouched}
      validateOnChange
      validateOnBlur
      validationSchema={resetLink ? EmailSchema : PasswordSchema}
      onSubmit={data => {
        const { email, password, password2 } = data;
        setSubmitting(true);
        if (resetLink) {
          onSubmit({ email });
        } else {
          onSubmit({ password, password2 });
        }
      }}
    >
      {({ errors, touched }) => (
        <FormWrapper center={1}>
          {resetLink ? (
            <Field
              as={Input}
              error={errors.email}
              touched={touched.email}
              classNames="col-12 col-md-6"
              name="email"
              type="email"
              required
              label="Email"
              autoComplete="new-password"
            />
          ) : (
            <>
              <Field
                as={Input}
                error={errors.password}
                touched={touched.password}
                classNames="col-12 col-md-6"
                name="password"
                type="password"
                required
                label="Password"
                autoComplete="new-password"
              />
              <Field
                as={Input}
                error={errors.password2}
                touched={touched.password2}
                classNames="col-12 col-md-6"
                name="password2"
                type="password"
                required
                label="Confirm Password"
                autoComplete="new-password"
              />
            </>
          )}
          <Submit center={1}>
            <div className={resetLink ? 'col-12 col-md-6' : 'col-12'}>
              {resetLink && (
                <ActivateParagraph>
                  Please fill in email and request reset password token.
                </ActivateParagraph>
              )}
              <SubmitButton
                type="submit"
                disabled={submitting || buttonDisabled}
                className={resetLink ? '' : 'col-md-6'}
              >
                {resetLink ? 'Request Reset Password Link' : 'Reset Password'}
              </SubmitButton>
            </div>
          </Submit>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default ActivationFormik;
