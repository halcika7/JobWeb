import React, { FC, useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Props,
  inputs,
  DispatchToProps,
  mapStateToProps,
  mapDispatchToProps,
  StateToProps,
  OwnProps,
} from './IFaqFormik';

import TextArea from '@components/UI/input/TextArea';
import InputElement from '@components/UI/input/Input';
import { ContactSchema } from '@pages/Contact/ContactFormik/yup';
import { connect } from 'react-redux';
import { AppState } from '@store/RootReducer';

const ContactFormik: FC<Props> = ({
  errors: initialErrors,
  touched: initialTouched,
  values: initialValues,
  postMessage,
  status,
  disabled,
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
      validationSchema={ContactSchema}
      onSubmit={data => {
        setSubmitting(true);
        postMessage(data);
      }}
    >
      {({ errors, touched }) => (
        <Form className="contact-inputs">
          <div className="row">
            {inputs.map(props => (
              <Field
                key={`${props.name}-${props.type}-${props.label}`}
                as={InputElement}
                error={errors[props.name]}
                touched={touched[props.name]}
                {...props}
              />
            ))}
            <Field
              as={TextArea}
              error={errors.message}
              touched={touched.message}
              name="message"
              classNames="form-group col-12"
              label="Message"
              required
              type="text"
              rows={3}
            />
          </div>

          <button type="submit" disabled={submitting || disabled}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(
  connect<StateToProps, DispatchToProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )(ContactFormik)
);
