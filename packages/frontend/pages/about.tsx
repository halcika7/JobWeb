import React from 'react';
import dynamic from 'next/dynamic';
import HeadLayout from '@components/HeadLayout';

// Our custom easing
// const easing = [0.6, -0.05, 0.01, 0.99];

// animate: defines animation
// initial: defines initial state of animation or stating point.
// exit: defines animation when component exits

// Custom variant
// const fadeInUp = {
//   initial: {
//     y: 60,
//     opacity: 0,
//     transition: { duration: 0.6, ease: easing },
//   },
//   animate: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       ease: easing,
//     },
//   },
// };

// const stagger = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

const About = dynamic(() => import('@containers/About'));

export default function AboutPage() {
  return (
    <>
      <HeadLayout title="About" description="desc" path="about" />
      <About />
    </>
  );
}
