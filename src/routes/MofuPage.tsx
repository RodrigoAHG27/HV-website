import { Card, Col, Layout, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import HeroMofu from '../components/HeroMofu';
import LanguageToggle from '../components/LanguageToggle';
import LeadFormStepper from '../components/LeadFormStepper';
import ThemeToggle from '../components/ThemeToggle';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/mofu.css';

const highlightContent = [
  { key: 'fast', titleKey: 'highlightFastTitle', descriptionKey: 'highlightFastDescription' },
  { key: 'targeted', titleKey: 'highlightTargetedTitle', descriptionKey: 'highlightTargetedDescription' },
  { key: 'proven', titleKey: 'highlightProvenTitle', descriptionKey: 'highlightProvenDescription' },
  { key: 'support', titleKey: 'highlightSupportTitle', descriptionKey: 'highlightSupportDescription' },
  { key: 'expert', titleKey: 'highlightExpertTitle', descriptionKey: 'highlightExpertDescription' },
  { key: 'innovation', titleKey: 'highlightInnovationTitle', descriptionKey: 'highlightInnovationDescription' },
] as const;

const MofuPage = () => {
  const { t, language } = useI18n();
  const ogLocale = language === 'es' ? 'es_ES' : 'en_US';

  return (
    <Layout className="mofu-layout">
      <Helmet>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
        <meta property="og:title" content={t('metaOgTitle')} />
        <meta property="og:description" content={t('metaOgDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hvconstruction.sv" />
        <meta property="og:image" content="/og-default.png" />
        <meta property="og:locale" content={ogLocale} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Layout.Header className="mofu-header">
        <div className="container mofu-header__inner">
          <Typography.Text className="brand-mark" strong>
            {t('brand')}
          </Typography.Text>
          <div className="mofu-header__controls">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </Layout.Header>

      <Layout.Content>
        <main className="mofu-page">
          <HeroMofu />

          <section className="section section--centered">
            <div className="container section-header section-header--centered">
              <p className="eyebrow">{t('sectionEyebrow')}</p>
              <Typography.Title level={2}>{t('sectionTitle')}</Typography.Title>
            </div>
            <div className="container">
              <Row gutter={[18, 18]}>
                {highlightContent.map((item) => (
                  <Col key={item.key} xs={24} sm={12} lg={8}>
                    <Card className="feature-card" bordered>
                      <div className="feature-card__icon" aria-hidden>
                        <span>★</span>
                      </div>
                      <div className="feature-card__body">
                        <Typography.Title level={4}>{t(item.titleKey)}</Typography.Title>
                        <Typography.Paragraph>{t(item.descriptionKey)}</Typography.Paragraph>
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
