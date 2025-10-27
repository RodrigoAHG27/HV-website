import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, List, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { content } from '../content/hv';

const CaseStudies = () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <Space align="center">
      <ArrowLeftOutlined />
      <Link to="/">Regresar a HV Construction</Link>
    </Space>
    <Typography.Title level={2}>Casos de éxito en El Salvador</Typography.Title>
    <Card>
      <List
        itemLayout="vertical"
        dataSource={[content.caseStudy]}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={item.title}
              description={
                <>
                  <Typography.Paragraph strong>Reto</Typography.Paragraph>
                  <Typography.Paragraph>{item.problem}</Typography.Paragraph>
                  <Typography.Paragraph strong>Solución</Typography.Paragraph>
                  <Typography.Paragraph>{item.solution}</Typography.Paragraph>
                </>
              }
            />
            <Space>
              {item.results.map((result) => (
                <Card key={result.label}>
                  <Typography.Text strong>{result.value}</Typography.Text>
                  <br />
                  <Typography.Text type="secondary">{result.label}</Typography.Text>
                </Card>
              ))}
            </Space>
          </List.Item>
        )}
      />
    </Card>
  </Space>
);

export default CaseStudies;
