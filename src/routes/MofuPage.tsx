import { Card, Col, Layout, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';

import HeroMofu from '../components/HeroMofu';
import LeadFormStepper from '../components/LeadFormStepper';
import ThemeToggle from '../components/ThemeToggle';
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
  <Layout className="mofu-layout">
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
    <Layout.Header className="mofu-header">
      <div className="container mofu-header__inner">
        <Typography.Text className="brand-mark" strong>
          HV
        </Typography.Text>
        <ThemeToggle />
      </div>
    </Layout.Header>

    <Layout.Content>
      <main className="mofu-page">
        <HeroMofu />

        <section className="section section--centered">
          <div className="container section-header section-header--centered">
            <p className="eyebrow">Why Choose Us</p>
            <Typography.Title level={2}>Everything you need to take your business to the next level</Typography.Title>
          </div>
          <div className="container">
            <Row gutter={[18, 18]}>
              {highlights.map((item) => (
                <Col key={item.title} xs={24} sm={12} lg={8}>
                  <Card className="feature-card" bordered>
                    <div className="feature-card__icon" aria-hidden>
                      <span>★</span>
                    </div>
                    <div className="feature-card__body">
                      <Typography.Title level={4}>{item.title}</Typography.Title>
                      <Typography.Paragraph>{item.description}</Typography.Paragraph>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        <section className="section form-section">
          <div className="container">
            <LeadFormStepper />
          </div>
        </section>
      </main>
    </Layout.Content>
  </Layout>
);

export default MofuPage;
