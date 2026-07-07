/**
 * Fixed-position grain overlay across the whole site.
 * Lives at z-60 so it sits above content but below modals.
 */
export default function GrainOverlay({ soft = false }: { soft?: boolean }) {
  return <div aria-hidden className={`grain-overlay ${soft ? 'grain-overlay--soft' : ''}`} />;
}