import React, { FC, useState, useEffect } from 'react';
import { useThunkDispatch } from '@job/redux';
import { Formik, Field } from 'formik';
import { Props, inputs } from './IContactFormik';

import TextArea from '@components/UI/input/TextArea';
import InputElement from '@components/UI/input/Input';
import { ContactSchema } from '@job/yup';

import { ContactForm, SubmitButton } from '../styled';
import { Row } from '@styled';

const ContactFormik: FC<Props> = ({
  errors: initialErrors,
  touched: initialTouched,
  values: initialValues,
  disabled,
  status,
  postNewMessage,
}): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const dispatch = useThunkDispatch();

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
      validationSchema={ContactSchema}
      onSubmit={data => {
        setSubmitting(true);
        dispatch(postNewMessage(data));
      }}
    >
      {({ errors, touched }) => (
        <ContactForm>
          <Row>
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
          </Row>

          <SubmitButton type="submit" disabled={submitting || disabled}>
            Send
          </SubmitButton>
        </ContactForm>
      )}
    </Formik>
  );
};

export default React.memo(ContactFormik);
