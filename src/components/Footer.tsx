import SectionReveal from './SectionReveal';
import MagneticButton from './MagneticButton';
import { BRAND } from '../data/cakes';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-nightfall text-cream">
      <div className="mx-auto max-w-editorial px-6 py-24 md:px-12 md:py-32">
        <SectionReveal className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow text-cream/55">Contact</p>
            <h2 className="display mt-3 text-balance text-5xl leading-[1.02] text-cream md:text-7xl">
              Let's Bake Something <span className="italic-accent">Sweet.</span>
            </h2>
            <p className="mt-6 max-w-md text-base text-cream/75">
              Have a design in mind? Message us on WhatsApp and let's plan your perfect cake.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton
                asLink
                href={`https://wa.me/${BRAND.whatsappE164}`}
                target="_blank"
                rel="noreferrer"
                className="items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold hover:text-cream"
              >
                Chat on WhatsApp →
              </MagneticButton>
              <a
                href={`tel:+${BRAND.whatsappE164}`}
                className="text-sm text-cream/75 underline-offset-4 hover:text-cream hover:underline"
              >
                or call {BRAND.whatsappDisplay}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:col-span-5 md:col-start-8">
            <ul className="flex flex-col divide-y divide-cream/15 border-y border-cream/15">
              <li className="flex items-start gap-4 py-5">
                <Phone size={16} className="mt-0.5 text-gold" strokeWidth={1.5} />
                <div>
                  <p className="eyebrow text-cream/55">Phone / WhatsApp</p>
                  <a
                    href={`https://wa.me/${BRAND.whatsappE164}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block font-serif text-xl text-cream hover:text-gold"
                  >
                    {BRAND.whatsappDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 py-5">
                <Mail size={16} className="mt-0.5 text-gold" strokeWidth={1.5} />
                <div>
                  <p className="eyebrow text-cream/55">Email</p>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="mt-1 block break-all font-serif text-xl text-cream hover:text-gold"
                  >
                    {BRAND.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 py-5">
                <MapPin size={16} className="mt-0.5 text-gold" strokeWidth={1.5} />
                <div>
                  <p className="eyebrow text-cream/55">Location</p>
                  <p className="mt-1 font-serif text-xl text-cream">{BRAND.location}</p>
                </div>
              </li>
            </ul>
          </div>
        </SectionReveal>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-cream/15 pt-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="font-serif text-2xl text-cream">{BRAND.name}</p>
            <p className="mt-1 text-xs uppercase tracking-eyebrow text-cream/55">
              {BRAND.eyebrow}
            </p>
          </div>
          <div className="flex flex-wrap gap-6 md:col-span-4 md:justify-end">
            <a
              href={BRAND.credit.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cream/70 hover:text-cream"
            >
              <Instagram size={14} /> Instagram
            </a>
            <a
              href={BRAND.credit.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cream/70 hover:text-cream"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
          <p className="md:col-span-3 text-xs text-cream/50 md:text-right">
            Designed & Developed by{' '}
            <a
              href={BRAND.credit.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-cream hover:underline"
            >
              {BRAND.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}