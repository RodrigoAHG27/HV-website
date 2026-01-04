import { Button } from "antd";
import heroBg from "../../img/SSDAY.jpeg";

export default function HeroSection() {
  return (
    <section
      className="
        relative w-full rounded-b-[2rem] px-4
        pt-20 pb-28 sm:pt-28 sm:pb-32 md:pt-32 md:pb-40
        bg-cover bg-center text-black
        flex flex-col items-center justify-center
        min-h-[70vh] md:min-h-[80vh]
      "
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-white/70" aria-hidden />

      <div className="relative mx-auto max-w-6xl flex flex-col items-center text-center gap-10">
        
        {/* Headline */}
        <h1 className="tracking-tight text-black leading-tight flex flex-col items-center gap-3">
          <span className="flex items-baseline gap-3 text-4xl sm:text-6xl md:text-7xl">
            <span className="font-extrabold">Construye</span>
            <span className="text-xl sm:text-3xl md:text-4xl font-normal italic">en</span>
          </span>
          <span className="block text-4xl sm:text-6xl md:text-8xl font-extrabold">El Salvador</span>
        </h1>

        {/* Sub-brand */}
        <span className="text-lg text-black tracking-wide italic">
          by hv
        </span>

        {/* Tagline */}
        <p
          className="
            text-xs sm:text-sm md:text-base text-black font-semibold leading-tight
            whitespace-normal
            max-w-[50vw] sm:max-w-none
            bg-white
            px-3 py-1.5
            rounded-full shadow-sm
            inline-block
          "
        >
          Haz realidad tus ideas en el corazón de Centroamérica
        </p>

      </div>

      {/* CTA pinned to bottom border */}
      <div
        className="
          absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2
          z-20 flex justify-center
        "
      >
        <a href="#contact">
          <Button
            type="primary"
            size="large"
            className="
              !bg-charcoal-brown-600
              !border-none
              !rounded-full
              !px-8 sm:!px-10
              !h-12 sm:!h-14 !min-w-[200px] sm:!min-w-[260px]
              text-base sm:text-lg font-semibold !text-white
              shadow-lg shadow-black/30 shimmer-border-white
              hover:!bg-charcoal-brown-700
            "
          >
            the “start now” thingy
          </Button>
        </a>
      </div>
    </section>
  );
}
