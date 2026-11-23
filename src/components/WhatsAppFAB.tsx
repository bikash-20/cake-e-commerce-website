import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from '../data/cakes';
import { Instagram, Facebook, Phone, X, MessageCircle, ExternalLink } from 'lucide-react';

export default function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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

  const socialLinks = [
    {
      id: 'whatsapp',
      label: 'WhatsApp Chat',
      sublabel: BRAND.whatsappDisplay,
      href: `https://wa.me/${BRAND.whatsappE164}`,
      bgColor: 'bg-[#25D366]',
      hoverBg: 'hover:bg-[#20bd5a]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      id: 'instagram',
      label: 'Instagram',
      sublabel: BRAND.instagramHandle,
      href: BRAND.instagram,
      bgColor: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      hoverBg: 'hover:brightness-110',
      icon: <Instagram size={15} />,
    },
    {
      id: 'facebook',
      label: 'Facebook Profile',
      sublabel: 'Bikash Talukder',
      href: BRAND.facebook,
      bgColor: 'bg-[#1877F2]',
      hoverBg: 'hover:bg-[#166fe5]',
      icon: <Facebook size={15} />,
    },
    {
      id: 'call',
      label: 'Direct Phone',
      sublabel: `Call ${BRAND.whatsappDisplay}`,
      href: `tel:+${BRAND.whatsappE164}`,
      bgColor: 'bg-gold',
      hoverBg: 'hover:bg-gold/90',
      icon: <Phone size={15} />,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-5 z-40 sm:bottom-6 sm:right-6"
    >
      {/* Expandable Speed Dial Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-3 flex flex-col items-end gap-2.5"
          >
            {socialLinks.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                target={item.id === 'call' ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ delay: index * 0.04, duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-3 rounded-full border border-divider/70 bg-cream/95 py-2 pl-3.5 pr-2.5 text-xs text-ink shadow-[0_10px_25px_-8px_rgba(33,29,25,0.25)] backdrop-blur-md transition-all hover:scale-103 hover:border-ink"
              >
                <div className="text-right">
                  <p className="font-semibold leading-tight text-ink">{item.label}</p>
                  <p className="text-[10px] text-muted">{item.sublabel}</p>
                </div>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-white shadow-xs transition-transform group-hover:scale-110 ${item.bgColor} ${item.hoverBg}`}
                >
                  {item.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Toggle FAB */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle contact channels"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group flex items-center gap-2.5 rounded-full px-4 py-3 text-sm font-medium text-white shadow-[0_18px_35px_-12px_rgba(37,211,102,0.6)] transition-all duration-300 sm:px-4.5 ${
          isOpen
            ? 'bg-nightfall text-cream shadow-[0_18px_35px_-12px_rgba(33,29,25,0.6)]'
            : 'bg-[#25D366] hover:shadow-[0_22px_45px_-12px_rgba(37,211,102,0.85)]'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="font-serif font-medium tracking-wide">
          {isOpen ? 'Close' : 'Chat & Connect'}
        </span>
      </motion.button>
    </div>
  );
}
