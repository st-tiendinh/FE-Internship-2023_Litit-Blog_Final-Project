import React from 'react';

import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';

const NotFoundSection = React.lazy(() => import('./containers/NotFoundSection'));

const notFoundRoutes: PageRoute[] = [
  {
    path: '/404',
    element: NotFoundSection,
  },
];

export default notFoundRoutes;
