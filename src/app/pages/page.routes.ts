import React from 'react';

import { PageRoute } from '../core/modules/custom-router-dom/router.interface';
import articleRoutes from './articles/article.routes';
import homeRoutes from './home/home.routes';
import userRoutes from './user/user.routes';
import settingsRoutes from './management/settings.routes';
import notFoundRoutes from './notFound/notFound.routes';

const Page = React.lazy(() => import('./Page'));

const pageRoutes: PageRoute[] = [
  {
    path: '/',
    element: Page,
    children: [
      ...homeRoutes,
      ...articleRoutes,
      ...userRoutes,
      ...settingsRoutes,
      ...notFoundRoutes,
    ],
  },
];

export default pageRoutes;
