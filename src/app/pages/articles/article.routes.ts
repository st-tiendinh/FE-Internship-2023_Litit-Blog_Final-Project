import React from 'react';

import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';

const Articles = React.lazy(() => import('./containers/Articles'));
const ArticleDetail = React.lazy(() => import('./containers/ArticleDetail'));
const ArticleList = React.lazy(() => import('./containers/ArticleList'));
const ArticleNew = React.lazy(() => import('./containers/ArticleNew'));
const ArticleUpdate = React.lazy(() => import('./containers/ArticleUpdate'));
const ArticleByTag = React.lazy(() => import('./containers/ArticleByTag'));
const ArticleBookmark = React.lazy(
  () => import('./containers/ArticleBookmark')
);

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
        isProtected: true,
      },
      {
        path: 'update/:id',
        element: ArticleUpdate,
        isProtected: true,
      },
      {
        path: 'tag/:tag',
        element: ArticleByTag,
      },
      {
        path: 'bookmark',
        isProtected: true,
        element: ArticleBookmark,
      },
    ],
  },
];

export default articleRoutes;
