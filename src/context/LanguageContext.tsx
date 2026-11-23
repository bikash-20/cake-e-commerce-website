import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationKey } from '../data/translations';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  isBn: boolean;
  formatNumber: (num: number | string) => string;
  formatPrice: (amount: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sugar_lang');
      if (saved === 'bn' || saved === 'en') return saved;
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sugar_lang', newLang);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'bn' : 'en');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.body.dataset.lang = lang;
      if (lang === 'bn') {
        document.body.classList.add('font-bn');
      } else {
        document.body.classList.remove('font-bn');
      }
    }
  }, [lang]);

  const t = (key: TranslationKey): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  const formatNumber = (val: number | string): string => {
    if (lang !== 'bn') return String(val);
    return String(val).replace(/\d/g, (d) => BENGALI_DIGITS[parseInt(d, 10)] ?? d);
  };

  const formatPrice = (amount: number): string => {
    const formatted = amount.toLocaleString('en-IN');
    return `৳${formatNumber(formatted)}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        isBn: lang === 'bn',
        formatNumber,
        formatPrice,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
};
