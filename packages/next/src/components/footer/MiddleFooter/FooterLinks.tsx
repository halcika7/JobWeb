/* eslint-disable security/detect-object-injection */
import React, { FC } from 'react';
import { FaCaretRight } from 'react-icons/fa';
import Link from 'next/link';

type link = 'candidates' | 'employers' | 'information';

type FooterLinksProps = {
  title: string;
  linksType: link;
};

type Links = {
  href: string;
  text: string;
};

type LinksObj = {
  candidates: Links[];
  employers: Links[];
  information: Links[];
};

const links: LinksObj = {
  candidates: [
    { href: '/', text: 'link' },
    { href: '/', text: 'link' },
    { href: '/', text: 'link' },
    { href: '/', text: 'link' },
  ],
  employers: [
    { href: '/', text: 'link' },
    { href: '/', text: 'link' },
    { href: '/', text: 'link' },
    { href: '/', text: 'link' },
  ],
  information: [
    { href: '/', text: 'link' },
    { href: '/', text: 'link' },
    { href: '/', text: 'link' },
    { href: '/', text: 'link' },
  ],
};

const FooterLinks: FC<FooterLinksProps> = ({
  title,
  linksType,
}): JSX.Element => (
  <div className="grid-item">
    <h3>{title}</h3>
    <ul>
      {links[linksType].map(({ href, text }, index) => {
        return (
          <li key={`${href}${text}-${index + 2}]`}>
            <FaCaretRight />
            <Link href={href}>
              <a>{text}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export default FooterLinks;
