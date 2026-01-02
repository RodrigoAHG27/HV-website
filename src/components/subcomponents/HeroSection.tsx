import { Button } from "antd";

export default function HeroSection() {
  return (
    <section className="w-full bg-slate-300 rounded-b-[2rem] px-4 pt-20 pb-24">
      <div className="mx-auto max-w-6xl flex flex-col items-center text-center gap-10">
        
        {/* Headline */}
        <h1 className="font-extrabold tracking-tight text-black leading-tight
                       text-4xl sm:text-5xl md:text-6xl">
          Construye <span className="block sm:inline">en El Salvador</span>
        </h1>

        {/* Sub-brand */}
        <span className="text-sm text-black/70 tracking-wide">
          by hv
        </span>

        {/* Tagline */}
        <p className="max-w-md text-base sm:text-lg text-black/80">
          catchy phrase
        </p>

        {/* CTA */}
        <div className="w-full flex justify-center">
          <Button
            type="primary"
            size="large"
            className="
              !bg-red-800
              !border-none
              !rounded-full
              !px-10
              !h-14
              text-base
              font-semibold
              shadow-lg
              hover:!bg-red-700
            "
          >
            the “start now” thingy
          </Button>
        </div>

      </div>
    </section>
  );
}
