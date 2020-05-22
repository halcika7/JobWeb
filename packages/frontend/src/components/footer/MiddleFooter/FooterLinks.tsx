/* eslint-disable security/detect-object-injection */
import React, { FC } from 'react';
import { FaCaretRight } from 'react-icons/fa';
import Link from 'next/link';

import { GridItem, Heading3, Ul, MiddleLink } from '../styled';

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
  <GridItem>
    <Heading3>{title}</Heading3>
    <Ul>
      {links[linksType].map(({ href, text }, index) => (
        <li key={`${href}${text}-${index + 2}]`}>
          <FaCaretRight />
          <Link href={href} passHref>
            <MiddleLink>{text}</MiddleLink>
          </Link>
        </li>
      ))}
    </Ul>
  </GridItem>
);

export default FooterLinks;
