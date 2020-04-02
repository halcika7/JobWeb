import React from 'react';
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const LoginSocial = () => (
  <fieldset className="mt-3">
    <legend>Login with</legend>
    <ul className="options login">
      <li>
        <a href="/" className="social facebook">
          <div className="wrap">
            <FaFacebookF />
            <div className="content">
              <p>Login with Facebook</p>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="/" className="social google">
          <div className="wrap">
            <FaGoogle />
            <div className="content">
              <p>Login with Google</p>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="/" className="social twitter">
          <div className="wrap">
            <FaTwitter />
            <div className="content">
              <p>Login with Twitter</p>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="/" className="social linkedin">
          <div className="wrap">
            <FaLinkedinIn />
            <div className="content">
              <p>Login with Linkedin</p>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </fieldset>
);

export default LoginSocial;
