import React from 'react';

import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';

const Users = React.lazy(() => import('./containers/Users'));
const UserDetail = React.lazy(() => import('./containers/UserDetail'));

const userRoutes: PageRoute[] = [
  {
    path: 'users',
    element: Users,
    isProtected: true,
    children: [
      {
        path: ':id',
        isProtected: true,
        element: UserDetail,
      },
    ],
  },
];

export default userRoutes;
