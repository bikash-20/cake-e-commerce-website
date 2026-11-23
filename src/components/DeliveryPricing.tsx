import SectionReveal from './SectionReveal';
import { DELIVERY_FEE_INSIDE, DELIVERY_FEE_OUTSIDE, BRAND } from '../data/cakes';
import { useLanguage } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';

export default function DeliveryPricing() {
  const { t, isBn, formatPrice } = useLanguage();

  return (
    <section id="delivery" className="relative bg-nightfall py-24 text-cream md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-12">
        <SectionReveal className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-cream/60">{t('deliveryEyebrow')}</p>
            <h2 className="display mt-3 text-balance text-4xl leading-[1.05] text-cream md:text-6xl">
              {isBn ? (
                <>
                  টাটকা ও সঠিক সময়ে, <span className="italic-accent">প্রতিবার।</span>
                </>
              ) : (
                <>
                  Fresh, On Time, <span className="italic-accent">Every Time.</span>
                </>
              )}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/75">
              {isBn
                ? 'ডেলিভারির দিন সকালে ফ্রেশ বেক করে যত্নের সাথে প্যাক করা হয় — যাতে কেকটি আপনার হাতে নিখুঁতভাবে পৌঁছায়।'
                : 'Baked the morning of delivery and packed with care — your cake arrives picture-perfect.'}
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <MagneticButton
                asLink
                href={`https://wa.me/${BRAND.whatsappE164}`}
                target="_blank"
                rel="noreferrer"
                className="items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold hover:text-cream"
              >
                {t('footerChatBtn')}
              </MagneticButton>
              <p className="text-xs text-cream/70">
                {isBn
                  ? '💡 বিকাশ তালুকদারের সাথে আলোচনা করে আপনার বাজেট অনুযায়ী ছাড় পেতে পারেন।'
                  : '💡 Prices are flexible — negotiate your budget directly with Bikash Talukder.'}
              </p>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <dl className="divide-y divide-cream/15 border-y border-cream/15">
              <div className="grid grid-cols-2 gap-4 py-6">
                <dt className="text-sm uppercase tracking-eyebrow text-cream/55">
                  {t('deliveryInsideTitle')}
                </dt>
                <dd className="text-right font-serif text-2xl text-cream">
                  {formatPrice(DELIVERY_FEE_INSIDE)}
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-4 py-6">
                <dt className="text-sm uppercase tracking-eyebrow text-cream/55">
                  {t('deliveryOutsideTitle')}
                </dt>
                <dd className="text-right font-serif text-2xl text-cream">
                  {formatPrice(DELIVERY_FEE_OUTSIDE)}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-2 py-6">
                <dt className="text-sm uppercase tracking-eyebrow text-cream/55">
                  {isBn ? 'প্রস্তুতির সময়' : 'Lead Time'}
                </dt>
                <dd className="text-base text-cream/85">
                  {isBn ? (
                    <>
                      কাস্টম ডিজাইনের জন্য কমপক্ষে <strong className="text-cream">২৪ ঘন্টা আগে</strong> অর্ডার করুন।
                    </>
                  ) : (
                    <>
                      Orders should be placed at least <strong className="text-cream">24 hours in advance</strong> for custom designs.
                    </>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-2 py-6">
                <dt className="text-sm uppercase tracking-eyebrow text-cream/55">
                  {isBn ? 'একই দিনে ডেলিভারি' : 'Same-Day Delivery'}
                </dt>
                <dd className="text-base text-cream/85">
                  {isBn
                    ? 'নির্বাচিত কিছু রেডিমেড ডিজাইনে ইনস্ট্যান্ট পাওয়া যায় — জানতে হোয়াটসঅ্যাপে মেসেজ দিন।'
                    : 'Available on select ready designs — message us on WhatsApp to check.'}
                </dd>
              </div>
            </dl>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}