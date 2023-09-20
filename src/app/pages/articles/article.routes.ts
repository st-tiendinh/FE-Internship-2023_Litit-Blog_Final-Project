import React from 'react';

import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';

const Articles = React.lazy(() => import('./containers/Articles'));
const ArticleDetail = React.lazy(() => import('./containers/ArticleDetail'));
const ArticleList = React.lazy(() => import('./containers/ArticleList'));
const ArticleNew = React.lazy(() => import('./containers/ArticleNew'));
const ArticleUpdate = React.lazy(() => import('./containers/ArticleUpdate'));
const ArticleByTag = React.lazy(() => import('./containers/ArticleByTag'));

const articleRoutes: PageRoute[] = [
  {
    path: 'articles',
    element: Articles,
    children: [
      {
        path: '',
        element: ArticleList,
      },
      {
        path: ':id',
        element: ArticleDetail,
      },
      {
        path: 'new',
        element: ArticleNew,
      },
      {
        path: 'update/:id',
        element: ArticleUpdate,
      },
      {
        path: 'tag/:tag',
        element: ArticleByTag,
      },
    ],
  },
];

export default articleRoutes;
