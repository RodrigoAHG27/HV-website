import { Card, Col, Row, Typography } from 'antd';

const projectSummaries = [
  {
    title: 'Harborview Offices',
    description:
      'A 12-story mixed-use commercial space with sustainable materials and smart building systems.'
  },
  {
    title: 'Lakeside Residences',
    description:
      'Luxury condominium complex featuring energy-efficient amenities and curated outdoor spaces.'
  },
  {
    title: 'North Industrial Park',
    description:
      'Design-build partnership delivering flexible warehouses tailored to high-growth manufacturers.'
  }
];

function ProjectsPage() {
  return (
    <div className="page">
      <Typography.Title level={1}>Featured projects</Typography.Title>
      <Typography.Paragraph>
        Explore a selection of recent work that highlights our commitment to craftsmanship,
        safety, and transparency across every engagement.
      </Typography.Paragraph>
      <Row gutter={[24, 24]}>
        {projectSummaries.map((project) => (
          <Col key={project.title} xs={24} md={8}>
            <Card title={project.title} bordered={false}>
              <Typography.Paragraph>{project.description}</Typography.Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProjectsPage;
