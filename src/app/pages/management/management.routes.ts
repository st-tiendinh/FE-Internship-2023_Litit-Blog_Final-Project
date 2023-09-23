import React from 'react';

import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';

const Management = React.lazy(() => import('./containers/Management'));

const managementRoutes: PageRoute[] = [
  {
    path: 'management',
    element: Management,
  },
];

export default managementRoutes;
