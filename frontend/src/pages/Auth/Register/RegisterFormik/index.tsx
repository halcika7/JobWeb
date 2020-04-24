import React, { FC, useEffect, useState } from 'react';

// lists of inputs and component props type
import {
  companyInputs,
  inputs,
  selects,
  RegisterFormikProps,
} from './RegisterFormikProps';

// validation
import { CompanySignupSchema, UserSignupSchema } from '../../yup';

// navigation
import { Link } from 'react-router-dom';

// formik
import { Field, Form, Formik } from 'formik';

// components
import Input from 'components/UI/input/Input';
import SelectInput from 'components/UI/input/Select';

const RegisterFormik: FC<RegisterFormikProps> = ({
  accountType,
  countries,
  cities,
  errors: initialErrors,
  values: initialValues,
  touched: initialTouched,
  buttonDisabled,
  onSubmit,
  status,
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
      validationSchema={
        accountType === 'user' ? UserSignupSchema : CompanySignupSchema
      }
      onSubmit={data => {
        setSubmitting(true);
        onSubmit(data, accountType);
      }}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form className="inputs row">
          {inputs.map(properties => (
            <Field
              key={`${properties.name}-${properties.type}-${properties.label}`}
              as={Input}
              error={errors[properties.name]}
              touched={touched[properties.name]}
              {...properties}
            />
          ))}
          {selects.map(properties => (
            <Field
              key={`${properties.name}-${properties.label}`}
              as={SelectInput}
              error={errors[properties.name]}
              touched={touched[properties.name]}
              setFieldValue={setFieldValue}
              options={
                properties.name === 'city' ? cities[values.country] : countries
              }
              type="hidden"
              {...properties}
            />
          ))}
          {accountType === 'company' &&
            companyInputs.map(properties => (
              <Field
                key={`${properties.name}-${properties.type}-${properties.label}`}
                as={Input}
                error={errors[properties.name]}
                touched={touched[properties.name]}
                {...properties}
              />
            ))}
          <div className="submit">
            <p className="accept-terms col-12">
              By hitting the &quot;Sign up&quot; button, you agree to the{' '}
              <Link to="/">Terms conditions</Link> and{' '}
              <Link to="/">Privacy Policy</Link>
            </p>
            <div className="col-12 col-md-6">
              <button type="submit" disabled={submitting || buttonDisabled}>
                Sign up
              </button>
            </div>
            <p className="col-12 col-md-6">
              Already registered? <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterFormik);
