import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';

// lists of inputs and component props type
import {
  companyInputs,
  inputs,
  selects,
  RegisterFormikProps,
} from './RegisterFormikProps';

// validation
import { CompanySignupSchema, UserSignupSchema } from '@containers/Auth/yup';

// components
import Input from '@components/UI/input/Input';
import SelectInput from '@components/UI/input/Select';

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
          {inputs.map(props => (
            <Field
              key={`${props.name}-${props.type}-${props.label}`}
              as={Input}
              error={errors[props.name]}
              touched={touched[props.name]}
              {...props}
            />
          ))}

          {selects.map(props => (
            <Field
              key={`${props.name}-${props.label}`}
              as={SelectInput}
              error={errors[props.name]}
              touched={touched[props.name]}
              setFieldValue={setFieldValue}
              options={
                props.name === 'city' ? cities[values.country] : countries
              }
              type="hidden"
              {...props}
            />
          ))}

          {accountType === 'company' &&
            companyInputs.map(props => (
              <Field
                key={`${props.name}-${props.type}-${props.label}`}
                as={Input}
                error={errors[props.name]}
                touched={touched[props.name]}
                {...props}
              />
            ))}

          <div className="submit">
            <p className="accept-terms col-12">
              By hitting the &quot;Sign up&quot; button, you agree to the{' '}
              <Link href="/">Terms conditions</Link> and{' '}
              <Link href="/">Privacy Policy</Link>
            </p>
            <div className="col-12 col-md-6">
              <button type="submit" disabled={submitting || buttonDisabled}>
                Sign up
              </button>
            </div>
            <p className="col-12 col-md-6">
              Already registered? <Link href="/login">Sign in here</Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterFormik);
