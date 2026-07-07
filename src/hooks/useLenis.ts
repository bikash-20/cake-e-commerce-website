import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Bootstraps a single global Lenis smooth-scroll instance.
 * Respects `prefers-reduced-motion`. Returns nothing.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Hash-link interception — scroll to anchors via Lenis.
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.2 });
      // Update URL hash without instant jump
      history.replaceState(null, '', id);
    };
    document.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleClick);
      lenis.destroy();
    };
  }, []);
}