import React from 'react';

import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';



const Settings = React.lazy(() => import('./containers/Settings'));
const UserProfile = React.lazy(() => import('./containers/components/UserProfile'));
const ListFollowers = React.lazy(() => import('./containers/components/ListFollowers'));
const ListFollowings = React.lazy(() => import('./containers/components/ListFollowings'));
const ChangePassword = React.lazy(() => import('./containers/components/ChangePassword'));
const Bookmarks = React.lazy(() => import('./containers/components/Bookmarks'));
const Drafts = React.lazy(() => import('./containers/components/Draft'));
const RecycleBin = React.lazy(() => import('./containers/components/RecycleBin'));


const settingsRoutes: PageRoute[] = [
  {
    path: 'settings',
    element: Settings,
    children: [
      {
        path: 'my-profile',
        element: UserProfile,
      },

      {
        path: 'list-followers',
        element: ListFollowers,
      },

      {
        path: 'list-followings',
        element: ListFollowings,
      },

      {
        path: 'change-password',
        element: ChangePassword,
      },

      {
        path: 'bookmarks',
        element: Bookmarks,
      },

      {
        path: 'drafts',
        element: Drafts,
      },
      
      {
        path: 'recycle-bin',
        element: RecycleBin,
      }
    ],
  },

];

export default settingsRoutes;
