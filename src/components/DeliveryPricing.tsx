import SectionReveal from './SectionReveal';
import { DELIVERY_FEE_INSIDE, DELIVERY_FEE_OUTSIDE, BRAND } from '../data/cakes';
import MagneticButton from './MagneticButton';

export default function DeliveryPricing() {
  return (
    <section id="delivery" className="relative bg-nightfall py-24 text-cream md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-12">
        <SectionReveal className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-cream/60">Delivery & Pricing</p>
            <h2 className="display mt-3 text-balance text-4xl leading-[1.05] text-cream md:text-6xl">
              Fresh, On Time, <span className="italic-accent">Every Time.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/75">
              Baked the morning of delivery and packed with care — your cake arrives
              picture-perfect.
            </p>
            <div className="mt-8">
              <MagneticButton
                asLink
                href={`https://wa.me/${BRAND.whatsappE164}`}
                target="_blank"
                rel="noreferrer"
                className="items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold hover:text-cream"
              >
                Chat on WhatsApp →
              </MagneticButton>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <dl className="divide-y divide-cream/15 border-y border-cream/15">
              <div className="grid grid-cols-2 gap-4 py-6">
                <dt className="text-sm uppercase tracking-eyebrow text-cream/55">
                  Inside Sylhet City
                </dt>
                <dd className="text-right font-serif text-2xl text-cream">
                  ৳{DELIVERY_FEE_INSIDE}
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-4 py-6">
                <dt className="text-sm uppercase tracking-eyebrow text-cream/55">
                  Outside Sylhet City
                </dt>
                <dd className="text-right font-serif text-2xl text-cream">
                  ৳{DELIVERY_FEE_OUTSIDE}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-2 py-6">
                <dt className="text-sm uppercase tracking-eyebrow text-cream/55">Lead Time</dt>
                <dd className="text-base text-cream/85">
                  Orders should be placed at least <strong className="text-cream">24 hours in advance</strong>{' '}
                  for custom designs.
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-2 py-6">
                <dt className="text-sm uppercase tracking-eyebrow text-cream/55">Same-Day</dt>
                <dd className="text-base text-cream/85">
                  Available on select ready designs — message us on WhatsApp to check.
                </dd>
              </div>
            </dl>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}