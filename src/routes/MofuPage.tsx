import { Space } from 'antd';
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
import ServiceAreas from '../components/ServiceAreas';
import TopNotice from '../components/TopNotice';
import FooterCompact from '../components/FooterCompact';
import { content } from '../content/hv';
import { contractor } from '../lib/jsonld';

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
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <TopNotice />
      <HeroMofu />
      <IconCardGrid />
      <ProcessSteps />
      {/* <CaseStudyFeature /> */}
      {/* <Faq /> */}
      <LeadFormStepper />
      <CtaBand />
      <FooterCompact />
    </Space>
  </>
);

export default MofuPage;
