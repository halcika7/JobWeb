import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Field, Formik } from 'formik';

import {
  FormWrapper,
  Submit,
  SubmitButton,
  SubmitParagraph,
  SubmitLink,
} from '../../styled';

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
        <FormWrapper>
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

          <Submit>
            <SubmitParagraph className="col-12" accept={1}>
              By hitting the &quot;Sign up&quot; button, you agree to the{' '}
              <Link href="/terms" passHref>
                <SubmitLink>Terms conditions</SubmitLink>
              </Link>{' '}
              and{' '}
              <Link href="/" passHref>
                <SubmitLink>Privacy Policy</SubmitLink>
              </Link>
            </SubmitParagraph>
            <div className="col-12 col-md-6">
              <SubmitButton
                type="submit"
                disabled={submitting || buttonDisabled}
              >
                Sign up
              </SubmitButton>
            </div>
            <SubmitParagraph className="col-12 col-md-6">
              Already registered?{' '}
              <Link href="/auth/login" passHref>
                <SubmitLink>Sign in here</SubmitLink>
              </Link>
            </SubmitParagraph>
          </Submit>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default React.memo(RegisterFormik);
