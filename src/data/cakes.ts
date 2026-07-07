// ============================================================================
//  Sugar & Sylhet — Single source of truth for cake menu + pricing (BDT)
//  All prices in Bangladeshi Taka. To edit pricing/weights, change here only.
// ============================================================================

export type WeightOption = {
  /** weight in kilograms as a string, e.g. "1", "1.5" */
  weight: string;
  /** price in BDT for this weight */
  price: number;
};

export type AddOn = {
  id: string;
  label: string;
  price: number;
};

export type Cake = {
  id: string;
  name: string;
  description: string;
  category: 'bridal' | 'birthday' | 'anniversary' | 'diwali';
  image: string;
  weights: WeightOption[];
  addons?: AddOn[];
};

import bridal01 from '../assets/cakes/bridal/01-engaged-red-rose.webp';
import bridal02 from '../assets/cakes/bridal/02-blush-heart-lace.jpg';
import bridal03 from '../assets/cakes/bridal/03-golden-bloom-heart.jpg';
import bridal04 from '../assets/cakes/bridal/04-engaged-buttercream-ruffle.jpg';
import bridal05 from '../assets/cakes/bridal/05-crimson-rose-bridal-bouquet.webp';

import birthday01 from '../assets/cakes/birthday/01-golden-ganache-drip.jpg';
import birthday02 from '../assets/cakes/birthday/02-classic-chocolate-drip.jpg';
import birthday03 from '../assets/cakes/birthday/03-rustic-wood-bark-gold-leaf.jpg';
import birthday04 from '../assets/cakes/birthday/04-caramel-bloom.jpg';
import birthday05 from '../assets/cakes/birthday/05-gold-leaf-script.webp';

import anniversary01 from '../assets/cakes/anniversary/01-wine-ivory-half-moon.webp';
import anniversary02 from '../assets/cakes/anniversary/02-crimson-gold-edge.jpg';
import anniversary03 from '../assets/cakes/anniversary/03-simple-ivory-script.webp';
import anniversary04 from '../assets/cakes/anniversary/04-chapter-25-milestone.jpg';
import anniversary05 from '../assets/cakes/anniversary/05-ruby-rose-romance.webp';

import diwali01 from '../assets/cakes/diwali/01-gold-truffle.jpg';

export const BIRTHDAY_ADDONS: AddOn[] = [
  { id: 'name', label: 'Custom name on cake', price: 0 },
  { id: 'photo', label: 'Photo / edible print topper', price: 150 },
  { id: 'acrylic', label: 'Acrylic topper', price: 120 },
];

export const CAKES: Cake[] = [
  // ----- Bridal & Engagement -----
  {
    id: 'engaged-red-rose',
    name: '"Engaged" Red Rose Cake',
    description:
      'Ivory fondant cake with delicate red sugar roses, interlocking rings topper, and an "Engaged" script in red.',
    category: 'bridal',
    image: bridal01,
    weights: [
      { weight: '1', price: 1400 },
      { weight: '1.5', price: 1950 },
      { weight: '2', price: 2500 },
    ],
  },
  {
    id: 'blush-heart-lace',
    name: 'Blush Heart Lace Cake',
    description:
      'Heart-shaped blush fondant cake with white piped lace detail, sugar roses, and a gold "E & S" monogram with rings.',
    category: 'bridal',
    image: bridal02,
    weights: [
      { weight: '1', price: 1600 },
      { weight: '1.5', price: 2150 },
      { weight: '2', price: 2750 },
    ],
  },
  {
    id: 'golden-bloom-heart',
    name: 'Golden Bloom Heart Cake',
    description:
      'Heart-shaped white cake framed with handcrafted sugar florals, gold stars, and gold interlocking rings.',
    category: 'bridal',
    image: bridal03,
    weights: [
      { weight: '1', price: 1750 },
      { weight: '1.5', price: 2300 },
      { weight: '2', price: 2950 },
    ],
  },
  {
    id: 'engaged-buttercream-ruffle',
    name: '"Engaged" Buttercream Ruffle Cake',
    description:
      'Heart-shaped ivory buttercream cake with ruffled floral border and elegant hand-lettered "engaged" script.',
    category: 'bridal',
    image: bridal04,
    weights: [
      { weight: '1', price: 1500 },
      { weight: '1.5', price: 2000 },
      { weight: '2', price: 2600 },
    ],
  },
  {
    id: 'crimson-rose-bridal-bouquet',
    name: 'Crimson Rose Bridal Bouquet Cake',
    description:
      'White cake crowned with a cascading half-moon of deep red and ivory roses, gold butterflies, and a personalized message.',
    category: 'bridal',
    image: bridal05,
    weights: [
      { weight: '1.5', price: 2600 },
      { weight: '2', price: 3300 },
      { weight: '3', price: 4300 },
    ],
  },

  // ----- Birthday -----
  {
    id: 'golden-ganache-drip',
    name: 'Golden Ganache Drip Cake',
    description:
      'Rich chocolate ganache drip cake with gold pearls and dark chocolate shards — a birthday classic.',
    category: 'birthday',
    image: birthday01,
    weights: [
      { weight: '1', price: 1100 },
      { weight: '1.5', price: 1500 },
      { weight: '2', price: 1950 },
    ],
    addons: BIRTHDAY_ADDONS,
  },
  {
    id: 'classic-chocolate-drip',
    name: 'Classic Chocolate Drip Cake',
    description:
      'Smooth ivory buttercream with a glossy dark chocolate drip and crunchy pearls.',
    category: 'birthday',
    image: birthday02,
    weights: [
      { weight: '1', price: 1000 },
      { weight: '1.5', price: 1350 },
      { weight: '2', price: 1750 },
    ],
    addons: BIRTHDAY_ADDONS,
  },
  {
    id: 'rustic-wood-bark-gold-leaf',
    name: 'Rustic Wood-Bark Gold Leaf Cake',
    description:
      'Textured chocolate "bark" base with soft ivory top, gold leaf accents, and a custom acrylic topper.',
    category: 'birthday',
    image: birthday03,
    weights: [
      { weight: '1', price: 1250 },
      { weight: '1.5', price: 1700 },
      { weight: '2', price: 2200 },
    ],
    addons: BIRTHDAY_ADDONS,
  },
  {
    id: 'caramel-bloom',
    name: 'Caramel Bloom Cake',
    description:
      'Caramel buttercream brushstrokes with delicate gold-dusted florals — soft, warm, and elegant.',
    category: 'birthday',
    image: birthday04,
    weights: [
      { weight: '1', price: 1150 },
      { weight: '1.5', price: 1550 },
      { weight: '2', price: 2000 },
    ],
    addons: BIRTHDAY_ADDONS,
  },
  {
    id: 'gold-leaf-script',
    name: 'Gold Leaf Script Cake',
    description:
      'Simple ivory cake with a gold-leaf edge and hand-piped "Happy Birthday" script — minimal and refined.',
    category: 'birthday',
    image: birthday05,
    weights: [
      { weight: '1', price: 950 },
      { weight: '1.5', price: 1300 },
      { weight: '2', price: 1650 },
    ],
    addons: BIRTHDAY_ADDONS,
  },

  // ----- Anniversary -----
  {
    id: 'wine-ivory-half-moon',
    name: 'Wine & Ivory Half-Moon Cake',
    description:
      'Deep berry-wine fondant paired with an ivory "happy anniversary" panel, gold pearls, and gold flecks.',
    category: 'anniversary',
    image: anniversary01,
    weights: [
      { weight: '1', price: 1450 },
      { weight: '1.5', price: 1950 },
      { weight: '2', price: 2500 },
    ],
  },
  {
    id: 'crimson-gold-edge',
    name: 'Crimson Gold-Edge Anniversary Cake',
    description:
      'Two-tone red and ivory cake with a rustic gold-painted edge, gold pearls, and a "Happy Anniversary" acrylic topper with double hearts.',
    category: 'anniversary',
    image: anniversary02,
    weights: [
      { weight: '1', price: 1500 },
      { weight: '1.5', price: 2000 },
      { weight: '2', price: 2600 },
    ],
  },
  {
    id: 'simple-ivory-script',
    name: 'Simple Ivory Script Cake',
    description:
      'Clean ivory buttercream with a delicate shell border and hand-piped "Happy Anniversary" message — timeless and understated.',
    category: 'anniversary',
    image: anniversary03,
    weights: [
      { weight: '1', price: 1000 },
      { weight: '1.5', price: 1350 },
      { weight: '2', price: 1750 },
    ],
  },
  {
    id: 'chapter-25',
    name: '"Chapter 25" Milestone Cake',
    description:
      'Petite ivory cake with soft pink and white sugar blossoms and gold-lettered milestone text — perfect for wedding-anniversary numbers.',
    category: 'anniversary',
    image: anniversary04,
    weights: [
      { weight: '0.5', price: 850 },
      { weight: '1', price: 1300 },
    ],
  },
  {
    id: 'ruby-rose-romance',
    name: 'Ruby Rose Romance Cake',
    description:
      'Ivory cake with a dramatic crescent of deep red and ivory roses, gold butterflies, and a personalized love note in gold script.',
    category: 'anniversary',
    image: anniversary05,
    weights: [
      { weight: '1.5', price: 2700 },
      { weight: '2', price: 3400 },
      { weight: '3', price: 4400 },
    ],
  },

  // ----- Diwali / Festive (bonus) -----
  {
    id: 'diwali-gold-truffle',
    name: 'Diwali Gold Truffle Cake',
    description:
      'Rich dark chocolate cake with gold chocolate spheres, dark chocolate shards, and a gold "Diwali" script — for festive celebrations.',
    category: 'diwali',
    image: diwali01,
    weights: [
      { weight: '1', price: 1300 },
      { weight: '1.5', price: 1750 },
      { weight: '2', price: 2250 },
    ],
  },
];

// Convenience accessors ------------------------------------------------------
export const cakesByCategory = (cat: Cake['category']) =>
  CAKES.filter((c) => c.category === cat);

export const findCake = (id: string) => CAKES.find((c) => c.id === id);

// Delivery fees (BDT) --------------------------------------------------------
export const DELIVERY_FEE_INSIDE = 20;
export const DELIVERY_FEE_OUTSIDE = 100;

// Contact details ------------------------------------------------------------
export const BRAND = {
  name: 'Sugar & Sylhet',
  tagline: 'Artisan Cake Studio',
  eyebrow: 'HANDCRAFTED IN SYLHET',
  whatsappE164: '8801926240062',
  whatsappDisplay: '01926240062',
  email: 'bikashtalukder040@gmail.com',
  location: 'Sylhet, Bangladesh',
  credit: {
    name: 'Engineer Bikash Talukder',
    linkedin: 'https://www.linkedin.com/in/bikash-talukder-6497633b8/',
    instagram: 'https://www.instagram.com/talukder_20/',
  },
} as const;