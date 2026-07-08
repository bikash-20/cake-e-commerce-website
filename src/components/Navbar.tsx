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

  return (
    <motion.header
      initial={false}
      animate={{
        // Fully opaque cream so the hero never bleeds through at y=0
        // (previously 0.92 → 0.96, which let the dark cake photo show as
        // a thin band above the navbar on desktop).
        backgroundColor: 'rgba(244,239,233,1)',
        boxShadow: scrolled
          ? '0 1px 0 0 rgba(184,147,76,0.18), 0 8px 24px -16px rgba(42,38,34,0.18)'
          : '0 0 0 0 rgba(0,0,0,0)',
        backdropFilter: 'blur(0px)',
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40 border-0"
    >
      <div className="mx-auto flex h-16 max-w-editorial items-center justify-between px-6 md:h-20 md:px-12">
        {/* Logo */}
        <a href="#home" className="group flex items-baseline gap-3 text-ink no-underline">
          <span className="font-serif text-[22px] font-semibold leading-none text-ink md:text-[28px]">
            {BRAND.name}
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-eyebrow text-burgundy md:inline">
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
                className="group relative text-[13px] font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="text-[13px] font-medium text-ink/80 transition-colors hover:text-ink"
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
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-divider text-ink transition-colors hover:border-ink"
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
              className="items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-cream transition-colors hover:bg-burgundy"
            >
              Order Now
            </MagneticButton>
          )}

          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-divider text-ink"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
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