import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Optional element override */
  as?: 'div' | 'section' | 'article' | 'header' | 'aside';
  /** Stagger child reveals */
  stagger?: boolean;
  id?: string;
};

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  as = 'div',
  stagger = false,
  id,
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      id={id}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -80px 0px' }}
      transition={{
        duration: reduce ? 0.4 : 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {stagger ? (
        <StaggerChildren reduce={!!reduce}>{children}</StaggerChildren>
      ) : (
        children
      )}
    </MotionTag>
  );
}

function StaggerChildren({
  children,
  reduce,
}: {
  children: ReactNode;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: reduce
            ? { staggerChildren: 0.05 }
            : { staggerChildren: 0.08, delayChildren: 0.1 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}