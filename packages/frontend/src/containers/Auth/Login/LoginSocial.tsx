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
    href: '/',
    icon: <FaFacebookF />,
    color: '#4267b2',
  },
  {
    id: 2,
    text: 'Google',
    href: '/',
    icon: <FaGoogle />,
    color: '#d34836',
  },
  {
    id: 3,
    text: 'Twitter',
    href: '/',
    icon: <FaTwitter />,
    color: '#1da1f2',
  },
  {
    id: 4,
    text: 'Linkedin',
    href: '/',
    icon: <FaLinkedinIn />,
    color: '#0077b5',
  },
];

const LoginSocial = () => (
  <Fieldset marginTop="3rem">
    <Legend>Login with</Legend>
    <FieldsetOptions login>
      {icons.map(({ id, color, href, icon, text }) => (
        <FieldsetOptionsLi key={id}>
          <FieldsetButton as="a" href={href} color={color}>
            <FieldsetWrap social>
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
