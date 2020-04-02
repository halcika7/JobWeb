import { ReactComponent as RightArrowCircle } from 'assets/svgs/right-arrow-circle.svg';
import AccordionWrapper from 'components/UI/accordion/AccordionWrapper';
import React from 'react';

const AboutUs = () => (
  <section className="about-us">
    <div className="content">
      <h3>Who We Are</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam numquam,
        velit repudiandae non unde iure obcaecati voluptate dolorum architecto,
        quas quibusdam mollitia quae id aliquam nihil, vero molestias
        consequuntur. Similique, molestias! Iste, odit corrupti temporibus nisi
        laboriosam sunt suscipit aut laborum cumque illo, nulla id veniam, quos
        ipsum cum eos.
      </p>
      <div className="about-us-icons">
        <div className="left">
          <div className="icon">
            <RightArrowCircle />
            Audit & Assurance
          </div>
          <div className="icon">
            <RightArrowCircle />
            Bussiness Services
          </div>
          <div className="icon">
            <RightArrowCircle />
            IT Control Solutions
          </div>
        </div>
        <div className="right">
          <div className="icon">
            <RightArrowCircle />
            Audit & Assurance
          </div>
          <div className="icon">
            <RightArrowCircle />
            Bussiness Services
          </div>
          <div className="icon">
            <RightArrowCircle />
            IT Control Solutions
          </div>
        </div>
      </div>
    </div>
    <div className="accordion">
      <AccordionWrapper
        accordions={[
          {
            title: 'Some dum title',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit quibusdam iure fugiat possimus cumque tempore molestiae, dignissimos in. Repellat soluta repudiandae facilis cum maxime ducimus impedit laborum cupiditate eum aliquid nobis ea provident ad explicabo, nemo modi. Rerum, alias omnis. Atque voluptates esse nesciunt laboriosam tempora fugit fuga aliquid consequuntur.',
          },
          {
            title: 'Some dum title two',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit quibusdam iure fugiat possimus cumque tempore molestiae, dignissimos in. Repellat soluta repudiandae facilis cum maxime ducimus impedit laborum cupiditate eum aliquid nobis ea provident ad explicabo, nemo modi. Rerum, alias omnis. Atque voluptates esse nesciunt laboriosam tempora fugit fuga aliquid consequuntur.',
          },
          {
            title: 'Some dum title three',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit quibusdam iure fugiat possimus cumque tempore molestiae, dignissimos in. Repellat soluta repudiandae facilis cum maxime ducimus impedit laborum cupiditate eum aliquid nobis ea provident ad explicabo, nemo modi. Rerum, alias omnis. Atque voluptates esse nesciunt laboriosam tempora fugit fuga aliquid consequuntur.',
          },
        ]}
      />
    </div>
  </section>
);

export default AboutUs;
