import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from './MagneticButton';
import { BRAND } from '../data/cakes';
import { useLanguage } from '../context/LanguageContext';
import heroImage from '../assets/cakes/birthday/alt-cake-12b.webp';

/**
 * Studio Atelier–style hero.
 * - Full-bleed cake photo with a SOFT top-to-bottom gradient + soft
 *   radial vignette (no flat black wash).
 * - Centered editorial copy: eyebrow → headline → subtext → CTAs.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { t, isBn } = useLanguage();
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

      {/* Soft gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-nightfall/70 via-nightfall/15 to-nightfall/55"
      />
      {/* Soft corner vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(20,16,12,0)_45%,rgba(20,16,12,0.35)_100%)]"
      />

      {/* Centered editorial copy */}
      <div className="relative z-10 mx-auto flex w-full max-w-editorial flex-1 flex-col items-center justify-center px-6 pb-32 pt-32 text-center md:px-12 md:pb-40 md:pt-44 lg:pb-48 lg:pt-52">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] uppercase tracking-eyebrow text-cream/80"
        >
          {t('heroEyebrow')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display mx-auto mt-10 max-w-4xl text-balance font-serif text-[44px] leading-[1.08] tracking-[-0.01em] text-cream sm:text-[64px] sm:leading-[1.06] md:mt-14 md:text-[88px] md:leading-[1.05] md:tracking-[-0.015em] lg:text-[104px] lg:leading-[1.04]"
        >
          {t('heroHeadingLine1')}{' '}
          <span className="italic-accent text-[#E89AAA] [text-shadow:_0_1px_18px_rgba(232,154,170,0.35)]">
            {isBn ? 'মিষ্টি মুহূর্তের' : 'Sweetest'}
          </span>{' '}
          {isBn ? 'অনবদ্য কেক' : 'Moments'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-xl text-base leading-[1.7] text-cream/85 md:mt-16 md:text-lg md:leading-[1.75]"
        >
          {t('heroSubheading')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex w-full max-w-sm flex-col items-stretch justify-center gap-4 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-5 md:mt-20"
        >
          <MagneticButton
            asLink
            href="#bridal"
            className="items-center justify-center gap-2 rounded-full bg-cream px-9 py-[18px] text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold hover:text-cream"
          >
            {t('heroExploreMenu')} <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton
            asLink
            href={`https://wa.me/${BRAND.whatsappE164}`}
            target="_blank"
            rel="noreferrer"
            className="items-center justify-center gap-2 rounded-full border border-cream/40 px-9 py-[18px] text-[13px] font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
          >
            {t('heroChatWhatsApp')}
          </MagneticButton>
        </motion.div>

        {/* Bottom safe-area */}
        <div
          aria-hidden
          className="h-8 sm:h-6 md:h-8"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        />
      </div>
    </section>
  );
}
