type Feature = {
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    title: "Diseño moderno",
    description:
      "Arquitectura y construcción con estándares actuales, pensados para durar.",
  },
  {
    title: "Ejecución local",
    description:
      "Conocimiento profundo del contexto salvadoreño y su normativa.",
  },
  {
    title: "Proceso claro",
    description:
      "Sin sorpresas: planificación, costos y tiempos bien definidos.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-3
          "
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = Feature & { index: number };

function FeatureCard({ title, description, index }: FeatureCardProps) {
  return (
    <div
      className="
        group
        relative
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-8
        transition
        duration-300
        hover:-translate-y-1
        animate-slide-in-left
      "
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Animated border */}
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

      <div className="relative z-10 flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-black">
          {title}
        </h3>

        <p className="text-base text-black/70 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
