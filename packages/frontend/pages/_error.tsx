import React from 'react';
import { NextPage } from 'next';
import NotFound from '@containers/404';
import HeadLayout from '@components/HeadLayout';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IError {
  statusCode?: number;
}

const Error: NextPage<IError> = ({ statusCode }) => {
  return (
    <>
      <HeadLayout title="Error Page" description="desc" path="404" />
      <NotFound
        code={statusCode}
        type={
          statusCode
            ? 'An error occured on server'
            : 'An error occured on client'
        }
      />
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res && res.statusCode && err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
