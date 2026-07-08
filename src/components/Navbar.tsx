import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND } from '../data/cakes';
import MagneticButton from './MagneticButton';
import { useMediaQuery } from '../hooks/useMedia';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#bridal', label: 'Bridal' },
  { href: '#birthday', label: 'Birthday' },
  { href: '#anniversary', label: 'Anniversary' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#contact', label: 'Contact' },
];

/**
 * Transparent navbar that overlays the hero.
 * - Over the hero (top of page): fully transparent, light text/icons so
 *   the cake image is visible behind it.
 * - After scrolling past the hero: fades to a soft cream tint with dark
 *   text so links stay readable on the cream site background.
 * - Mobile drawer remains a solid cream panel below the bar (it's an
 *   overlay sheet, not part of the bar itself).
 */
export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Theme tokens driven by the same `scrolled` state so we never have
  // to recompute on every render.
  const overHero = !scrolled;
  const navBg = overHero
    ? 'rgba(0,0,0,0)' // transparent over hero
    : 'rgba(244,239,233,0.92)'; // faint cream tint once past hero
  const navShadow = overHero
    ? '0 0 0 0 rgba(0,0,0,0)'
    : '0 1px 0 0 rgba(184,147,76,0.18), 0 8px 24px -16px rgba(42,38,34,0.18)';
  const navBlur = overHero ? 'blur(0px)' : 'blur(10px)';

  const linkBase =
    'group relative text-[13px] font-medium transition-colors duration-300';
  const linkIdle = overHero ? 'text-cream/85 hover:text-cream' : 'text-ink/80 hover:text-ink';
  const linkActive = overHero ? 'text-cream' : 'text-ink';
  const linkUnderline = overHero ? 'bg-cream' : 'bg-ink';

  const cartBtn =
    'relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ' +
    (overHero
      ? 'border border-cream/40 text-cream hover:border-cream hover:bg-cream/10'
      : 'border border-divider text-ink hover:border-ink');
  const mobileBtn =
    'flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ' +
    (overHero
      ? 'border border-cream/40 text-cream hover:border-cream'
      : 'border border-divider text-ink');

  return (
    <motion.header
      initial={false}
      animate={{ backgroundColor: navBg, boxShadow: navShadow, backdropFilter: navBlur }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      data-nav-theme={overHero ? 'dark' : 'light'}
      className="fixed inset-x-0 top-0 z-40 border-0"
    >
      <div className="mx-auto flex h-16 max-w-editorial items-center justify-between px-6 md:h-20 md:px-12">
        {/* Logo — cream over hero, ink once scrolled */}
        <a href="#home" className="group flex items-baseline gap-3 no-underline">
          <span
            className={
              'font-serif text-[22px] font-semibold leading-none transition-colors duration-300 md:text-[28px] ' +
              (overHero ? 'text-cream' : 'text-ink')
            }
          >
            {BRAND.name}
          </span>
          <span
            className={
              'hidden text-[10px] font-semibold uppercase tracking-eyebrow transition-colors duration-300 md:inline ' +
              (overHero ? 'text-cream/70' : 'text-burgundy')
            }
          >
            {BRAND.eyebrow}
          </span>
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.slice(1, 5).map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-nav-link
                data-nav-theme={overHero ? 'dark' : 'light'}
                className={`${linkBase} ${linkIdle}`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${linkUnderline}`}
                />
              </a>
            ))}
            <a
              href="#contact"
              data-nav-link
              data-nav-theme={overHero ? 'dark' : 'light'}
              className={`${linkBase} ${linkIdle}`}
            >
              Contact
            </a>
          </nav>
        )}

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            data-nav-theme={overHero ? 'dark' : 'light'}
            className={cartBtn}
            data-cursor="order"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-medium text-cream"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {!isMobile && (
            <MagneticButton
              asLink
              href={`https://wa.me/${BRAND.whatsappE164}`}
              target="_blank"
              rel="noreferrer"
              data-nav-theme={overHero ? 'dark' : 'light'}
              className={
                'items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors duration-300 ' +
                (overHero
                  ? 'border border-cream/40 text-cream hover:border-cream hover:bg-cream/10'
                  : 'bg-ink text-cream hover:bg-burgundy')
              }
            >
              Order Now
            </MagneticButton>
          )}

          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              data-nav-theme={overHero ? 'dark' : 'light'}
              className={mobileBtn}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer — solid cream panel, sits below the transparent bar. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden"
          >
            <div className="mx-6 mb-6 flex flex-col divide-y divide-divider rounded-2xl bg-cream/95 px-6 py-2 shadow-[0_30px_60px_-30px_rgba(42,38,34,0.35)] backdrop-blur">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-4 text-lg font-serif text-ink"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={`https://wa.me/${BRAND.whatsappE164}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="py-4 text-base font-medium text-burgundy"
              >
                Order Now →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}