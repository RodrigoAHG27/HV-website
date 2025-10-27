import { DownloadOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';

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
    <Row gutter={[48, 48]} align="middle" justify="space-between">
      <Col xs={24} md={14}>
        <Space direction="vertical" size="large">
          <div>
            <Typography.Title level={1} style={{ marginBottom: 8 }}>
              {content.hero.title}
            </Typography.Title>
            <Typography.Title level={3} style={{ marginTop: 0 }}>
              {content.hero.subtitle}
            </Typography.Title>
            <Typography.Paragraph>{content.hero.description}</Typography.Paragraph>
          </div>
          <Space wrap>
            <Button type="primary" size="large" onClick={handlePrimaryCta} icon={<PhoneOutlined />}>
              Request Estimate
            </Button>
            <Button
              size="large"
              href={content.pdfUrl}
              target="_blank"
              rel="noopener"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
            >
              Download Capability Sheet
            </Button>
          </Space>
        </Space>
      </Col>
      <Col xs={24} md={10}>
        <div style={{ borderRadius: 16, overflow: 'hidden' }}>
          <img src={content.hero.image} alt="Equipo de construcción de HV Construction en obra" loading="lazy" />
        </div>
      </Col>
    </Row>
  );
};

export default HeroMofu;
