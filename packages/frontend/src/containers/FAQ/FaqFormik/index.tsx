import React, { FC, useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { inputs } from './IFaqFormik';
import { AppState, useThunkDispatch, useSelector, Actions } from '@job/redux';

import TextArea from '@components/UI/input/TextArea';
import InputElement from '@components/UI/input/Input';
import { ContactSchema } from '@job/yup';

import { FormButton } from '../styled';
import { Row } from '@job/styled';

export interface Props {
  status: number | null;
  disabled: boolean;
}

const ContactFormik: FC<Props> = ({ status, disabled }): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const State = useSelector(({ contact }: AppState) => ({
    errors: contact.errors,
    values: contact.values,
    touched: contact.touched,
  }));
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (status !== null && submitting) setSubmitting(false);
  }, [status, submitting]);

  return (
    <Formik
      enableReinitialize
      initialValues={State.values}
      initialErrors={State.errors}
      initialTouched={State.touched}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={ContactSchema}
      onSubmit={data => {
        setSubmitting(true);
        dispatch(Actions.postNewMessage(data));
      }}
    >
      {({ errors, touched }) => (
        <Form>
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
              rows={3}
            />
          </Row>

          <FormButton type="submit" disabled={submitting || disabled}>
            Send
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(ContactFormik);
