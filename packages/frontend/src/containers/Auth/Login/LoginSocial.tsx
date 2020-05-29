import React, { ReactNode } from 'react';

import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

import {
  Fieldset,
  Legend,
  FieldsetOptions,
  FieldsetOptionsLi,
  FieldsetButton,
  FieldsetWrap,
} from '../styled';

interface Icon {
  id: number;
  text: string;
  href: string;
  icon: ReactNode;
  color: string;
}

const icons: Icon[] = [
  {
    id: 1,
    text: 'Facebook',
    href: `${process.env.BACKEND_URL}/auth/facebook`,
    icon: <FaFacebookF />,
    color: '#4267b2',
  },
  {
    id: 2,
    text: 'Google',
    href: `${process.env.BACKEND_URL}/auth/google`,
    icon: <FaGoogle />,
    color: '#d34836',
  },
  {
    id: 3,
    text: 'Twitter',
    href: `${process.env.BACKEND_URL}/auth/twitter`,
    icon: <FaTwitter />,
    color: '#1da1f2',
  },
  {
    id: 4,
    text: 'Linkedin',
    href: `${process.env.BACKEND_URL}/auth/linkedin`,
    icon: <FaLinkedinIn />,
    color: '#0077b5',
  },
];

const LoginSocial = () => (
  <Fieldset marginTop="3rem">
    <Legend>Login with</Legend>
    <FieldsetOptions login={1}>
      {icons.map(({ id, color, href, icon, text }) => (
        <FieldsetOptionsLi key={id}>
          <FieldsetButton as="a" href={href} color={color}>
            <FieldsetWrap social={1}>
              {icon}
              <div className="content">
                <p>Login with {text}</p>
              </div>
            </FieldsetWrap>
          </FieldsetButton>
        </FieldsetOptionsLi>
      ))}
    </FieldsetOptions>
  </Fieldset>
);

export default React.memo(LoginSocial);
