import React from 'react';

import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';

const Home = React.lazy(() => import('./containers/Home'));

const homeRoutes: PageRoute[] = [
  {
    path: '/',
    element: Home,
  },
];

export default homeRoutes;
