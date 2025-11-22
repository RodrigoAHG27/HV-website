import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { content } from '../content/hv';
import { track } from '../lib/analytics';

const CtaBand = () => (
  <section className="cta-band">
    <div className="container cta-band__inner">
      <div>
        <p className="eyebrow">Agenda una llamada</p>
        <h3>Listo para construir en El Salvador</h3>
        <p>
          Coordinemos una reunión para revisar planos, permisos y presupuesto en San Salvador o municipios vecinos.
        </p>
      </div>
      <div className="cta-band__actions">
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
      </div>
    </div>
  </section>
);

export default CtaBand;
