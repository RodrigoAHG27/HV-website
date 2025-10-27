import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import './styles/global.css';
import { ThemeProvider } from './theme/ThemeProvider';
import './api/mockServer';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
