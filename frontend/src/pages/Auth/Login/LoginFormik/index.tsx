import React, { FC, useEffect, useState } from 'react';

// naavigation
import { Link } from 'react-router-dom';

// formik
import { Field, Form, Formik } from 'formik';

// validation
import { UserLoginSchema } from '../../yup';

// types
import { Inputs, LoginFormikProps } from './LoginFormikProps';

// components
import Input from 'components/UI/input/Input';

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
    if (status !== null && submitting) {
      setSubmitting(false);
    }
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
        <Form className="inputs row">
          {Inputs.map(props => (
            <Field
              key={`${props.name}-${props.type}-${props.label}`}
              as={Input}
              error={errors[props.name]}
              touched={touched[props.name]}
              {...props}
            />
          ))}
          <div className="submit">
            <div className="col-12 col-md-6">
              <button type="submit" disabled={submitting || buttonDisabled}>
                Login
              </button>
            </div>
            <p className="col-12 col-md-6">
              Don&apos;t have an account?{' '}
              <Link to="/register">Sign up here</Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(LoginFormik);
