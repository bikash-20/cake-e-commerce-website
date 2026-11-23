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
  labelBn?: string;
  price: number;
};

export type Cake = {
  id: string;
  name: string;
  nameBn?: string;
  description: string;
  descriptionBn?: string;
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
import diwali02 from '../assets/cakes/diwali/02-gold-truffle-alt.png';
import diwali03 from '../assets/cakes/diwali/03-gold-truffle-alt2.jpg';
import diwali04 from '../assets/cakes/diwali/04-gold-truffle-alt3.webp';

export const BIRTHDAY_ADDONS: AddOn[] = [
  { id: 'name', label: 'Custom name on cake', labelBn: 'কেকের ওপর কাস্টম নাম (ফ্রি)', price: 0 },
  { id: 'photo', label: 'Photo / edible print topper', labelBn: 'খাদ্যোপযোগী ফটো / এডিবল টপার', price: 150 },
  { id: 'acrylic', label: 'Acrylic topper', labelBn: 'এক্রিলিক টপার', price: 120 },
];

export const CAKES: Cake[] = [
  // ----- Bridal & Engagement -----
  {
    id: 'engaged-red-rose',
    name: '"Engaged" Red Rose Cake',
    nameBn: '"এনগেজড" রেড রোজ কেক',
    description:
      'Ivory fondant cake with delicate red sugar roses, interlocking rings topper, and an "Engaged" script in red.',
    descriptionBn:
      'আইভরি ফনডেন্ট কেক, লাল সুগার গোলাপ, ইন্টারলকিং রিং টপার এবং সুন্দর "Engaged" স্ক্রিপ্ট সহ অনন্য শিল্পকর্ম।',
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
    nameBn: 'ব্লাশ হার্ট লেইস কেক',
    description:
      'Heart-shaped blush fondant cake with white piped lace detail, sugar roses, and a gold "E & S" monogram with rings.',
    descriptionBn:
      'হাতে আঁকা ভিন্টেজ লেইস বর্ডার, মুক্তার কারুকাজ ও প্যাস্টেল ফ্লোরাল অ্যাকসেন্ট সহ ক্লাসিক রোমান্টিক হার্ট কেক।',
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
    nameBn: 'গোল্ডেন ব্লুম হার্ট কেক',
    description:
      'Heart-shaped white cake framed with handcrafted sugar florals, gold stars, and gold interlocking rings.',
    descriptionBn:
      'হাতে তৈরি সুগার ফ্লোরাল, গোল্ডেন স্টার ও সোনালী রিং দিয়ে ফ্রেম করা রাজকীয় হার্ট কেক।',
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
    nameBn: '"এনগেজড" বাটারক্রিম রাফল কেক',
    description:
      'Heart-shaped ivory buttercream cake with ruffled floral border and elegant hand-lettered "engaged" script.',
    descriptionBn:
      'সিল্কি বাটারক্রিম রাফল বর্ডার ও মার্জিত হ্যান্ড-লেটারিং স্ক্রিপ্ট সহ নিখুঁত বাগদান কেক।',
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
    nameBn: 'ক্রিমসন রোজ ব্রাইডাল বুকে কেক',
    description:
      'White cake crowned with a cascading half-moon of deep red and ivory roses, gold butterflies, and a personalized message.',
    descriptionBn:
      'ডিপ রেড ও আইভরি গোলাপের মনোরম হাফ-মুন ক্রিসেন্ট, গোল্ডেন প্রজাপতি ও কাস্টম বার্তা সহ জমকালো বিয়ের কেক।',
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
    nameBn: 'গোল্ডেন গানাশ ড্রিপ কেক',
    description:
      'Rich chocolate ganache drip cake with gold pearls and dark chocolate shards — a birthday classic.',
    descriptionBn:
      'সমৃদ্ধ ডার্ক চকলেট গানাশ ড্রিপ, চকলেট ট্রাফল ও গোল্ডেন মুক্তার সাজে জন্মদিনের ক্লাসিক ফেভারিট।',
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
    nameBn: 'ক্লাসিক চকলেট ড্রিপ কেক',
    description:
      'Smooth ivory buttercream with a glossy dark chocolate drip and crunchy pearls.',
    descriptionBn:
      'মসৃণ আইভরি বাটারক্রিম ও চকচকে ডার্ক চকলেট ড্রিপ সহ সুস্বাদু ক্রাঞ্চি পার্লের স্পেশাল কেক।',
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
    nameBn: 'রাস্টিক উড-বার্ক গোল্ড লিফ কেক',
    description:
      'Textured chocolate "bark" base with soft ivory top, gold leaf accents, and a custom acrylic topper.',
    descriptionBn:
      'টেক্সচার্ড চকলেট বার্ক ফিনিশ, ভোজ্য সোনার পাতা ও কাস্টম এক্রিলিক টপার সহ শৈল্পিক বার্থডে কেক।',
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
    nameBn: 'ক্যারামেল ব্লুম কেক',
    description:
      'Caramel buttercream brushstrokes with delicate gold-dusted florals — soft, warm, and elegant.',
    descriptionBn:
      'সল্টেড ক্যারামেল বাটারক্রিম ব্রাশস্ট্রোক এবং স্বর্ণালী সুগার ফ্লোরালের মার্জিত ও লোভনীয় স্বাদ।',
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
    nameBn: 'গোল্ড লিফ স্ক্রিপ্ট কেক',
    description:
      'Simple ivory cake with a gold-leaf edge and hand-piped "Happy Birthday" script — minimal and refined.',
    descriptionBn:
      'সিম্পল আইভরি ফ্রস্টিং, সোনার পাতার বর্ডার ও হ্যান্ড-পাইপড জন্মদিনের শুভেচ্ছা সহ মিনিমালিস্ট কেক।',
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
    nameBn: 'ওয়াইন অ্যান্ড আইভরি হাফ-মুন কেক',
    description:
      'Deep berry-wine fondant paired with an ivory "happy anniversary" panel, gold pearls, and gold flecks.',
    descriptionBn:
      'ডিপ ওয়াইন ও আইভরি ক্রিমের ওপর অর্ধচন্দ্রাকৃতির গোলাপের সাজ — ভালোবাসার আরেকটি বছর পূর্তির রোমান্স।',
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
    nameBn: 'ক্রিমসন গোল্ড-এজ এনিভার্সারি কেক',
    description:
      'Two-tone red and ivory cake with a rustic gold-painted edge, gold pearls, and a "Happy Anniversary" acrylic topper with double hearts.',
    descriptionBn:
      'দ্বৈত রঙের লাল ও আইভরি ফ্রস্টিং, সোনালী বর্ডার ও ডাবল হার্ট এক্রিলিক টপার সহ রোমান্টিক কেক।',
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
    nameBn: 'সিম্পল আইভরি স্ক্রিপ্ট কেক',
    description:
      'Clean ivory buttercream with a delicate shell border and hand-piped "Happy Anniversary" message — timeless and understated.',
    descriptionBn:
      'মার্জিত আইভরি বাটারক্রিম বর্ডার ও হাতে লেখা ভালোবাসার বার্তা — ক্লাসিক ও শালীন রূপ।',
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
    nameBn: '"চ্যাপ্টার ২৫" মাইলস্টোন কেক',
    description:
      'Petite ivory cake with soft pink and white sugar blossoms and gold-lettered milestone text — perfect for wedding-anniversary numbers.',
    descriptionBn:
      'কোমল গোলাপী ও সাদা সুগার ব্লসম সহ ২৫তম বা যেকোনো মাইলস্টোন বর্ষপূর্তির স্পেশাল মিনি কেক।',
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
    nameBn: 'রুবি রোজ রোমান্স কেক',
    description:
      'Ivory cake with a dramatic crescent of deep red and ivory roses, gold butterflies, and a personalized love note in gold script.',
    descriptionBn:
      'গভীর লাল ও আইভরি গোলাপের অর্ধচন্দ্রাকার মালা, গোল্ডেন প্রজাপতি ও কাস্টম প্রেমপত্র সহ রাজকীয় কেক।',
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
    nameBn: 'উৎসবের গোল্ড ট্রাফল কেক',
    description:
      'Rich dark chocolate cake with gold chocolate spheres, dark chocolate shards, and a gold "Diwali" script — for festive celebrations.',
    descriptionBn:
      'ডার্ক চকলেট কেক, গোল্ডেন চকলেট স্পিয়ার ও চকলেট শার্ড সহ যেকোনো আনন্দ উৎসবের কেন্দ্রবিন্দু।',
    category: 'diwali',
    image: diwali01,
    weights: [
      { weight: '1', price: 1300 },
      { weight: '1.5', price: 1750 },
      { weight: '2', price: 2250 },
    ],
  },
  {
    id: 'diwali-gold-leaf-dome',
    name: 'Diwali Gold Leaf Dome Cake',
    nameBn: 'গোল্ড লিফ ডোম ফেস্টিভ কেক',
    description:
      'Smooth chocolate ganache dome finished with hand-applied edible gold leaf and a halo of gold-dusted florals — a centrepiece for the festive table.',
    descriptionBn:
      'মসৃণ চকলেট গানাশ ডোম, ভোজ্য সোনার পাতা ও সোনালী ফুলের আবরণে তৈরি উৎসবমুখী নান্দনিক কেক।',
    category: 'diwali',
    image: diwali02,
    weights: [
      { weight: '1', price: 1450 },
      { weight: '1.5', price: 1950 },
      { weight: '2', price: 2500 },
    ],
  },
  {
    id: 'diwali-sparkler-round',
    name: 'Diwali Sparkler Round Cake',
    nameBn: 'স্পার্কলার ড্রিপ ফেস্টিভ কেক',
    description:
      'Round dark chocolate cake topped with a burst of gold sparklers, chocolate shards, and a personalised festive message on a gold plaque.',
    descriptionBn:
      'গোল্ডেন স্পার্কলার টপার, চকলেট ড্রিপ ও সোনালী ফলকে উৎসবের শুভেচ্ছা বার্তা সহ স্পেশাল কেক।',
    category: 'diwali',
    image: diwali03,
    weights: [
      { weight: '1', price: 1350 },
      { weight: '1.5', price: 1800 },
      { weight: '2', price: 2350 },
    ],
    addons: [
      { id: 'name', label: 'Custom name on cake', labelBn: 'কেকের ওপর কাস্টম নাম (ফ্রি)', price: 0 },
      { id: 'photo', label: 'Photo / edible print topper', labelBn: 'এডিবল প্রিন্ট টপার', price: 150 },
      { id: 'acrylic', label: 'Acrylic topper', labelBn: 'এক্রিলিক টপার', price: 120 },
      { id: 'sparklers', label: 'Gold sparkler topper set', labelBn: 'গোল্ডেন স্পার্কলার সেট', price: 200 },
    ],
  },
  {
    id: 'diwali-rangoli-hearts',
    name: 'Diwali Rangoli Hearts Cake',
    nameBn: 'রঙ্গোলি হার্টস ফেস্টিভ কেক',
    description:
      'Ivory fondant cake hand-painted with a gold rangoli motif, ruby accents, and a heart of sugar florals — sweet, festive, and shareable.',
    descriptionBn:
      'হাতে আঁকা গোল্ডেন রঙ্গোলি মোটিফ, রুবি অ্যাকসেন্ট এবং সুগার ফ্লোরাল হার্ট সহ মিষ্টি উৎসবের উপহার।',
    category: 'diwali',
    image: diwali04,
    weights: [
      { weight: '1', price: 1500 },
      { weight: '1.5', price: 2000 },
      { weight: '2', price: 2600 },
    ],
  },
];

// Convenience accessors ------------------------------------------------------
export const cakesByCategory = (cat: Cake['category']) =>
  CAKES.filter((c) => c.category === cat);

export const findCake = (id: string) => CAKES.find((c) => c.id === id);

export const getCakeName = (cake: Cake, isBn: boolean) =>
  isBn && cake.nameBn ? cake.nameBn : cake.name;

export const getCakeDescription = (cake: Cake, isBn: boolean) =>
  isBn && cake.descriptionBn ? cake.descriptionBn : cake.description;

// Delivery fees (BDT) --------------------------------------------------------
export const DELIVERY_FEE_INSIDE = 20;
export const DELIVERY_FEE_OUTSIDE = 100;

// Contact details ------------------------------------------------------------
export const BRAND = {
  name: 'Sugar & Sylhet',
  nameBn: 'সুগার অ্যান্ড সিলেট',
  tagline: 'Artisan Cake Studio',
  taglineBn: 'আর্টিসান কেক স্টুডিও',
  eyebrow: 'HANDCRAFTED IN SYLHET',
  eyebrowBn: 'সিলেটে তৈরি হোমমেড কেক',
  whatsappE164: '8801926240062',
  whatsappDisplay: '01926240062',
  email: 'bikashtalukder040@gmail.com',
  location: 'Sylhet, Bangladesh',
  locationBn: 'সিলেট, বাংলাদেশ',
  instagram: 'https://www.instagram.com/nt__delights?bqrl=MWM1ZW5nYW85MG42OQ==',
  instagramHandle: '@nt__delights',
  facebook: 'https://www.facebook.com/profile.php?id=61577923653790',
  credit: {
    name: 'Engineer Bikash Talukder',
    nameBn: 'ইঞ্জিনিয়ার বিকাশ তালুকদার',
    linkedin: 'https://www.linkedin.com/in/bikash-talukder-6497633b8/',
    instagram: 'https://www.instagram.com/talukder_20/',
    facebook: 'https://www.facebook.com/profile.php?id=61577923653790',
  },
} as const;
