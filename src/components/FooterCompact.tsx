import { Layout, Space, Typography } from 'antd';

import { content } from '../content/hv';

const FooterCompact = () => (
  <Layout.Footer style={{ textAlign: 'center' }}>
    <Space direction="vertical">
      <Typography.Text strong>{content.companyName}</Typography.Text>
      <Typography.Text type="secondary">
        © {new Date().getFullYear()} {content.companyName}. Operamos en San Salvador y municipios aledaños.
      </Typography.Text>
    </Space>
  </Layout.Footer>
);

export default FooterCompact;
