import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { daConditions } from './content/conditions/da';
import { enConditions } from './content/conditions/en';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/about.css';
import './styles/fab.css';
import './styles/reviews.css';

const router = createBrowserRouter(
  [
    { path: '/', element: <App lang="da" page="home" /> },
    { path: '/en/', element: <App lang="en" page="home" /> },
    { path: '/om-mig', element: <App lang="da" page="about" /> },
    { path: '/en/about-me', element: <App lang="en" page="about" /> },
    { path: '/anmeldelser', element: <App lang="da" page="reviews" /> },
    { path: '/en/reviews', element: <App lang="en" page="reviews" /> },
    ...daConditions.map((c) => ({
      path: c.slug,
      element: <App lang="da" page="condition" condition={c} />,
    })),
    ...enConditions.map((c) => ({
      path: c.slug,
      element: <App lang="en" page="condition" condition={c} />,
    })),
  ],
  { basename: '/klinik-for-manuel-terapi' },
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
