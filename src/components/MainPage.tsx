import React from 'react'
import HeroSection from './subcomponents/HeroSection'
import FeaturesSection from './subcomponents/FeaturesSection'
import LeadFormSection from './subcomponents/LeadFormSection'

const MainPage = () => {
  return (
    <main className="w-full">
      <HeroSection />
      <FeaturesSection />
      <LeadFormSection />
    </main>
  )
}

export default MainPage