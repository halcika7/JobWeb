import React from 'react';
import dynamic from 'next/dynamic';
import HeadLayout from '@components/HeadLayout';

const About = dynamic(() => import('@containers/About'));

export default function AboutPage() {
  return (
    <>
      <HeadLayout title="About" description="desc" path="about" />
      <About />
    </>
  );
}
