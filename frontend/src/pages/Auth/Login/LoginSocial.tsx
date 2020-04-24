import React from 'react';

// icons
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const icons = [
  {
    id: 1,
    text: 'Facebook',
    href: '/',
    icon: <FaFacebookF />,
    aclass: 'facebook',
  },
  {
    id: 2,
    text: 'Google',
    href: '/',
    icon: <FaGoogle />,
    aclass: 'google',
  },
  {
    id: 3,
    text: 'Twitter',
    href: '/',
    icon: <FaTwitter />,
    aclass: 'twitter',
  },
  {
    id: 4,
    text: 'Linkedin',
    href: '/',
    icon: <FaLinkedinIn />,
    aclass: 'linkedin',
  },
];

const LoginSocial = () => (
  <fieldset className="mt-3">
    <legend>Login with</legend>
    <ul className="options login">
      {icons.map(({ id, aclass, href, icon, text }) => (
        <li key={id}>
          <a href={href} className={`social ${aclass}`}>
            <div className="wrap">
              {icon}
              <div className="content">
                <p>Login with {text}</p>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </fieldset>
);

export default React.memo(LoginSocial);
