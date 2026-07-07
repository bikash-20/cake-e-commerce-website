import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { findCake } from '../data/cakes';
import { buildOrderMessage, whatsappOrderLink } from '../utils/whatsapp';
import { useMediaQuery } from '../hooks/useMedia';

const formatBDT = (n: number) => `৳${n.toLocaleString('en-IN')}`;

export default function CartDrawer() {
  const {
    items,
    note,
    delivery,
    subtotal,
    deliveryFee,
    total,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    setNote,
    setDelivery,
  } = useCart();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const waLink = useMemo(() => {
    if (items.length === 0) return '#';
    const message = buildOrderMessage({
      items,
      note,
      delivery,
      deliveryFee,
      subtotal,
      total,
    });
    return whatsappOrderLink(message);
  }, [items, note, delivery, deliveryFee, subtotal, total]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-nightfall/35 backdrop-blur-[2px]"
          />

          {/* panel — slide-over on desktop, bottom-sheet on mobile */}
          <motion.aside
            key="cart-panel"
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={
              isMobile
                ? 'fixed inset-x-0 bottom-0 top-16 z-[55] flex flex-col rounded-t-3xl bg-cream shadow-2xl'
                : 'fixed right-0 top-0 z-[55] flex h-full w-full max-w-[480px] flex-col bg-cream shadow-2xl'
            }
            aria-label="Cart"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-divider px-6 py-5 md:px-8">
              <div>
                <p className="eyebrow">Your Order</p>
                <h2 className="display text-2xl md:text-3xl">Cart</h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-divider text-ink transition-colors hover:border-ink"
              >
                <X size={14} />
              </button>
            </div>

            {/* items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-serif text-3xl text-ink">Nothing here yet</p>
                  <p className="mt-2 max-w-xs text-sm text-muted">
                    Pick a cake, choose a weight and we'll roll it into your cart.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => {
                    const cake = findCake(item.cakeId);
                    if (!cake) return null;
                    const w = cake.weights.find((wt) => wt.weight === item.weight);
                    if (!w) return null;
                    const addOnTotal = item.addOnIds.reduce((s, id) => {
                      const a = cake.addons?.find((aa) => aa.id === id);
                      return s + (a?.price ?? 0);
                    }, 0);
                    const unitPrice = w.price + addOnTotal;
                    return (
                      <li key={item.lineId} className="flex gap-4">
                        <img
                          src={cake.image}
                          alt={cake.name}
                          loading="lazy"
                          className="h-24 w-24 flex-shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="display text-lg leading-tight">{cake.name}</p>
                              <p className="mt-1 text-xs uppercase tracking-eyebrow text-muted">
                                {item.weight}kg · {formatBDT(w.price)}
                              </p>
                              {item.addOnIds.length > 0 && (
                                <ul className="mt-1 space-y-0.5 text-xs text-muted">
                                  {item.addOnIds.map((id) => {
                                    const a = cake.addons?.find((aa) => aa.id === id);
                                    if (!a) return null;
                                    return (
                                      <li key={id} className="flex items-center gap-2">
                                        <span className="h-1 w-1 rounded-full bg-gold" />
                                        {a.label}
                                        {a.price > 0 && (
                                          <span className="text-muted/80">+{formatBDT(a.price)}</span>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.lineId)}
                              aria-label={`Remove ${cake.name}`}
                              className="text-muted transition-colors hover:text-burgundy"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-divider">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() =>
                                  updateQuantity(item.lineId, Math.max(0, item.quantity - 1))
                                }
                                className="flex h-7 w-7 items-center justify-center text-ink"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="min-w-5 text-center text-sm font-medium tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center text-ink"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="text-sm font-medium text-ink">
                              {formatBDT(unitPrice * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {items.length > 0 && (
                <div className="mt-8 flex flex-col gap-5 border-t border-divider pt-6">
                  {/* delivery toggle */}
                  <div>
                    <p className="eyebrow mb-3">Delivery</p>
                    <div className="flex gap-2">
                      {(['inside', 'outside'] as const).map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setDelivery(loc)}
                          className={`flex-1 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                            delivery === loc
                              ? 'border-ink bg-ink text-cream'
                              : 'border-divider bg-cream text-ink hover:border-ink/50'
                          }`}
                        >
                          <span className="block font-medium">
                            {loc === 'inside' ? 'Inside Sylhet City' : 'Outside Sylhet City'}
                          </span>
                          <span
                            className={`mt-1 block text-xs ${
                              delivery === loc ? 'text-cream/70' : 'text-muted'
                            }`}
                          >
                            {formatBDT(loc === 'inside' ? 20 : 100)} delivery
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* note */}
                  <div>
                    <label htmlFor="cart-note" className="eyebrow mb-3 block">
                      Note (optional)
                    </label>
                    <textarea
                      id="cart-note"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Any message for the cake or delivery instructions?"
                      className="w-full resize-none rounded-xl border border-divider bg-cream px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* footer summary */}
            {items.length > 0 && (
              <div className="border-t border-divider bg-surface/60 px-6 py-6 md:px-8">
                <dl className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted">Subtotal</dt>
                    <dd className="tabular-nums">{formatBDT(subtotal)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted">Delivery</dt>
                    <dd className="tabular-nums">{formatBDT(deliveryFee)}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-divider pt-3">
                    <dt className="font-serif text-lg text-ink">Total</dt>
                    <dd className="font-serif text-2xl text-ink tabular-nums">
                      {formatBDT(total)}
                    </dd>
                  </div>
                </dl>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-burgundy px-6 py-4 text-sm font-medium text-cream transition-colors hover:bg-ink"
                >
                  Order on WhatsApp →
                </a>
                <p className="mt-3 text-center text-[11px] text-muted">
                  We'll confirm details and bake your cake fresh for delivery.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}