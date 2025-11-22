import { Helmet } from 'react-helmet-async';

import HeroMofu from '../components/HeroMofu';
import LeadFormStepper from '../components/LeadFormStepper';
import '../styles/mofu.css';

const highlights = [
  {
    title: 'Fast Implementation',
    description: 'Get up and running quickly with our streamlined onboarding process and expert guidance.',
  },
  {
    title: 'Targeted Solutions',
    description: 'Custom strategies designed specifically for your business needs and industry challenges.',
  },
  {
    title: 'Proven Results',
    description: "Join hundreds of clients who've seen measurable improvements in performance and ROI.",
  },
  {
    title: 'Reliable Support',
    description: 'Dedicated team available to ensure your success every step of the way.',
  },
  {
    title: 'Expert Team',
    description: 'Work with seasoned professionals who bring years of expertise to your projects.',
  },
  {
    title: 'Innovation First',
    description: 'Leverage cutting-edge tools and methodologies to stay ahead of the competition.',
  },
];

const MofuPage = () => (
  <>
    <Helmet>
      <title>HV</title>
      <meta name="description" content="Transform your business with expert solutions tailored to your goals." />
      <meta property="og:title" content="HV — Expert Solutions for Growing Companies" />
      <meta
        property="og:description"
        content="Accelerate growth with fast implementation, targeted strategies, and proven results."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://hvconstruction.sv" />
      <meta property="og:image" content="/og-default.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <main className="mofu-page">
      <HeroMofu />

      <section className="section section--centered">
        <div className="container section-header section-header--centered">
          <p className="eyebrow">Why Choose Us</p>
          <h2>Everything you need to take your business to the next level</h2>
        </div>
        <div className="container">
          <div className="feature-grid">
            {highlights.map((item) => (
              <div key={item.title} className="feature-card">
                <div className="feature-card__icon" aria-hidden>
                  <span>★</span>
                </div>
                <div className="feature-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section form-section">
        <div className="container">
          <LeadFormStepper />
        </div>
      </section>
    </main>
  </>
);

export default MofuPage;
