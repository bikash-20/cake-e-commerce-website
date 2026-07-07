import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePointer } from '../hooks/usePointer';

type Mode = 'default' | 'view' | 'order';

/**
 * Custom cursor: small dot + trailing ring.
 * Morphs to "View" / "Order" when hovering over marked targets.
 */
export default function CustomCursor() {
  const { x, y } = usePointer();
  const [mode, setMode] = useState<Mode>('default');
  const [enabled, setEnabled] = useState(false);

  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const rx = useSpring(dx, { stiffness: 220, damping: 28, mass: 0.6 });
  const ry = useSpring(dy, { stiffness: 220, damping: 28, mass: 0.6 });

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(supportsFinePointer);
    if (supportsFinePointer) document.documentElement.classList.add('has-custom-cursor');
    return () => document.documentElement.classList.remove('has-custom-cursor');
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const labelEl = target?.closest('[data-cursor]') as HTMLElement | null;
      if (labelEl) setMode(labelEl.dataset.cursor as Mode);
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-cursor]')) setMode('default');
    };
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    return () => {
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, [enabled]);

  useEffect(() => {
    dx.set(x);
    dy.set(y);
  }, [x, y, dx, dy]);

  if (!enabled) return null;

  const labelText =
    mode === 'view' ? 'View' : mode === 'order' ? 'Order' : '';

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/70 bg-cream/40 backdrop-blur-[2px] text-[10px] uppercase tracking-eyebrow text-ink"
        style={{ x: rx, y: ry }}
        animate={{
          scale: mode === 'default' ? 1 : 1.6,
          opacity: mode === 'default' ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      >
        <motion.span
          animate={{ opacity: labelText ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          className="font-sans font-medium text-ink"
        >
          {labelText}
        </motion.span>
      </motion.div>
    </>
  );
}