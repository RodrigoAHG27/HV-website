import { Card, Col, Layout, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import HeroMofu from '../components/HeroMofu';
import LeadFormStepper from '../components/LeadFormStepper';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/mofu.css';

const MofuPage = () => {
  const { t } = useTranslation();
  const highlights = t('highlights', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <Layout className="mofu-layout">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta property="og:title" content={t('meta.ogTitle')} />
        <meta property="og:description" content={t('meta.ogDescription')} />
        <meta property="og:type" content={t('meta.ogType')} />
        <meta property="og:url" content={t('meta.ogUrl')} />
        <meta property="og:image" content={t('meta.ogImage')} />
        <meta name="twitter:card" content={t('meta.twitterCard')} />
      </Helmet>
      <Layout.Header className="mofu-header">
        <div className="container mofu-header__inner">
          <Typography.Text className="brand-mark" strong>
            {t('brand')}
          </Typography.Text>
          <ThemeToggle />
        </div>
      </Layout.Header>

      <Layout.Content>
        <main className="mofu-page">
          <HeroMofu />

          <section className="section section--centered">
            <div className="container section-header section-header--centered">
              <p className="eyebrow">{t('sections.whyChooseUs')}</p>
              <Typography.Title level={2}>{t('sections.highlightsTitle')}</Typography.Title>
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
};

export default MofuPage;
