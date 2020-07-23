import React, { FC, useEffect, useState } from 'react';

// validation schema
import { UserLogin } from '@job/yup';

// styled components
import {
  FormWrapper,
  Submit,
  SubmitButton,
  SubmitParagraph,
  SubmitLink,
} from '../../styled';

// components
import InputElement, { Input } from '@components/UI/input/Input';
import { Field, Formik } from 'formik';
import Link from 'next/link';

// types
import { Types, useThunkDispatch } from '@job/redux';
import { FormikProps } from '@containers/Auth/IFormik';

type ValidNameValues = 'username' | 'password';

interface LoginInputs extends Input {
  name: ValidNameValues;
}

const Inputs: LoginInputs[] = [
  {
    classNames: 'col-12 col-md-6',
    name: 'username',
    type: 'text',
    required: true,
    label: 'Username / Email',
    autoComplete: 'new-password',
  },
  {
    classNames: 'col-12 col-md-6',
    name: 'password',
    type: 'password',
    required: true,
    label: 'Password',
    autoComplete: 'new-password',
  },
];

interface LoginFormikProps extends FormikProps {
  onSubmit: (loginData: Types.LoginData) => any;
}

const LoginFormik: FC<LoginFormikProps> = ({
  errors: initialErrors,
  values: initialValues,
  touched: initialTouched,
  status,
  buttonDisabled,
  onSubmit,
}): JSX.Element => {
  const dispatch = useThunkDispatch();
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
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={UserLogin}
      onSubmit={data => {
        const { username, password } = data;
        setSubmitting(true);
        dispatch(onSubmit({ username, password }));
      }}
    >
      {({ errors, touched }) => (
        <FormWrapper>
          {Inputs.map(props => (
            <Field
              key={`${props.name}-${props.type}-${props.label}`}
              as={InputElement}
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
