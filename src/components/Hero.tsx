import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from './MagneticButton';
import { BRAND } from '../data/cakes';
import heroImage from '../assets/cakes/bridal/02-blush-heart-lace.jpg';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.18]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.58, reduce ? 0.58 : 0.72]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex flex-col overflow-hidden bg-nightfall text-cream md:flex md:min-h-[100svh] md:items-end"
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

      <div className="relative mx-auto w-full max-w-editorial px-6 pb-12 pt-4 md:px-12 md:pb-36 md:pt-44">
        {/* Local contrast scrim — strengthens readability of subtitle + CTAs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-t from-nightfall/85 via-nightfall/45 to-transparent md:from-nightfall/90 md:via-nightfall/55"
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
          className="display max-w-5xl text-balance font-serif text-[44px] leading-[1.02] text-cream sm:text-6xl md:text-[88px] lg:text-[104px]"
        >
          Cakes Crafted for Your <span className="italic-accent">Sweetest</span> Moments
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg"
        >
          Handmade bridal, birthday and anniversary cakes — baked fresh in Sylhet and delivered
          with care to your doorstep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
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

      {/* 3-column feature strip — in flow on mobile, absolute overlay on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-12 border-t border-cream/15 bg-nightfall/40 backdrop-blur-[1px] md:absolute md:inset-x-0 md:bottom-0 md:mt-0"
      >
        <div className="mx-auto grid max-w-editorial grid-cols-1 divide-y divide-cream/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            { t: 'Bridal Cakes', d: 'Elegant designs for engagements and weddings.' },
            { t: 'Birthday Cakes', d: 'Custom flavors and toppers for every age.' },
            { t: 'Anniversary Cakes', d: 'Timeless designs to celebrate love that lasts.' },
          ].map((f, i) => (
            <div
              key={f.t}
              className="flex flex-col gap-2 px-6 py-6 md:px-10 md:py-7"
            >
              <span className="text-[10px] uppercase tracking-eyebrow text-cream/55">
                0{i + 1} · Collection
              </span>
              <p className="font-serif text-xl text-cream md:text-2xl">{f.t}</p>
              <p className="text-sm text-cream/70">{f.d}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}