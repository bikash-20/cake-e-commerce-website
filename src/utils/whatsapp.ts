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
  isBn?: boolean;
}) {
  const { items, note, delivery, deliveryFee, subtotal, total, isBn = false } = args;
  const lines: string[] = [];

  if (isBn) {
    lines.push(`হ্যালো! আমি ${BRAND.name} থেকে কেক অর্ডার করতে চাই:`);
  } else {
    lines.push(`Hello! I'd like to place an order from ${BRAND.name}:`);
  }
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
        addOnLabels.push(isBn && addon.labelBn ? addon.labelBn : addon.label);
        addOnTotal += addon.price;
      }
    }

    const extras = addOnLabels.length ? ' + ' + addOnLabels.join(', ') : '';
    const unitPrice = w.price + addOnTotal;
    const qtyPrefix = item.quantity > 1 ? `${item.quantity}x ` : '';
    const cakeName = isBn && cake.nameBn ? cake.nameBn : cake.name;
    lines.push(
      `${idx + 1}. ${qtyPrefix}${cakeName} (${item.weight}${isBn ? ' কেজি' : 'kg'})${extras} — ${formatBDT(
        unitPrice * item.quantity,
      )}`,
    );
  });

  lines.push('');
  lines.push(`${isBn ? 'সাবটোটাল' : 'Subtotal'}: ${formatBDT(subtotal)}`);
  lines.push(
    `${isBn ? 'ডেলিভারি চার্জ' : 'Delivery'} (${
      delivery === 'inside'
        ? isBn
          ? 'সিলেট শহরের ভেতর'
          : 'Inside Sylhet'
        : isBn
        ? 'সিলেট শহরের বাইরে'
        : 'Outside Sylhet'
    }): ${formatBDT(deliveryFee)}`,
  );
  lines.push(`${isBn ? 'সর্বমোট (আলোচনা সাপেক্ষ)' : 'Total (Negotiable)'}: ${formatBDT(total)}`);
  lines.push('');
  lines.push(
    `${isBn ? 'ডেলিভারি এলাকা' : 'Delivery Location'}: ${
      delivery === 'inside'
        ? isBn
          ? 'সিলেট শহরের ভেতর'
          : 'Inside Sylhet'
        : isBn
        ? 'সিলেট শহরের বাইরে'
        : 'Outside Sylhet'
    }`,
  );
  if (note.trim()) {
    lines.push(`${isBn ? 'বার্তা / নির্দেশনা' : 'Note'}: ${note.trim()}`);
  }

  return lines.join('\n');
}

export function whatsappOrderLink(message: string) {
  return `https://wa.me/${BRAND.whatsappE164}?text=${encodeURIComponent(message)}`;
}