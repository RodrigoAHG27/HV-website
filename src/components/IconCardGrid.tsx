import { BankOutlined, BuildOutlined, HomeOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import { Card, Col, Row, Typography } from 'antd';

import { content } from '../content/hv';

const iconMap: Record<string, ReactNode> = {
  HomeOutlined: <HomeOutlined />,
  BankOutlined: <BankOutlined />,
  BuildOutlined: <BuildOutlined />,
};

const IconCardGrid = () => (
  <Row gutter={[24, 24]}>
    {content.iconCards.map((card) => (
      <Col xs={24} md={8} key={card.title}>
        <Card bordered hoverable>
          <Typography.Title level={4}>
            <span style={{ marginRight: 12 }}>{iconMap[card.icon]}</span>
            {card.title}
          </Typography.Title>
          <Typography.Paragraph>{card.description}</Typography.Paragraph>
        </Card>
      </Col>
    ))}
  </Row>
);

export default IconCardGrid;
