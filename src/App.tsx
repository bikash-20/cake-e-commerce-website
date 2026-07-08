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
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import { cakesByCategory } from './data/cakes';

// ============================================================================
//  TODO: AI Assistant integration — coming soon
//  Plan: floating bubble bottom-left (above ScrollToTop), opens a small panel
//  that recommends a cake + flavor from user prompts ("anniversary cake for
//  parents, under ৳2000, delivered outside Sylhet"). Will be wired to a free
//  LLM endpoint (e.g. OpenRouter free tier or local Llama.cpp). For now, do
//  not render — just leave this stub so future work has a clear anchor.
// ============================================================================

export default function App() {
  useLenis();

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
      document.querySelectorAll<HTMLAnchorElement>('header nav a[href^="#"]').forEach((a) => {
        const target = a.getAttribute('href')?.replace('#', '');
        if (target && target === current) {
          a.classList.add('text-ink');
          a.classList.remove('text-ink/80');
        } else {
          a.classList.remove('text-ink');
          a.classList.add('text-ink/80');
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-cream text-ink">
      <GrainOverlay />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />

        {/* Studio Atelier–style 3-card teaser row.
            Lives on the cream background so it never overlaps the hero
            copy or the WhatsApp FAB on mobile. */}
        <CollectionsTeaser />

        <CategorySection
          id="bridal"
          eyebrow="Bridal Collection"
          heading={
            <>
              Say <span className="italic-accent">&ldquo;Yes&rdquo;</span> to the Perfect Cake
            </>
          }
          description="From engagement rings to wedding florals — heart-shaped, fondant, and buttercream cakes designed for your big day."
          index="01"
          align="left"
        >
          <CakeCarousel cakes={cakesByCategory('bridal')} />
        </CategorySection>

        <CategorySection
          id="birthday"
          eyebrow="Birthday Collection"
          heading={
            <>
              Make Every <span className="italic-accent">Candle Count.</span>
            </>
          }
          description="Playful, elegant, and everything in between — birthday cakes designed around your favorite flavors and colors."
          index="02"
          align="right"
        >
          <CakeCarousel cakes={cakesByCategory('birthday')} />
        </CategorySection>

        <CategorySection
          id="anniversary"
          eyebrow="Anniversary Collection"
          heading={
            <>
              Celebrate <span className="italic-accent">Every Chapter.</span>
            </>
          }
          description="Rich, romantic cakes to mark another year of love — customizable with names, dates, and heartfelt messages."
          index="03"
          align="left"
        >
          <CakeCarousel cakes={cakesByCategory('anniversary')} />
        </CategorySection>

        <CategorySection
          id="diwali"
          eyebrow="Festive & Diwali"
          heading={
            <>
              A Sweet Way to <span className="italic-accent">Celebrate Light.</span>
            </>
          }
          description="Festive chocolate cakes with gold accents — for Diwali, Eid, and every occasion worth marking."
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
      <ScrollToTop />
    </div>
  );
}