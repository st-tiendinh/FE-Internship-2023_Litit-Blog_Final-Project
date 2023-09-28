import React from 'react';

import { PageRoute } from '../core/modules/custom-router-dom/router.interface';
import articleRoutes from './articles/article.routes';
import homeRoutes from './home/home.routes';
import userRoutes from './user/user.routes';
import settingsRoutes from './management/settings.routes';

const Page = React.lazy(() => import('./Page'));
const NotFoundSection = React.lazy(() => import('./../shared/components/NotFoundSection'));

const pageRoutes: PageRoute[] = [
  {
    path: '/',
    element: Page,
    children: [
      ...homeRoutes,
      ...articleRoutes,
      ...userRoutes,
      ...settingsRoutes,
    ],
  },
  {
    path: '/404',
    element: NotFoundSection,
  },
];

export default pageRoutes;
