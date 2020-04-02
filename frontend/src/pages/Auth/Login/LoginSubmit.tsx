import React from 'react';
import { Link } from 'react-router-dom';

const LoginSubmit = () => (
  <div className="submit row">
    <div className="col-12 col-md-6">
      <button type="button">Login</button>
    </div>
    <p className="col-12 col-md-6">
      Don't have an account? <Link to="/registration">Sign up here</Link>
    </p>
  </div>
);

export default LoginSubmit;