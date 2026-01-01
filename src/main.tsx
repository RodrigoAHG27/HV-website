import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import 'antd/dist/reset.css';
import './styles/base.css';
import i18n from './lib/i18n';
import './api/mockServer';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18n} defaultNS="common">
      <App />
    </I18nextProvider>
  </StrictMode>,
);
