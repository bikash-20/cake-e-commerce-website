import { useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Cake } from '../data/cakes';

const formatBDT = (n: number) => `৳${n.toLocaleString('en-IN')}`;

type Props = {
  cake: Cake;
  /** visual size — featured cards (e.g. first in row) are larger */
  variant?: 'default' | 'featured';
};

export default function CakeCard({ cake, variant = 'default' }: Props) {
  const { addItem } = useCart();
  const initialWeight = cake.weights[0].weight;
  const [weight, setWeight] = useState<string>(initialWeight);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const currentWeight = useMemo(
    () => cake.weights.find((w) => w.weight === weight) ?? cake.weights[0],
    [cake.weights, weight],
  );

  const addOnTotal = selectedAddOns.reduce((s, id) => {
    const a = cake.addons?.find((aa) => aa.id === id);
    return s + (a?.price ?? 0);
  }, 0);

  const totalPrice = currentWeight.price + addOnTotal;

  // Subtle parallax tilt on hover (CSS/Motion, not WebGL — keeps it light)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sx = useSpring(rotateX, { stiffness: 200, damping: 18 });
  const sy = useSpring(rotateY, { stiffness: 200, damping: 18 });
  const imgScale = useTransform(sx, [-10, 10], [1.06, 1.06]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 4);
    rotateX.set((py - 0.5) * -3);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const onAdd = () => {
    addItem({
      cakeId: cake.id,
      weight: currentWeight.weight,
      addOnIds: selectedAddOns,
      quantity: 1,
    });
  };

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ perspective: 1000 }}
      className={`group flex flex-col ${
        variant === 'featured' ? 'w-[88vw] sm:w-[480px]' : 'w-[78vw] sm:w-[340px]'
      }`}
      data-cursor="view"
    >
      <motion.div
        style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-2xl bg-surface"
      >
        <motion.img
          src={cake.image}
          alt={cake.name}
          loading="lazy"
          style={{ scale: imgScale }}
          className="aspect-[4/5] h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nightfall/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-end justify-between opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="rounded-full bg-cream/90 px-3 py-1 text-[10px] uppercase tracking-eyebrow text-ink">
            {cake.category}
          </span>
        </div>
      </motion.div>

      <div className="mt-5 flex flex-col gap-4">
        <div>
          <p className="eyebrow">{cake.category} Collection</p>
          <h3 className="display mt-1 text-xl leading-tight md:text-2xl">{cake.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{cake.description}</p>
        </div>

        {/* weight selector */}
        <div>
          <p className="eyebrow mb-2">Weight</p>
          <div className="flex flex-wrap gap-2">
            {cake.weights.map((w) => {
              const active = w.weight === weight;
              return (
                <button
                  key={w.weight}
                  type="button"
                  onClick={() => setWeight(w.weight)}
                  className={`flex flex-col items-start rounded-xl border px-3 py-2 text-left transition-colors ${
                    active
                      ? 'border-ink bg-ink text-cream'
                      : 'border-divider bg-cream text-ink hover:border-ink/50'
                  }`}
                >
                  <span className="text-xs font-medium">{w.weight}kg</span>
                  <span
                    className={`text-[11px] tabular-nums ${
                      active ? 'text-cream/70' : 'text-muted'
                    }`}
                  >
                    {formatBDT(w.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* add-ons (if any) */}
        {cake.addons && cake.addons.length > 0 && (
          <div>
            <p className="eyebrow mb-2">Add-ons</p>
            <div className="flex flex-col gap-1.5">
              {cake.addons.map((a) => {
                const active = selectedAddOns.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-divider px-3 py-2 text-sm transition-colors hover:border-ink/40"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${
                          active ? 'border-ink bg-ink text-cream' : 'border-divider bg-cream'
                        }`}
                      >
                        {active && (
                          <svg
                            viewBox="0 0 12 12"
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M2 6.5L5 9.5L10 3.5" />
                          </svg>
                        )}
                      </span>
                      <span className="text-ink">{a.label}</span>
                    </span>
                    <span className="text-xs text-muted tabular-nums">
                      {a.price === 0 ? 'Free' : `+${formatBDT(a.price)}`}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={active}
                      onChange={() => toggleAddOn(a.id)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* total + add to cart */}
        <div className="mt-1 flex items-center justify-between gap-3 border-t border-divider pt-4">
          <div>
            <p className="eyebrow">Total</p>
            <p className="font-serif text-2xl text-ink tabular-nums">{formatBDT(totalPrice)}</p>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-burgundy"
            data-cursor="order"
          >
            <Plus size={14} strokeWidth={1.6} />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.article>
  );
}