import React, {
  FC,
  Ref,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { ReactComponent as Minus } from '@svgs/minus.svg';
import { ReactComponent as Plus } from '@svgs/plus.svg';

import styles from './Accordion.module.scss';

export type IAccordion = {
  title: string;
  content: string;
  defaultOpen?: boolean;
};

export interface AccordionProps {
  title: string;
  content: string;
  defaultOpen?: boolean;
  currentActive: Ref<HTMLDivElement>;
  setCurrentActive: (value: Ref<HTMLDivElement>) => void;
}

const accHeight = 45;
let loaded = false;

const Accordion: FC<AccordionProps> = ({
  title,
  content,
  defaultOpen,
  currentActive,
  setCurrentActive,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(accHeight);
  const [active, setActive] = useState<boolean>(false);

  const openAccordion = useCallback(
    (clientHeight: number) => {
      setHeight(height + clientHeight);
      setCurrentActive(contentRef);
      setActive(true);
    },
    [height, setCurrentActive]
  );

  const toggleAccordion = () => {
    const clientHeight = contentRef.current?.clientHeight || 0;
    if (height > accHeight) {
      setHeight(height - clientHeight);
      setCurrentActive(null);
      setActive(false);
    } else {
      openAccordion(clientHeight);
    }
  };

  useEffect(() => {
    if (!active && !loaded && defaultOpen) {
      const clientHeight = contentRef.current?.clientHeight || 0;
      openAccordion(clientHeight);
    }
  }, [defaultOpen, active, openAccordion]);

  useEffect(() => {
    if (currentActive !== contentRef && loaded) {
      setHeight(accHeight);
      setActive(false);
    } else {
      loaded = true;
    }
  }, [currentActive]);

  useEffect(() => {
    const windowResized = () => {
      if (active) {
        const clientHeight = contentRef.current?.clientHeight || 0;
        setHeight(accHeight + clientHeight);
      }
    };
    window.addEventListener('resize', windowResized);
    return () => {
      window.removeEventListener('resize', windowResized);
    };
  });

  return (
    <section
      className={
        active ? `${styles.accordion} ${styles.active}` : `${styles.accordion}`
      }
      style={{ height: `${height}px` }}
    >
      <button className={styles.title} type="button" onClick={toggleAccordion}>
        <p>{title}</p>
        {!active ? <Plus /> : <Minus />}
      </button>
      <div className={styles.accordion_content} ref={contentRef}>
        {content}
      </div>
    </section>
  );
};

export default React.memo(Accordion);
