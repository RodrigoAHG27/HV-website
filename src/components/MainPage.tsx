import React from 'react'
import HeroSection from './subcomponents/HeroSection'
import FeaturesSection from './subcomponents/FeaturesSection'
import LeadFormSection from './subcomponents/LeadFormSection'

const MainPage = () => {
  return (
    <>
      <main className="w-full">
        <HeroSection />
        <FeaturesSection />
        <LeadFormSection />
      </main>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/message/XKOOQQLOZIM6P1"
        aria-label="WhatsApp"
        target="_blank"
        rel="noreferrer"
        className="
          fixed bottom-6 right-6 z-50
          h-14 w-14 rounded-full
          bg-[#25D366] text-white
          shadow-lg shadow-black/30
          flex items-center justify-center
          text-2xl font-semibold
          transition
          hover:scale-105 hover:shadow-xl
          focus:outline-none focus:ring-4 focus:ring-[#25D366]/40
        "
      >
        <svg
          aria-hidden="true"
          focusable="false"
          role="img"
          viewBox="0 0 32 32"
          className="h-7 w-7"
        >
          <path
            fill="currentColor"
            d="M16 4.5a11.5 11.5 0 0 0-9.71 17.5L5 28l6.25-1.64A11.47 11.47 0 0 0 16 27.5c6.35 0 11.5-5.15 11.5-11.5S22.35 4.5 16 4.5Zm0 20.5a9 9 0 0 1-4.6-1.26l-.33-.2-3.7.98 1-3.58-.22-.36A9 9 0 1 1 16 25Zm5.09-6.81c-.28-.14-1.67-.82-1.93-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.91 1.09-.17.18-.34.2-.62.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.4-1.66-1.56-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.19-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.48.07-.73.34-.25.28-.96.94-.96 2.3 0 1.36.99 2.68 1.13 2.86.14.18 1.95 2.98 4.72 4.18.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.67-.68 1.91-1.33.24-.65.24-1.2.17-1.32-.07-.12-.25-.19-.53-.33Z"
          />
        </svg>
      </a>
    </>
  )
}

export default MainPage
