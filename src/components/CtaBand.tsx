import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';

import { content } from '../content/hv';
import { track } from '../lib/analytics';

const CtaBand = () => (
  <Card>
    <Space direction="vertical" style={{ width: '100%' }} size="middle" align="center">
      <Typography.Title level={3}>Listo para construir en El Salvador</Typography.Title>
      <Typography.Text>
        Coordinemos una reunión para revisar planos, permisos y presupuesto en San Salvador o municipios vecinos.
      </Typography.Text>
      <Space wrap>
        <Button
          type="primary"
          size="large"
          href={`tel:${content.contact.phone.replace(/[^+\d]/g, '')}`}
          icon={<PhoneOutlined />}
          onClick={() => track('click_phone', { phone: content.contact.phone })}
        >
          {content.cta.phoneLabel}
        </Button>
        <Button
          size="large"
          href={content.contact.whatsapp}
          target="_blank"
          rel="noopener"
          icon={<WhatsAppOutlined />}
          onClick={() => track('click_whatsapp', { url: content.contact.whatsapp })}
        >
          {content.cta.whatsappLabel}
        </Button>
      </Space>
    </Space>
  </Card>
);

export default CtaBand;
