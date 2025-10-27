import { Layout, Typography } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ThemeToggle from './components/ThemeToggle';
import CaseStudies from './routes/CaseStudies';
import MofuPage from './routes/MofuPage';

const { Header, Content } = Layout;

const App = () => (
  <BrowserRouter>
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography.Title level={4} style={{ color: 'inherit', margin: 0 }}>
          HV Construction
        </Typography.Title>
        <ThemeToggle />
      </Header>
      <Content style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<MofuPage />} />
            <Route path="/case-studies" element={<CaseStudies />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  </BrowserRouter>
);

export default App;
