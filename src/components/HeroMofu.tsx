import { DownloadOutlined, PhoneOutlined, SafetyCertificateOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

import { content } from '../content/hv';
import { track } from '../lib/analytics';

const HeroMofu = () => {
  const handlePrimaryCta = () => {
    track('mofu_hero_cta_click');
    const form = document.getElementById('lead-form');
    form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDownload = () => {
    track('mofu_pdf_download');
  };

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <ThunderboltOutlined /> Construcción integral en El Salvador
          </div>
          <Typography.Title level={1} className="hero__title">
            {content.hero.title}
          </Typography.Title>
          <Typography.Paragraph className="hero__subtitle">{content.hero.subtitle}</Typography.Paragraph>
          <Typography.Paragraph className="hero__description">{content.hero.description}</Typography.Paragraph>
          <div className="hero__actions">
            <Button type="primary" size="large" icon={<PhoneOutlined />} onClick={handlePrimaryCta}>
              Solicitar evaluación
            </Button>
            <Button
              size="large"
              className="ghost-button"
              href={content.pdfUrl}
              target="_blank"
              rel="noopener"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
            >
              Descargar credenciales
            </Button>
          </div>
          <div className="hero__chips">
            <span>Supervisión local diaria</span>
            <span>Res / Com / Ind</span>
            <span>OSHA + ISO 9001</span>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__image-frame">
            <img src={content.hero.image} alt="Equipo de HV Construction en obra" loading="lazy" />
            <div className="hero__badge">
              <div>
                <strong>24/7</strong>
                <span>Reportes fotográficos</span>
              </div>
              <div>
                <strong>48h</strong>
                <span>Visita técnica en GSS</span>
              </div>
              <div className="hero__badge-tag">
                <SafetyCertificateOutlined /> Licencia OPAMSS vigente
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMofu;
