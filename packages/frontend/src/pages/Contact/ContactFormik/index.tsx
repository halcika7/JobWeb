import React, { FC, useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { Props, inputs } from './IContactFormik';

import TextArea from '@components/UI/input/TextArea';
import InputElement from '@components/UI/input/Input';
import { ContactSchema } from './yup';

const ContactFormik: FC<Props> = ({
  errors: initialErrors,
  touched: initialTouched,
  values: initialValues,
  disabled,
  status,
  postNewMessage,
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
        postNewMessage(data);
      }}
    >
      {({ errors, touched }) => (
        <Form className="contact-inputs card">
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

export default React.memo(ContactFormik);
