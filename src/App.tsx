import { Layout, Typography } from 'antd';
import { Outlet } from 'react-router-dom';

import MainLayout from './layouts/MainLayout.tsx';

const { Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Footer style={{ textAlign: 'center' }}>
        <Typography.Text type="secondary">
          © {new Date().getFullYear()} HV Construction. All rights reserved.
        </Typography.Text>
      </Footer>
    </Layout>
  );
}

export default App;
