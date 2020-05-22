import dynamic from 'next/dynamic';

const lazyImport = (filename: string) =>
  dynamic(() => import(`../${filename}`));

export default lazyImport;
