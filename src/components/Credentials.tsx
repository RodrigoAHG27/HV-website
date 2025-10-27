import { Badge, Card, Col, Row, Typography } from 'antd';

import { content } from '../content/hv';

const Credentials = () => (
  <Row gutter={[24, 24]}>
    <Col xs={24} md={12}>
      <Card>
        <Typography.Title level={4}>Licencias y seguros</Typography.Title>
        <Typography.Paragraph>{content.credentials.license}</Typography.Paragraph>
        <Typography.Paragraph>{content.credentials.insurance}</Typography.Paragraph>
      </Card>
    </Col>
    <Col xs={24} md={12}>
      <Card>
        <Typography.Title level={4}>Acreditaciones</Typography.Title>
        <Row gutter={[12, 12]}>
          {content.credentials.badges.map((badge) => (
            <Col key={badge.name}>
              <Badge status="processing" text={`${badge.name} — ${badge.description}`} />
            </Col>
          ))}
        </Row>
      </Card>
    </Col>
  </Row>
);

export default Credentials;
