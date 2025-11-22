import { ConfigProvider, theme } from 'antd';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

import { useThemeController, type ThemeMode } from './useTheme';

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const controller = useThemeController();

  const contextValue = useMemo(
    () => ({ mode: controller.mode, setMode: controller.setMode, isDark: controller.isDark }),
    [controller.mode, controller.setMode, controller.isDark],
  );

  const metaColor = controller.isDark ? '#0f0f10' : '#ffffff';

  return (
    <ThemeContext.Provider value={contextValue}>
      <Helmet>
        <meta name="theme-color" content={metaColor} />
      </Helmet>
      <ConfigProvider
        theme={{
          algorithm: controller.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            borderRadius: 10,
            colorPrimary: '#1f6bff',
            colorBgBase: controller.isDark ? '#0b1220' : '#f6f8fb',
            colorBgContainer: controller.isDark ? '#0f172a' : '#ffffff',
            colorTextBase: controller.isDark ? '#e8efff' : '#0f172a',
            fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return value;
};
