import { HomeOutlined, MailOutlined, ProjectOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const menuItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: 'Home'
  },
  {
    key: '/projects',
    icon: <ProjectOutlined />,
    label: 'Projects'
  },
  {
    key: '/contact',
    icon: <MailOutlined />,
    label: 'Contact'
  }
];

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKeys = useMemo(() => {
    const matchingItem = menuItems?.find((item) => item?.key === location.pathname);
    return matchingItem ? [String(matchingItem.key)] : ['/'];
  }, [location.pathname]);

  return (
    <Layout>
      <Header className="main-header">
        <div className="logo">
          <Typography.Title level={3} className="logo__text">
            HV Construction
          </Typography.Title>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Header>
      <Content className="main-content">{children}</Content>
    </Layout>
  );
}

export default MainLayout;
