import { useEffect, useState } from "react";

type Feature = {
  id: string;
  title: string;
  description: string;
  details: {
    heading: string;
    body: string;
    bullets?: string[];
  };
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

const FEATURES: Feature[] = [
  {
    id: "gestion-predial",
    title: "Gestión predial",
    description:
      "Búsqueda estratégica y gestión de terrenos alineados a su proyecto.",
    details: {
      heading: "Gestión predial integral",
      body: "Analizamos sus necesidades, evaluamos opciones de terreno y gestionamos el proceso completo para asegurar una decisión sólida.",
      bullets: [
        "Búsqueda según criterios técnicos",
        "Evaluación legal y urbana",
        "Acompañamiento en negociación",
      ],
    },
  },
  {
    id: "diseno",
    title: "Diseño",
    description:
      "Partimos de las necesidades reales del cliente para crear espacios cómodos y funcionales.",
    details: {
      heading: "Diseño centrado en el usuario",
      body: "Nuestro proceso traduce necesidades reales en espacios eficientes, estéticos y coherentes con el presupuesto.",
      bullets: [
        "Análisis de uso real",
        "Optimización de espacios",
        "Propuestas claras y viables",
      ],
    },
  },
  {
    id: "construccion",
    title: "Construcción y Remodelación",
    description:
      "Ejecutamos y supervisamos la obra con presencia constante y atención al detalle.",
    details: {
      heading: "Ejecución con control permanente",
      body: "Supervisamos cada etapa con controles regulares en sitio para garantizar calidad, tiempos y tranquilidad.",
      bullets: [
        "Supervisión continua",
        "Control de calidad",
        "Comunicación clara con el cliente",
      ],
    },
  },
];

export default function FeaturesSection() {
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeFeature = FEATURES.find((f) => f.id === activeId);

  return (
    <section className="w-full bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Quote */}
        <div className="mb-10 flex justify-center">
          <figure className="max-w-3xl text-center text-black/80">
            <blockquote className="text-lg sm:text-xl font-semibold italic">
              “Trabajamos con procesos claros, criterios definidos y ejecución
              responsable.”
            </blockquote>
          </figure>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const isActive = activeId === feature.id;

            return (
              <div
                key={feature.id}
                className="flex h-full flex-col gap-4"
              >
                <FeatureCard
                  feature={feature}
                  index={index}
                  isActive={isActive}
                  onClick={() =>
                    setActiveId((prev) =>
                      prev === feature.id ? null : feature.id
                    )
                  }
                />

                {/* MOBILE inline expansion */}
                {isMobile && isActive && (
                  <div>
                    <ExpandedFeature feature={feature} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop expansion below the grid */}
        {!isMobile && activeFeature && (
          <ExpandedFeature feature={activeFeature} />
        )}
      </div>
    </section>
  );
}

type FeatureCardProps = {
  feature: Feature;
  index: number;
  isActive: boolean;
  onClick: () => void;
};

function FeatureCard({ feature, index, isActive, onClick }: FeatureCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        relative
        flex flex-col flex-1
        rounded-2xl
        border
        bg-white
        p-8
        text-left
        transition
        duration-300
        animate-slide-in-left
        ${
          isActive
            ? "border-charcoal-brown-600"
            : "border-neutral-200 hover:-translate-y-1"
        }
      `}
      style={{ animationDelay: `${index * 120}ms` }}
      aria-expanded={isActive}
    >
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          border-2
          border-transparent
          transition-all
          duration-300
          group-hover:border-charcoal-brown-600
        "
      />

      <div className="relative z-10 flex h-full flex-col gap-4">
        <h3 className="text-xl font-semibold text-black">{feature.title}</h3>

        <p className="text-base text-black/70 leading-relaxed">
          {feature.description}
        </p>

        <span className="mt-auto text-sm text-black/50 underline">
          Ver más
        </span>
      </div>
    </button>
  );
}

function ExpandedFeature({ feature }: { feature?: Feature }) {
  if (!feature) return null;

  return (
    <div
      className="
        mt-10
        rounded-3xl
        bg-slate-100
        p-6
        sm:p-10
        animate-fade-in
      "
    >
      <h4 className="mb-4 text-2xl font-semibold text-black">
        {feature.details.heading}
      </h4>

      <p className="mb-6 text-black/70 max-w-3xl">{feature.details.body}</p>

      {feature.details.bullets && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {feature.details.bullets.map((item) => (
            <li key={item} className="flex items-start gap-2 text-black/80">
              <span className="mt-1 h-2 w-2 rounded-full bg-charcoal-brown-600" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
