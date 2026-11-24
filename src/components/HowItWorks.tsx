import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';
import { Cake, PencilLine, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorks() {
  const { t, isBn, formatNumber } = useLanguage();

  const steps = [
    {
      n: formatNumber('01'),
      title: isBn ? 'কেক নির্বাচন করুন' : 'Choose Your Cake',
      body: isBn ? 'পছন্দের ডিজাইন, ফ্লেভার ও ওজন বাছাই করুন।' : 'Pick a design, flavor, and weight.',
      Icon: Cake,
    },
    {
      n: formatNumber('02'),
      title: isBn ? 'কাস্টমাইজ করুন' : 'Customize It',
      body: isBn ? 'কেকের ওপর নাম, বার্তা, মোমবাতি বা স্পেশাল টপার যোগ করুন।' : 'Add a message, candles, or a topper.',
      Icon: PencilLine,
    },
    {
      n: formatNumber('03'),
      title: isBn ? 'হোয়াটসঅ্যাপে অর্ডার কনফার্ম' : 'Order on WhatsApp',
      body: isBn ? 'বিকাশ তালুকদারের সাথে দাম ও ডেলিভারি চূড়ান্ত করে অর্ডার কনফার্ম করুন।' : "Confirm details and we'll bake it fresh for delivery.",
      Icon: MessageCircle,
    },
  ];

  return (
    <section id="how-it-works" className="relative bg-surface py-16 scroll-mt-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-4 sm:px-6 md:px-12">
        <SectionReveal className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">{t('howEyebrow')}</p>
            <h2 className="display mt-3 text-4xl leading-[1.05] md:text-5xl">
              {isBn ? 'কার্ট থেকে দোরগোড়ায় মাত্র তিনটি সহজ ধাপ।' : 'Three steps from cart to doorstep.'}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="max-w-md text-base leading-relaxed text-muted">
              {isBn
                ? 'অর্ডার প্রক্রিয়া একদম সহজ ও সাবলীল। কোনো জটিল ফর্ম বা সাইন আপ ছাড়াই সরাসরি হোয়াটসঅ্যাপে চ্যাট করে পছন্দের কেক অর্ডার করুন।'
                : "We've kept the ordering flow short and human. No accounts, no checkout forms — just a quick chat on WhatsApp and we're baking."}
            </p>
          </div>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-4 border-t border-divider pt-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl text-muted">{step.n}</span>
                <step.Icon size={22} strokeWidth={1.4} className="text-burgundy" />
              </div>
              <h3 className="display text-2xl md:text-3xl">{step.title}</h3>
              <p className="max-w-xs text-sm text-muted">{step.body}</p>
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-10 -translate-y-1/2 bg-divider md:right-auto md:left-full md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}