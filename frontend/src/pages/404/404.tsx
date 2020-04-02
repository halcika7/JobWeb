import React from 'react';
import { Link } from 'react-router-dom';
import './404.scss';

const NotFound = (): JSX.Element => (
  <section className="not-found container">
    <div className="wp">
      <h1>Oops!</h1>
    </div>
    <h2>404 - Page not found</h2>
    <p>
      The page you are looking for might have been removed, had its name changed
      or is temporarily unavailable.
    </p>
    <Link to="/">Home</Link>
  </section>
);

export default React.memo(NotFound);
