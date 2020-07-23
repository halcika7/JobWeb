import React, { FC, useEffect } from 'react';
import { AppState, useSelector, useThunkDispatch, Actions } from '@job/redux';

import Breadcrumb from '@components/UI/breadcrumb';
import Accordion from '@components/UI/accordion';
import Alert from '@components/UI/alert';
import Form from './FaqFormik';

import { FaqSection, Faqs, FormWrapper, Heading } from './styled';

const Faq: FC<{}> = () => {
  const { message, status } = useSelector(({ contact }: AppState) => ({
    message: contact.message,
    status: contact.status,
  }));
  const dispatch = useThunkDispatch();

  useEffect(() => {
    return () => {
      dispatch(Actions.resetState());
    };
  }, [dispatch]);

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/faq', text: 'FAQ' },
        ]}
      />

      <FaqSection>
        <FormWrapper>
          <h3>Submit Your Question</h3>

          {status && message && (
            <Alert
              message={message}
              onClose={() => dispatch(Actions.resetMessages())}
              type="success"
            />
          )}

          <Form status={status} disabled={!!message && !!status} />
        </FormWrapper>
        <Faqs>
          <Heading>Frequently Asked Questions</Heading>
          <Accordion
            accordions={[
              {
                title: 'Is registration on the dbs free?',
                content:
                  'Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.',
                defaultOpen: true,
              },
              {
                title: "I'm new to dbs. How can I register for free?",
                content:
                  'Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.',
              },
              {
                title: 'How does dbs work for job seekers',
                content:
                  'Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.',
              },
              {
                title: 'How do I search for job adverts on the job portal?',
                content:
                  'Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.',
              },
              {
                title:
                  'What can I do so that multiple employers will contact me?',
                content:
                  'Motivation is not an accident or something that someone else can give you — you are the only one with the power to motivate you. Motivation cannot be an external force, it must come from within as the natural product of your desire to achieve something and your belief that you are capable to succeed at your goal. Success is something of which we all want more.',
              },
            ]}
            margin="0.5rem 0"
          />
        </Faqs>
      </FaqSection>
    </>
  );
};

export default React.memo(Faq);
