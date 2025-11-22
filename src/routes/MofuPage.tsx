import { Helmet } from 'react-helmet-async';

import CaseStudyFeature from '../components/CaseStudyFeature';
import Credentials from '../components/Credentials';
import CtaBand from '../components/CtaBand';
import Differentiators from '../components/Differentiators';
import Faq from '../components/Faq';
import Gallery from '../components/Gallery';
import HeroMofu from '../components/HeroMofu';
import IconCardGrid from '../components/IconCardGrid';
import LeadFormStepper from '../components/LeadFormStepper';
import ProcessSteps from '../components/ProcessSteps';
import TopNotice from '../components/TopNotice';
import FooterCompact from '../components/FooterCompact';
import { content } from '../content/hv';
import { contractor } from '../lib/jsonld';
import '../styles/mofu.css';

const MofuPage = () => (
  <>
    <Helmet>
      <title>HV</title>
      <meta
        name="description"
        content="HV entrega proyectos residenciales, comerciales e industriales con supervisión local en El Salvador."
      />
      <meta property="og:title" content="HV Construction — Reliable Residential & Commercial Contractors | San Salvador" />
      <meta
        property="og:description"
        content="Soluciones de construcción para viviendas, oficinas y plantas ligeras en El Salvador con supervisión local."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://hvconstruction.sv" />
      <meta property="og:image" content={content.hero.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: contractor(content) }} />
    </Helmet>
    <main className="mofu-page">
      <TopNotice />
      <HeroMofu />

      <section className="section">
        <div className="container section-header">
          <p className="eyebrow">Especialidades y servicios</p>
          <h2>Construimos para residencias, comercios e industria ligera</h2>
          <p>Coordinamos permisos, seguridad y presupuesto con equipos locales y supervisión diaria.</p>
          <div className="tag-row">
            {content.services.map((service) => (
              <span key={service} className="tag">
                {service}
              </span>
            ))}
          </div>
        </div>
        <div className="container">
          <IconCardGrid />
        </div>
      </section>

      <section className="section section--muted">
        <div className="container section-header">
          <p className="eyebrow">Por qué HV</p>
          <h2>Diferenciadores que cuidan tu presupuesto y seguridad</h2>
        </div>
        <div className="container">
          <Differentiators />
        </div>
      </section>

      <section className="section">
        <div className="container section-header">
          <p className="eyebrow">Metodología</p>
          <h2>Un proceso claro, con hitos verificables</h2>
        </div>
        <div className="container">
          <ProcessSteps />
        </div>
      </section>

      <section className="section section--muted">
        <div className="container section-header">
          <p className="eyebrow">Certificaciones</p>
          <h2>Credenciales y coberturas activas</h2>
        </div>
        <div className="container">
          <Credentials />
        </div>
      </section>

      <section className="section case-study-section">
        <div className="container">
          <CaseStudyFeature />
        </div>
      </section>

      <section className="section">
        <div className="container section-header">
          <p className="eyebrow">Galería</p>
          <h2>Antes y después de proyectos recientes</h2>
        </div>
        <div className="container">
          <Gallery />
        </div>
      </section>

      <section className="section lead-section">
        <div className="container lead-grid">
          <div className="lead-grid__form">
            <LeadFormStepper />
          </div>
          <div className="lead-grid__aside">
            <p className="eyebrow">Contacto directo</p>
            <h3>Coordinemos una visita técnica</h3>
            <p>
              Nuestro residente de obra puede reunirse en San Salvador, Santa Tecla o Antiguo Cuscatlán para revisar planos y
              restricciones.
            </p>
            <ul className="contact-list">
              <li>
                <span className="contact-label">Teléfono</span>
                <a href={`tel:${content.contact.phone.replace(/[^+\d]/g, '')}`}>{content.contact.phone}</a>
              </li>
              <li>
                <span className="contact-label">Correo</span>
                <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
              </li>
              <li>
                <span className="contact-label">Áreas</span>
                <p>{content.serviceAreas.join(' • ')}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container section-header">
          <p className="eyebrow">FAQ</p>
          <h2>Resolvemos dudas rápidas</h2>
        </div>
        <div className="container">
          <Faq />
        </div>
      </section>

      <CtaBand />
      <FooterCompact />
    </main>
  </>
);

export default MofuPage;
