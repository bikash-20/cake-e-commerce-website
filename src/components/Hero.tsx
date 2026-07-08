import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from './MagneticButton';
import { BRAND } from '../data/cakes';
import heroImage from '../assets/cakes/birthday/alt-cake-12b.webp';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.18]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.42, reduce ? 0.42 : 0.58]);
  // Feature strip is now fully static — no scroll-driven fade.

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex flex-col overflow-hidden bg-nightfall text-cream md:flex md:min-h-[100svh] md:items-center md:justify-center"
    >
      {/* background image — full bleed (covers the whole section incl. mobile flow) */}
      <motion.div style={{ scale: imgScale, y }} className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
        <motion.div
          style={{ opacity: overlay }}
          className="absolute inset-0 bg-nightfall"
        />
      </motion.div>

      {/* editorial hairline at top removed — was duplicating navbar branding
          and overlapping the nav links. Navbar now sits cleanly on its own. */}

      {/* Top spacer so the eyebrow doesn't sit under the fixed navbar on mobile */}
      <div className="h-20 md:hidden" aria-hidden />

      <div className="relative mx-auto w-full max-w-editorial px-6 pb-16 pt-10 text-center md:px-12 md:pb-24 md:pt-32">
        {/* Soft radial scrim behind the headline — keeps the type centered & elegant
            without leaning on a hard top border. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-b from-nightfall/55 via-nightfall/25 to-nightfall/70 md:from-nightfall/45 md:via-transparent md:to-nightfall/60"
        />
        {/* Vignette to focus the eye on the centered copy */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(20,16,12,0.45)_75%)]"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-[11px] uppercase tracking-eyebrow text-cream/80"
        >
          Artisan Cakes, Made to Order
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display mx-auto max-w-4xl text-balance font-serif text-[44px] leading-[1.04] text-cream sm:text-6xl md:text-[88px] lg:text-[104px]"
        >
          Cakes Crafted for Your <span className="italic-accent">Sweetest</span> Moments
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg"
        >
          Handmade bridal, birthday and anniversary cakes — baked fresh in Sylhet and delivered
          with care to your doorstep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
      </div>

      {/* Static 3-card feature strip — in flow on mobile, absolute overlay on desktop.
          No top hairline, no inter-card dividers: reads as floating cards on the hero. */}
      <div
        className="relative z-10 mt-12 px-6 pb-6 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:px-12 md:pb-10"
      >
        <div className="mx-auto grid max-w-editorial grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {[
            {
              t: 'Bridal Cakes',
              d: 'Elegant designs for engagements and weddings.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path d="M12 3l1.6 3.2L17 7l-3 2.6.9 3.7L12 11.4 9.1 13.3l.9-3.7L7 7l3.4-.8L12 3z" />
                  <path d="M5 16h14v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3z" />
                  <path d="M7 16v-2a5 5 0 0 1 10 0v2" />
                </svg>
              ),
            },
            {
              t: 'Birthday Cakes',
              d: 'Custom flavors and toppers for every age.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path d="M4 21h16" />
                  <path d="M5 21V11h14v10" />
                  <path d="M5 11l3-5h8l3 5" />
                  <path d="M12 6V3" />
                  <path d="M12 3c-1 1.2-1 2 0 3 1-1 1-1.8 0-3z" />
                </svg>
              ),
            },
            {
              t: 'Anniversary Cakes',
              d: 'Timeless designs to celebrate love that lasts.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" />
                </svg>
              ),
            },
          ].map((f) => (
            <div
              key={f.t}
              className="flex flex-col gap-2 rounded-xl border border-cream/15 bg-nightfall/55 px-5 py-5 backdrop-blur-sm md:px-6 md:py-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream/85">
                {f.icon}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-eyebrow text-cream/55">
                Collection
              </span>
              <p className="font-serif text-xl text-cream md:text-2xl">{f.t}</p>
              <p className="text-sm text-cream/70">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}