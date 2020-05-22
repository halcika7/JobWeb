import React, { FC, Ref, useState } from 'react';
import Accordion, { IAccordion } from './Accordion';

import { Wrapper } from './styled';

interface AccordionWrapperProps {
  accordions: IAccordion[];
  margin?: string;
}

const AccordionWrapper: FC<AccordionWrapperProps> = ({
  accordions,
  margin,
}): JSX.Element => {
  const [currentActive, setCurrentActive] = useState<Ref<HTMLDivElement>>(null);

  return (
    <Wrapper>
      {accordions.map(({ title, content, defaultOpen }) => (
        <Accordion
          title={title}
          content={content}
          defaultOpen={defaultOpen}
          key={`${title}-${content}`}
          currentActive={currentActive}
          setCurrentActive={setCurrentActive}
          margin={margin}
        />
      ))}
    </Wrapper>
  );
};

export default AccordionWrapper;
