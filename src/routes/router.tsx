import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App.tsx';
import ContactPage from '../pages/ContactPage.tsx';
import HomePage from '../pages/HomePage.tsx';
import ProjectsPage from '../pages/ProjectsPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);

export default router;
