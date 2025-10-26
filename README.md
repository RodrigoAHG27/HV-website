# HV Construction Website

This repository contains the base setup for the HV Construction marketing website. It is built with [React](https://react.dev/) using [Vite](https://vitejs.dev/) for bundling and [Ant Design](https://ant.design/) for the UI component system.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the local development server:

   ```bash
   npm run dev
   ```

   The site will be available at [http://localhost:5173](http://localhost:5173).

3. Run a production build:

   ```bash
   npm run build
   ```

4. Preview the production build locally:

   ```bash
   npm run preview
   ```

## Project structure

```
├── public/
│   └── favicon.svg        # Custom gradient favicon
├── src/
│   ├── layouts/           # Shared layout components
│   ├── pages/             # Route-level pages (Home, Projects, Contact)
│   ├── routes/            # Centralized routing definition
│   ├── styles/            # Global and theme styles
│   ├── App.tsx            # Root application component
│   └── main.tsx           # Application bootstrap
├── index.html             # Vite entry HTML
├── package.json           # Project metadata and scripts
└── vite.config.ts         # Vite configuration
```

## Next steps

- Integrate real project data and imagery.
- Connect the contact form to a backend or service for submissions.
- Expand page structure with testimonials, safety information, and hiring details.
