import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';

type Props = {
  id: string;
  eyebrow: string;
  /** plain string for headline; children allow italic accent injection */
  heading: ReactNode;
  description: string;
  /** Right-aligned editorial number, like "02" */
  index: string;
  children: ReactNode;
  /** Swap column layout — left column vs right column heading */
  align?: 'left' | 'right';
};

export default function CategorySection({
  id,
  eyebrow,
  heading,
  description,
  index,
  children,
  align = 'left',
}: Props) {
  return (
    <section id={id} className="relative scroll-mt-24 py-20 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-12">
        <SectionReveal className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Index column */}
          <div className={`md:col-span-2 ${align === 'right' ? 'md:order-3' : ''}`}>
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-muted">{index}</span>
              <span className="h-px w-10 bg-divider" />
            </div>
          </div>

          {/* Heading column */}
          <div
            className={`md:col-span-6 ${
              align === 'right' ? 'md:order-2 md:col-start-3' : ''
            }`}
          >
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display mt-3 text-balance text-4xl leading-[1.05] md:text-6xl">
              {heading}
            </h2>
          </div>

          {/* Description column */}
          <div
            className={`md:col-span-4 ${
              align === 'right' ? 'md:order-1 md:col-start-9' : 'md:col-start-9'
            }`}
          >
            <p className="max-w-sm text-base leading-relaxed text-muted">{description}</p>
          </div>
        </SectionReveal>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-20"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}