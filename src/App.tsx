import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CollectionsTeaser from './components/CollectionsTeaser';
import CategorySection from './components/CategorySection';
import CakeCarousel from './components/CakeCarousel';
import HowItWorks from './components/HowItWorks';
import DeliveryPricing from './components/DeliveryPricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppFAB from './components/WhatsAppFAB';
import AIAssistant from './components/AIAssistant';
import ScrollToTop from './components/ScrollToTop';
import GrainOverlay from './components/GrainOverlay';
import { cakesByCategory } from './data/cakes';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  useLenis();
  const { t, isBn } = useLanguage();

  // Active-section highlighting for in-page nav
  useEffect(() => {
    const ids = ['home', 'bridal', 'birthday', 'anniversary', 'how-it-works', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const onScroll = () => {
      const probe = window.innerHeight * 0.35 + window.scrollY;
      let current: string | null = null;
      for (const s of sections) {
        if (s.offsetTop <= probe) current = s.id;
      }
      const header = document.querySelector<HTMLElement>('header[data-nav-theme]');
      const theme = header?.dataset.navTheme ?? 'light';
      const idleCls = theme === 'dark' ? 'text-cream/85' : 'text-ink/80';
      const activeCls = theme === 'dark' ? 'text-cream' : 'text-ink';
      document.querySelectorAll<HTMLAnchorElement>('header nav a[href^="#"]').forEach((a) => {
        const target = a.getAttribute('href')?.replace('#', '');
        const isActive = !!target && target === current;
        a.classList.toggle(activeCls, isActive);
        a.classList.toggle(idleCls, !isActive);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-cream text-ink">
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />

        {/* 3-card teaser row */}
        <CollectionsTeaser />

        <CategorySection
          id="bridal"
          eyebrow={t('bridalEyebrow')}
          heading={
            <>
              {t('bridalHeading')}{' '}
              <span className="italic-accent">
                {isBn ? '“হ্যাঁ”' : '“Yes”'}
              </span>{' '}
              {isBn ? 'বলুন সেরা কেকটি দিয়ে' : 'to the Perfect Cake'}
            </>
          }
          description={t('bridalDesc')}
          index="01"
          align="left"
        >
          <CakeCarousel cakes={cakesByCategory('bridal')} />
        </CategorySection>

        <CategorySection
          id="birthday"
          eyebrow={t('birthdayEyebrow')}
          heading={
            <>
              {t('birthdayHeading')}{' '}
              <span className="italic-accent">{t('birthdayHeadingAccent')}</span>
            </>
          }
          description={t('birthdayDesc')}
          index="02"
          align="right"
        >
          <CakeCarousel cakes={cakesByCategory('birthday')} />
        </CategorySection>

        <CategorySection
          id="anniversary"
          eyebrow={t('anniversaryEyebrow')}
          heading={
            <>
              {t('anniversaryHeading')}{' '}
              <span className="italic-accent">{t('anniversaryHeadingAccent')}</span>
            </>
          }
          description={t('anniversaryDesc')}
          index="03"
          align="left"
        >
          <CakeCarousel cakes={cakesByCategory('anniversary')} />
        </CategorySection>

        <CategorySection
          id="diwali"
          eyebrow={t('diwaliEyebrow')}
          heading={
            <>
              {t('diwaliHeading')}{' '}
              <span className="italic-accent">{t('diwaliHeadingAccent')}</span>
            </>
          }
          description={t('diwaliDesc')}
          index="04"
          align="right"
        >
          <CakeCarousel cakes={cakesByCategory('diwali')} />
        </CategorySection>

        <HowItWorks />
        <DeliveryPricing />
        <Testimonials />
      </main>
      <Footer />

      <CartDrawer />
      <WhatsAppFAB />
      <AIAssistant />
      <ScrollToTop />
    </div>
  );
}