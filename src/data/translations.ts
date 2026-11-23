export type TranslationKey =
  // Navbar
  | 'navHome'
  | 'navBridal'
  | 'navBirthday'
  | 'navAnniversary'
  | 'navHowItWorks'
  | 'navContact'
  | 'navOrderNow'
  | 'navCart'
  | 'navLanguage'

  // Hero
  | 'heroEyebrow'
  | 'heroHeadingLine1'
  | 'heroHeadingAccent'
  | 'heroSubheading'
  | 'heroExploreMenu'
  | 'heroChatWhatsApp'
  | 'heroBadgeCustom'
  | 'heroBadgeDelivery'
  | 'heroBadgeFresh'

  // Collections Teaser
  | 'teaserBridalTitle'
  | 'teaserBridalDesc'
  | 'teaserBirthdayTitle'
  | 'teaserBirthdayDesc'
  | 'teaserAnniversaryTitle'
  | 'teaserAnniversaryDesc'

  // Category Sections
  | 'bridalEyebrow'
  | 'bridalHeading'
  | 'bridalHeadingAccent'
  | 'bridalDesc'
  | 'birthdayEyebrow'
  | 'birthdayHeading'
  | 'birthdayHeadingAccent'
  | 'birthdayDesc'
  | 'anniversaryEyebrow'
  | 'anniversaryHeading'
  | 'anniversaryHeadingAccent'
  | 'anniversaryDesc'
  | 'diwaliEyebrow'
  | 'diwaliHeading'
  | 'diwaliHeadingAccent'
  | 'diwaliDesc'

  // Cake Card
  | 'cardWeight'
  | 'cardKg'
  | 'cardAddToCart'
  | 'cardOrderWhatsApp'
  | 'cardAddons'
  | 'cardCustomMessage'
  | 'cardMessagePlaceholder'
  | 'cardNegotiable'

  // How It Works
  | 'howEyebrow'
  | 'howHeading'
  | 'step1Title'
  | 'step1Desc'
  | 'step2Title'
  | 'step2Desc'
  | 'step3Title'
  | 'step3Desc'
  | 'step4Title'
  | 'step4Desc'

  // Delivery Pricing
  | 'deliveryEyebrow'
  | 'deliveryHeading'
  | 'deliveryInsideTitle'
  | 'deliveryInsidePrice'
  | 'deliveryInsideDesc'
  | 'deliveryOutsideTitle'
  | 'deliveryOutsidePrice'
  | 'deliveryOutsideDesc'
  | 'deliveryNegotiableTitle'
  | 'deliveryNegotiableDesc'

  // Testimonials
  | 'testiEyebrow'
  | 'testiHeading'

  // Footer
  | 'footerEyebrow'
  | 'footerHeading'
  | 'footerHeadingAccent'
  | 'footerSubheading'
  | 'footerChatBtn'
  | 'footerOrCall'
  | 'footerPhone'
  | 'footerEmail'
  | 'footerLocation'
  | 'footerSylhet'
  | 'footerDesignedBy'

  // Cart Drawer
  | 'cartTitle'
  | 'cartEmptyTitle'
  | 'cartEmptyDesc'
  | 'cartDeliveryArea'
  | 'cartInsideSylhet'
  | 'cartOutsideSylhet'
  | 'cartSubtotal'
  | 'cartDelivery'
  | 'cartTotal'
  | 'cartNegotiableNote'
  | 'cartCheckoutWhatsApp'

  // Social & AI
  | 'connectBtn'
  | 'aiConciergeLauncher';

export const translations: Record<'en' | 'bn', Record<TranslationKey, string>> = {
  en: {
    // Navbar
    navHome: 'Home',
    navBridal: 'Bridal',
    navBirthday: 'Birthday',
    navAnniversary: 'Anniversary',
    navHowItWorks: 'How It Works',
    navContact: 'Contact',
    navOrderNow: 'Order Now',
    navCart: 'Cart',
    navLanguage: 'বাংলা',

    // Hero
    heroEyebrow: 'Artisan Cake Studio · Sylhet',
    heroHeadingLine1: 'Cakes Crafted for Your',
    heroHeadingAccent: 'Sweetest Moments.',
    heroSubheading:
      'Handmade bridal, birthday and anniversary cakes — baked fresh in Sylhet and delivered with care to your doorstep. Order via WhatsApp.',
    heroExploreMenu: 'Explore Menu',
    heroChatWhatsApp: 'Chat on WhatsApp',
    heroBadgeCustom: 'Bespoke Baking',
    heroBadgeDelivery: 'Delivery in Sylhet',
    heroBadgeFresh: 'Fresh Ingredients',

    // Collections Teaser
    teaserBridalTitle: 'Bridal Cakes',
    teaserBridalDesc: 'Tailored designs for engagements, mehndis, and the big day.',
    teaserBirthdayTitle: 'Birthday Cakes',
    teaserBirthdayDesc: 'Custom flavors, colors, and toppers for every age.',
    teaserAnniversaryTitle: 'Anniversary Cakes',
    teaserAnniversaryDesc: 'Timeless designs to celebrate love that lasts.',

    // Category Sections
    bridalEyebrow: 'Bridal Collection',
    bridalHeading: 'Say',
    bridalHeadingAccent: '“Yes” to the Perfect Cake',
    bridalDesc:
      'From engagement rings to wedding florals — heart-shaped, fondant, and buttercream cakes designed for your big day.',
    birthdayEyebrow: 'Birthday Collection',
    birthdayHeading: 'Make Every',
    birthdayHeadingAccent: 'Candle Count.',
    birthdayDesc:
      'Playful, elegant, and everything in between — birthday cakes designed around your favorite flavors and colors.',
    anniversaryEyebrow: 'Anniversary Collection',
    anniversaryHeading: 'Celebrate',
    anniversaryHeadingAccent: 'Every Chapter.',
    anniversaryDesc:
      'Rich, romantic cakes to mark another year of love — customizable with names, dates, and heartfelt messages.',
    diwaliEyebrow: 'Festive & Celebration',
    diwaliHeading: 'A Sweet Way to',
    diwaliHeadingAccent: 'Celebrate Light.',
    diwaliDesc:
      'Festive chocolate cakes with gold accents — for Diwali, Eid, and every occasion worth marking.',

    // Cake Card
    cardWeight: 'Weight',
    cardKg: 'kg',
    cardAddToCart: 'Add to Cart',
    cardOrderWhatsApp: 'Order via WhatsApp',
    cardAddons: 'Add-ons',
    cardCustomMessage: 'Custom name on cake:',
    cardMessagePlaceholder: 'e.g. Happy Birthday Ayan',
    cardNegotiable: 'Price Negotiable',

    // How It Works
    howEyebrow: 'How It Works',
    howHeading: 'From Oven to Celebration.',
    step1Title: '1. Choose Design & Weight',
    step1Desc: 'Browse our artisanal collections and pick the design and size that suits your event.',
    step2Title: '2. Add Custom Notes',
    step2Desc: 'Personalize with names, edible photo prints, acrylic toppers, and celebratory messages.',
    step3Title: '3. Confirm on WhatsApp',
    step3Desc: 'Send your cart directly to owner Bikash Talukder to confirm delivery time and negotiate pricing.',
    step4Title: '4. Handcrafted & Delivered',
    step4Desc: 'Baked fresh on your delivery day and carefully delivered to your doorstep in Sylhet.',

    // Delivery Pricing
    deliveryEyebrow: 'Delivery & Pricing',
    deliveryHeading: 'Clear, Care-Driven Delivery.',
    deliveryInsideTitle: 'Inside Sylhet City',
    deliveryInsidePrice: '৳20',
    deliveryInsideDesc: 'Direct doorstep delivery within Sylhet city limits.',
    deliveryOutsideTitle: 'Outside Sylhet',
    deliveryOutsidePrice: '৳100',
    deliveryOutsideDesc: 'Carefully packaged for suburbs and nearby zones.',
    deliveryNegotiableTitle: 'Flexible & Negotiable',
    deliveryNegotiableDesc: 'No price is strictly fixed. Discuss your budget directly with Bikash Talukder.',

    // Testimonials
    testiEyebrow: 'Testimonials',
    testiHeading: 'Loved in Every Slice.',

    // Footer
    footerEyebrow: 'Contact',
    footerHeading: "Let's Bake Something",
    footerHeadingAccent: 'Sweet.',
    footerSubheading:
      "Have a design in mind? Message us on WhatsApp or Facebook and let's plan your perfect cake.",
    footerChatBtn: 'Chat on WhatsApp →',
    footerOrCall: 'or call',
    footerPhone: 'Phone / WhatsApp',
    footerEmail: 'Email',
    footerLocation: 'Location',
    footerSylhet: 'Sylhet, Bangladesh',
    footerDesignedBy: 'Designed & Developed by',

    // Cart Drawer
    cartTitle: 'Your Order',
    cartEmptyTitle: 'Your bag is empty',
    cartEmptyDesc: 'Explore our artisan bakes and add your favorite cake to start ordering.',
    cartDeliveryArea: 'Delivery Area:',
    cartInsideSylhet: 'Inside Sylhet (৳20)',
    cartOutsideSylhet: 'Outside Sylhet (৳100)',
    cartSubtotal: 'Subtotal',
    cartDelivery: 'Delivery Fee',
    cartTotal: 'Estimated Total',
    cartNegotiableNote: '💡 Prices are flexible and can be negotiated with owner Bikash Talukder.',
    cartCheckoutWhatsApp: 'Proceed to WhatsApp →',

    // Social & AI
    connectBtn: 'Chat & Connect',
    aiConciergeLauncher: 'Ask AI Concierge',
  },

  bn: {
    // Navbar
    navHome: 'হোম',
    navBridal: 'ব্রাইডাল',
    navBirthday: 'জন্মদিন',
    navAnniversary: 'এনিভার্সারি',
    navHowItWorks: 'অর্ডার প্রক্রিয়া',
    navContact: 'যোগাযোগ',
    navOrderNow: 'অর্ডার করুন',
    navCart: 'কার্ট',
    navLanguage: 'English',

    // Hero
    heroEyebrow: 'আর্টিসান কেক স্টুডিও · সিলেট',
    heroHeadingLine1: 'আপনার বিশেষ মুহূর্তের জন্য',
    heroHeadingAccent: 'অনবদ্য স্বাদের কেক।',
    heroSubheading:
      'হাতে তৈরি ব্রাইডাল, জন্মদিন ও এনিভার্সারির কেক — সিলেটে একদম টাটকা বেক করে সরাসরি আপনার দোরগোড়ায় পৌঁছে দেওয়া হয়।',
    heroExploreMenu: 'কেক কালেকশন দেখুন',
    heroChatWhatsApp: 'হোয়াটসঅ্যাপে চ্যাট করুন',
    heroBadgeCustom: 'কাস্টম ডিজাইন',
    heroBadgeDelivery: 'সিলেটে হোম ডেলিভারি',
    heroBadgeFresh: '১০০% ফ্রেশ উপাদান',

    // Collections Teaser
    teaserBridalTitle: 'ব্রাইডাল কেক',
    teaserBridalDesc: 'বাগদান, মেহেন্দি ও বিয়ের জন্য বিশেষ ডিজাইনের কেক।',
    teaserBirthdayTitle: 'জন্মদিনের কেক',
    teaserBirthdayDesc: 'সব বয়সের জন্য পছন্দের ফ্লেভার, কালার ও কাস্টম টপার।',
    teaserAnniversaryTitle: 'এনিভার্সারি কেক',
    teaserAnniversaryDesc: 'ভালোবাসার স্মরণীয় দিনটিকে চিরন্তন করে রাখার মিষ্টি উপহার।',

    // Category Sections
    bridalEyebrow: 'ব্রাইডাল কালেকশন',
    bridalHeading: 'সেরা কেকটি দিয়েই বলুন',
    bridalHeadingAccent: '“হ্যাঁ”',
    bridalDesc:
      'এনগেজমেন্ট রিং থেকে বিয়ের ফ্লোরাল ডেকোরেশন — আপনার বিশেষ দিনের জন্য তৈরি নিখুঁত বাটারক্রিম ও ফনডেন্ট কেক।',
    birthdayEyebrow: 'বার্থডে কালেকশন',
    birthdayHeading: 'প্রতিটি মোমবাতি হোক',
    birthdayHeadingAccent: 'স্মরণীয় ও মিষ্টি।',
    birthdayDesc:
      'আনন্দময় ও মার্জিত — আপনার প্রিয় ফ্লেভার ও থিমে তৈরি জন্মদিনের স্পেশাল কেক।',
    anniversaryEyebrow: 'এনিভার্সারি কালেকশন',
    anniversaryHeading: 'উদযাপন করুন জীবনের',
    anniversaryHeadingAccent: 'প্রতিটি সোনালী অধ্যায়।',
    anniversaryDesc:
      'ভালোবাসার আরেকটি বছর পূর্তিতে রোমান্টিক কেক — নাম, তারিখ ও পছন্দের বার্তা যুক্ত করার সুবিধা সহ।',
    diwaliEyebrow: 'উৎসব ও উদযাপনের কেক',
    diwaliHeading: 'মিষ্টি মুখে উদযাপনের',
    diwaliHeadingAccent: 'সেরা উপহার।',
    diwaliDesc:
      'গোল্ডেন এক্সেন্ট ও প্রিমিয়াম চকোলেট কেক — ঈদ, দীপাবলি কিংবা যেকোনো উৎসবের জন্য।',

    // Cake Card
    cardWeight: 'ওজন',
    cardKg: 'কেজি',
    cardAddToCart: 'ব্যাগে যোগ করুন',
    cardOrderWhatsApp: 'হোয়াটসঅ্যাপে অর্ডার',
    cardAddons: 'অতিরিক্ত টপার',
    cardCustomMessage: 'কেকের ওপর নাম বা বার্তা:',
    cardMessagePlaceholder: 'যেমন: শুভ জন্মদিন আয়ান',
    cardNegotiable: 'দাম আলোচনা সাপেক্ষ',

    // How It Works
    howEyebrow: 'অর্ডার করার সহজ ধাপ',
    howHeading: 'ওভেন থেকে সরাসরি আপনার সেলিব্রেশনে।',
    step1Title: '১. ডিজাইন ও ওজন বাছাই করুন',
    step1Desc: 'আমাদের ক্যাটালগ থেকে পছন্দের ডিজাইন ও ওজন নির্বাচন করুন।',
    step2Title: '২. আপনার বার্তা যোগ করুন',
    step2Desc: 'কেকের ওপর নাম, ছবি বা স্পেশাল মেসেজ যুক্ত করুন।',
    step3Title: '৩. হোয়াটসঅ্যাপে কনফার্ম করুন',
    step3Desc: 'মালিক বিকাশ তালুকদারের সাথে সরাসরি কথা বলে অর্ডার চূড়ান্ত ও দাম নির্ধারণ করুন।',
    step4Title: '৪. টাটকা বেক ও হোম ডেলিভারি',
    step4Desc: 'ডেলিভারির দিন সকালে ফ্রেশ বেক করে সঠিক সময়ে আপনার ঠিকানায় পৌঁছে দেওয়া হয়।',

    // Delivery Pricing
    deliveryEyebrow: 'ডেলিভারি ও চার্জ',
    deliveryHeading: 'স্বচ্ছ ও নির্ভরযোগ্য ডেলিভারি সেবা।',
    deliveryInsideTitle: 'সিলেট শহরের ভেতর',
    deliveryInsidePrice: '২০ টাকা',
    deliveryInsideDesc: 'সিলেট শহরের যেকোনো ঠিকানায় মাত্র ২০ টাকায় হোম ডেলিভারি।',
    deliveryOutsideTitle: 'সিলেট শহরের বাইরে',
    deliveryOutsidePrice: '১০০ টাকা',
    deliveryOutsideDesc: 'শহরের পার্শ্ববর্তী এলাকার জন্য বিশেষ প্যাকেজিং সহ ডেলিভারি।',
    deliveryNegotiableTitle: 'দাম আলোচনা সাপেক্ষ',
    deliveryNegotiableDesc: 'কোনো দামই চূড়ান্ত নয়। আপনার বাজেট অনুযায়ী বিকাশ তালুকদারের সাথে কথা বলে ছাড় পান।',

    // Testimonials
    testiEyebrow: 'গ্রাহকদের মিষ্টি মতামত',
    testiHeading: 'প্রতিটি কামড়ে তৃপ্তি ও ভালোবাসা।',

    // Footer
    footerEyebrow: 'যোগাযোগ',
    footerHeading: 'আসুন তৈরি করি মিষ্টি কোনো',
    footerHeadingAccent: 'স্মৃতি।',
    footerSubheading:
      'বিশেষ কোনো ডিজাইন পছন্দ আছে? সরাসরি হোয়াটসঅ্যাপ বা ফেসবুকে মেসেজ পাঠিয়ে অর্ডার করুন।',
    footerChatBtn: 'হোয়াটসঅ্যাপে চ্যাট করুন →',
    footerOrCall: 'অথবা কল করুন',
    footerPhone: 'ফোন / হোয়াটসঅ্যাপ',
    footerEmail: 'ইমেইল',
    footerLocation: 'ঠিকানা',
    footerSylhet: 'সিলেট, বাংলাদেশ',
    footerDesignedBy: 'ডিজাইন ও ডেভেলপ করেছেন',

    // Cart Drawer
    cartTitle: 'আপনার অর্ডার ব্যাগ',
    cartEmptyTitle: 'আপনার ব্যাগে কোনো কেক নেই',
    cartEmptyDesc: 'আমাদের স্পেশাল কালেকশন থেকে পছন্দের কেকটি বেছে নিন।',
    cartDeliveryArea: 'ডেলিভারি এলাকা:',
    cartInsideSylhet: 'সিলেট শহরের ভেতর (৳২০)',
    cartOutsideSylhet: 'সিলেট শহরের বাইরে (৳১০০)',
    cartSubtotal: 'মোট মূল্য',
    cartDelivery: 'ডেলিভারি চার্জ',
    cartTotal: 'সর্বমোট আনুমানিক',
    cartNegotiableNote: '💡 অর্ডার কনফার্ম করার সময় বিকাশ তালুকদারের সাথে দাম আলোচনা করা যাবে।',
    cartCheckoutWhatsApp: 'হোয়াটসঅ্যাপে অর্ডার পাঠান →',

    // Social & AI
    connectBtn: 'যোগাযোগ করুন',
    aiConciergeLauncher: 'এআই কনসিয়ার্জ',
  },
};
