import React from 'react';

import { PageRoute } from '../modules/custom-router-dom/router.interface';

const Auth = React.lazy(() => import('./Auth'));
const Login = React.lazy(() => import('./containers/Login'));
const Register = React.lazy(() => import('./containers/Register'));

const authRoutes: PageRoute[] = [
  {
    path: 'auth',
    element: Auth,
    children: [
      {
        path: '',
        redirect: 'login',
      },
      {
        path: 'login',
        element: Login,
      },
      {
        path: 'register',
        element: Register,
      },
    ],
  },
];

export default authRoutes;
