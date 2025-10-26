import { Button, Card, Col, Row, Typography } from 'antd';

function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <Typography.Title level={1}>
          Building spaces that stand the test of time
        </Typography.Title>
        <Typography.Paragraph>
          HV Construction partners with commercial and residential clients to deliver
          durable, high-quality projects across the region.
        </Typography.Paragraph>
        <Button type="primary" size="large" href="/contact">
          Request a consultation
        </Button>
      </section>
      <section className="services">
        <Typography.Title level={2}>Core services</Typography.Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card title="General Contracting" bordered={false}>
              <Typography.Paragraph>
                Comprehensive management from groundbreaking to ribbon cutting, ensuring
                projects are on time and on budget.
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Design-Build" bordered={false}>
              <Typography.Paragraph>
                Integrated design and construction services streamline collaboration and
                accelerate delivery.
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Renovations" bordered={false}>
              <Typography.Paragraph>
                Transform existing spaces with minimal disruption through meticulous
                planning and execution.
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default HomePage;
