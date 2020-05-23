import React, { FC, useEffect, useState } from 'react';
import { Field, Formik } from 'formik';
import {
  FormWrapper,
  Submit,
  SubmitButton,
  ActivateParagraph,
} from '../../styled';
import Input from '@components/UI/input/Input';
import { ActivationFormikProps } from './FormikProps';

const ActivationFormik: FC<ActivationFormikProps> = ({
  buttonDisabled,
  errors: ierrors,
  onSubmit,
  status,
  touched: itouched,
  values: ivalues,
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
      //   validationSchema={UserLoginSchema}
      onSubmit={data => {
        const { email } = data;
        setSubmitting(true);
        onSubmit(email);
      }}
    >
      {({ errors, touched }) => (
        <FormWrapper center={1}>
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
          <Submit center={1}>
            <div className="col-12 col-md-6">
              <ActivateParagraph margin="0">
                Activation token expired?
              </ActivateParagraph>
              <ActivateParagraph>
                Please fill in email and request new activation token.
              </ActivateParagraph>
              <SubmitButton
                type="submit"
                disabled={submitting || buttonDisabled}
              >
                Resend Activation Link
              </SubmitButton>
            </div>
          </Submit>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default ActivationFormik;
