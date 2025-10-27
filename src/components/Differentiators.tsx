import { CheckCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';

import { content } from '../content/hv';

const Differentiators = () => (
  <Row gutter={[24, 24]}>
    {content.differentiators.map((item) => (
      <Col xs={24} md={12} key={item.title}>
        <Card>
          <Typography.Title level={4}>
            <CheckCircleOutlined style={{ marginRight: 12 }} />
            {item.title}
          </Typography.Title>
          <Typography.Paragraph>{item.description}</Typography.Paragraph>
        </Card>
      </Col>
    ))}
  </Row>
);

export default Differentiators;
