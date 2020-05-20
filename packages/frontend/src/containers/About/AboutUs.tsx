import React from 'react';

import AccordionWrapper from '@components/UI/accordion';

import { ReactComponent as RightArrowCircle } from '@svgs/right-arrow-circle.svg';

import {
  AboutUsSection,
  AboutUsContent,
  AboutUsHeading,
  AboutUsParagraph,
  AboutUsIcons,
  Flex2,
  AboutUsIcon,
  AboutUsAccordion,
} from './styled';

const AboutUs = (): JSX.Element => (
  <AboutUsSection>
    <AboutUsContent>
      <AboutUsHeading>Who We Are</AboutUsHeading>
      <AboutUsParagraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam numquam,
        velit repudiandae non unde iure obcaecati voluptate dolorum architecto,
        quas quibusdam mollitia quae id aliquam nihil, vero molestias
        consequuntur. Similique, molestias! Iste, odit corrupti temporibus nisi
        laboriosam sunt suscipit aut laborum cumque illo, nulla id veniam, quos
        ipsum cum eos.
      </AboutUsParagraph>
      <AboutUsIcons>
        <Flex2>
          <AboutUsIcon>
            <RightArrowCircle />
            Audit & Assurance
          </AboutUsIcon>
          <AboutUsIcon>
            <RightArrowCircle />
            Bussiness Services
          </AboutUsIcon>
          <AboutUsIcon>
            <RightArrowCircle />
            IT Control Solutions
          </AboutUsIcon>
        </Flex2>
        <Flex2>
          <AboutUsIcon>
            <RightArrowCircle />
            Audit & Assurance
          </AboutUsIcon>
          <AboutUsIcon>
            <RightArrowCircle />
            Bussiness Services
          </AboutUsIcon>
          <AboutUsIcon>
            <RightArrowCircle />
            IT Control Solutions
          </AboutUsIcon>
        </Flex2>
      </AboutUsIcons>
    </AboutUsContent>
    <AboutUsAccordion>
      <AccordionWrapper
        accordions={[
          {
            title: 'Some title',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit quibusdam iure fugiat possimus cumque tempore molestiae, dignissimos in. Repellat soluta repudiandae facilis cum maxime ducimus impedit laborum cupiditate eum aliquid nobis ea provident ad explicabo, nemo modi. Rerum, alias omnis. Atque voluptates esse nesciunt laboriosam tempora fugit fuga aliquid consequuntur.',
          },
          {
            title: 'Some title two',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit quibusdam iure fugiat possimus cumque tempore molestiae, dignissimos in. Repellat soluta repudiandae facilis cum maxime ducimus impedit laborum cupiditate eum aliquid nobis ea provident ad explicabo, nemo modi. Rerum, alias omnis. Atque voluptates esse nesciunt laboriosam tempora fugit fuga aliquid consequuntur.',
          },
          {
            title: 'Some title three',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit quibusdam iure fugiat possimus cumque tempore molestiae, dignissimos in. Repellat soluta repudiandae facilis cum maxime ducimus impedit laborum cupiditate eum aliquid nobis ea provident ad explicabo, nemo modi. Rerum, alias omnis. Atque voluptates esse nesciunt laboriosam tempora fugit fuga aliquid consequuntur.',
          },
        ]}
        margin="0 0 0.2rem"
      />
    </AboutUsAccordion>
  </AboutUsSection>
);

export default AboutUs;
