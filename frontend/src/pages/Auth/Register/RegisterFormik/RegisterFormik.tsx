import Input from 'components/UI/input/Input';
import SelectInput from 'components/UI/input/Select';
import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Select, SelectCities } from 'store/country/CountryActionTypes';
import { AccountRegistrationType } from '../IRegister';
import { RegisterTouched, RegisterValues } from '../store/RegisterActionTypes';
import { companyInputs, inputs, selects } from './RegisterFormikProps';
import { CompanySignupSchema, UserSignupSchema } from './YupRegisterValidation';

interface RegisterFormikProps {
  accountType: AccountRegistrationType;
  countries: Select[];
  cities: SelectCities;
  errors: RegisterValues;
  values: RegisterValues;
  touched: RegisterTouched;
  onSubmit: (
    data: RegisterValues,
    acccountType: AccountRegistrationType
  ) => void;
  status: number | null;
}

const RegisterFormik: FC<RegisterFormikProps> = ({
  accountType,
  countries,
  cities,
  errors: initialErrors,
  values: initialValues,
  touched: initialTouched,
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
              <button type="submit" disabled={submitting}>
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
