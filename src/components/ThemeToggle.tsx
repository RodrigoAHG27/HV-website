import { Switch, Tooltip } from 'antd';
import { MoonFilled, SunFilled } from '@ant-design/icons';

import { useTheme } from '../theme/ThemeProvider';

const ThemeToggle = () => {
  const { isDark, setMode } = useTheme();

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'} placement="left">
      <Switch
        checked={isDark}
        onChange={(checked) => setMode(checked ? 'dark' : 'light')}
        checkedChildren={<MoonFilled />}
        unCheckedChildren={<SunFilled />}
        className="theme-toggle"
      />
    </Tooltip>
  );
};

export default ThemeToggle;
