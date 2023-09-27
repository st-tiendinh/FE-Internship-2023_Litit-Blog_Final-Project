import { useEffect } from 'react';

import { Sidebar } from './components/Sidebar';
import { Outlet } from 'react-router-dom';

export enum SettingsType {
  MY_PROFILE = 'my-profile',
  LIST_FOLLOWERS = 'list-followers',
  LIST_FOLLOWINGS = 'list-followings',
  CHANGE_PASSWORD = 'change-password',
  BOOKMARKS = 'bookmarks',
  DRAFTS = 'drafts',
  RECYCLE_BIN = 'recycle-bin',
}

const Management = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="management-page">
      <div className="container">
        <div className="row">
          <div className="col col-4 col-sm-12">
            <Sidebar />
          </div>
          <div className="col col-8 col-sm-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
