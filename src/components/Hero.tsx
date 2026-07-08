import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from './MagneticButton';
import { BRAND } from '../data/cakes';
import heroImage from '../assets/cakes/birthday/alt-cake-12b.webp';

/**
 * Studio Atelier–style hero.
 * - Full-bleed background image with a strong center scrim so the headline
 *   reads cleanly even where the cake sprinkles are busiest.
 * - Centered editorial copy: eyebrow → headline → subtext → CTAs, with
 *   generous vertical rhythm on both mobile and desktop.
 * - The "Collection" teaser row is intentionally NOT inside this section
 *   — it lives in its own <CollectionsTeaser /> component rendered in
 *   App.tsx right below the hero, so nothing overlaps the headline or
 *   fights the cake image.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // Subtle parallax on the image only — keep copy rock-steady.
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const imgScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.05, reduce ? 1.05 : 1.14]
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-nightfall text-cream"
    >
      {/* Background image — full bleed */}
      <motion.div
        style={{ scale: imgScale, y }}
        className="absolute inset-0 -z-20"
        aria-hidden
      >
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Stronger scrim stack — keeps headline readable over busy sprinkles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-nightfall/70 via-nightfall/45 to-nightfall/80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(20,16,12,0.15)_0%,rgba(20,16,12,0.55)_75%)]"
      />

      {/* Centered editorial copy.
          - Top padding accounts for the fixed navbar (h-16 / h-20).
          - Bottom padding leaves clean breathing room before the
            CollectionsTeaser section that lives in App.tsx. */}
      <div className="relative z-10 mx-auto flex w-full max-w-editorial flex-1 flex-col items-center justify-center px-6 pb-24 pt-28 text-center md:px-12 md:pb-32 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] uppercase tracking-eyebrow text-cream/80"
        >
          Artisan Cakes, Made to Order
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display mx-auto mt-6 max-w-4xl text-balance font-serif text-[42px] leading-[1.04] text-cream sm:text-6xl md:mt-8 md:text-[88px] lg:text-[104px]"
        >
          Cakes Crafted for Your <span className="italic-accent">Sweetest</span>{' '}
          Moments
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-cream/85 md:mt-10 md:text-lg"
        >
          Handmade bridal, birthday and anniversary cakes — baked fresh in Sylhet
          and delivered with care to your doorstep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-4 md:mt-12"
        >
          <MagneticButton
            asLink
            href="#bridal"
            className="items-center justify-center gap-2 rounded-full bg-cream px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-gold hover:text-cream"
          >
            Explore Cakes <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton
            asLink
            href={`https://wa.me/${BRAND.whatsappE164}`}
            target="_blank"
            rel="noreferrer"
            className="items-center justify-center gap-2 rounded-full border border-cream/40 px-7 py-4 text-sm font-medium text-cream transition-colors hover:border-cream hover:bg-cream/10"
          >
            Order via WhatsApp
          </MagneticButton>
        </motion.div>

        {/* Bottom safe-area so the WhatsApp FAB never clips the hero copy. */}
        <div
          aria-hidden
          className="mt-12 h-8 sm:h-6 md:h-8"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        />
      </div>
    </section>
  );
}
