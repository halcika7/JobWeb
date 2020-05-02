import React, { FC, Ref, useState } from 'react';
import Accordion, { IAccordion } from './Accordion';

import './Accordion.scss';

interface AccordionWrapperProps {
  accordions: IAccordion[];
}

const AccordionWrapper: FC<AccordionWrapperProps> = ({
  accordions,
}): JSX.Element => {
  const [currentActive, setCurrentActive] = useState<Ref<HTMLDivElement>>(null);

  return (
    <section className="accordion-wrapper">
      {accordions.map(({ title, content, icon }) => (
        <Accordion
          title={title}
          content={content}
          icon={icon}
          key={`${title}-${content}`}
          currentActive={currentActive}
          setCurrentActive={setCurrentActive}
        />
      ))}
    </section>
  );
};

export default AccordionWrapper;
