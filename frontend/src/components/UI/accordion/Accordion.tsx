import { ReactComponent as Minus } from 'assets/svgs/minus.svg';
import { ReactComponent as Plus } from 'assets/svgs/plus.svg';
import React, {
  FC,
  ReactElement,
  Ref,
  useEffect,
  useRef,
  useState,
} from 'react';

export type IAccordion = {
  title: string;
  content: string;
  icon?: ReactElement;
};

export interface AccordionProps {
  title: string;
  content: string;
  icon?: ReactElement;
  currentActive: Ref<HTMLDivElement>;
  setCurrentActive: (value: Ref<HTMLDivElement>) => void;
}

const accHeight = 45;

const Accordion: FC<AccordionProps> = ({
  title,
  content,
  icon,
  currentActive,
  setCurrentActive,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(accHeight);
  const [active, setActive] = useState<boolean>(false);

  const toggleAccordion = () => {
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
  };

  const windowResized = () => {
    if (active) {
      const clientHeight = contentRef.current?.clientHeight || 0;
      setHeight(accHeight + clientHeight);
    }
  };

  useEffect(() => {
    if (currentActive !== contentRef) {
      setHeight(accHeight);
      setActive(false);
    }
  }, [currentActive]);

  useEffect(() => {
    window.addEventListener('resize', windowResized);
    return () => {
      window.removeEventListener('resize', windowResized);
    };
  });

  return (
    <section
      className={active ? 'accordion active' : 'accordion'}
      style={{ height: `${height}px` }}
    >
      <button className="title" type="button" onClick={toggleAccordion}>
        {title}
        {!active ? <Plus /> : <Minus />}
      </button>
      <div className="accordion-content" ref={contentRef}>
        {content}
      </div>
    </section>
  );
};

export default Accordion;
