export type Content = {
  companyName: string;
  topNotice: string;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    website: string;
  };
  services: string[];
  iconCards: { title: string; description: string; icon: string }[];
  differentiators: { title: string; description: string }[];
  process: { title: string; description: string }[];
  caseStudy: {
    title: string;
    problem: string;
    solution: string;
    results: { label: string; value: string }[];
    image: string;
    imageAlt: string;
    href: string;
  };
  gallery: { thumb: string; full: string; alt: string }[];
  credentials: {
    license: string;
    insurance: string;
    badges: { name: string; description: string }[];
  };
  serviceAreas: string[];
  faq: { question: string; answer: string }[];
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    socials: string[];
  };
  pdfUrl: string;
  cta: {
    phoneLabel: string;
    whatsappLabel: string;
  };
};

export const content: Content = {
  companyName: 'HV Construction',
  topNotice: 'Atendemos proyectos residenciales, comerciales e industriales en el Gran San Salvador.',
  hero: {
    title: 'HV Construction — Obras confiables en San Salvador',
    subtitle: 'Construcción integral para hogares y empresas salvadoreñas',
    description:
      'Equipo local con supervisión técnica permanente, cumplimiento de normas OSHA e ISO, y entrega puntual en toda el área metropolitana.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    website: 'https://hvconstruction.sv',
  },
  services: [
    'Remodelaciones integrales',
    'Nuevas edificaciones',
    'Refuerzo estructural',
    'Cubiertas y techos',
    'Instalaciones eléctricas',
    'Instalaciones hidráulicas',
    'Acabados finos',
  ],
  iconCards: [
    {
      title: 'Residential',
      description: 'Viviendas unifamiliares, ampliaciones y acabados contemporáneos en Antiguo Cuscatlán y San Benito.',
      icon: 'HomeOutlined',
    },
    {
      title: 'Commercial',
      description: 'Locales, oficinas y centros médicos con horarios coordinados para minimizar cierres en San Salvador y Santa Tecla.',
      icon: 'BankOutlined',
    },
    {
      title: 'Industrial',
      description: 'Naves y plantas ligeras con seguridad industrial reforzada en Soyapango, Mejicanos y Apopa.',
      icon: 'BuildOutlined',
    },
  ],
  differentiators: [
    { title: 'Equipo licenciado e inscrito en OPAMSS', description: 'Ingenieros y maestros con credenciales activas.' },
    { title: 'Historial de seguridad', description: 'Cero incidentes incapacitantes en los últimos 24 meses.' },
    { title: 'Compromiso con los plazos', description: 'Cronogramas con hitos verificables y reportes semanales.' },
    { title: 'Control de presupuesto', description: 'Estimaciones transparentes y control de cambios en tiempo real.' },
  ],
  process: [
    { title: 'Inquiry', description: 'Coordinamos una llamada breve para definir alcance y tiempos deseados.' },
    { title: 'Site Visit', description: 'Visita técnica en San Salvador o municipios vecinos dentro de 48 horas.' },
    { title: 'Proposal', description: 'Entregamos propuesta detallada con cronograma y costos fijos.' },
  ],
  caseStudy: {
    title: 'Centro logístico en Soyapango',
    problem: 'El cliente necesitaba ampliar bodegas sin interrumpir operaciones de distribución.',
    solution:
      'Planificamos fases nocturnas, reforzamos estructura existente y modernizamos sistemas eléctricos con certificación UL.',
    results: [
      { label: 'Metros cuadrados nuevos', value: '1,200 m²' },
      { label: 'Tiempo de obra', value: '14 semanas' },
      { label: 'Ahorro energético', value: '18% anual' },
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Interior de bodega industrial renovada en Soyapango',
    href: '/case-studies',
  },
  gallery: [
    {
      thumb: 'https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd35?auto=format&fit=crop&w=600&q=70',
      full: 'https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd35?auto=format&fit=crop&w=1400&q=80',
      alt: 'Remodelación de sala en Antiguo Cuscatlán antes y después',
    },
    {
      thumb: 'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=600&q=70',
      full: 'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1400&q=80',
      alt: 'Construcción de oficinas en Santa Tecla',
    },
    {
      thumb: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=70',
      full: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
      alt: 'Estructura metálica reforzada en Soyapango',
    },
  ],
  credentials: {
    license: 'Licencia Constructora: OPAMSS-4521-2025',
    insurance: 'Cobertura de responsabilidad civil con aseguradora local',
    badges: [
      { name: 'OSHA Compliance', description: 'Capacitaciones anuales OSHA 30 horas' },
      { name: 'ISO 9001', description: 'Procesos auditados bajo ISO 9001:2015' },
    ],
  },
  serviceAreas: ['San Salvador', 'Santa Tecla', 'Antiguo Cuscatlán', 'Soyapango', 'Mejicanos', 'Ilopango'],
  faq: [
    {
      question: '¿Qué tipos de proyectos gestionan?',
      answer: 'Trabajamos remodelaciones, edificaciones nuevas y adecuaciones industriales con gestión integral.',
    },
    {
      question: '¿Cuáles son los plazos habituales?',
      answer: 'Pequeñas remodelaciones toman 6-8 semanas; naves industriales pueden extenderse a 4-5 meses.',
    },
    {
      question: '¿Se encargan de permisos?',
      answer: 'Sí, tramitamos OPAMSS, bomberos y licencias municipales según el alcance.',
    },
    {
      question: '¿Ofrecen garantías?',
      answer: 'Garantía estructural de 5 años y garantía de acabados de 12 meses.',
    },
    {
      question: '¿Cómo manejan los pagos?',
      answer: 'Aceptamos pagos escalonados por hitos, transferencias bancarias y facturación electrónica.',
    },
    {
      question: '¿Quién supervisa la obra?',
      answer: 'Un residente de obra certificado visita el sitio diariamente y envía reportes fotográficos.',
    },
    {
      question: '¿Trabajan fines de semana?',
      answer: 'Coordinamos cuadrillas de fin de semana cuando la operación del cliente lo requiere.',
    },
    {
      question: '¿Pueden trabajar con planos existentes?',
      answer: 'Sí, revisamos planos del cliente y proponemos ajustes estructurales si son necesarios.',
    },
  ],
  contact: {
    phone: '+503 2134-5678',
    whatsapp: 'https://wa.me/50378881234',
    email: 'contacto@hvconstruction.sv',
    socials: ['https://www.linkedin.com/company/hvconstruction', 'https://www.facebook.com/hvconstruction'],
  },
  pdfUrl: '/files/HV-Capability-Sheet.pdf',
  cta: {
    phoneLabel: 'Llámanos al +503 2134-5678',
    whatsappLabel: 'Escríbenos por WhatsApp',
  },
};
