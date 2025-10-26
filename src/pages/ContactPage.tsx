import { Button, Col, Form, Input, Row, Typography } from 'antd';

function ContactPage() {
  return (
    <div className="page">
      <Typography.Title level={1}>Let’s plan your next build</Typography.Title>
      <Typography.Paragraph>
        Share a few details about your project and our team will reach out within one business day.
      </Typography.Paragraph>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={14}>
          <Form layout="vertical" className="contact-form">
            <Form.Item label="Name" required>
              <Input placeholder="Jane Doe" size="large" />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input placeholder="jane.doe@email.com" size="large" type="email" />
            </Form.Item>
            <Form.Item label="Project details">
              <Input.TextArea rows={4} placeholder="Tell us about your goals" />
            </Form.Item>
            <Button type="primary" size="large">
              Submit inquiry
            </Button>
          </Form>
        </Col>
        <Col xs={24} md={10}>
          <div className="contact-details">
            <Typography.Title level={4}>Headquarters</Typography.Title>
            <Typography.Paragraph>
              123 Harbor View Ave, Suite 400
              <br />
              Seattle, WA 98101
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Phone:</strong> (555) 123-4567
              <br />
              <strong>Email:</strong> hello@hvconstruction.com
            </Typography.Paragraph>
            <Typography.Paragraph type="secondary">
              Office hours: Monday – Friday, 8:00 AM – 5:00 PM PST
            </Typography.Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ContactPage;
