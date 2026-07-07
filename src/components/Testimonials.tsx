import SectionReveal from './SectionReveal';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { cakesByCategory, BRAND } from '../data/cakes';

const QUOTES = [
  {
    body: '"It was the centerpiece of our engagement — guests kept asking where I ordered it."',
    name: 'Sumaiya · Sylhet',
  },
  {
    body: '"Order was so easy. Message on WhatsApp, cake at the door the next day. Beautiful."',
    name: 'Rakib · Sunamganj',
  },
  {
    body: '"My mother teared up when she saw the Chapter 25 cake. Exactly what I hoped for."',
    name: 'Mahmud · Habiganj',
  },
];

export default function Testimonials() {
  // Pull a few real cake images to form a static "feed" grid below the quotes.
  const feedImages = [
    ...cakesByCategory('bridal').slice(0, 2),
    ...cakesByCategory('birthday').slice(0, 2),
    ...cakesByCategory('anniversary').slice(0, 2),
  ].map((c) => c.image);

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-12">
        <SectionReveal className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Loved in Sylhet</p>
            <h2 className="display mt-3 text-balance text-4xl leading-[1.05] md:text-5xl">
              Kind words from <span className="italic-accent">our clients.</span>
            </h2>
            <a
              href={BRAND.credit.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-burgundy"
            >
              <Instagram size={16} strokeWidth={1.5} /> Follow on Instagram
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 md:col-span-7 md:grid-cols-3 md:gap-6">
            {QUOTES.map((q, i) => (
              <motion.figure
                key={q.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3 border-l border-divider pl-5"
              >
                <blockquote className="font-serif text-lg leading-snug text-ink">
                  {q.body}
                </blockquote>
                <figcaption className="text-xs uppercase tracking-eyebrow text-muted">
                  — {q.name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-20">
          <p className="eyebrow mb-6">From the studio</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
            {feedImages.map((src, i) => (
              <a
                key={src + i}
                href={BRAND.credit.instagram}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl bg-surface"
                data-cursor="view"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-nightfall/0 transition-colors duration-500 group-hover:bg-nightfall/30" />
                <Instagram
                  size={18}
                  className="absolute bottom-3 right-3 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}