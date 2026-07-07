import { useEffect, useRef, useState } from 'react';

/** Tracks pointer position globally. Throttled via rAF. */
export function usePointer() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const queued = useRef<{ x: number; y: number } | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      queued.current = { x: e.clientX, y: e.clientY };
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        if (queued.current) setPos(queued.current);
        ticking.current = false;
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return pos;
}