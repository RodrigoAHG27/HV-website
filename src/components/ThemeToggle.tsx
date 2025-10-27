import { DesktopOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import { Radio, Space, Typography } from 'antd';

import { useTheme } from '../theme/ThemeProvider';
import type { ThemeMode } from '../theme/useTheme';

const options: { label: string; value: ThemeMode; icon: ReactNode }[] = [
  { label: 'Light', value: 'light', icon: <SunOutlined /> },
  { label: 'Dark', value: 'dark', icon: <MoonOutlined /> },
  { label: 'System', value: 'system', icon: <DesktopOutlined /> },
];

const ThemeToggle = () => {
  const { mode, setMode } = useTheme();

  return (
    <Radio.Group
      value={mode}
      optionType="button"
      onChange={(event) => setMode(event.target.value)}
      aria-label="Theme selection"
    >
      <Space>
        {options.map((opt) => (
          <Radio.Button key={opt.value} value={opt.value}>
            <Space>
              {opt.icon}
              <Typography.Text>{opt.label}</Typography.Text>
            </Space>
          </Radio.Button>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default ThemeToggle;
