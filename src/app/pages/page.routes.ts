import React from 'react';

import { PageRoute } from '../core/modules/custom-router-dom/router.interface';
import articleRoutes from './articles/article.routes';
import homeRoutes from './home/home.routes';
import userRoutes from './user/user.routes';
import managementRoutes from './management/management.routes';

const Page = React.lazy(() => import('./Page'));
const NotFound = React.lazy(() => import('./../shared/components/NotFound'));

const pageRoutes: PageRoute[] = [
  {
    path: '/',
    element: Page,
    children: [
      ...homeRoutes,
      ...articleRoutes,
      ...userRoutes,
      ...managementRoutes,
    ],
  },
  {
    path: '/404',
    element: NotFound,
  },
];

export default pageRoutes;
