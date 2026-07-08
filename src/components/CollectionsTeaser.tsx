import { motion } from 'framer-motion';

type Tile = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
};

const TILES: Tile[] = [
  {
    title: 'Bridal Cakes',
    desc: 'Tailored designs for engagements, mehndis, and the big day.',
    href: '#bridal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 3l1.6 3.2L17 7l-3 2.6.9 3.7L12 11.4 9.1 13.3l.9-3.7L7 7l3.4-.8L12 3z" />
        <path d="M5 16h14v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3z" />
        <path d="M7 16v-2a5 5 0 0 1 10 0v2" />
      </svg>
    ),
  },
  {
    title: 'Birthday Cakes',
    desc: 'Custom flavors, colors, and toppers for every age.',
    href: '#birthday',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 21h16" />
        <path d="M5 21V11h14v10" />
        <path d="M5 11l3-5h8l3 5" />
        <path d="M12 6V3" />
        <path d="M12 3c-1 1.2-1 2 0 3 1-1 1-1.8 0-3z" />
      </svg>
    ),
  },
  {
    title: 'Anniversary Cakes',
    desc: 'Timeless designs to celebrate love that lasts.',
    href: '#anniversary',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" />
      </svg>
    ),
  },
];

/**
 * Studio Atelier–style three-up row.
 * - Lives OUTSIDE the hero, on the cream page background, so cards never
 *   collide with the headline, the navbar, or the WhatsApp FAB.
 * - Each card is a clean editorial tile: small circular icon, eyebrow
 *   label, serif title, short description, soft hover lift.
 * - On mobile: stacks vertically with comfortable padding so nothing
 *   clips at the screen edge.
 */
export default function CollectionsTeaser() {
  return (
    <section
      aria-labelledby="collections-heading"
      className="relative bg-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-editorial px-6 md:px-12">
        <div className="mb-10 flex flex-col items-start gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-burgundy">Collections</p>
            <h2
              id="collections-heading"
              className="display mt-3 max-w-xl text-balance font-serif text-3xl leading-[1.1] text-ink md:text-5xl"
            >
              One studio. <span className="italic-accent">Three</span> cake
              moods.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-base">
            Pick a starting point — every cake below is fully customizable in
            flavor, size, and design.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {TILES.map((t, i) => (
            <motion.a
              key={t.title}
              href={t.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="group flex flex-col gap-4 rounded-2xl border border-divider bg-surface/60 p-6 transition-colors hover:border-ink md:p-8"
              data-cursor="view"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-divider bg-cream text-burgundy transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-cream">
                <span className="block h-6 w-6">{t.icon}</span>
              </span>
              <p className="text-[10px] uppercase tracking-eyebrow text-muted">
                Collection
              </p>
              <h3 className="font-serif text-2xl text-ink md:text-3xl">
                {t.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                {t.desc}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 text-[13px] font-medium text-ink transition-colors group-hover:text-burgundy">
                Explore{' '}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
