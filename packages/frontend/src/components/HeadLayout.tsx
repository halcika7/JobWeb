import React, { FC } from 'react';
import Head from 'next/head';

interface HeadProps {
  title: string;
  description: string;
  path: string;
}

const HeadLayout: FC<HeadProps> = ({ title, description, path }) => (
  <Head>
    <meta name="description" content={description} />

    <meta name="og:title" content={`${title} | DBS`} />
    <meta name="og:url" content={`https://djinasopo.netlify.app/${path}`} />
    <meta name="og:image" content="http://ia.media-imdb.com/rock.jpg" />
    <meta name="og:description" content={description} />

    <link rel="canonical" href={`https://djinasopo.netlify.app/${path}.html`} />
    <title>{title} | DBS</title>
  </Head>
);

export default HeadLayout;
