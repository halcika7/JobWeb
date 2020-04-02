import React from 'react';
import { Link } from 'react-router-dom';

const RegisterSubmit = (): JSX.Element => (
  <div className="submit row">
    <div className="col-12 col-md-6">
      <button type="button">Sign up</button>
    </div>
    <p className="col-12 col-md-6">
      Already registered? <Link to="/login">Sign in here</Link>
    </p>
  </div>
);

export default React.memo(RegisterSubmit);
