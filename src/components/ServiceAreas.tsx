import { EnvironmentOutlined } from '@ant-design/icons';
import { Card, Col, List, Row, Typography } from 'antd';

import { content } from '../content/hv';

const ServiceAreas = () => (
  <Row gutter={[24, 24]}>
    <Col xs={24} md={12}>
      <Card>
        <Typography.Title level={4}>Áreas de servicio</Typography.Title>
        <List
          dataSource={content.serviceAreas}
          renderItem={(area) => (
            <List.Item>
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              {area}
            </List.Item>
          )}
        />
      </Card>
    </Col>
    <Col xs={24} md={12}>
      <Card>
        <Typography.Title level={4}>Mapa de referencia</Typography.Title>
        <div
          style={{
            width: '100%',
            paddingTop: '56%',
            position: 'relative',
            background:
              'linear-gradient(135deg, rgba(2,132,199,0.25), rgba(125,211,252,0.25))',
            borderRadius: 12,
          }}
        >
          <Typography.Text
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontWeight: 600,
            }}
          >
            Mapa del Gran San Salvador
          </Typography.Text>
        </div>
      </Card>
    </Col>
  </Row>
);

export default ServiceAreas;
