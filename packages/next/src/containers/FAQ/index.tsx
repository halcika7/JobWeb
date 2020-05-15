import React, { FC, useEffect } from 'react';

import Breadcrumb from '@components/UI/breadcrumb';
import Accordion from '@components/UI/accordion';
import Alert from '@components/UI/alert';
import Form from './FaqFormik';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps,
  StateToProps,
  DispatchToProps,
  Props,
} from './IFaq';
import { AppState } from '@store/RootReducer';

const Faq: FC<Props> = ({ message, resetMessage, resetState, status }) => {
  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/faq', text: 'FAQ' },
        ]}
      />

      <section className="faq container">
        <div className="form">
          <h1>Submit Your Question</h1>

          {status && message && (
            <Alert
              message={message}
              onClose={() => resetMessage()}
              type="success"
            />
          )}

          <Form status={status} disabled={!!message && !!status} />
        </div>
        <div className="faqs">
          <h1>Frequently Asked Questions</h1>
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
          />
        </div>
      </section>
    </>
  );
};

export default React.memo(
  connect<StateToProps, DispatchToProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )(Faq)
);
