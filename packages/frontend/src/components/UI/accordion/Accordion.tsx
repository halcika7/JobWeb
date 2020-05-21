import React, {
  FC,
  Ref,
  useEffect,
  useCallback,
  useRef,
  useState,
  memo,
} from 'react';
import { ReactComponent as Minus } from '@svgs/minus.svg';
import { ReactComponent as Plus } from '@svgs/plus.svg';

import { AccordionElement, Button, Content, Paragraph } from './styled';

export type IAccordion = {
  title: string;
  content: string;
  defaultOpen?: boolean;
};

export interface AccordionProps {
  title: string;
  content: string;
  margin?: string;
  defaultOpen?: boolean;
  currentActive: Ref<HTMLDivElement>;
  setCurrentActive: (value: Ref<HTMLDivElement>) => void;
}

const accHeight = 45;

const Accordion: FC<AccordionProps> = ({
  title,
  content,
  margin,
  defaultOpen,
  currentActive,
  setCurrentActive,
}) => {
  const [height, setHeight] = useState<number>(accHeight);
  const [active, setActive] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = useCallback(() => {
    const clientHeight = contentRef.current?.clientHeight || 0;
    if (height > accHeight) {
      setHeight(height - clientHeight);
      setCurrentActive(null);
      setActive(false);
    } else {
      setHeight(height + clientHeight);
      setCurrentActive(contentRef);
      setActive(true);
    }
  }, [height, setCurrentActive]);

  const windowResized = useCallback(() => {
    if (active) {
      const clientHeight = contentRef.current?.clientHeight || 0;
      setHeight(accHeight + clientHeight);
    }
  }, [active]);

  useEffect(() => {
    if (defaultOpen && !loaded) {
      toggleAccordion();
    }
    setLoaded(true);
  }, [defaultOpen, loaded, toggleAccordion]);

  useEffect(() => {
    if (currentActive !== contentRef && loaded) {
      setHeight(accHeight);
      setActive(false);
    }
  }, [currentActive, loaded]);

  useEffect(() => {
    window.addEventListener('resize', windowResized);
    return () => {
      window.removeEventListener('resize', windowResized);
    };
  }, [windowResized]);

  return (
    <AccordionElement style={{ height: `${height}px` }} margin={margin}>
      <Button type="button" onClick={toggleAccordion}>
        <Paragraph>{title}</Paragraph>
        {!active ? <Plus /> : <Minus />}
      </Button>
      <Content ref={contentRef}>{content}</Content>
    </AccordionElement>
  );
};

export default memo(Accordion);
