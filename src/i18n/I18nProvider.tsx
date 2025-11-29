import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import i18next from '../lib/i18n';
import { Helmet } from 'react-helmet-async';

type Translations = typeof translations;
type Language = keyof Translations;
type TranslationKey = keyof Translations['en'];

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const STORAGE_KEY = 'hv_language';

const translations = {
  en: {
    brand: 'HV',
    heroTrustPill: 'Trusted by 500+ Companies',
    heroTitle: 'Transform Your Business with Expert Solutions',
    heroLead:
      "We help forward-thinking companies accelerate growth, streamline operations, and achieve measurable results. Let's discuss how we can help you reach your goals.",
    heroPrimaryCta: 'Get Started Today',
    heroSecondaryCta: 'Schedule a Consultation',
    heroContact: 'Prefer to discuss?',
    heroContactCta: 'Call us at +1 (888) 123-4567',
    sectionEyebrow: 'Why Choose Us',
    sectionTitle: 'Everything you need to take your business to the next level',
    highlightFastTitle: 'Fast Implementation',
    highlightFastDescription:
      'Get up and running quickly with our streamlined onboarding process and expert guidance.',
    highlightTargetedTitle: 'Targeted Solutions',
    highlightTargetedDescription: 'Custom strategies designed specifically for your business needs and industry challenges.',
    highlightProvenTitle: 'Proven Results',
    highlightProvenDescription: "Join hundreds of clients who've seen measurable improvements in performance and ROI.",
    highlightSupportTitle: 'Reliable Support',
    highlightSupportDescription: 'Dedicated team available to ensure your success every step of the way.',
    highlightExpertTitle: 'Expert Team',
    highlightExpertDescription: 'Work with seasoned professionals who bring years of expertise to your projects.',
    highlightInnovationTitle: 'Innovation First',
    highlightInnovationDescription: 'Leverage cutting-edge tools and methodologies to stay ahead of the competition.',
    metaTitle: 'HV',
    metaDescription: 'Transform your business with expert solutions tailored to your goals.',
    metaOgTitle: 'HV — Expert Solutions for Growing Companies',
    metaOgDescription: 'Accelerate growth with fast implementation, targeted strategies, and proven results.',
    languageToggleLabel: 'Change language',
    languageEnglish: 'English',
    languageSpanish: 'Español',
  },
  es: {
    brand: 'HV',
    heroTrustPill: 'Confiado por más de 500 empresas',
    heroTitle: 'Transforma tu negocio con soluciones expertas',
    heroLead:
      'Ayudamos a empresas visionarias a acelerar el crecimiento, optimizar operaciones y lograr resultados medibles. Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos.',
    heroPrimaryCta: 'Comienza hoy',
    heroSecondaryCta: 'Programa una consulta',
    heroContact: '¿Prefieres hablar?',
    heroContactCta: 'Llámanos al +1 (888) 123-4567',
    sectionEyebrow: '¿Por qué elegirnos?',
    sectionTitle: 'Todo lo que necesitas para llevar tu negocio al siguiente nivel',
    highlightFastTitle: 'Implementación rápida',
    highlightFastDescription:
      'Pon en marcha tu solución rápidamente con nuestro proceso de incorporación ágil y asesoría experta.',
    highlightTargetedTitle: 'Soluciones enfocadas',
    highlightTargetedDescription:
      'Estrategias personalizadas diseñadas específicamente para las necesidades y retos de tu industria.',
    highlightProvenTitle: 'Resultados comprobados',
    highlightProvenDescription: 'Únete a cientos de clientes que han visto mejoras medibles en rendimiento y ROI.',
    highlightSupportTitle: 'Soporte confiable',
    highlightSupportDescription: 'Un equipo dedicado disponible para asegurar tu éxito en cada paso.',
    highlightExpertTitle: 'Equipo experto',
    highlightExpertDescription: 'Trabaja con profesionales experimentados que aportan años de conocimiento a tus proyectos.',
    highlightInnovationTitle: 'Innovación primero',
    highlightInnovationDescription: 'Aprovecha herramientas y metodologías de vanguardia para mantenerte competitivo.',
    metaTitle: 'HV',
    metaDescription: 'Transforma tu negocio con soluciones expertas adaptadas a tus objetivos.',
    metaOgTitle: 'HV — Soluciones expertas para empresas en crecimiento',
    metaOgDescription: 'Acelera el crecimiento con implementación rápida, estrategias enfocadas y resultados comprobados.',
    languageToggleLabel: 'Cambiar idioma',
    languageEnglish: 'English',
    languageSpanish: 'Español',
  },
} as const;

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return (i18next.language as Language) ?? 'en';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && stored in translations) {
    return stored as Language;
  }

  const detected = (i18next.language ?? navigator.language?.slice(0, 2)?.toLowerCase()) as Language | undefined;
  if (detected && detected in translations) {
    return detected;
  }

  return 'en';
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language);
    }
    void i18next.changeLanguage(language);
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[language]?.[key] ?? translations.en[key] ?? key,
    [language],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  );

  return (
    <I18nContext.Provider value={value}>
      <Helmet htmlAttributes={{ lang: language }} />
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return value;
};

export type { Language, TranslationKey };
export { translations };
