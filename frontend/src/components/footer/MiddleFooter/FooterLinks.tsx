import React, { FC } from 'react';
import { FaCaretRight } from 'react-icons/fa';

interface FooterLinksProps {
  title: string;
  linksType: 'candidates' | 'employers' | 'information';
}

interface Links {
  href: string;
  text: string;
}

const links: {
  candidates: Links[];
  employers: Links[];
  information: Links[];
} = {
  candidates: [
    {
      href: '/',
      text: 'link',
    },
    {
      href: '/',
      text: 'link',
    },
    {
      href: '/',
      text: 'link',
    },
    {
      href: '/',
      text: 'link',
    },
  ],
  employers: [
    {
      href: '/',
      text: 'link',
    },
    {
      href: '/',
      text: 'link',
    },
    {
      href: '/',
      text: 'link',
    },
    {
      href: '/',
      text: 'link',
    },
  ],
  information: [
    {
      href: '/',
      text: 'link',
    },
    {
      href: '/',
      text: 'link',
    },
    {
      href: '/',
      text: 'link',
    },
    {
      href: '/',
      text: 'link',
    },
  ],
};

const FooterLinks: FC<FooterLinksProps> = ({ title, linksType }): JSX.Element => (
  <div className="grid-item">
    <h3>{title}</h3>
    <ul>
      {links[linksType].map(({ href, text }, index) => (
        <li key={`${href}${text}-${index}]`}>
          <FaCaretRight />
          <a href={href}>{text}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default React.memo(FooterLinks);
