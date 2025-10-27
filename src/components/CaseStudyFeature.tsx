import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Statistic, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { content } from '../content/hv';
import { track } from '../lib/analytics';

const CaseStudyFeature = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tracked, setTracked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ref.current || tracked) return;
    const element = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !tracked) {
            track('mofu_case_study_view', { title: content.caseStudy.title });
            setTracked(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [tracked]);

  return (
    <div ref={ref}>
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} md={12}>
          <Card bordered={false}>
            <Space direction="vertical" size="large">
              <div>
                <Typography.Title level={2}>{content.caseStudy.title}</Typography.Title>
                <Typography.Paragraph strong>Reto</Typography.Paragraph>
                <Typography.Paragraph>{content.caseStudy.problem}</Typography.Paragraph>
                <Typography.Paragraph strong>Solución</Typography.Paragraph>
                <Typography.Paragraph>{content.caseStudy.solution}</Typography.Paragraph>
              </div>
              <Row gutter={[16, 16]}> 
                {content.caseStudy.results.map((result) => (
                  <Col xs={24} sm={8} key={result.label}>
                    <Statistic title={result.label} value={result.value} />
                  </Col>
                ))}
              </Row>
              <div>
                <Button
                  type="link"
                  icon={<ArrowRightOutlined />}
                  onClick={() => navigate(content.caseStudy.href)}
                >
                  View more
                </Button>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card cover={<img src={content.caseStudy.image} alt={content.caseStudy.imageAlt} loading="lazy" />}>
            <Typography.Paragraph>{content.caseStudy.imageAlt}</Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CaseStudyFeature;
