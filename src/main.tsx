import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import './styles/global.css';
import i18n from './lib/i18n';
import { ThemeProvider } from './theme/ThemeProvider';
import './api/mockServer';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
