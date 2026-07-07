import { findCake, BRAND, type AddOn } from '../data/cakes';
import type { CartItem } from '../context/CartContext';

const formatBDT = (n: number) => `৳${n.toLocaleString('en-IN')}`;

/** Build a complete, pre-filled WhatsApp message for the entire cart. */
export function buildOrderMessage(args: {
  items: CartItem[];
  note: string;
  delivery: 'inside' | 'outside';
  deliveryFee: number;
  subtotal: number;
  total: number;
}) {
  const { items, note, delivery, deliveryFee, subtotal, total } = args;
  const lines: string[] = [];

  lines.push(`Hello! I'd like to place an order from ${BRAND.name}:`);
  lines.push('');

  items.forEach((item, idx) => {
    const cake = findCake(item.cakeId);
    if (!cake) return;
    const w = cake.weights.find((wt) => wt.weight === item.weight);
    if (!w) return;

    const addOnLabels: string[] = [];
    let addOnTotal = 0;
    for (const id of item.addOnIds) {
      const addon: AddOn | undefined = cake.addons?.find((a) => a.id === id);
      if (addon) {
        addOnLabels.push(addon.label);
        addOnTotal += addon.price;
      }
    }

    const extras = addOnLabels.length ? ' + ' + addOnLabels.join(', ') : '';
    const unitPrice = w.price + addOnTotal;
    const qtyPrefix = item.quantity > 1 ? `${item.quantity}x ` : '';
    lines.push(
      `${idx + 1}. ${qtyPrefix}${cake.name} (${item.weight}kg)${extras} — ${formatBDT(
        unitPrice * item.quantity,
      )}`,
    );
  });

  lines.push('');
  lines.push(`Subtotal: ${formatBDT(subtotal)}`);
  lines.push(
    `Delivery (${delivery === 'inside' ? 'Inside Sylhet' : 'Outside Sylhet'}): ${formatBDT(
      deliveryFee,
    )}`,
  );
  lines.push(`Total: ${formatBDT(total)}`);
  lines.push('');
  lines.push(`Delivery Location: ${delivery === 'inside' ? 'Inside Sylhet' : 'Outside Sylhet'}`);
  if (note.trim()) {
    lines.push(`Note: ${note.trim()}`);
  }

  return lines.join('\n');
}

export function whatsappOrderLink(message: string) {
  return `https://wa.me/${BRAND.whatsappE164}?text=${encodeURIComponent(message)}`;
}