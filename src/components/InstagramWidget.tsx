import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X, ExternalLink, Check, Sparkles, Heart } from 'lucide-react';
import { BRAND } from '../data/cakes';

import preview1 from '../assets/cakes/bridal/01-engaged-red-rose.webp';
import preview2 from '../assets/cakes/birthday/01-golden-ganache-drip.jpg';
import preview3 from '../assets/cakes/anniversary/01-wine-ivory-half-moon.webp';

interface InstagramWidgetProps {
  /** Optional controlled state or initial open status */
  defaultOpen?: boolean;
}

export default function InstagramWidget({ defaultOpen = false }: InstagramWidgetProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const [showGallery, setShowGallery] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.instagram);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <aside aria-label="Instagram Profile" className="fixed bottom-6 left-5 z-40 sm:left-6">
      {/* Expanded Profile Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="mb-3 w-[min(calc(100vw-2.5rem),340px)] overflow-hidden rounded-2xl border border-divider/80 bg-cream/95 p-5 text-ink shadow-[0_20px_45px_-15px_rgba(33,29,25,0.35)] backdrop-blur-md"
            role="dialog"
            aria-modal="false"
            aria-labelledby="ig-card-title"
          >
            {/* Header: Profile & Controls */}
            <div className="flex items-start justify-between gap-3 border-b border-divider/60 pb-3.5">
              <div className="flex items-center gap-3">
                {/* Instagram Gradient Ring Avatar */}
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] shadow-sm">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-cream text-burgundy">
                    <Instagram size={20} className="text-[#dc2743]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-cream bg-[#25D366]">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 id="ig-card-title" className="font-serif text-lg font-semibold leading-tight text-ink">
                      {BRAND.instagramHandle}
                    </h3>
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
                    Official Instagram
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Instagram panel"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-divider/70 text-muted transition-colors hover:border-ink hover:text-ink"
              >
                <X size={14} />
              </button>
            </div>

            {/* Bio & Location */}
            <div className="pt-3">
              <p className="text-xs leading-relaxed text-ink/80">
                Freshly baked bespoke cakes in Sylhet. Follow for daily designs, wedding showcases, and order updates.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-0.5 text-[10px] font-medium text-ink/75">
                  <Sparkles size={11} className="text-gold" /> Artisan Studio
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-0.5 text-[10px] font-medium text-ink/75">
                  📍 Sylhet, Bangladesh
                </span>
              </div>
            </div>

            {/* Interactive Toggle for Gallery Feed */}
            <div className="mt-3.5 flex items-center justify-between border-y border-divider/40 py-2">
              <span className="text-[11px] font-medium text-ink/70">
                {showGallery ? 'Hide visual highlights' : 'Show visual highlights'}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={showGallery}
                onClick={() => setShowGallery((prev) => !prev)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  showGallery ? 'bg-burgundy' : 'bg-divider'
                }`}
              >
                <span className="sr-only">Toggle highlights</span>
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    showGallery ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Visual Highlights Preview */}
            <AnimatePresence>
              {showGallery && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-3 gap-1.5 pt-3">
                    <a
                      href={BRAND.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden rounded-lg bg-surface shadow-xs"
                    >
                      <img
                        src={preview1}
                        alt="Bridal Cake preview"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <Heart size={14} className="fill-white text-white" />
                      </div>
                    </a>
                    <a
                      href={BRAND.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden rounded-lg bg-surface shadow-xs"
                    >
                      <img
                        src={preview2}
                        alt="Birthday Cake preview"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <Heart size={14} className="fill-white text-white" />
                      </div>
                    </a>
                    <a
                      href={BRAND.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden rounded-lg bg-surface shadow-xs"
                    >
                      <img
                        src={preview3}
                        alt="Anniversary Cake preview"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <Heart size={14} className="fill-white text-white" />
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTAs */}
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-105"
              >
                <Instagram size={14} />
                <span>Follow on Instagram</span>
                <ExternalLink size={12} className="opacity-80 transition-transform group-hover:translate-x-0.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-divider bg-white/70 py-2 text-xs font-medium text-ink transition-colors hover:bg-white hover:border-ink/50"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <span>Copy Instagram Link</span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Capsule Trigger */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle Instagram quick view"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group flex items-center gap-2.5 rounded-full border border-divider/90 bg-cream/95 px-3.5 py-2 text-xs font-medium text-ink shadow-[0_12px_28px_-10px_rgba(33,29,25,0.25)] backdrop-blur-md transition-all duration-300 hover:border-ink hover:bg-cream"
      >
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-xs">
          <Instagram size={13} />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#dc2743] ring-2 ring-cream" />
        </span>
        <span className="font-serif text-sm font-semibold tracking-wide text-ink">
          {BRAND.instagramHandle}
        </span>
        <span
          className={`flex h-4 w-7 items-center rounded-full p-0.5 transition-colors duration-200 ${
            isOpen ? 'bg-burgundy' : 'bg-divider'
          }`}
        >
          <span
            className={`h-3 w-3 rounded-full bg-white shadow-xs transition-transform duration-200 ${
              isOpen ? 'translate-x-3' : 'translate-x-0'
            }`}
          />
        </span>
      </motion.button>
    </aside>
  );
}
