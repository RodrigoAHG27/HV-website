import { Card, Col, Modal, Row, Typography } from 'antd';
import { useMemo, useState } from 'react';

import { content } from '../content/hv';
import { track } from '../lib/analytics';

type ActiveImage = {
  full: string;
  alt: string;
} | null;

const Gallery = () => {
  const [active, setActive] = useState<ActiveImage>(null);

  const isModalOpen = useMemo(() => Boolean(active), [active]);

  const openImage = (item: NonNullable<ActiveImage>) => {
    setActive(item);
    track('mofu_gallery_open', { alt: item.alt });
  };

  return (
    <>
      <Row gutter={[24, 24]}>
        {content.gallery.map((item) => (
          <Col xs={24} md={8} key={item.thumb}>
            <Card
              hoverable
              cover={
                <button
                  type="button"
                  onClick={() => openImage({ full: item.full, alt: item.alt })}
                  style={{ border: 'none', padding: 0, background: 'none', cursor: 'pointer' }}
                  aria-label={`Abrir galería: ${item.alt}`}
                >
                  <img src={item.thumb} alt={item.alt} loading="lazy" />
                </button>
              }
            >
              <Typography.Paragraph>{item.alt}</Typography.Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        open={isModalOpen}
        onCancel={() => setActive(null)}
        footer={null}
        centered
        aria-labelledby="gallery-modal"
      >
        {active ? <img src={active.full} alt={active.alt} style={{ width: '100%' }} /> : null}
      </Modal>
    </>
  );
};

export default Gallery;
