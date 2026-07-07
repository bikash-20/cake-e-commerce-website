import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  style?: CSSProperties;
  strength?: number;
  ariaLabel?: string;
  /** When true, render as a plain <a> tag with href */
  asLink?: boolean;
  target?: '_blank' | '_self';
  rel?: string;
  cursorLabel?: 'view' | 'order';
};

/**
 * Magnetic button that shifts subtly toward the cursor on hover.
 * Pure CSS/Motion — no WebGL needed. Used for the CTA buttons.
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  style,
  strength = 0.35,
  ariaLabel,
  asLink,
  target,
  rel,
  cursorLabel,
}: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 22, mass: 0.5 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const dataCursorAttr = cursorLabel ? { 'data-cursor': cursorLabel } : {};

  if (asLink) {
    return (
      <motion.a
        ref={(node) => {
          ref.current = node;
        }}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ x: sx, y: sy, ...style }}
        className={`inline-flex ${className}`}
        {...dataCursorAttr}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={(node) => {
        ref.current = node;
      }}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy, ...style }}
      className={`inline-flex ${className}`}
      {...dataCursorAttr}
    >
      {children}
    </motion.button>
  );
}